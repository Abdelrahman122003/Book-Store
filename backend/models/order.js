const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
  status: String,
  date: Date,
  totalPayment: Number,
  role: String,
  photo: String,
});

const order = mongoose.model("orderDB", orderSchema);

// export this object
module.exports = order;
