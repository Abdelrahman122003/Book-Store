const express = require("express");
const routerCustomer = express.Router();
const controllerCustomer = require("../controllers/controllerCustomer");
routerCustomer.route("/addCustomer").post(controllerCustomer.addCustomer);
routerCustomer.route("/showCustomers").get(controllerCustomer.showCustomers);
routerCustomer
  .route("/deleteCustomer")
  .delete(controllerCustomer.deleteCustomer);
routerCustomer.route("/editCustomer").patch(controllerCustomer.editCustomer);
routerBook
  .route("/getCustomerWithUsername")
  .get(controllerCustomer.getCustomerWithUsername);

module.exports = routerCustomer;
