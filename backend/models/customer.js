const mongoose = require("mongoose");
const customerSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
  // link(photo) for book
  photo: { type: String, required: true, default: "" },
});

const customer = mongoose.model("customerDB", customerSchema);

// export this object
module.exports = customer;
