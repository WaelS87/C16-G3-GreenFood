const { check } = require("express-validator");

module.exports = [
    check("title")
    .notEmpty().withMessage("Debes introducir un nombre para el producto").bail()
    .isLength({
        min : 5,
        max : 25
    }).withMessage("El nombre debe tener un largo de entre 5 a 25 letras")
]