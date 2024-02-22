require("dotenv").config(); //this for read const from dotenv
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const Customer = require("../models/customer");
const catchAsync = require("../utilities/catchAsync");
const AppError = require("../utilities/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
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
    customerId: customer._id,
    token,
  });
});

//** Authentication
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  //1)Getting token and check if it is there
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
  //2)Verification token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  //3)check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }
  // 4) Check if user changed password after the token was issued
  // req.user = currentUser;
  next();
});

//** Authorization
// to restrict access for specific methods or functions

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(" You do not have permission to perform this action", 403)
      );
    }
    // otherwise next
    next();
  };
};
