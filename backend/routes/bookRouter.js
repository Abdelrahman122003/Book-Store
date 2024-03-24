const express = require("express");
const routerBook = express.Router();
const controllerBook = require("../controllers/controllerBook");
const checkNullsBody = require("../middlewares/checkNulls");
// const {nullISBN} = require("../middlewares/checkNullsParam")
const authController = require("../controllers/authController");
// param in link ----> get, updated
// request body  ----> post, update
routerBook.route("/addBook").post(
  // checkNullsBody,
  authController.protect,
  authController.restrictTo("Admin"),
  controllerBook.addBook
);
routerBook
  .route("/showBooks")
  .get(
    authController.protect,
    authController.restrictTo("Customer", "Admin"),
    controllerBook.showBooks
  );
routerBook.route("/getNumbersOfBooks").get(controllerBook.showBooks);
routerBook
  .route("/deleteBook/:ISBN")
  .delete(
    authController.protect,
    authController.restrictTo("Admin"),
    controllerBook.deleteBook
  );
routerBook
  .route("/editBook/:ISBN")
  .patch(
    checkNullsBody,
    authController.protect,
    authController.restrictTo("Admin"),
    controllerBook.editBook
  );
routerBook
  .route("/getBookByISBN/:ISBN")
  .get(
    authController.protect,
    authController.restrictTo("Admin", "Customer"),
    controllerBook.getBookByISBN
  );
module.exports = routerBook;
