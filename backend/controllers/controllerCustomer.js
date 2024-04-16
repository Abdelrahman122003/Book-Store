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

// show Customers
const showCustomers = async (req, res, next) => {
  const Customers = await Customer.find();
  res.status(200).json({
    status: "success",
    results: Customers.length,
    data: { Customers },
  });
};

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
  const customer = await Customer.findByIdAndUpdate(req.user.id, {
    active: false,
  });

  if (customer.active === false) {
    res.status(200).json({
      message: "You have already been deleted before.",
    });
  }
  console.log("customer from con", customer);
  res.status(200).json({
    status: "success",
    message: "You have been successfully deleted.",
  });
});

module.exports = {
  showCustomers,
  getCustomerByUsername,
  deleteMe,
};
