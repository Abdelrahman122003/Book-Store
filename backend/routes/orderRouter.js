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
    authController.protect,
    authController.restrictTo("Customer", "Admin"),
    controllerOrder.showOrders
  );
routerOrder
  .route("/cancelOrder/:orderId")
  .delete(
    authController.protect,
    authController.restrictTo("Customer"),
    controllerOrder.cancelOrder
  );

routerOrder
  .route("/getAllCustomerOrders")
  .get(
    authController.protect,
    authController.restrictTo("Customer"),
    controllerOrder.showOrdersForCustomer
  );

routerOrder
  .route("/getOrderById/:orderId")
  .get(
    authController.protect,
    authController.restrictTo("Customer"),
    controllerOrder.getOrderById
  );

module.exports = routerOrder;
