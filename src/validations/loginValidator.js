const { check,body } = require('express-validator');
//const users = require('../data/usersModule').loadUsers(req.body.email.trim());
const bcryptjs = require('bcryptjs');
const db = require('../database/models');

module.exports = [
    check('email').toLowerCase()
        .notEmpty().withMessage('El email es obligatorio').bail()
        .isEmail().withMessage('De ser un email válido'),
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria').bail()
        .custom((value, {req}) => {
            let user = db.User.findOne({
                where : {
                    email : req.body.email.trim()
                }
            })
            .then(({password}) => {
                return bcryptjs.compareSync(value, password)
            })
            .catch(error => console.log(error))

            return !!user
        }).withMessage('o Email o Contraseña no estan correctos')
]