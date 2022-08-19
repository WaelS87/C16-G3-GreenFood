var express = require('express');
const productController = require('../controllers/productController');
var router = express.Router();

const { detail, carrito, addProduct, deleteProduct, editProduct,products } = require("../controllers/productController")

router
    .get('/products',productController.index)
    .get("/detail", detail)
    .get("/carrito", carrito)
    .get("/addProduct", addProduct)
    .get("/deleteProduct", deleteProduct)
    .get("/editProduct", editProduct)
module.exports = router;