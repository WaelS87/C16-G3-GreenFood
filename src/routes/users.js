var express = require('express');
var router = express.Router();

const { login, register, profile, condiciones,registerNuevo, processLogin, logout } = require("../controllers/userController")
const { registerValidator, loginValidator} = require('../validations')
const userSessionCheck = require('../middleware/userSessionCheck');
const { uploadImageUser } = require('../middleware/upLoadImageUser');
/* GET users listing. */
router
  .get('/login', login)
  .post('/login', loginValidator, processLogin)
  .get('/register', register)
  .get("/profile/:Id", userSessionCheck, profile)
  .post('/register',uploadImageUser.single('image'), registerValidator,registerNuevo)
  .get('/condiciones', condiciones)
  .get("/logout", logout)

module.exports = router;
