const Customer = require("../models/customer");
const express = require("express");

// add customer --> register
const addCustomer = async (req, res, next) => {
  const { username, password, email, role } = req.body;
  if (!username || !password || !email || !role) {
    return res.status(400).json({
      status: "fail",
      message: "Missing required fields.",
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
  if (!Customers) {
    return res.status(404).json({
      status: "fail",
      message: "No customers to show it",
    });
  }
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
  const { username, password, email, role, photo } = req.body;
  if (username) customer.username = username;
  if (email) customer.email = email;
  if (password) customer.password = password;
  if (role) customer.role = role;
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
  res.status(204).json({
    status: "success",
    message: "Customer deleted successfully",
  });
};

// get customer --> with username
const getCustomerWithUsername = async (req, res, next) => {
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
  getCustomerWithUsername,
};
