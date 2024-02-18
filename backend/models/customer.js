const mongoose = require("mongoose");
// validator
const validator = require("validator");

const bcrypt = require("bcryptjs");
const customerSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please tell us your name!"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  role: { type: String, required: true },
  // link(photo) for book
  photo: { type: String, default: "" },

  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // this function to check password equal to confirmation password
      // this only works on CREATE and  SAVE!
      validator: function (el) {
        return el == this.password;
      },
      message: "Passwords are not the same!",
    },
  },
});
customerSchema.pre("save", async function (next) {
  // this function works if password is changed.
  if (!this.isModified("password")) return next();

  // ** during register
  // encrypt the password
  this.password = await bcrypt.hash(this.password, 12);
  // delete confirm password
  this.confirmPassword = undefined;
  next();
});

// this method to compare password that not encrypted with password stored(encrypted)
customerSchema.methods.correctPassword = async function (
  candidatePassword,
  customerPassword
) {
  return await bcrypt.compare(candidatePassword, customerPassword);
};
const customer = mongoose.model("customerDB", customerSchema);

// export this object
module.exports = customer;
