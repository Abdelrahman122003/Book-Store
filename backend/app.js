require("dotenv").config("./config.env");
const express = require("express");
const morgan = require("morgan");
const rateLimiter = require("express-rate-limit");
const bodyParser = require("body-parser");
const bookRouter = require("../backend/routes/bookRouter");
const customerRouter = require("./routes/customerRouter");
const orderRouter = require("./routes/orderRouter");
const handlerErrorsAuto = require("./controllers/errorController");
const app = express();
app.use(bodyParser.json());

// app.use((err, req, res, next) => {
//   // Handle the error
//   res.status(err.statusCode || 500).json({
//     status: err.status || "error",
//     message: err.message,
//   });
// });

// **Global MIDDLEWARES
// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// this limiter allow customer send http request max --> 100
const limiter = rateLimiter({
  max: 10,
  windowMs: 60 * 60 * 1000,
  message: "Too Many Requests from this IP, please try again in an hour",
});

app.use("/api", limiter);

app.use("/api/books", bookRouter);
app.use("/api/customers", customerRouter);
app.use("/api/orders", orderRouter);
app.use(express.json());
app.use(handlerErrorsAuto);
module.exports = app;
