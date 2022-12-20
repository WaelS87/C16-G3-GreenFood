const express = require('express');
const router = express.Router();
const userAPIController = require('../../controllers/api/userAPIController');

//Rutas
//Listado de todos los usuarios
router.get('/', userAPIController.list);
//Detalle del usuario
router.get('/:id', userAPIController.detail);
