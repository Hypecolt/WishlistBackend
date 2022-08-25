const express = require('express')
const bodyParser = require('body-parser')
const wishlistController = require('../controllers/wishlistController.js')
const authMiddleware = require('../middleware/authMiddleware.js')

const urlencodedParser = bodyParser.urlencoded({ extended: false })

const router = express.Router();

router.get("/", authMiddleware, wishlistController.getWishlists);
router.post("/", authMiddleware, urlencodedParser, wishlistController.createWishlist);


module.exports = router;