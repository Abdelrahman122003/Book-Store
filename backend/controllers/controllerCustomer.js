const Customer = require("../models/customer");
const catchAsync = require("../utilities/catchAsync");
const AppError = require("../utilities/appError");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// add customer --> register
const addCustomer = async (req, res, next) => {
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
    console.log("hi existing customer");
    return res.status(400).json({
      status: "fail",
      message: "This email or username is used before!",
      data: { customers },
    });
  }
  if (password !== confirmPassword) {
    console.log("enter this condtion");
    return res.status(400).json({
      status: "fail",
      message: "Passwords are not the same!",
    });
  }
  console.log("passed");
  console.log(req.body);
  const newCustomer = await Customer.create(req.body);
  await newCustomer.save();
  res.status(201).json({
    status: "success",
    message: "Customer created successfully",
    data: { newCustomer },
  });
};

// show Customers
const showCustomers = async (req, res, next) => {
  const Customers = await Customer.find();
  res.status(200).json({
    status: "success",
    results: Customers.length,
    data: { Customers },
  });
};

// edit customer
const editCustomer = catchAsync(async (req, res, next) => {
  //1)not allow to update password, passwordConfirm and role.
  if (req.body.password || req.body.confirmPassword) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword",
        400
      )
    );
  }
  if (req.body.role) {
    return next(new AppError("You can not change your role.", 400));
  }
  // we can not use save method because it is require (password and passwordConfirm)

  // 2)filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, "username", "email");

  //3)update user document
  const updatedCustomer = await Customer.findByIdAndUpdate(
    req.user.id,
    filteredBody,
    {
      new: true,
      runValidators: true,
    }
  );
  //   200 --> okay
  res.status(200).json({
    status: "success",
    message: "Customer updated successfully",
    data: { user: updatedCustomer },
  });
});

// get customer --> with username
const getCustomerByUsername = async (req, res, next) => {
  const customer = await Customer.findOne({ username: req.params.username });
  // check if customer is exist or no
  if (!customer) {
    return res.status(404).json({
      status: "fail",
      message: "Customer not found",
    });
  }
  res.status(200).json({
    status: "success",
    data: { customer },
  });
};

const deleteMe = catchAsync(async (req, res, next) => {
  await Customer.findByIdAndUpdate(req.user.id, {
    active: false,
  });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

module.exports = {
  addCustomer,
  showCustomers,
  editCustomer,
  getCustomerByUsername,
  deleteMe,
};
