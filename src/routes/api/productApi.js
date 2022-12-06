const express = require('express');
const router = express.Router();
const {list,detail,total} = require('../../controllers/api/productsApiController');


router.get('/list', list);
router.get('/:id', detail)
router.get('/total',total)

module.exports=router

