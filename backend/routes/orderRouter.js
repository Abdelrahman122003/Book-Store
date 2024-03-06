const express = require("express");
const routerOrder = express.Router();
const controllerOrder = require("../controllers/controllerOrder");
const checkNulls = require("../middlewares/checkNulls");
const authController = require("../controllers/authController");
routerOrder
  .route("/makeOrder")
  .post(
    authController.protect,
    authController.restrictTo("Customer"),
    controllerOrder.addOrder
  );
routerOrder
  .route("/showOrders")
  .get(
    authController.restrictTo("Customer", "Admin"),
    controllerOrder.showOrders
  );
routerOrder
  .route("/cancelOrder/:orderId")
  .delete(authController.restrictTo("Customer"), controllerOrder.deleteOrder);

module.exports = routerOrder;
