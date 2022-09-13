const express = require('express')
const bodyParser = require('body-parser')
const invitationsController = require('../controllers/invitationsController.js')
const authMiddleware = require('../middleware/authMiddleware.js')

const urlencodedParser = bodyParser.json({ extended: false })

const router = express.Router({mergeParams:true});

router.get("/", authMiddleware, invitationsController.sendMail);
router.post("/", authMiddleware, invitationsController.createInvite);

// POST groups/{groupId}/wishlist
// DELETE groups/{groupId}/wishlist/{wishlistId}

module.exports = router;