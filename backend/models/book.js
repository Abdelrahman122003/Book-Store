const mongoose = require("mongoose");
const bookSchema = mongoose.Schema({
  name: String,
  price: Number,
  amount: Number,
  author: String,
  //   serial number for this book
  ISBN: String,
  pages: Number,
  cover: String,
  category: String,
  rate: Number,
});

const book = mongoose.model("bookDB", bookSchema);

// export this object
module.exports = book;
