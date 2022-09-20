const express = require('express')
const bodyParser = require('body-parser')
const notificationsController = require('../controllers/notificationsController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

const urlencodedParser = bodyParser.json({ extended: false })

const router = express.Router();

router.get("/", authMiddleware, notificationsController.getNotification);

module.exports = router;