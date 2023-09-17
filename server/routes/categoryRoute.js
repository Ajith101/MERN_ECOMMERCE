const express = require("express");
const { checkAuth, checkAdmin } = require("../middleware/auth");
const { deleteCategoryImage } = require("../utils/imageControll");
const {
  getAllCategory,
  getByCategory,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/categoryController");

const categoryRoute = express.Router();

categoryRoute.get("/", getAllCategory);
categoryRoute.post("/by-category/", getByCategory);
categoryRoute.post("/single/", [checkAuth, checkAdmin], getSingleCategory);
categoryRoute.post("/", [checkAuth, checkAdmin], createCategory);
categoryRoute.put("/", [checkAuth, checkAdmin], updateCategory);
categoryRoute.delete("/", [checkAuth, checkAdmin], deleteCategory);
categoryRoute.delete("/image/", [checkAuth, checkAdmin], deleteCategoryImage);

module.exports = categoryRoute;
