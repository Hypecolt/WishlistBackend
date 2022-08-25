const express = require('express')
const bodyParser = require('body-parser')
const groupController = require('../controllers/groupController.js')
const authMiddleware = require('../middleware/authMiddleware.js');

const urlencodedParser = bodyParser.urlencoded({ extended: false })

const router = express.Router();

router.post("/", authMiddleware, urlencodedParser, groupController.createGroup);
//router.get("/", authMiddleware, profileController.getProfile);
//router.put("/", profileController.updateProfile);
//router.delete("/", profileController.deleteProfile);

module.exports = router;