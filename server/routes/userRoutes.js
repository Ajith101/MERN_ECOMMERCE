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
} = require("../controller/userController");
const { checkAuth } = require("../middleware/auth");

const userRoutes = express.Router();

userRoutes.post("/login", loginUser);
userRoutes.post("/logout", logout);
userRoutes.post("/admin/login", adminLogin);
userRoutes.post("/register", registerUser);
userRoutes.post("/add-cart", checkAuth, addCart);
userRoutes.get("/cart/qty", checkAuth, getCartNumber);
userRoutes.get("/cart", checkAuth, getUserCart);
userRoutes.put("/cart/add-qty", checkAuth, addCartQty);
userRoutes.put("/cart/decrease-qty", checkAuth, decreaseCartQty);
userRoutes.delete("/cart", checkAuth, removeCart);

module.exports = userRoutes;
