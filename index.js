const dotenv = require('dotenv')
const express = require('express')
const errorsMiddleware = require('./src/middleware/errorsMiddleware.js')
const usersRouter = require('./src/routes/userRoutes.js')
const profileRouter = require('./src/routes/profileRouter.js')
const groupRouter = require('./src/routes/groupRouter.js')
const wishlistRouter = require('./src/routes/wishlistRouter.js')

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

app.use("/users", usersRouter);
app.use("/profile", profileRouter);
app.use("/groups", groupRouter);
app.use("/wishlists", wishlistRouter);

app.use(errorsMiddleware);

app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
