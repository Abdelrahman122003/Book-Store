const mongoose = require("mongoose");
const customerSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  role: String,
  photo: String,
});

const customer = mongoose.model("customerDB", customerSchema);

// export this object
module.exports = customer;
