const mongoose = require("mongoose");
const orderSchema = mongoose.Schema({
  // status ---> for pending, arrived
  status: { type: String },
  // customerId: { type: mongoose.Schema.ObjectId, required: true },
  // customerId: { type: String, required: true },
  username: { type: String, required: true },
  // date of make order
  orderDate: {
    type: String,
    default: function () {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate());
      return currentDate.toISOString().split("T")[0];
    },
  },
  ReceivingData: {
    type: String,
    // receiving date order after five days
    default: function () {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 5);
      return currentDate.toISOString().split("T")[0]; // Assuming you want YYYY-MM-DD format
    },
  },
  // calc by method
  totalPayment: { type: Number },
  books: { type: Array, required: true },
});

const order = mongoose.model("orderDB", orderSchema);

// export this object
module.exports = order;
