const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    products: [
      {
        productId: { type: mongoose.Types.ObjectId, ref: "products" },
        quantity: { type: Number, default: 1 },
      },
    ],
    cartTotal: Number,
    totalAfterDiscount: Number,
    orderedBy: { type: mongoose.Types.ObjectId, ref: "user" },
    count: Number,
  },
  { timestamp: true }
);

const cartModel = mongoose.model("cart", cartSchema);

module.exports = cartModel;
