const express = require("express");
const routerOrder = express.Router();
const controllerOrder = require("../controllers/controllerOrder");
const checkNulls = require("../middlewares/checkNulls");
const routerBook = require("./bookRouter");

routerOrder.route("/makeOrder").post(controllerOrder.addOrder);
routerOrder.route("/showOrders").get(controllerOrder.showOrders);
routerOrder.route("/cancelOrder/:orderId").delete(controllerOrder.deleteOrder);

module.exports = routerOrder;
