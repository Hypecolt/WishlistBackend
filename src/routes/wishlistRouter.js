const express = require('express')
const bodyParser = require('body-parser')
const wishlistController = require('../controllers/wishlistController.js')
const itemToWishlistController = require('../controllers/itemToWishlistController.js');
const authMiddleware = require('../middleware/authMiddleware.js')

const urlencodedParser = bodyParser.json({ extended: false })

const router = express.Router();

router.get("/", authMiddleware, wishlistController.getWishlists);
router.post("/", authMiddleware, urlencodedParser, wishlistController.createWishlist);
router.put("/:wishlistid(\\d+)", authMiddleware, urlencodedParser, wishlistController.updateWishlist);
router.delete("/:wishlistid(\\d+)", authMiddleware, urlencodedParser, wishlistController.deleteWishlist);

// POST groups/{groupId}/wishlist
// DELETE groups/{groupId}/wishlist/{wishlistId}

module.exports = router;