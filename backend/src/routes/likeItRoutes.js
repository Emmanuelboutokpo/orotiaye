const express = require('express');
const { requireSignin} = require('../common-middleware');
const { getLikes, postLikes } = require('../controllers/likeItController');
const router = express.Router();

 
router.get('/like',getLikes);
router.post('/like',postLikes);

module.exports = router;