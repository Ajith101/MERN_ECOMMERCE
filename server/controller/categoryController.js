const categoryModel = require("../models/categoryModel");
const asyncHandler = require("../middleware/asyncHandler");
const { validationResult } = require("express-validator");
const cloudinary = require("cloudinary");

const getAllCategory = asyncHandler(async (req, res) => {
  const allCategory = await categoryModel.find().select("-__v");
  if (!allCategory) {
    res.status(404);
    throw new Error("Not Found");
  } else {
    res.status(200).json(allCategory);
  }
});

const getByCategory = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const products = await productModel.find({ category: id });
  if (products) res.status(200).json(products);
  else {
    res.status(404);
    throw new Error("Not Found");
  }
});

const getSingleCategory = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const isExist = await categoryModel.findById(id);
  if (!isExist) {
    res.status(404);
    throw new Error("id not valid");
  }
  return res.status(200).json(isExist);
});

const createCategory = asyncHandler(async (req, res) => {
  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    res.status(400);
    throw new Error(errors.array([0].msg));
  }
  if (typeof req.body.image !== "string") {
    res.status(400);
    throw new Error("Something went wrong");
  }
  let imageLink = {};
  const result = await cloudinary.v2.uploader.upload(req.body.image, {
    folder: "category",
  });
  imageLink = {
    public_id: result.public_id,
    url: result.url,
  };
  req.body.image = imageLink;
  const newCategory = await categoryModel.create(req.body);
  res.status(200).json(newCategory);
});

const updateCategory = asyncHandler(async (req, res) => {
  const { id, update } = req.body;
  const isExist = await categoryModel.findById(id);
  if (isExist) {
    if (typeof update?.image === "string" && update.image.length > 0) {
      const { public_id, url } = await cloudinary.v2.uploader.upload(
        update?.image,
        { folder: "category" }
      );
      req.body.update.image = { public_id, url };
    }
    const updated = await categoryModel.findOneAndUpdate(
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

const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const isExist = await categoryModel.findById(id);
  if (!isExist) {
    res.status(404);
    throw new Error("Not Found");
  }
  if (isExist?.image?.public_id) {
    await cloudinary.v2.uploader.destroy(isExist?.image?.public_id);
  }
  await categoryModel.findByIdAndDelete(id);
  res.status(200).json({ message: "category deleted" });
});

module.exports = {
  getAllCategory,
  getByCategory,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
