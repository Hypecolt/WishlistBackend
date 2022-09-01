const express = require('express')
const bodyParser = require('body-parser')
const usersController = require('../controllers/userController.js')
const authMiddleware = require('../middleware/authMiddleware.js');

const urlencodedParser = bodyParser.json({ extended: false })

const router = express.Router();

router.get("/all", usersController.getUsers);
router.get("/", authMiddleware, urlencodedParser, usersController.getUser);
router.put("/", authMiddleware, urlencodedParser, usersController.updateUser);
router.delete("/", authMiddleware, usersController.deleteUser);

router.get("/login", urlencodedParser, usersController.login);
router.post("/register", urlencodedParser, usersController.register);

module.exports = router;