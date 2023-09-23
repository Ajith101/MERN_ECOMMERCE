const cloudinary = require("cloudinary");
const brandModel = require("../models/brandModel");
const asyncHandler = require("../middleware/asyncHandler");
const productModel = require("../models/productModel");

const allBrands = asyncHandler(async (req, res) => {
  const isExist = await brandModel.find();
  if (!isExist) {
    res.status(404);
    throw new Error("Not Found");
  } else {
    res.status(200).json(isExist);
  }
});

const getProductsByBrand = asyncHandler(async (req, res) => {
  const { name } = req.params;
  const brand = await brandModel.findOne({
    name: { $regex: name, $options: "i" },
  });
  if (!brand) {
    res.status(404);
    throw new Error("Not found");
  } else {
    const products = await productModel
      .find({ brand: brand._id })
      .select("name category images price _id stock sold totalRatings")
      .populate({ path: "category", select: "name -_id" });
    if (!products) {
      res.status(404);
      throw new Error("Not found");
    } else {
      res.status(200).json(products);
    }
  }
});

const allBrandsForAdmin = asyncHandler(async (req, res) => {
  const isExist = await brandModel.find().select("name");
  if (!isExist) {
    res.status(404);
    throw new Error("Not Found");
  } else {
    res.status(200).json(isExist);
  }
});
const singleBrand = asyncHandler(async (req, res) => {
  const response = await brandModel.findById(req.body.id);
  if (!response) {
    res.status(404);
    throw new Error("Not Found");
  } else {
    res.status(200).json(response);
  }
});

const createBrand = asyncHandler(async (req, res) => {
  if (typeof req.body.image !== "string") {
    res.status(400);
    throw new Error("File not valid");
  }
  const { public_id, url } = await cloudinary.v2.uploader.upload(
    req.body.image,
    {
      folder: "brand",
    }
  );
  let imageLink = { public_id, url };
  req.body.image = imageLink;
  const brand = await brandModel.create(req.body);
  res.status(200).json(brand);
});

const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const isExist = await brandModel.findById(id);
  if (!isExist) {
    res.status(404);
    throw new Error("Not Found");
  }
  if (isExist?.image?.public_id) {
    await cloudinary.v2.uploader.destroy(isExist?.image?.public_id);
  }
  await brandModel.findByIdAndDelete(id);
  res.status(200).json({ message: "category deleted" });
});

const updateBrand = asyncHandler(async (req, res) => {
  const { id, update } = req.body;
  const isExist = await brandModel.findById(id);
  if (isExist) {
    if (typeof update?.image === "string" && update.image.length > 0) {
      const { public_id, url } = await cloudinary.v2.uploader.upload(
        update?.image,
        { folder: "brand" }
      );
      req.body.update.image = { public_id, url };
    }
    const updated = await brandModel.findOneAndUpdate(
      { _id: id },
      req.body.update,
      {
        new: true,
      }
    );
    res.status(200).json(updated);
  } else {
    res.status(404);
    throw new Error("Not Found");
  }
});

module.exports = {
  createBrand,
  deleteBrand,
  allBrands,
  updateBrand,
  singleBrand,
  allBrandsForAdmin,
  getProductsByBrand,
};
