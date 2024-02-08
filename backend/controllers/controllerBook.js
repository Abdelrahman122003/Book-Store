// connect to database

const Book = require("../models/book");
const express = require("express");
// add book
// async ---> do not wait for resulting
const addBook = async (req, res, next) => {
  console.log(req.body);
  const newBook = await Book.create(req.body)
  // await --> saving first then continue
  await newBook.save();
  res.status(201).json(newBook);
  // res.send('hi fucking server api!');
};

module.exports = { addBook };
