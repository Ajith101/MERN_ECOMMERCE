const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Types.ObjectId, ref: "products", required: true },
    star: Number,
    comment: { type: String },
    images: { type: Array, default: [] },
    likes: { type: Array, default: [] },
    disLikes: { type: Array, default: [] },
    postedBy: { type: mongoose.Types.ObjectId, ref: "user" },
  },
  { timestamp: true }
);

const reviewsModel = mongoose.model("reviews", reviewsSchema);

module.exports = reviewsModel;
