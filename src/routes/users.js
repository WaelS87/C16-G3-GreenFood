var express = require('express');
var router = express.Router();
const { login, register, profile, adminProfile,condiciones,registerNuevo,processLogin} = require("../controllers/userController")
const registerValidator = require('../validations/registerValidator')
const loginValidator = require('../validations/loginValidator')
const userSessionCheck = require('../middleware/userSessionCheck');
/* GET users listing. */
router
  .get('/login', login)
  .post('/login',loginValidator,processLogin)
  .get('/register', register)
  .get("/profile/:Id", userSessionCheck, profile)
  .post('/register', registerValidator,registerNuevo)
  .get('/condiciones', condiciones)
  .get("/logout", logout)

module.exports = router;
