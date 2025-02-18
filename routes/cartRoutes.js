const express = require('express');
const router = express.Router();
const { imageCart,getImage } = require('../controllers/imageCart'); 

router.post('/postImage', imageCart);
router.get("/getImage",getImage)

module.exports = router;
