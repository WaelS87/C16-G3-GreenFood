var express = require('express');
var router = express.Router();

const { login, register, profile } = require("../controllers/userController")

/* GET users listing. "/users"  */
router
  .get('/login', login)
  .get('/register', register)
  .get("/profile/:Id", profile)
  

module.exports = router;
