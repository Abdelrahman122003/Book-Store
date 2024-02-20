require("dotenv").config();
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const Customer = require("../models/customer");
const catchAsync = require("../utilities/catchAsync");
const AppError = require("../utilities/appError");

const signToken = (id) => {
  return jwt.sign({ id }, "my-ultra-secure-and-ultra-long-secret", {
    expiresIn: "90d",
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newCustomer = await Customer.create(req.body);
  const token = signToken(newCustomer._id);
  //   const token = jwt.sign({ id: newCustomer._id }, process.env.JWT_SECRET, {
  //     expiresIn: process.env.JWT_EXPIRES_IN,
  //   });
  res.status(201).json({
    status: "success",
    token,
    data: { user: newCustomer },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  //   check if username and password are exist
  if (!password || !username)
    return next(new appError("Please provide username and password", 400));
  //  check if username is exist and password is correct.
  const customer = await Customer.findOne({ username }).select("+password");
  const correct = await customer.correctPassword(password, customer.password);
  console.log(correct + "  " + customer);
  if (!customer || !correct) {
    return next(new AppError("Incorrect username or password", 401));
  }

  //   console.log(customer);

  //   if everything is ok, send token to client
  const token = signToken(customer._id);
  res.status(200).json({
    status: "Success",
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  console.log("start  : " + process.env);
  // Getting token and check if it is there
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access"),
      401
    );
  }
  console.log("token : " + token);
  // Verification token
  const decode = await promisify(jwt.verify)(
    token,
    "my-ultra-secure-and-ultra-long-secret"
  );
  console.log("decode Token: " + decode);
  // check if user still exists

  // check if user changed password after token was issued

  next();
});
