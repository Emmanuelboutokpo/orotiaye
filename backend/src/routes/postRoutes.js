const express = require('express');
const router = express.Router();
const multer = require("multer");
const shortId =require("shortid");
const path =require("path");
const { requireSignin, adminMiddleware } = require('../common-middleware');
const { getAllPost, createPost, getPost, updatePost, deletePost } = require('../controllers/postController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), "uploads"))
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, shortId.generate() + '-' + file.originalname)
    }
})
const upload = multer({storage});

router.post("/post/create", requireSignin, adminMiddleware,upload.single("imgPost"),createPost);
router.get("/post/getAllPost", getAllPost); 
router.get("/post/getPost/:id", getPost);
router.put("/post/putPost/:id",requireSignin, adminMiddleware,upload.single("imgPost"), updatePost); 
router.delete("/post/deletePost/:id", requireSignin, adminMiddleware,deletePost); 

module.exports = router;           