const { check } = require("express-validator");

module.exports = [
    check("nombre")
        .notEmpty().withMessage("Debes introducir un nombre").bail()
        .isLength({
        min : 2,
        max : 25
    }).withMessage("El nombre debe tener un largo de entre 2 a 25 letras."),
    check("apellido")
    .notEmpty().withMessage("Debes introducir un apellido").bail()
    .isLength({
    min : 2,
    max : 25
}).withMessage("El apellido debe tener un largo de entre 2 a 25 letras."),
    check("nombre_usuario")
    .notEmpty().withMessage("Debes introducir un apellido").bail()
    .isLength({
    min : 2,
    max : 25
}).withMessage("El apellido debe tener un largo de entre 2 a 25 letras."),
check("password")
        .notEmpty().withMessage("Debes introducir una contraseña").bail()
        .isLength({
        min : 8,
        max : 25
    }).withMessage("El nombre debe tener un largo de entre 8 a 25 caracteres."),
    ]