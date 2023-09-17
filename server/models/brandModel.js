const mongoose = require("mongoose");

const brandSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { public_id: String, url: String },
  },
  { timestamp: true }
);

const brandModel = mongoose.model("brands", brandSchema);

module.exports = brandModel;
