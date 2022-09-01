var express = require('express');
var router = express.Router();

const { login, register, profile, adminProfile,condiciones,registerNuevo } = require("../controllers/userController")
const registerValidator = require('../validation/registerValidator')
/* GET users listing. */
router
  .get('/login', login)
  .get('/register', register)
  .post('/register',registerValidator,registerNuevo)
  .get("/profile", profile)
  .get("/adminProfile", adminProfile)
  .get('/condiciones',condiciones)
  

module.exports = router;
