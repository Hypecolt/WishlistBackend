const express = require('express')
const bodyParser = require('body-parser')
const profileController = require('../controllers/profileController.js');
const authMiddleware = require('../middleware/authMiddleware.js');

const urlencodedParser = bodyParser.urlencoded({ extended: false })

const router = express.Router();

router.get("/", authMiddleware, profileController.getProfile);
//router.put("/", profileController.updateProfile);
//router.delete("/", profileController.deleteProfile);

module.exports = router;