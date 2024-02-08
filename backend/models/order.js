const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
  status: { type: String, required: true },
  date: { type: Date, required: true },
  // calc by method
  totalPayment: { type: Number, required: true },
  // role , photo ???????
  role: { type: String, required: true },
  photo: String,
});

const order = mongoose.model("orderDB", orderSchema);

// export this object
module.exports = order;
