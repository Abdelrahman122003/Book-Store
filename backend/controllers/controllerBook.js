// connect to database

const book = require("../models/book");
const express = require("express");
// add book
// async ---> do not wait for resulting
const addBook = async (req, res, next) => {
  const newBook = new book(req.body);
  // await --> saving first then continue
  await newBook.save();
  res.status(201).json(newBook);
};

module.exports = { addBook };
