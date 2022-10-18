const {check , body} = require('express-validator');
const users = require('../data/usersModule').loadUsers();
const db = require("../database/models");
//const user = require('../database/models/user');

let userFromEmail = (where) => {
    db.User.findOne({
        where : {
            email : where
        }
    })
    .then(user => {
        return user === null
    })
    .catch(error => console.log(error))
}


module.exports=[
    check('name')
        .notEmpty().withMessage('Debe ingresar su nombre').bail()
        /* .isAlpha().withMessage('Por Favor ingrése Tu Nombre Bien').bail() */
        .isLength({min:3}).withMessage('El nombre ingresado no es válido'),

    check('surname')
        .notEmpty().withMessage('Debe ingresar su apellido').bail()
        /* .isAlpha().withMessage('Por Favor ingrése Tu Apellido Bien').bail() */
        .isLength({min:3}).withMessage('El apellido ingresado no es válido'),

    body('email').toLowerCase()
        .notEmpty().withMessage('Debe ingresar una dirección email').bail()
        .isEmail().withMessage('El email ingresado no es válido').bail()
        .custom((value,{req})=> {

            return db.User.findOne({
                where :{
                    email : value.trim()
                }
            }).then(user => {
                if(user){
                    return Promise.reject()
                }
            }).catch( () => Promise.reject('El email ya se encuentra registrado a un usuario'))

        }),
  
    check('password')
        .notEmpty().withMessage('Ingrese una contraseña').bail()
        .isLength({min:6}).withMessage('La contraseña debe tener un mínimo de 6 carácteres').bail(),

    body('password2')
        .notEmpty().withMessage('Por favor, confirma tu contraseña').bail()
        .custom((value,{req}) => {
            if(value !== req.body.password ){
                return false
            }else{
                return true
            }
        }).withMessage('Las contraseñas no son igual'),

    check('terminos')  
        .isString('on').withMessage('Debes aceptar los "Términos y Condiciones"')        

        
        
    
]