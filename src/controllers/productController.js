


const {loadProducts, storeProducts} = require("../data/productsModule")

const toThousand = n => n.toString().replace((/\B(?=(\d{3})+(?!\d))/g, "."));


module.exports = {
    index: (req, res) => {
		const Products= require('../data/products.json')
		return res.render('products',{
		   Products,
           toThousand
		})

	},
    detail : (req,res) => {
        return res.render("products/detalleProducto")
    },
    carrito : (req,res) => {
        return res.render("products/carrito")
    },
    addProduct : (req,res) => {
        return res.render("products/addProduct")
    },
    store : (req,res) => {
        const {title, price, discount, description, category} = req.body

		const products = loadProducts()

		const newProduct = {
			id : (products[products.length -1].id + 1),
			title : title.trim(),
			description : description.trim(),
			price : +price,
			discount : +discount, 
			image : "defaul-image.png",
			category
		}

		const productsModify = [...products, newProduct]

		storeProducts(productsModify);

		return res.redirect("/")
    },
    deleteProduct : (req,res) => {
        return res.render("products/deleteProduct")
    },
    editProduct : (req,res) => {
        return res.render("products/editProduct")
    }
}