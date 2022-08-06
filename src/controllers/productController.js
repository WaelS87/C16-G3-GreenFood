module.exports = {
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