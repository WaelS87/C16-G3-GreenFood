const { check } = require("express-validator");

module.exports = [
    check("name")
        .notEmpty().withMessage("Debes introducir un nombre para el producto.").bail()
        .isLength({
        min : 5,
        max : 25
    }).withMessage("El nombre debe tener un largo de entre 5 a 25 letras."),
    check("categoryId")
        .notEmpty().withMessage("La categoría no puede estar vacía."),
    check("price")
        .notEmpty().withMessage("Debe determinar un precio.").bail()
        .isInt({
            min : 1
        }).withMessage("No puedes introducir un precio menor a 1."),
    check("discount")
        .isInt().withMessage("No puedes introducir números negativos."),
    check("description")
        .notEmpty().withMessage("Debes dar una descripción al producto.").bail()
        .isLength({
            min : 10,
            max : 225
        }).withMessage("La descripción debe tener un largo de entre 10 a 225 letras.")
]