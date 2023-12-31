const categoryModel = require("../models/categoryModel");
const productModel = require("../models/productModel");
const asyncHandler = require("../middleware/asyncHandler");
const cloudinary = require("cloudinary");
const APIFeatures = require("../utils/apiFeatures");

const testProducts = asyncHandler(async (req, res) => {
  const apiFeatures = new APIFeatures(productModel.find(), req.query)
    .filter()
    .paginate();
  const products = await apiFeatures.query;
  res.status(200).json(products);
});

const getSingleProduct = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const isExist = await productModel.findById(id).populate([
    { path: "category", select: "name -_id" },
    { path: "brand", select: "name -_id" },
  ]);
  if (isExist) {
    res.status(200).json(isExist);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

const getAllProducts = asyncHandler(async (req, res) => {
  const apiFeatures = new APIFeatures(productModel.find(), req.query)
    .filter()
    .paginate();
  const products = await apiFeatures.query
    .select("name category images price _id stock sold totalRatings")
    .populate({ path: "category", select: "name -_id" });
  const currentPage = Number(req.query.page) || 1;
  const totalProducts = products.length;
  const numberOfPages = Math.ceil(totalProducts / 10);
  res
    .status(200)
    .json({ totalProducts, numberOfPages, products, page: currentPage });
});
// const getAllProducts = asyncHandler(async (req, res) => {
//   const { search, sort, categoryId, rating, brand } = req.query;
//   let queryObject = {};
//   if (categoryId) {
//     queryObject.category = categoryId;
//   }
//   if (brand) {
//     queryObject.brand = brand;
//   }

//   if (search) {
//     queryObject.name = { $regex: search, $options: "i" };
//   }
//   if (rating) {
//     queryObject.totalRatings = { $lte: rating };
//   }

//   const sortOptions = {
//     high: "-price",
//     low: "price",
//     "a-z": "name",
//     "z-a": "-name",
//   };
//   const sortKeys = sortOptions[sort] || sortOptions.newest;

//   const currentPage = Number(req.query.page) || 1;
//   const limit = 10;
//   const skip = (currentPage - 1) * limit;

//   const products = await productModel
//     .find(queryObject)
//     .select("name category images price _id stock sold totalRatings")
//     .populate({ path: "category", select: "name -_id" })
//     .sort(sortKeys)
//     .limit(limit)
//     .skip(skip);
//   const totalProducts = await productModel
//     .find(queryObject)
//     .sort(sortKeys)
//     .countDocuments();
//   const numberOfPages = Math.ceil(totalProducts / limit);
//   res
//     .status(200)
//     .json({ totalProducts, numberOfPages, products, page: currentPage });
// });

const getPopularProducts = asyncHandler(async (req, res) => {
  const products = await productModel
    .find()
    .sort({ totalRatings: -1 })
    .select("name category images price _id stock sold totalRatings")
    .populate({ path: "category", select: "name -_id" })
    .limit(8);
  res.status(200).json(products);
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

const searchProduct = asyncHandler(async (req, res) => {
  const { value } = req.body;
  const products = await productModel
    .find({
      name: { $regex: value, $options: "i" },
    })
    .populate({ path: "category", select: "name -_id" })
    .select("name category images");
  res.status(200).json(products);
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

const addNewProduct = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const isExist = await productModel.findOne({ name: name });
  if (isExist) {
    res.status(400);
    throw new Error(`Product ${name} already exists`);
  } else {
    const newProduct = await productModel.create(req.body);
    res.status(200).json(newProduct);
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
  getAllProducts,
  deleteProduct,
  getSingleProductEdit,
  deleteProductImage,
  getProductsByCategory,
  searchProduct,
  getPopularProducts,
  testProducts,
};
