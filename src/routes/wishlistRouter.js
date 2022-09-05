const express = require('express')
const bodyParser = require('body-parser')
const wishlistController = require('../controllers/wishlistController.js')
const itemToWishlistController = require('../controllers/itemToWishlistController.js');
const authMiddleware = require('../middleware/authMiddleware.js')

const urlencodedParser = bodyParser.json({ extended: false })

const router = express.Router();

router.get("/", authMiddleware, wishlistController.getWishlists);
router.post("/", authMiddleware, urlencodedParser, wishlistController.createWishlist);
router.put("/", authMiddleware, urlencodedParser, wishlistController.updateWishlist);
router.delete("/", authMiddleware, urlencodedParser, wishlistController.deleteWishlist);


router.get("/manage", authMiddleware, urlencodedParser);
router.get("/manage/all", authMiddleware, urlencodedParser, itemToWishlistController.getItemsInWishlist);
router.post("/manage", authMiddleware, urlencodedParser, itemToWishlistController.addItemToWishlist);
router.put("/manage", authMiddleware, urlencodedParser, itemToWishlistController.updateItemFromWishlist);
router.delete("/manage", authMiddleware, urlencodedParser, itemToWishlistController.deleteItemFromWishlist);

module.exports = router;