module.exports = {
    detail : (req,res) => {
        return res.render("detalleProducto")
    },
    carrito : (req,res) => {
        return res.render("carrito")
    }
}