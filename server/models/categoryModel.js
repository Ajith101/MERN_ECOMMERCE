const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: {
      public_id: { type: String, required: true },
      url: { type: String, required: true },
    },
  },
  { timestamp: true }
);

const categoryModel = mongoose.model("category", categorySchema);

module.exports = categoryModel;
