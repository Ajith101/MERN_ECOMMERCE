const express = require("express");
const {
  createCategory,
  addProduct,
  getSingleProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  updateCategory,
  deleteCategory,
  getAllCategory,
  getByCategory,
  getSingleProductEdit,
  deleteProductImage,
  getSingleCategory,
  getProductsByCategory,
  searchProduct,
  getAllProducts,
  getPopularProducts,
  testProducts,
} = require("../controller/productController");
const { checkAuth, checkAdmin } = require("../middleware/auth");

const productRoute = express.Router();

productRoute.post("/test", testProducts);
productRoute.post("/search", searchProduct);
productRoute.get("/", getAllProduct);
productRoute.get("/popular", getPopularProducts);
productRoute.get("/by", getAllProducts);
productRoute.get("/category/:name", getProductsByCategory);
productRoute.put("/", [checkAuth, checkAdmin], updateProduct);
productRoute.delete("/", [checkAuth, checkAdmin], deleteProduct);
productRoute.delete("/image", [checkAuth, checkAdmin], deleteProductImage);
productRoute.post("/add", [checkAuth, checkAdmin], addProduct);
productRoute.post("/single", getSingleProduct);
productRoute.post("/single-product", getSingleProductEdit);

module.exports = productRoute;
