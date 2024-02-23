// require("dotenv").config("../config.env");
const appError = require("../utilities/appError");

const handleJsonWebTokenError = () =>
  new appError("Invalid token. Please log in again!", 401);

const handleJWTExpiredError = () =>
  new appError("Your token has expired! Please log in again.", 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
    console.error("ERROR 💥", err);

    // 2) Send generic message
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  console.log("type : " + process.env.JWT_SECRET);
  console.log("Enter this abn >......");
  if (process.env.NODE_ENV === "development") {
    // console.log("enter dev")
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    // console.log("Error production");
    // if (error.name === "CastError") error = handleCastErrorDB(error);
    // if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    // if (error.name === "ValidationError")
    //   error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleJsonWebTokenError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();
    sendErrorProd(error, res);
  }
};
