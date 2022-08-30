var express = require('express');
var router = express.Router();

const { login, register, profile, adminProfile } = require("../controllers/userController")

/* GET users listing. */
router
  .get('/login', login)
  .get('/register', register)
  .get("/:Category", profile)
  

module.exports = router;
