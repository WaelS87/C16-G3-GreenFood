const {loadProducts, storeProducts} = require("../data/productsModule")
const {validationResult} = require("express-validator")
const db = require('../database/models');
const { Op } = require("sequelize");

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
        const products = loadProducts();
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
                camelSentence
               
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
        //if(req.session.userLogin && res.locals.userLogin.category === "administrador"){
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

        /* } else {
            return res.redirect("/")
        } */
        
    },
    
    store : (req,res) => {
        //if(req.session.userLogin && res.locals.userLogin.category === "administrador"){
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
                return res.render("products/addProduct",{
                    title: "Agregar producto",
                    old : req.body,
                    errors : errors.mapped()
                })
            }
        /* } else {
            return res.redirect("/")
        } */
    },

    selectDelete : (req,res) =>{
        if(req.session.userLogin && res.locals.userLogin.category === "administrador"){
            const products= loadProducts()
            return res.render('products/deleteProducts',{
                products,
                title: "Eliminar productos"
            })
        } else {
            return res.redirect("/")
        }
    },

    deleteProduct:(req,res) => {
        if(req.session.userLogin && res.locals.userLogin.category === "administrador"){
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
        if(req.session.userLogin && res.locals.userLogin.category === "administrador"){
            const products = loadProducts()
            return res.render("products/editProduct-selector", {
                title : "Selección de producto",
                products
            })
        } else {
            return res.redirect("/")
        }
    },
    
    selected : (req,res) => {
        if(req.session.userLogin && res.locals.userLogin.category === "administrador"){
            const productId = +req.body.id
            return res.redirect(productId)
        } else {
            return res.redirect("/")
        }
    },

    editProduct : (req,res) => {
        if(req.session.userLogin && res.locals.userLogin.category === "administrador"){
            const products = loadProducts()
            const product = products.find(product => product.id === +req.params.id)
            return res.render("products/editProduct", {
                title : "Editar producto",
                product
            })
        } else {
            return res.redirect("/")
        }
    },

    update : (req,res) => {
        if(req.session.userLogin && res.locals.userLogin.category === "administrador"){
            const errors = validationResult(req)
        
            if(errors.isEmpty()){
                const products = loadProducts();

                const {title, price,discount, description, category, image} = req.body;

                const productModify = products.map(product => {
                    if(product.id === +req.params.id){
                        return {
                            ...product,
                            title : title.trim(),
                            description : description.trim(),
                            price : +price,
                            discount : +discount,
                            category : category.trim()
                        }
                    }
                    return product
                })

                storeProducts(productModify)

                return res.redirect('/products/detalleProducto/' + req.params.id);
            
            } else {
                return res.render("products/editProduct", {
                    title : "Editar producto",
                    errors : errors.mapped(),
                    product : req.body
                })
            }
        } else {
            return res.redirect("/")
        }
    }
}
