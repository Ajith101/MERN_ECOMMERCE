const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    productId: { type: mongoose.Types.ObjectId, ref: "products" },
    userId: { type: mongoose.Types.ObjectId, ref: "user" },
    quantities: { type: Number, required: false },
    addresses: { type: String, required: true },
    orderStatus: {
      type: String,
      default: "Not Processed",
      enum: [
        "Not Processed",
        "Processed",
        "Dispatched",
        "Cancelled",
        "Delivered",
      ],
    },
  },
  { timestamp: true }
);

const orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel;
