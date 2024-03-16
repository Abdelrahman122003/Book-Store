const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
  // status ---> for pending, arrived
  status: { type: String },
  // customerId: { type: mongoose.Schema.ObjectId, required: true },
  customerId: { type: String, required: true },
  date: { type: Date, default: Date.now() },
  // calc by method
  totalPayment: { type: Number },
  books: { type: Array, required: true },
});

const order = mongoose.model("orderDB", orderSchema);

// export this object
module.exports = order;
