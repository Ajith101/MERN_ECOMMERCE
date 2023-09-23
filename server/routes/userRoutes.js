const express = require("express");
const {
  loginUser,
  registerUser,
  adminLogin,
  addCart,
  getUserCart,
  changeCartQty,
  removeCart,
  getCartNumber,
  addCartQty,
  decreaseCartQty,
  logout,
  adminList,
  getAllUsers,
  forgotPassword,
  confirmOtp,
  reSetPassword,
  verifyUser,
  getNewOtp,
} = require("../controller/userController");
const { checkAuth, checkAdmin } = require("../middleware/auth");

const userRoutes = express.Router();

userRoutes.post("/new-otp", getNewOtp);
userRoutes.post("/verify-user", verifyUser);
userRoutes.post("/reset-password", reSetPassword);
userRoutes.post("/confirm-otp", confirmOtp);
userRoutes.post("/forgot-password", forgotPassword);
userRoutes.post("/login", loginUser);
userRoutes.post("/logout", logout);
userRoutes.post("/admin/login", adminLogin);
userRoutes.post("/register", registerUser);
userRoutes.post("/add-cart", checkAuth, addCart);
userRoutes.get("/", [checkAuth, checkAdmin], getAllUsers);
userRoutes.get("/cart/qty", checkAuth, getCartNumber);
userRoutes.get("/admin/details/", [checkAuth, checkAdmin], adminList);
userRoutes.get("/cart", checkAuth, getUserCart);
userRoutes.put("/cart/add-qty", checkAuth, addCartQty);
userRoutes.put("/cart/decrease-qty", checkAuth, decreaseCartQty);
userRoutes.delete("/cart", checkAuth, removeCart);

module.exports = userRoutes;
