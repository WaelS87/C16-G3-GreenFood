var express = require('express');
var router = express.Router();

const { login, register, profile, condiciones,registerNuevo } = require("../controllers/userController")
const { registerValidator, loginValidator} = require('../validations')
const userSessionCheck = require('../middleware/userSessionCheck');
/* GET users listing. */
router
  .get('/login', login)
  .post('/login', loginValidator, processLogin)
  .get('/register', register)
  .get("/profile/:Id", profile)
  .post('/register',registerValidator,registerNuevo)
  .get('/condiciones',condiciones)
  

module.exports = router;
