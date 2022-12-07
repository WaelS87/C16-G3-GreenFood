const express = require('express');
const router = express.Router();
const {total} = require('../../controllers/api/apiMainController');

//Rutas
//Listado de todos los usuarios
router.get('/total', total);

module.exports=router
//Detalle del usuario
