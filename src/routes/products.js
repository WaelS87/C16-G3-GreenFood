var express = require('express');
var router = express.Router();

const { detail, carrito } = require("../controllers/productController")

router
    .get("/detail", detail)
    .get("/carrito", carrito)
module.exports = router;