const { check,body } = require('express-validator');
const users = require('../data/usersModule').loadUsers();
const bcrypt = require('bcrypt');

module.exports = [
    check('email').toLowerCase()
        .notEmpty().withMessage('El email es obligatorio').bail()
        .isEmail().withMessage('De ser un email válido'),
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria').bail()
        .custom((value, {req}) => {
            let user = users.find(user => user.email === req.body.email.trim() && bcryptjs.compareSync(value,user.contraseña));
            return !!user
        }).withMessage('o Email o Contraseña no estan correctos')
]