const express = require("express");
const routerBook = express.Router();
const controllerBook = require("../controllers/controllerBook");
routerBook.route("/addBook").post(controllerBook.addBook);

module.exports = routerBook;
