const crypto = require("crypto");
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
    select: false,
  },
  role: {
    type: String,
    required: true,
    enum: ["Customer", "Admin"],
    default: "Customer",
  },
  // link(photo) for book
  photo: { type: String, default: "" },

  confirmPassword: {
    type: String,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    // select: false,
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

customerSchema.pre("save", function (next) {
  if (!this.isModified(this.password) || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;

  next();
});
customerSchema.pre(/^find/, function (next) {
  // this method to get all customer that his pro active equal to false

  this.find({ active: { $ne: false } });
  next();
});

// this method to compare password that not encrypted with password stored(encrypted)
customerSchema.methods.correctPassword = async function (
  candidatePassword,
  customerPassword
) {
  return await bcrypt.compare(candidatePassword, customerPassword);
};
customerSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  const changedTimestamp = Math.floor(this.passwordChangedAt.getTime() / 1000);
  // console.log("diff : ", changedTimestamp - JWTTimestamp);
  if (this.passwordChangedAt) {
    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

customerSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  // console.log("resetToken : ", resetToken);
  // console.log(resetToken + "   " + this.passwordResetToken);
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};
const customer = mongoose.model("customerDB", customerSchema);

// export this object
module.exports = customer;
