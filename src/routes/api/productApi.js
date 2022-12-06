const express = require('express');
const router = express.Router();
const {all,detail} = require('../../controllers/api/productsApiController');


router.get('/all', all);
router.get('/:id', detail)

module.exports=router

