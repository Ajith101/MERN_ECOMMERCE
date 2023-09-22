const categoryModel = require("../models/categoryModel");
const productModel = require("../models/productModel");
const validateID = require("../utils/validateMongoID");
const cloudinary = require("cloudinary");
const asyncHandler = require("../middleware/asyncHandler");
const cartModel = require("../models/cartModel");

const getSingleProduct = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const isExist = await productModel.findById(id).populate("category", "name");
  if (isExist) {
    res.status(200).json(isExist);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
const getSingleProductEdit = async (req, res) => {
  try {
    const { id } = req.body;
    const isExist = await productModel.findById(id);
    if (isExist) return res.status(200).json(isExist);
    else return res.status(404).json({ message: "id not valid" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getProductsByCategory = asyncHandler(async (req, res) => {
  const { name } = req.params;
  const category = await categoryModel.findOne({
    name: { $regex: name, $options: "i" },
  });
  if (!category) {
    res.status(404);
    throw new Error("Not found");
  } else {
    const products = await productModel
      .find({ category: category._id })
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

const getAllProduct = asyncHandler(async (req, res) => {
  const allProduct = await productModel
    .find()
    .sort({ createdAt: -1 })
    .select("name category images price _id stock sold totalRatings")
    .populate({ path: "category", select: "name -_id" });
  // .populate("category", "name -_id");
  res.status(200).json(allProduct);
});

const addProduct = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const checkExist = await productModel.findOne({ name });
  if (checkExist) {
    res.status(400);
    throw new Error("Item already exist");
  }
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  let imageLinks = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });
    imageLinks.push({
      public_id: result.public_id,
      url: result.url,
    });
  }
  req.body.images = imageLinks;
  const addProduct = await productModel.create(req.body);
  return res.status(200).json(addProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
  const { update } = req.body;
  const { id } = req.body;
  const isExist = await productModel.findById(id);
  if (isExist) {
    let images = [];
    if (update?.newImages !== undefined) {
      if (typeof update?.newImages === "string") {
        images.push(update?.newImages);
      } else {
        images = update.newImages;
      }
      let imageLinks = [];
      for (let i = 0; i < images?.length; i++) {
        const { public_id, url } = await cloudinary.v2.uploader.upload(
          images[i],
          { folder: "products" }
        );
        imageLinks.push({ url, public_id });
      }
      req.body.update.images = [...req.body.update.images, ...imageLinks];
    }
    const updateProduct = await productModel.findByIdAndUpdate(
      id,
      req.body.update,
      {
        new: true,
      }
    );
    return res.status(200).json(updateProduct);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const isExist = await productModel.findOne({ _id: id });
  if (!isExist) {
    res.status(404);
    throw new Error("Id not valid");
  }
  for (let i = 0; i < isExist.images.length; i++) {
    await cloudinary.v2.uploader.destroy(isExist?.images[i]?.public_id);
  }
  await productModel.findByIdAndDelete(id);
  res.status(200).json({ message: "Product deleted" });
});

const deleteProductImage = asyncHandler(async (req, res) => {
  const { id, public_id } = req.body;
  const isExist = await productModel.findOne({
    _id: id,
    "images.public_id": public_id,
  });
  if (isExist) {
    await cloudinary.v2.uploader.destroy(public_id);
    const updated = await productModel.findByIdAndUpdate(
      id,
      {
        $pull: { images: { public_id } },
      },
      { new: true }
    );
    return res.status(200).json(updated);
  } else {
    res.status(404);
    throw new Error("Not found");
  }
});

module.exports = {
  addProduct,
  updateProduct,
  getSingleProduct,
  getAllProduct,
  deleteProduct,
  getSingleProductEdit,
  deleteProductImage,
  getProductsByCategory,
};
