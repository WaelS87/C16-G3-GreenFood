var express = require('express');
var router = express.Router();

const { login, register, profile, adminProfile,condiciones,registerNuevo } = require("../controllers/userController")
const registerValidator = require('../validation/registerValidator')
const userSessionCheck = require('../middleware/userSessionCheck');
/* GET users listing. */
router
  .get('/login', login)
  //.get('/login',processLogin)
  .get('/register', register)
  .post('/register',registerValidator,registerNuevo)
  .get("/profile", userSessionCheck ,profile)
  .get("/adminProfile", adminProfile)
/*   .get('/logout', logout)
 */
  .get('/condiciones',condiciones)
  

module.exports = router;
