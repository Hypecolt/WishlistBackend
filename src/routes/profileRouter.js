const express = require('express')
const bodyParser = require('body-parser')
const profileController = require('../controllers/profileController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

const urlencodedParser = bodyParser.json({ extended: false })

const router = express.Router();

router.get("/", authMiddleware, profileController.getProfile);
router.post("/", authMiddleware, urlencodedParser, profileController.createProfile);
router.put("/", authMiddleware, urlencodedParser, profileController.updateProfile);

module.exports = router;