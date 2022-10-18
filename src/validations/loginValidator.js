const { check,body } = require('express-validator');
//const users = require('../data/usersModule').loadUsers(req.body.email.trim());
const bcryptjs = require('bcryptjs');
const db = require('../database/models');

module.exports = [
    check('email').toLowerCase()
        .notEmpty().withMessage('El email es obligatorio').bail()
        .isEmail().withMessage('Debe ingresar un email válido'),
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria').bail()
        .custom((value, {req}) => {
            return db.User.findOne({
                where :{
                    email : req.body.email.trim()
                }
            }).then(user => {
                if(!user || !bcryptjs.compareSync(value,user.password)){
                    return Promise.reject()
                }
            }).catch( () => Promise.reject('Email y/o contraseña inválidos'))
    
        })
]