const express = require('express')
const bodyParser = require('body-parser')
const wishlistToGroupController = require('../controllers/wishlistToGroupController.js');
const authMiddleware = require('../middleware/authMiddleware.js')

const urlencodedParser = bodyParser.json({ extended: false })

const router = express.Router({mergeParams:true});

router.get("/", authMiddleware, wishlistToGroupController.getGroupWishlists);
router.post("/", authMiddleware, urlencodedParser, wishlistToGroupController.addWishlistToGroup);
router.delete("/:wishlistid(\\d+)", authMiddleware, urlencodedParser, wishlistToGroupController.removeWishlistFromGroup);

// POST groups/{groupId}/wishlist
// DELETE groups/{groupId}/wishlist/{wishlistId}

module.exports = router;