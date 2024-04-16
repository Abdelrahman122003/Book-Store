const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");

authRouter.route("/register").post(authController.register);
authRouter.route("/login").post(authController.login);
authRouter
  .route("/updateMyPassword")
  .patch(authController.protect, authController.updatePassword);

module.exports = authRouter;
