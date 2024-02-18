const express = require("express");
const routerCustomer = express.Router();
const controllerCustomer = require("../controllers/controllerCustomer");
const checkNulls = require("../middlewares/checkNulls");
const authController = require("../controllers/authController");

routerCustomer.route("/register").post(authController.signup);
routerCustomer.route("/login").post(authController.login);
routerCustomer
  .route("/addCustomer")
  .post(checkNulls, controllerCustomer.addCustomer);
routerCustomer.route("/showCustomers").get(controllerCustomer.showCustomers);
routerCustomer
  .route("/deleteCustomer/:username")
  .delete(controllerCustomer.deleteCustomer);
routerCustomer
  .route("/editCustomer/:username")
  .patch(checkNulls, controllerCustomer.editCustomer);
routerCustomer
  .route("/getCustomerByUsername/:username")
  .get(controllerCustomer.getCustomerByUsername);

module.exports = routerCustomer;
