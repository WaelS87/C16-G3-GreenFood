var express = require('express');
var router = express.Router();

const { detail, carrito, addProduct, deleteProduct, editProduct,index, store, select, selected, update, selectDelete, categorieStore, search } = require("../controllers/productController")

router
    /* Página principal de productos */
    .get('/',index)
    /* Busqueda de productos */
    .get("/search", search)
    /* Carrito de compra*/
    .get("/carrito", carrito)
    /* Agregar un producto */
    .get("/addProduct", addProduct)
    .post("/storeProduct", store)
    /* Eliminar un producto */
    .get("/selectDelete", selectDelete)
    .delete('/deleteProduct', deleteProduct)
    /* Editar un producto */
    .get("/selectEditProduct", select)
    .post("/editProduct", selected)
    .get("/editProduct/:id", editProduct)
    .put("/update/:id", update)
    /* Mostrar productos por categoría (navbar) */
    .get("/categories/:category", categorieStore)
    /* Mostrar detalle del producto*/
    .get("/detalleProducto/:id", detail)
module.exports = router;