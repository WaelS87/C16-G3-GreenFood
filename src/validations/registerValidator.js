const {check , body} = require('express-validator');
const users = require('../data/usersModule').loadUsers();
const db = require("../database/models");
const user = require('../database/models/user');

module.exports=[
    check('name')
        .notEmpty().withMessage('Debe Entrar Tu Nombre Por Favor....').bail()
        /* .isAlpha().withMessage('Por Favor ingrése Tu Nombre Bien').bail() */
        .isLength({min:3}).withMessage('Por Favor ingrése Tu Nombre Bien'),
        check('username')
        .notEmpty().withMessage('Debe Entrar nombre de usuario Por Favor....').bail()
        /* .isAlpha().withMessage('Por Favor ingrése Tu Nombre Bien').bail() */
        .isLength({min:3}).withMessage('Por Favor ingrése Tu Nombre de usuario mas de 3 caracteres'),

    check('surname')
        .notEmpty().withMessage('Debe Entrar Tu Apellido Por Favor....').bail()
        /* .isAlpha().withMessage('Por Favor ingrése Tu Apellido Bien').bail() */
        .isLength({min:3}).withMessage('El apellido ingresado no es válido'),

  
    body("email")
        .notEmpty()
        .withMessage("*El email es obligatorio")
        .bail()
        .isEmail()
        .withMessage("*Debe ser un email válido"),
    
      body("email").custom((value) => {
        return db.User.findOne({
          where: {
            email: value,
          },
        }).then((user) => {
          if (user) {
            return Promise.reject("Este email ya está registrado");
          }
        });
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