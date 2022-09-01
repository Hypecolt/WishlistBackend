const express = require('express')
const bodyParser = require('body-parser')
const wishlistController = require('../controllers/wishlistController.js')
const authMiddleware = require('../middleware/authMiddleware.js')

const urlencodedParser = bodyParser.json({ extended: false })

const router = express.Router();

router.get("/", authMiddleware, wishlistController.getWishlists);
router.post("/", authMiddleware, urlencodedParser, wishlistController.createWishlist);
router.put("/", authMiddleware, urlencodedParser, wishlistController.updateWishlist);
router.delete("/", authMiddleware, urlencodedParser, wishlistController.deleteWishlist);


module.exports = router;