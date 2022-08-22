var express = require('express');
const productController = require('../controllers/productController');
var router = express.Router();


    

const { detail, carrito, addProduct, deleteProduct, editProduct, store,products } = require("../controllers/productController")

router


    .get('/products',productController.index)
      
    .get("/detail", detail)
    /* Mostrar el carrito */
    .get("/carrito", carrito)
    /* Agregar un producto */
    .get("/addProduct", addProduct)
    .post("/storeProduct", store)
    /* Eliminar un producto */
    
    .delete('/deleteProduct/:id',deleteProduct)
    .get("/editProduct", editProduct)
    .put("/updateProduct", /* update */)
module.exports = router;