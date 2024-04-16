const crypto = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const Customer = require("../models/customer");
const catchAsync = require("../utilities/catchAsync");
const AppError = require("../utilities/appError");
const sendEmail = require("../utilities/email");
const jsCookie = require("js-cookie");
const cookieParser = require("cookie-parser");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendJWTToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);
  // remove password from output
  user.password = undefined;
  res.status(200).json({
    status: "Success",
    token,
    data: {
      user,
    },
    // usSer,
  });
};
//  register
exports.register = async (req, res, next) => {
  console.log("enter add customer");
  const { username, password, email, confirmPassword } = req.body;
  console.log(username, " ", password, " ", confirmPassword);
  if (!username || !password || !email || !confirmPassword) {
    res.status(400).json({
      status: "fail",
      message: "Missing required fields.",
    });
  }
  const customers = await Customer.find({
    $or: [{ username: username }, { email: email }],
  });
  console.log(customers);
  if (customers.length !== 0) {
    return res.status(400).json({
      status: "fail",
      message: "This email or username is used before!",
      data: { customers },
    });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({
      status: "fail",
      message: "Passwords are not the same(Password, Confirm Password)!",
    });
  }
  const newCustomer = await Customer.create(req.body);
  await newCustomer.save();
  res.status(201).json({
    status: "success",
    message: "Customer created successfully",
    data: { newCustomer },
  });
};
exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  if (!password || !username) {
    return next(new AppError("Please provide username and password", 400));
  }
  //  check if username is exist and password is correct.
  const customer = await Customer.findOne({ username }).select("+password");
  const correct = await customer.correctPassword(password, customer.password);

  if (!customer || !correct) {
    res.status(401).json({
      status: "fail",
      message: "Incorrect username or password",
    });
  }

  createSendJWTToken(customer, 200, res);
});

//** Authentication
// this function check if this customer logged in or no.
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
    res.status(401).json({
      status: "fail",
      message: "You are not logged in! Please log in to get access",
    });
    return;
  }
  //2)Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //3)check if user still exists
  const currentUser = await Customer.findById(decoded.id);
  if (!currentUser) {
    res.status(401).json({
      status: "fail",
      message: "The user belonging to this token does no longer exist.",
    });
    return;
  }

  // 4) Check if user changed password after the token was issued
  //*** I am not understand this case -----> not work --->
  //**  Issues arise when using protection in the API for books like add book(changePasswordAt)
  // if(){
  //   if (currentUser.changedPasswordAfter(decoded.iat)) {
  //   return next(
  //     new AppError("User recently changed password! Please log in again.", 401)
  //   );
  // }
  // }
  // Grant access to protected route
  req.user = currentUser;
  // console.log("from protect function : ", req.user);
  // console.log("from protect function : ", currentUser._id);
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
// update password function
exports.updatePassword = async (req, res, next) => {
  // 1)Get user by his id from collection
  const user = await Customer.findById(req.user.id).select("+password");

  // 2) Check If Posted current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError("In correct password or email", 401));
  }

  // update password
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;

  // save changes
  await user.save();

  // login again, send JWT token
  createSendJWTToken(user, 200, res);
};
