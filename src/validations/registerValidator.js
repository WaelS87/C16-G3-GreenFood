const {check , body} = require('express-validator');
const users = require('../data/usersModule').loadUsers();
const db = require("../database/models");
const user = require('../database/models/user');

module.exports=[
    check('name')
        .notEmpty().withMessage('Debe Entrar Tu Nombre Por Favor....').bail()
        /* .isAlpha().withMessage('Por Favor ingrése Tu Nombre Bien').bail() */
        .isLength({min:3}).withMessage('Por Favor ingrése Tu Nombre Bien'),

    check('surname')
        .notEmpty().withMessage('Debe Entrar Tu Apellido Por Favor....').bail()
        /* .isAlpha().withMessage('Por Favor ingrése Tu Apellido Bien').bail() */
        .isLength({min:3}).withMessage('Por Favor ingrése Tu Apellido Bien'),

    body('email').toLowerCase()
        .notEmpty().withMessage('Debe Entrar Tu mail').bail()
        .isEmail().withMessage('Email no es Valido').bail()
        .custom((value,{req})=> {
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

      
    
  
    check('password')
        .notEmpty().withMessage('por favor Entre Tu Contraseña').bail()
        .isLength({min:6}).withMessage('la contraseña minmo de 6 caracteres').bail(),

    body('password2')
        .notEmpty().withMessage('por favor confirmar Tu Contraseña').bail()
        .custom((value,{req}) => {
            if(value !== req.body.password ){
                return false
            }else{
                return true
            }
        }).withMessage('Las contraseñas no son igual'),

    check('terminos')  
        .isString('on').withMessage('Debes Acceptar las Terminos y Condiciones')        

        
        
    
]