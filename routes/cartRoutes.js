const express = require('express');
const router = express.Router();
const { imageCart,getImage,getLiked,likedImage } = require('../controllers/imageCart'); 


router.post('/postImage', imageCart);
router.get("/getImage",getImage)
router.post('/likedImage',getLiked)
router.get("/getLiked",likedImage)

module.exports = router;
