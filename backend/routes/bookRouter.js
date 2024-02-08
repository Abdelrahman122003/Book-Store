const express = require("express");
const routerBook = express.Router();
const controllerBook = require("../controllers/controllerBook");
routerBook.route("/addBook").post(controllerBook.addBook);
routerBook.route("/showBooks").get(controllerBook.showBooks);
routerBook.route("/deleteBook/:ISBN").delete(controllerBook.deleteBook);
routerBook.route("/editBook/:ISBN").patch(controllerBook.editBook);
routerBook.route("/getBookByISBN/:ISBN").get(controllerBook.getBookByISBN);

module.exports = routerBook;
