const express = require("express");
const routerCustomer = express.Router();
const controllerCustomer = require("../controllers/controllerCustomer");
const checkNulls = require("../middlewares/checkNulls");
const authController = require("../controllers/authController");

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
  .route("/getCustomerByUsername/:username")
  .get(
    authController.protect,
    authController.restrictTo("Admin"),
    controllerCustomer.getCustomerByUsername
  );

module.exports = routerCustomer;
