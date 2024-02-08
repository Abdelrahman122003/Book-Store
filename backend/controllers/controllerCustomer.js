const Customer = require("../models/customer");
const express = require("express");

// add customer --> register
const addCustomer = async (req, res, next) => {
  const newCustomer = await Customer.create(req.body);
  newCustomer.save();
  res.status(201).json(newCustomer);
};

// show Customers
const showCustomers = async (req, res, next) => {
  const Customers = await Customer.find();
  res.status(200).json(Customers);
};

// edit customer
const editCustomer = async (req, res, next) => {
  await Customer.updateOne({ username: req.params.username }, req.body);
  const customer = await Customer.findOne({ username: req.params.username });
  //   200 --> okay
  res.status(200).json(customer);
};

// delete customer
const deleteCustomer = async (req, res, next) => {
  await Customer.delete({ username: req.params.username });
  res.status(204).json();
};

// get customer --> with username
const getCustomerWithUsername = async (req, res, next) => {
  const customer = await Customer.findOne({ username: req.params.username });
  res.status(200).json(customer);
};

module.exports = { addCustomer, showCustomers, editCustomer, deleteCustomer };
