const express = require('express');
const { requireSignin, adminMiddleware } = require('../common-middleware');
const { createCategory, getAllCategory, getCategory, updateCategory, deleteCategory } = require('../controllers/catController');
 
const router = express.Router();
 
router.post('/addCat', requireSignin,adminMiddleware,createCategory);
router.get("/getAllCategory", getAllCategory);
router.get('/getCategory/:id',getCategory);
router.put("/putCategory/:id",requireSignin, adminMiddleware, updateCategory); 
router.delete("/deleteCategory/:id", requireSignin, adminMiddleware,deleteCategory); 

module.exports = router;