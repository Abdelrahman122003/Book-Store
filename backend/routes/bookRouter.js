// login , register
const express = require("express");
const routerBook = express.Router();
const controllerBook = require("../controllers/controllerBook");
const checkNullsBody = require("../middlewares/checkNulls");
// const {nullISBN} = require("../middlewares/checkNullsParam")
const authController = require("../controllers/authController");
// param in link ----> get, updated
// request body  ----> post, update
routerBook.route("/addBook").post(checkNullsBody, controllerBook.addBook);
routerBook
  .route("/showBooks")
  .get(authController.protect, controllerBook.showBooks);
routerBook.route("/deleteBook/:ISBN").delete(controllerBook.deleteBook);
routerBook
  .route("/editBook/:ISBN")
  .patch(checkNullsBody, controllerBook.editBook);
routerBook.route("/getBookByISBN/:ISBN").get(controllerBook.getBookByISBN);

module.exports = routerBook;
