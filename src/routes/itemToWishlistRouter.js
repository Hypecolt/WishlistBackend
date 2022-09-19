const express = require('express')
const bodyParser = require('body-parser')
const itemToWishlistController = require('../controllers/itemToWishlistController.js');
const authMiddleware = require('../middleware/authMiddleware.js')

const urlencodedParser = bodyParser.json({ extended: false })

const router = express.Router({mergeParams:true});

// POST wishlist/{wishlistId}/items
// DELETE wishlist/{wishlistId}/items/{itemId}

router.get("/", authMiddleware, urlencodedParser, itemToWishlistController.getItemsInWishlist);
router.get("/:itemid(\\d+)", authMiddleware, urlencodedParser);
router.post("/", authMiddleware, urlencodedParser, itemToWishlistController.addItemToWishlist);
router.put("/:itemid(\\d+)", authMiddleware, urlencodedParser, itemToWishlistController.updateItemFromWishlist);
router.delete("/:itemid(\\d+)", authMiddleware, urlencodedParser, itemToWishlistController.deleteItemFromWishlist);

module.exports = router;