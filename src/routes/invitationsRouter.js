const express = require('express')
const bodyParser = require('body-parser')
const invitationsController = require('../controllers/invitationsController.js')
const authMiddleware = require('../middleware/authMiddleware.js')

const urlencodedParser = bodyParser.json({ extended: false })

const router = express.Router({mergeParams:true});

router.get("/invite", authMiddleware, urlencodedParser, invitationsController.sendInvite);
router.post("/invite", authMiddleware, invitationsController.createInvite);
router.delete("/invite", authMiddleware, invitationsController.deleteInvite);

router.get("/join/:invitationcode", authMiddleware, invitationsController.acceptInvite);

module.exports = router;