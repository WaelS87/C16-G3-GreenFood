const {loadProducts, storeProducts} = require("../data/productsModule")
const {validationResult} = require("express-validator")

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
       
var camelSentence = function camelSentence(str) {
    return  (" " + str).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function(match, chr)
    {
        return chr.toUpperCase();
    });
}

module.exports = {
    index: (req, res) => {
		const products= require('../data/products.json')
		return res.render('products/products',{
		   products,
           toThousand,
           session: req.session.userLogin
		})

	},
    detail : (req,res) => {
        const products = loadProducts()
		const product = products.find(product => product.id === +req.params.id)
        return res.render("products/detalleProducto",{
            title : "Detalle del producto",
			product,
			toThousand,
            session: req.session.userLogin
		})
    },
    carrito : (req,res) => {
        return res.render("products/carrito",{
            title : "Carrito",
            session: req.session.userLogin
        })
    },
    addProduct : (req,res) => {
        const products = loadProducts()
        return res.render("products/addProduct",{
            title : "Agregar producto",
            products,
            session: req.session.userLogin
        })
    },
    store : (req,res) => {
        

        const errors = validationResult(req) 

        if(errors.isEmpty()){

            const {title, price, discount, description, category} = req.body

		    const products = loadProducts()

		    const newProduct = {
		    	id : (products[products.length -1].id + 1),
		    	title : title.trim(),
		    	description : description.trim(),
		    	price : +price,
		    	discount : +discount, 
		    	image : req.file ? req.file.filename:"defaul-image.jpeg",
		    	category
		    }

		    const productsModify = [...products, newProduct]

		    storeProducts(productsModify);

		    return res.redirect("/products")
        } else {
            return res.render("products/addProduct",{
                title: "Agregar producto",
                old : req.body,
                errors : errors.mapped(),
                session: req.session.userLogin
            })
        }

    },
    selectDelete : (req,res) =>{
        const products= loadProducts()
        return res.render('products/deleteProducts',{
            products,
            title: "Eliminar productos",
            session: req.session.userLogin
        })

    },
    deleteProduct:(req,res) => {

        const productId = +req.body.id
        const products= loadProducts()
        const productModify = products.filter(product=>product.id !== productId) 
        storeProducts(productModify)
        return res.redirect('../')
    },
    select : (req,res) => {
        const products = loadProducts()
        return res.render("products/editProduct-selector", {
            title : "Selección de producto",
            products,
            session: req.session.userLogin
        })
    },
    selected : (req,res) => {

        const productId = +req.body.id
        return res.redirect(productId)

    },

    editProduct : (req,res) => {
        const products = loadProducts()
		const product = products.find(product => product.id === +req.params.id)
        return res.render("products/editProduct", {
            title : "Editar producto",
			product,
            session: req.session.userLogin
		})
    },
    update : (req,res) => {

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
                product : req.body,
                session: req.session.userLogin
            })
        }

        
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
            toThousand,
            session: req.session.userLogin
        })

    },
    search : (req,res) => {
        const products = loadProducts()
		const result = products.filter(product => product.title.toLowerCase().includes(req.query.keywords.toLowerCase()))

		return res.render("products/searchProducts",{
            title : "Busqueda",
			products : result,
			keywords : req.query.keywords,
			toThousand,
            camelSentence,
            session: req.session.userLogin
		})
    }
}
