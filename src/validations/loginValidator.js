const { check,body } = require('express-validator');
const users = require('../data/usersModule').loadUsers();
const bcrypt = require('bcrypt');

module.exports = [
    check('email').toLowerCase()
        .notEmpty().withMessage('Debe Entrar Tu mail').bail()
        .isEmail().withMessage('Email no es Valido'),
    
        body('password')
        .notEmpty().withMessage('Debe escribir tu contraseña').bail()
        .custom((value,{req}) => {
            let user = users.find(user => user.Email === req.body.email.trim() && bcrypt.compareSync(value , user.password))
            return !!user
        }).withMessage('o Email o Contraseña no estan correctos')
]