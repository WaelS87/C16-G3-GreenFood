var express = require('express');
var router = express.Router();

const { detail, carrito, addProduct, deleteProduct, editProduct } = require("../controllers/productController")

router
    .get("/detail", detail)
    .get("/carrito", carrito)
    .get("/addProduct", addProduct)
    .get("/deleteProduct", deleteProduct)
    .get("/editProduct", editProduct)
module.exports = router;