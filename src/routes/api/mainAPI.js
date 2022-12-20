const express = require('express');
const router = express.Router();
const {totals} = require('../../controllers/api/mainAPIController');

//Rutas
router.get('/totals', totals);

module.exports = router;
