const express = require('express');
const router = express.Router();
const { requireSignin} = require('../common-middleware');
const { createComment, getAllComment, getComment, updateComment, deleteComment } = require('../controllers/commentControlleur');

router.post("/comment/create",createComment);
router.get("/comment/getAllComment", getAllComment); 
router.get("/comment/getComment/:id", getComment);
router.put("/comment/putComment/:id", updateComment); 
router.delete("/comment/deleteComment/:id", deleteComment); 

module.exports = router;           