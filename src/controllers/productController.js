const {loadProducts, storeProducts} = require("../data/productsModule")
const {validationResult} = require("express-validator")
const db = require('../database/models');
const { Op } = require("sequelize");
const category = require("../database/models/category");

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
       
var camelSentence = function camelSentence(str) {
    return  (" " + str).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function(match, chr)
    {
        return chr.toUpperCase();
    });
}

module.exports = {
    index: (req, res) => {
		db.Product.findAll({
            include:['images','category']
        })
        .then(products =>{ 
            return res.render('products/products',{
               products,
               toThousand,
               title : "Todos los productos"
            })
        })
        .catch((error)=>console.log(error))
		

	},
    detail : (req,res) => {
        db.Product.findByPk(req.params.id,{
            include:['images']
        })
        .then((product)=>{
            return res.render("products/detalleProducto",{
                title : "Detalle del producto",
                product,
                toThousand
        })
       
      
        })
        .catch((error)=>console.log(error))
    },
    carrito : (req,res) => {
        return res.render("products/carrito",{
            title : "Carrito"
        })
    },
    categorieStore : (req,res) => {
     /*    const products = loadProducts();
        //const category = products.find(product => product.category === +req.params.category)
        const categoryParams = req.params.category;

        const productsCategory = products.find(({category}) => category === categoryParams)


        return res.render("products/categorieStore",{
            title : categoryParams,
            products,
            categoryParams,
            camelSentence,
            toThousand
        })

    }, */

    	db.Category.findOne( {
            where : {
                name: req.params.category
            },
            
            include: [
                {
                    association: "products",
                    include:['images']
                }
            ]
        })
        .then(category =>{ 
            return res.render('products/categorieStore',{
               category,
               toThousand,
               camelSentence,
               categoryParams : req.params.category
            })
        })
        .catch((error)=>console.log(error))
		
	},

    search : (req,res) => {
       /* const products = loadProducts()
		const result = products.filter(product => product.title.toLowerCase().includes(req.query.keywords.toLowerCase()))

		return res.render("products/searchProducts",{
            title : "Busqueda",
			products : result,
			keywords : req.query.keywords,
			toThousand,
            camelSentence
		})*/
        const {keywords}= req.query;
        db.Product.findAll({
            include:['images'],
            where:{
                [Op.or]:[
                    {
                        name:{
                            [Op.substring]:keywords
                        }
                    },
                    {
                        description:{
                            [Op.substring]:keywords
                        }

                    }

                ],
               
            }
        })
        .then(products=>{
            return res.render("products/searchProducts",{
                products ,
                keywords : req.query.keywords,
                toThousand,
                camelSentence,
                title : "Busqueda"
               
               /* title : "Busqueda",
                products : result,
                keywords : req.query.keywords,
                toThousand,
                 */

        })
    })
    .catch(error=>console.log(error))
    },
    /* ADMIN CONTROLLERS */

    addProduct : (req,res) => {
        if(req.session.userLogin && res.locals.userLogin.rolId === 1){
            /* const products = loadProducts()
            return res.render("products/addProduct",{
                title : "Agregar producto",
                products
            }) */

            db.Category.findAll({
                attributes : ["id", "name"],
                order : ["name"]
            })
                .then(categories => {
                    return res.render("products/addProduct", {
                        categories,
                        title : "Agregar producto"
                    })
                })
                .catch(error => console.log(error))

        } else {
            return res.redirect("/")
        }
        
    },
    
    store : (req,res) => {
        if(req.session.userLogin && res.locals.userLogin.rolId === 1){
            const errors = validationResult(req) 

            if(errors.isEmpty()){

                db.Product.create({
                    ...req.body,
                    name : req.body.name.trim(),
                    description : req.body.description.trim()
                })
                    .then(product => {
                        if (req.files.length) {
                            let images = req.files.map(({filename}) => {
                                return {
                                    file : filename,
                                    productId : product.id
                                }
                            })
                            db.Image.bulkCreate(images, {
                                validate : true
                            }).then( (result) => console.log(result))
                        } else {

                        }
                        return res.redirect("/products")
                    })
                    .catch(error => console.log(error))

                return res.redirect("/products")
            } else {

                db.Category.findAll({
                    attributes : ["id", "name"],
                    order : ["name"]
                })
                    .then(categories => {
                        return res.render("products/addProduct", {
                            categories,
                            old : req.body,
                            title : "Agregar producto",
                            errors : errors.mapped()
                        })
                    })
                    .catch(error => console.log(error))
            }
        } else {
            return res.redirect("/")
        }
    },

    selectDelete : (req,res) =>{
        if(req.session.userLogin && res.locals.userLogin.rolId === 1){
            db.Product.findAll()
                .then(products => {
                    return res.render('products/deleteProducts',{
                        products,
                        title: "Eliminar productos"
                    })
                })
                .catch(error => console.log(error))
        } else {
            return res.redirect("/")
        }
    },

    deleteProduct:(req,res) => {
        if(req.session.userLogin && res.locals.userLogin.rolId === 1){
            const productId = +req.body.id
            const products= loadProducts()
            const productModify = products.filter(product=>product.id !== productId) 
            storeProducts(productModify)
            return res.redirect('../')
        } else {
            return res.redirect("/")
        }
    },

    select : (req,res) => {
        if(req.session.userLogin && res.locals.userLogin.rolId === 1){
            /* const products = loadProducts() */

            db.Product.findAll()
                .then(products => {
                    return res.render("products/editProduct-selector", {
                        title : "Selección de producto",
                        products
                    })
                })
                .catch(error => console.log(error));
        } else {
            return res.redirect("/")
        }
    },
    
    selected : (req,res) => {
        if(req.session.userLogin && res.locals.userLogin.rolId === 1){
            const productId = +req.body.id
            return res.redirect(productId)
        } else {
            return res.redirect("/")
        }
    },

    editProduct : (req,res) => {
        if(req.session.userLogin && res.locals.userLogin.rolId === 1){
            /* const products = loadProducts() */

            /* const product = products.find(product => product.id === +req.params.id) */

            let product = db.Product.findByPk(req.params.id)

            let categories = db.Category.findAll({
                attributes : ["id", "name"],
                order : ["name"]
            })

            Promise.all([categories, product])
                .then(([categories, product]) => {
                    return res.render("products/editProduct", {
                        title : "Editar producto",
                        categories,
                        product
                    })
                })
                .catch(error => console.log(error));

        } else {
            return res.redirect("/")
        }
    },

    update : (req,res) => {
        if(req.session.userLogin && res.locals.userLogin.rolId === 1){
            const errors = validationResult(req)
        
            if(errors.isEmpty()){

                db.Product.update(
                    {
                        ...req.body,
                        name : req.body.name.trim(),
                        description : req.body.description.trim(),
                        price : +req.body.price,
                        discount : +req.body.discount,
                        categoryId : req.body.categoryId
                    },{
                        where : {id : req.params.id}
                    }
                )
                .then( () => res.redirect("/products/detalleProducto/" + req.params.id))
                .catch(error => console.log(error))
            
            } else {

                let product = db.Product.findByPk(req.params.id)

                let categories = db.Category.findAll({
                    attributes : ["id", "name"],
                    order : ["name"]
                })

                Promise.all([categories, product])
                    .then(([categories, product]) => {
                        return res.render("products/editProduct", {
                            title : "Editar producto",
                            errors : errors.mapped(),
                            categories,
                            product
                        })
                    })
                    .catch(error => console.log(error));
            }
        } else {
            return res.redirect("/")
        }
    }
}
