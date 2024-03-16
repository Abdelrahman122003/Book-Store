require("dotenv").config("./config.env");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const rateLimiter = require("express-rate-limit");
const bodyParser = require("body-parser");
const bookRouter = require("../backend/routes/bookRouter");
const customerRouter = require("./routes/customerRouter");
const orderRouter = require("./routes/orderRouter");
const handlerErrorsAuto = require("./controllers/errorController");
const helmet = require("helmet");
const cors = require("cors");

//
const app = express();

// **Global MIDDLEWARES

// Enable CORS for all routes

// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:2003");

//   // Request methods you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );

//   // Request headers you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader("Access-Control-Allow-Credentials", true);

//   // Pass to next layer of middleware
//   next();
// });

//js cookie

// app.use();
app.use(cors());

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);
// Set security http headers
app.use(helmet());
// body parser, reading data from body into req.body
app.use(bodyParser.json({ limit: "10kb" }));

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// ---------------------------
app.use("../public", express.static(path.join(__dirname, "static")));

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "static", "home.html"));
// });
// ---------
// **This limiter allows customers to send a maximum of 100 HTTP requests within the specified time window (windowMs).
const limiter = rateLimiter({
  max: 10,
  windowMs: 1 * 60 * 1000,
  message: "Too Many Requests from this IP, please try again in an hour",
});

app.use("/api", limiter);
//
app.use("/api/books", bookRouter);
app.use("/api/customers", customerRouter);
app.use("/api/orders", orderRouter);
app.use(express.json());
app.use(handlerErrorsAuto);
module.exports = app;
