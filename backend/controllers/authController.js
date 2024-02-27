const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const Customer = require("../models/customer");
const catchAsync = require("../utilities/catchAsync");
const AppError = require("../utilities/appError");
const sendEmail = require("../utilities/email");
// const { CurrencyCodes } = require("validator/lib/isiso4217");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newCustomer = await Customer.create(req.body);
  const token = signToken(newCustomer._id);
  res.status(201).json({
    status: "success",
    token,
    data: { user: newCustomer },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  console.log(".env : " + process.env.JWT_SECRET);
  if (!password || !username) {
    // console.log("i am here");
    return next(new AppError("Please provide username and password", 400));
  }
  //  check if username is exist and password is correct.
  const customer = await Customer.findOne({ username }).select("+password");
  const correct = await customer.correctPassword(password, customer.password);
  // console.log(correct + "  " + customer);
  if (!customer || !correct) {
    return next(new AppError("Incorrect username or password", 401));
  }

  //   if everything is ok, send token to client
  const token = signToken(customer._id);
  res.status(200).json({
    status: "Success",
    customerId: customer._id,
    token,
  });
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
    console.log("in this.");
    return next(
      new AppError("You are not logged in! Please log in to get access", 401)
    );
  }
  //2)Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //3)check if user still exists
  const currentUser = await Customer.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  //*** I am not understand this case -----> not work
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    // console.log("enter change password after case : ");
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }
  // Grant access to protected route
  req.user = currentUser;
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

// forget password
exports.forgetPassword = async (req, res, next) => {
  // 1)get user based on posted email
  // console.log("enter forget password");
  const user = await Customer.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with email address", 404));
  }
  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  // 3)Send it to user -> email

  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/customers/resetPassword/${resetToken}`;

  const message = `Forget your password? Submit 
  a Patch request with your new password and passwordConfirm to: ${resetURL}.
  \nIf you did not forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (Valid for 10 min)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError("There was an error sending the email. Try again later!")
    );
  }
};
// reset password
exports.resetPassword = (req, res, next) => {};
