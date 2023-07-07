const express = require("express");
const {
  getAllProducts,
  bySingleProduct,
  searchProducts,
  byCategory,
  trendingItems,
  getAllCategoryNames,
} = require("../controller/products");
const productRoute = express.Router();

productRoute.get("/", getAllProducts);
productRoute.post("/", bySingleProduct);
productRoute.get("/category", getAllCategoryNames);
productRoute.post("/category", byCategory);
productRoute.post("/search", searchProducts);
productRoute.get("/trending", trendingItems);

module.exports = productRoute;
