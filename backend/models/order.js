const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
  // status ---> for pending, arrived
  status: { type: String, required: true },
  customerId: { type: mongoose.Schema.ObjectId },
  date: { type: Date, default: Date.now() },
  // calc by method
  totalPayment: { type: Number },
});

const order = mongoose.model("orderDB", orderSchema);

// export this object
module.exports = order;
