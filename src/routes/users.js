var express = require('express');
var router = express.Router();

const { login, register, profile, condiciones,registerNuevo, processLogin, logout, update } = require("../controllers/userController")
const { registerValidator, loginValidator, editUserValidator} = require('../validations')
const userSessionCheck = require('../middleware/userSessionCheck');
/* GET users listing. */
router
  .get('/login', login)
  .post('/login',loginValidator,processLogin)
  .get('/register', register)
  .get("/profile/:id", userSessionCheck, profile)
  .post('/register', registerValidator,registerNuevo)
  .get('/condiciones', condiciones)
  .get("/logout", logout)

  //Editar usuario//
  .put("/profile/:id", editUserValidator, update)

module.exports = router;
