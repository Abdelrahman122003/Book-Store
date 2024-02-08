const mongoose = require("mongoose");
const bookSchema = mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, default: 1 },
  author: { type: String, required: true },
  ISBN: { type: String, required: true, unique: true },
  pages: { type: Number, required: true },
  cover: { type: String, required: true },
  category: { type: String, required: true },
  rate: { type: Number, default: 1 },
  numberOfPayments: { type: Number, default: 0 },
});

const Book = mongoose.model("book", bookSchema);

// export this object
module.exports = Book;
