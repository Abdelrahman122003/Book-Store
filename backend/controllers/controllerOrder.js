const Order = require("../models/order");
const express = require("express");

// make order
const addOrder = async (req, res, next) => {
  let totalPayment = 0;
  req.body.books.forEach((book) => {
    console.log(req.body.books.serialNumber + " " + req.body.books.amount);
  });
  req.body.books.forEach((book) => {
    totalPayment += book.price;
  });
  let newOrder = await Order.create(req.body);
  newOrder.totalPayment = totalPayment;
  newOrder.status = "pending";
  await newOrder.save();
  res.status(201).json(newOrder);
};

// cancel order
const deleteOrder = async (req, res, next) => {
  await Order.findByIdAndDelete(req.params.orderId);
  res.status(204).json();
};

// show orders
const showOrders = async (req, res, next) => {
  const Orders = await Order.find();
  res.status(200).json(Orders);
};

module.exports = { addOrder, deleteOrder, showOrders };
