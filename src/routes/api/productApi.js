const express = require('express');
const router = express.Router();
const {list,detail} = require('../../controllers/api/productsApiController');


router.get('/list', list);
router.get('/:id', detail)


module.exports=router

