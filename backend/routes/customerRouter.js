const express = require("express");
const routerCustomer = express.Router();
const controllerCustomer = require("../controllers/controllerCustomer");
const checkNulls = require("../middlewares/checkNulls");
const authController = require("../controllers/authController");

routerCustomer.route("/register").post(controllerCustomer.addCustomer);
routerCustomer.route("/login").post(authController.login);
routerCustomer.route("/forgetPassword").post(authController.forgetPassword);
routerCustomer
  .route("/updateMyPassword")
  .patch(authController.protect, authController.updatePassword);
routerCustomer
  .route("/resetPassword/:token")
  .patch(authController.resetPassword);
routerCustomer
  .route("/deleteMyAccount")
  .delete(
    authController.protect,
    authController.restrictTo("Customer"),
    controllerCustomer.deleteMe
  );

routerCustomer.route("/showCustomers").get(
  // authController.protect,
  authController.restrictTo("Admin"),
  controllerCustomer.showCustomers
);

routerCustomer.route("/getNumberOfCustomers").get(
  // authController.protect,
  // authController.restrictTo("customer"),
  controllerCustomer.showCustomers
);
routerCustomer
  .route("/editCustomer")
  .patch(
    checkNulls,
    authController.protect,
    authController.restrictTo("Customer"),
    controllerCustomer.editCustomer
  );
routerCustomer
  .route("/getCustomerByUsername/:username")
  .get(
    authController.protect,
    authController.restrictTo("Customer", "Admin"),
    controllerCustomer.getCustomerByUsername
  );

module.exports = routerCustomer;
