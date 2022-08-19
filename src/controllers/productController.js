

module.exports = {
    index: (req, res) => {
		const Products= require('../data/products.json')
		return res.render('products',{
		   Products
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
    deleteProduct : (req,res) => {
        return res.render("products/deleteProduct")
    },
    editProduct : (req,res) => {
        return res.render("products/editProduct")
    }
}