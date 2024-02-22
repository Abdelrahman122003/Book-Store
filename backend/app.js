require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const bookRouter = require("../backend/routes/bookRouter");
const customerRouter = require("./routes/customerRouter");
const orderRouter = require("./routes/orderRouter");
const handlerErrorsAuto = require("./controllers/errorController");
const app = express();
app.use(bodyParser.json());

// // middleware for print
// app.use((req, res, next) => {
//   console.log(req.headers);
//   next();
// });
app.use("/api/books", bookRouter);
app.use("/api/customers", customerRouter);
app.use("/api/orders", orderRouter);
app.use(express.json());
app.use(handlerErrorsAuto);
module.exports = app;
