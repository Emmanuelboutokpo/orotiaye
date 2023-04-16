const express = require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const { createInfo, getAllInfo, getInfo } = require('../controllers/infosController');
 
const router = express.Router();
 
router.post('/addInfo', createInfo);
router.get("/getAllInfo",getAllInfo);
router.get('/getInfo/:id',getInfo);

module.exports = router;