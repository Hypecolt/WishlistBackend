const express = require('express')
const bodyParser = require('body-parser')
const itemsController = require('../controllers/itemsController.js')
const authMiddleware = require('../middleware/authMiddleware.js');

const urlencodedParser = bodyParser.json({ extended: false })

const router = express.Router();

router.get("/all", authMiddleware, urlencodedParser, itemsController.getItems);
router.get("/:id(\\d+)", authMiddleware, urlencodedParser, itemsController.getItem);
router.post("/", authMiddleware, urlencodedParser, itemsController.addItem);
router.put("/:id(\\d+)", authMiddleware, urlencodedParser, itemsController.updateItem);
router.delete("/:id(\\d+)", authMiddleware, urlencodedParser, itemsController.deleteItem);

module.exports = router;