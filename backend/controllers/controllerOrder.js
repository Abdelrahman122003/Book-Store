const Order = require("../models/order");
const Book = require("../models/book");
const express = require("express");

const checkBookIfExists = async (ISBN) => {
  return await Book.findOne({ ISBN: ISBN });
};

// make order
const addOrder = async (req, res, next) => {
  let totalPayment = 0;
  req.body.books.forEach((book) => {
    // console.log(book.ISBN + " " + book.amount);
    const getBook = checkBookIfExists(book.ISBN);
    if (getBook) {
      // res.status(200).json({
      //   // status: 'success',
      //   book: { getBook },
      console.log(getBook);
      // });
    } else console.log("No");
  });
  res.status(201).json({
    status: "success",
  });
  // req.body.books.forEach((book) => {
  //   totalPayment += book.price;
  // });
  // let newOrder = await Order.create(req.body);
  // newOrder.totalPayment = totalPayment;
  // newOrder.status = "pending";
  // await newOrder.save();
  // res.status(201).json(newOrder);
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
