var express = require('express');
var router = express.Router();

const { detail, carrito, addProduct, deleteProduct, editProduct, store } = require("../controllers/productController")

router
    /* Mostrar detalle del producto*/
    .get("/detail", detail)
    /* Mostrar el carrito */
    .get("/carrito", carrito)
    /* Agregar un producto */
    .get("/addProduct", addProduct)
    .post("/storeProduct", store)
    /* Eliminar un producto */
    .get("/deleteProduct", deleteProduct)
    /* Editar un producto */
    .get("/editProduct", editProduct)
    .put("/updateProduct", /* update */)
module.exports = router;