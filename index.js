const dotenv = require('dotenv')
const express = require('express')
const errorsMiddleware = require('./src/middleware/errorsMiddleware.js')
const authMiddlewater = require('./src/middleware/authMiddleware.js')
const usersRouter = require('./src/routes/userRoutes.js')
const profileRouter = require('./src/routes/profileRouter.js')
const groupRouter = require('./src/routes/groupRouter.js')
const wishlistRouter = require('./src/routes/wishlistRouter.js')
const itemsRouter = require('./src/routes/itemsRouter.js')
const itemToWishlistRouter = require('./src/routes/itemToWishlistRouter.js')
const wishlistToGroupRouter = require('./src/routes/wishlistToGroupRouter.js')
const invitationsRouter = require('./src/routes/invitationsRouter.js')
const usersServices = require('./src/controllers/userController.js')
const notificationsRouter = require('./src/routes/notificationsRouter.js')
const watcher = require('./src/controllers/notificationsController.js')
const cors = require('cors');
const bodyParser = require('body-parser')

const urlencodedParser = bodyParser.json({ extended: false })

dotenv.config();

watcher.watcher();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors())

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/users", usersRouter);
app.use("/profile", profileRouter);
app.use("/groups", groupRouter);
app.use("/wishlists", wishlistRouter);
app.use("/items", itemsRouter);
app.use("/wishlists/:wishlistid(\\d+)/items", itemToWishlistRouter);
app.use("/groups/:groupid(\\d+)/wishlist", wishlistToGroupRouter);
app.use("/groups/:groupid(\\d+)", invitationsRouter);
app.use("/login", urlencodedParser, usersServices.login);
app.use("/register", urlencodedParser, usersServices.register);
app.use("/profile", profileRouter);
app.use("/notifications", notificationsRouter);

app.use(errorsMiddleware);

app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
