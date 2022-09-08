const express = require('express')
const bodyParser = require('body-parser')
const groupController = require('../controllers/groupController.js')
const authMiddleware = require('../middleware/authMiddleware.js');

const urlencodedParser = bodyParser.json({ extended: false })

const router = express.Router();

router.post("/", authMiddleware, urlencodedParser, groupController.createGroup);
router.get("/", authMiddleware, groupController.getGroups);
router.get("/:id(\\d+)", authMiddleware, groupController.getGroup);
router.put("/:id(\\d+)", authMiddleware, urlencodedParser, groupController.updateGroup);
router.delete("/:id(\\d+)", authMiddleware, urlencodedParser, groupController.deleteGroup);

module.exports = router;