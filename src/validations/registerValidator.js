const {check , body} = require('express-validator');
const users = require('../data/usersModule').loadUsers();
const db = require("../database/models");
<<<<<<< HEAD
const user = require('../database/models/user');

module.exports=[
    check('name')
        .notEmpty().withMessage('Debe Entrar Tu Nombre Por Favor....').bail()
        /* .isAlpha().withMessage('Por Favor ingrése Tu Nombre Bien').bail() */
        .isLength({min:3}).withMessage('Por Favor ingrése Tu Nombre Bien'),

    check('surname')
        .notEmpty().withMessage('Debe Entrar Tu Apellido Por Favor....').bail()
=======
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
>>>>>>> 13dcdb0bb47aea140bbeb796445336310baf5f21
        /* .isAlpha().withMessage('Por Favor ingrése Tu Apellido Bien').bail() */
        .isLength({min:3}).withMessage('El apellido ingresado no es válido'),

    body('email').toLowerCase()
        .notEmpty().withMessage('Debe ingresar una dirección email').bail()
        .isEmail().withMessage('El email ingresado no es válido').bail()
        .custom((value,{req})=> {
<<<<<<< HEAD
            let user = db.User.findOne({
                where : {
                    email : value
                }
            })
            .then(user=>{
                if(user == null){
                    return false
                }else{
                    return true
                }
                
                
            
            })
            .catch(error=>console.log(error))
           
            return !!user
            
        }).withMessage('el mail ya esta registrado'),

      
    
=======

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
>>>>>>> 13dcdb0bb47aea140bbeb796445336310baf5f21
  
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