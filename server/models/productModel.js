const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    discountPrice: Number,
    discount: Number,
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      required: true,
    },
    stock: { type: Number, required: true },
    size: { type: Array, default: [] },
    images: [
      {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    tags: { type: Array, default: [] },
    color: { type: Array, default: [] },
    brand: { type: String },
    totalRatings: { type: Number, default: 0 },
    sold: { type: Number, default: 0 },
    questions: [
      {
        question: String,
        askedBy: { type: mongoose.Types.ObjectId, ref: "user" },
        answer: String,
        likes: [],
        disLikes: [],
        certifiedBuyer: Boolean,
      },
    ],
    specifications: { type: Array, default: [] },
    reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true }
);

const productModel = mongoose.model("products", productSchema);

module.exports = productModel;
