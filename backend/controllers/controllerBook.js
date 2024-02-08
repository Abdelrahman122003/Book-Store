// connect to database

const Book = require("../models/book");
const express = require("express");
// add book
// async ---> do not wait for resulting
const addBook = async (req, res, next) => {
  console.log(req.body);
  const newBook = await Book.create(req.body);
  // await --> saving first then continue
  await newBook.save();
  res.status(201).json(newBook);
  // res.send('hi fucking server api!');
};

const showBooks = async (req, res, next) => {
  const books = await Book.find();
  res.status(200).json(books);
};

const deleteBook = async (req, res, next) => {
  await Book.deleteOne({ ISBN: req.params.ISBN });
  res.status(204).send('Deleted Successfullly!');
};

const editBook = async (req, res, next) => {
  await Book.updateOne({ISBN: req.params.ISBN} , req.body);
  const book = await Book.findOne({ISBN: req.params.ISBN});
  //   200 --> okay
  res.status(200).json(book);
};

const getBookByISBN = async (req, res, next) => {
  const book = await Book.findOne({ ISBN: req.params.ISBN });
  res.status(200).json(book);
};

module.exports = { addBook, showBooks, deleteBook, editBook, getBookByISBN };
