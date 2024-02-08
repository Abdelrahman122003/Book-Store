const express = require("express");
const routerCustomer = express.Router();
const controllerCustomer = require("../controllers/controllerCustomer");
routerCustomer.route("/addCustomer").post(controllerCustomer.addCustomer);
routerCustomer.route("/showCustomers").get(controllerCustomer.showCustomers);
routerCustomer
  .route("/deleteCustomer/:username")
  .delete(controllerCustomer.deleteCustomer);
routerCustomer.route("/editCustomer/:username").patch(controllerCustomer.editCustomer);
routerCustomer
  .route("/getCustomerWithUsername/:username")
  .get(controllerCustomer.getCustomerWithUsername);

module.exports = routerCustomer;
