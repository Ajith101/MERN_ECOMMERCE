const express = require("express");
const {
  createBrand,
  deleteBrand,
  allBrands,
  updateBrand,
  singleBrand,
} = require("../controller/brandController");
const { deleteBrandImage } = require("../utils/imageControll");
const { checkAuth, checkAdmin } = require("../middleware/auth");

const brandRoute = express.Router();

brandRoute.get("/", allBrands);
brandRoute.post("/single/", [checkAuth, checkAdmin], singleBrand);
brandRoute.post("/", [checkAuth, checkAdmin], createBrand);
brandRoute.delete("/", [checkAuth, checkAdmin], deleteBrand);
brandRoute.delete("/image/", [checkAuth, checkAdmin], deleteBrandImage);
brandRoute.put("/", [checkAuth, checkAdmin], updateBrand);

module.exports = brandRoute;
