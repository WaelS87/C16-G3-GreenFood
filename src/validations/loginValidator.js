const {check, body} = require('express-validator');
const users = require('../data/usersModule').loadUsers();
const bcryptjs = require('bcryptjs');

module.exports = [
    check('email')
        .notEmpty().withMessage('El email es obligatorio').bail()
        .isEmail().withMessage('De ser un email válido'),
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria').bail()
        .custom((value, {req}) => {
            let user = users.find(user => user.Email === req.body.email.trim() && bcryptjs.compareSync(value,user.Constraseña));
            return !!user
        }).withMessage('La contraseña y/o el email son incorrectos'),
  
]