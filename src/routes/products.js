var express = require('express');
const productController = require('../controllers/productController');
var router = express.Router();



const { detail, carrito, addProduct, deleteProduct, editProduct,index, store, select, selected, update,products, selectDelete } = require("../controllers/productController")

router
    .get('/products',index)
    /* Mostrar detalle del producto*/
    .get("/detalleProducto/:id", detail)
    /* Mostrar el carrito */
    .get("/carrito", carrito)
    /* Agregar un producto */
    .get("/addProduct", addProduct)
    .post("/storeProduct", store)
    /* Eliminar un producto */
    .get("/selectDelete",selectDelete)
    .delete('/deleteProduct',deleteProduct)
    /* Editar un producto */
    .get("/selectEditProduct", select)
    .post("/editProduct", selected)
    .get("/editProduct/:id", editProduct)
    .put("/update/:id", update)


module.exports = router;