const express = require("express");
const routerCustomer = express.Router();
const controllerCustomer = require("../controllers/controllerCustomer");
const checkNulls = require("../middlewares/checkNulls");
const authController = require("../controllers/authController");

routerCustomer.route("/register").post(authController.signup);
routerCustomer.route("/login").post(authController.login);
routerCustomer.route("/forgetPassword").post(authController.forgetPassword);
// routerCustomer.route("/resetPassword").patch(authController.resetPaa);
routerCustomer
  .route("/addCustomer")
  .post(
    checkNulls,
    authController.protect,
    authController.restrictTo("customer"),
    controllerCustomer.addCustomer
  );
routerCustomer
  .route("/showCustomers")
  .get(
    authController.protect,
    authController.restrictTo("Admin"),
    controllerCustomer.showCustomers
  );
routerCustomer
  .route("/deleteCustomer/:username")
  .delete(
    authController.protect,
    authController.restrictTo("customer"),
    controllerCustomer.deleteCustomer
  );
routerCustomer
  .route("/editCustomer/:username")
  .patch(
    checkNulls,
    authController.protect,
    authController.restrictTo("customer"),
    controllerCustomer.editCustomer
  );
routerCustomer
  .route("/getCustomerByUsername/:username")
  .get(
    authController.protect,
    authController.restrictTo("customer", "Admin"),
    controllerCustomer.getCustomerByUsername
  );

module.exports = routerCustomer;
