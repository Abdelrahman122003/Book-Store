const crypto = require("crypto");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const Customer = require("../models/customer");
const catchAsync = require("../utilities/catchAsync");
const AppError = require("../utilities/appError");
const sendEmail = require("../utilities/email");
const jsCookie = require("js-cookie");
const cookieParser = require("cookie-parser");
// const { CurrencyCodes } = require("validator/lib/isiso4217");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendJWTToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  // create cookie and send it through http
  // let minute = 60 * 1000;
  // res.cookie(
  //   authCookie,
  //   "LoggedIn",
  //   { maxAge: minute },
  //   { HttpOnly: true },
  //   { expire: 24 * 60 * 60 * 1000 },
  //   { customerId: customer._id },
  //   { jwtToken: token }
  // );
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
// exports.signup = catchAsync(async (req, res, next) => {
//   const {username
//   const newCustomer = await Customer.create(req.body);
//   createSendJWTToken(newCustomer, 201, res);
// });

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  // console.log(".env : " + process.env.JWT_SECRET);
  if (!password || !username) {
    // console.log("i am here");
    return next(new AppError("Please provide username and password", 400));
  }
  //  check if username is exist and password is correct.
  const customer = await Customer.findOne({ username }).select("+password");
  const correct = await customer.correctPassword(password, customer.password);
  // console.log(correct + "  " + customer);
  if (!customer || !correct) {
    console.log("enter error section");
    // return next(new AppError("Incorrect username or password", 401));
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
  // console.log("token from protect: ", req.headers);
  // console.log("token : ", req.body.token);
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
  //   // console.log("enter change password after case : ");
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
exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  // 2) If token has not expired, and there is user, set the new password
  const user = await Customer.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }

  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  passwordResetToken = undefined;
  passwordResetExpires = undefined;
  await user.save();
  // 3) update changePasswordAt property for the user --> updated in customerSchema

  // 4)Log the user inm, wnd JWT.
  createSendJWTToken(user, 200, res);
});

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
