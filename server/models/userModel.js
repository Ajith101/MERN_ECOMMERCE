const mongoose = require("mongoose");
const { hashPassword } = require("../services/authServices");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  refreshToken: { type: String },
  isBlocked: { type: Boolean, default: false },
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
  wishList: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
  passwordChangedAt: { type: Date },
  passwordResetToken: { type: String },
  passwordResetExpires: { type: String },
  address: { type: String },
  otp: { type: String },
  isVerified: { type: Boolean, default: false },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await hashPassword(this.password);
  next();
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
