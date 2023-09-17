const userModel = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const {
  comparePassword,
  createToken,
  generateRefreshToken,
} = require("../services/authServices");
const cartModel = require("../models/cartModel");
const mongoose = require("mongoose");

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const isExist = await userModel.findOne({ email });
  if (isExist) {
    const checkPassword = await comparePassword(password, isExist.password);
    if (checkPassword) {
      const token = createToken({ userId: isExist._id });
      const refreshToken = generateRefreshToken({ userId: isExist._id });
      const updatedUser = await userModel.findOneAndUpdate(
        isExist._id,
        { refreshToken },
        { new: true }
      );
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 72 * 60 * 60 * 1000,
      });
      res.status(200).json({
        user: {
          name: updatedUser.name,
          cart: updatedUser.cart,
          role: updatedUser.role,
        },
        token,
      });
    } else {
      res.status(404);
      throw new Error("password not match");
    }
  } else {
    res.status(404);
    throw new Error("email not valid");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const isExist = await userModel.findOne({ email });
  if (!isExist) {
    const newUser = await userModel.create(req.body);
    const token = createToken({ userId: newUser._id });
    res.status(200).json({ user: newUser, token });
  } else {
    res.status(400);
    throw new Error("User is already exist");
  }
});

const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const isExist = await userModel.findOne({ email });
  if (isExist.role !== "admin") {
    res.status(402);
    throw new Error("Not authorized");
  }
  const checkPassword = await comparePassword(password, isExist.password);
  if (checkPassword) {
    const token = createToken({ userId: isExist._id });
    const refreshToken = generateRefreshToken({ userId: isExist._id });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    const updatedUser = await userModel.findByIdAndUpdate(
      isExist._id,
      { refreshToken },
      { new: true }
    );
    res.status(200).json({ user: updatedUser, token });
  } else {
    res.status(404);
    throw new Error("Password not matched");
  }
});

const logout = asyncHandler(async (req, res) => {
  res.cookie("refreshToken", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "Logout successfully" });
});

const getSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const isExist = await userModel.findOne({ _id: id });
  if (isExist) {
    res.status(200).json(isExist);
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

const addToCart = asyncHandler(async (req, res) => {
  const { userId, productId } = req.body;
  const cart = await cartModel.findOne({ orderedBy: userId });
});

const getCartNumber = asyncHandler(async (req, res) => {
  const { userId } = req;
  console.log(userId);
  const resPonse = await cartModel.findOne({ orderedBy: userId });
  if (resPonse) {
    res.status(200).json(resPonse?.products.length);
  } else res.status(200).json(0);
});

const getUserCart = asyncHandler(async (req, res) => {
  const { userId } = req;
  const cart = await cartModel
    .findOne({ orderedBy: userId })
    .populate({
      path: "products.productId",
      select: "name price brand images",
      populate: { path: "category", select: "name -_id" },
    })
    .select("-products._id -_id -orderedBy")
    .slice("products.productId.images", 1);
  if (!cart) {
    res.status(404);
    throw new Error("Item not found");
  } else {
    res.status(200).json(cart);
  }
});

const addCartQty = asyncHandler(async (req, res) => {
  const { userId } = req;
  const { productId } = req.body;
  const cart = await cartModel.findOne({
    orderedBy: userId,
    "products.productId": productId,
  });
  if (cart) {
    await cartModel.findOneAndUpdate(
      { "products.productId": productId },
      { $inc: { "products.$.quantity": 1 } },
      { new: true }
    );
    res.status(200).json({ message: "Increased qty" });
  } else {
    res.status(404);
    throw new Error("Item not found");
  }
});
const decreaseCartQty = asyncHandler(async (req, res) => {
  const { userId } = req;
  const { productId } = req.body;
  const cart = await cartModel.findOne({
    orderedBy: userId,
    "products.productId": productId,
  });
  if (cart) {
    await cartModel.findOneAndUpdate(
      { "products.productId": productId },
      { $inc: { "products.$.quantity": -1 } },
      { new: true }
    );
    res.status(200).json({ message: "Decreased qty" });
  } else {
    res.status(404);
    throw new Error("Item not found");
  }
});

const addCart = asyncHandler(async (req, res) => {
  const { userId } = req;
  const { productId } = req.body;
  const cart = await cartModel.findOne({ orderedBy: userId });
  if (cart) {
    const productExist = cart.products.findIndex(
      (item) => item.productId.toString() == productId
    );
    if (productExist !== -1) {
      await cartModel.findOneAndUpdate(
        { orderedBy: userId, "products.productId": productId },
        { $inc: { "products.$.quantity": 1 } },
        { new: true }
      );
      const updatedProduct = await cartModel.findOne({ orderedBy: userId });
      res.status(200).json({
        message: "Added Cart",
        total: updatedProduct?.products?.length,
      });
    } else {
      const addNewProduct = await cartModel.findOneAndUpdate(
        { orderedBy: userId },
        { $push: { products: { productId } } },
        { new: true }
      );
      res.status(200).json({
        message: "Added Cart",
        total: addNewProduct?.products?.length,
      });
    }
  } else {
    const product = await cartModel.create({
      orderedBy: userId,
      products: [{ productId: productId }],
    });
    res.status(200).json({
      message: "Added Cart",
      total: product?.products?.length,
    });
  }
});

const removeCart = asyncHandler(async (req, res) => {
  const { userId } = req;
  const { productId } = req.body;
  const cart = await cartModel.findOne({
    orderedBy: userId,
    "products.productId": productId,
  });
  if (cart) {
    const response = await cartModel.findOneAndUpdate(
      {
        orderedBy: userId,
        "products.productId": productId,
      },
      { $pull: { products: { productId: productId } } },
      { new: true }
    );
    res.status(200).json({
      message: "Item removed from cart",
      total: response?.products?.length,
    });
  } else {
    res.status(404);
    throw new Error("item not found");
  }
});

module.exports = {
  loginUser,
  registerUser,
  adminLogin,
  getSingleUser,
  addCart,
  getUserCart,
  addCartQty,
  decreaseCartQty,
  removeCart,
  getCartNumber,
  logout,
};
