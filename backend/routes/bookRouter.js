const express = require("express");
const routerBook = express.Router();
const controllerBook = require("../controllers/controllerBook");
const checkNullsBody = require("../middlewares/checkNulls");
const {nullISBN} = require("../middlewares/checkNullsParam")

// param in link ----> get, updatesd
// requset body  ----> post, update
routerBook.route("/addBook").post(checkNullsBody , controllerBook.addBook);
routerBook.route("/showBooks").get(controllerBook.showBooks);
routerBook.route("/deleteBook/:ISBN").delete(nullISBN, controllerBook.deleteBook);
routerBook.route("/editBook/:ISBN").patch(nullISBN, checkNullsBody, controllerBook.editBook);
routerBook.route("/getBookByISBN/:ISBN").get(nullISBN, controllerBook.getBookByISBN);

module.exports = routerBook;
