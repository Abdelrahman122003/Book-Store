const Customer = require("../models/customer");

// add customer --> register
const addCustomer = async (req, res, next) => {
  const { username, password, email, role } = req.body;
  if (!username || !password || !email || !role) {
    return res.status(400).json({
      status: "fail",
      message: "Missing required fields.",
    });
  }
  const customers = await Customer.find({$or: [{username: username} , {email: email}]});
  console.log(customers);
  if (customers.length !== 0) {
    console.log('hi existing customer');
    return res.status(400).json({
      status: "fail",
      message: `Customer exist!`,
      data: {customers}
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

// show Customers
const showCustomers = async (req, res, next) => {
  const Customers = await Customer.find();
  res.status(200).json({
    status: "success",
    data: { Customers },
  });
};

// edit customer
const editCustomer = async (req, res, next) => {
  const customer = await Customer.findOne({ username: req.params.username });
  // check first if customer is found
  if (!customer) {
    return res.status(404).json({
      status: "fail",
      message: "Customer is not found",
    });
  }
  const { password, photo } = req.body;
  if (password) customer.password = password;
  if (photo) customer.photo = photo;
  //   200 --> okay
  await customer.save();
  res.status(200).json({
    status: "success",
    message: "Customer updated successfully",
    data: { customer },
  });
};

// delete customer
const deleteCustomer = async (req, res, next) => {
  const customer = await Customer.findOne({ username: req.params.username });
  // check if customer is exist or no
  if (!customer) {
    return res.status(404).json({
      status: "fail",
      message: "Customer not found",
    });
  }
  await Customer.deleteOne({ username: req.params.username });
  res.json({
    status: "success",
    message: "Customer deleted successfully",
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

module.exports = {
  addCustomer,
  showCustomers,
  editCustomer,
  deleteCustomer,
  getCustomerByUsername,
};
