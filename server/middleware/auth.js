const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const asyncHandler = require("./asyncHandler");

// const checkAuth = (req, res, next) => {
//   try {
//     const token = req?.headers?.authorization?.split(" ")[1];
//     if (!token) {
//       return res.status(401).json({ message: "Token not valid" });
//     }
//     jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
//       if (err) {
//         return res.status(401).json({ message: "Invalid Token" });
//       }
//       req.userId = user.userId;
//       return next();
//     });
//   } catch (error) {
//     return res.status(401).json({ message: "Not Authorized" + error });
//   }
// };

const checkAdmin = async (req, res, next) => {
  try {
    const isAdmin = await userModel.findById(req?.userId);
    if (isAdmin?.role !== "admin") {
      return res.status(401).json({ message: "You are not Admin" });
    } else return next();
  } catch (error) {
    return res.status(401).json({ message: "Not Authorized" + error });
  }
};

const checkAuth = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.refreshToken;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        res.status(400);
        throw new Error("Invalid token");
      }
      req.userId = user.userId;
      next();
    });
  } else {
    res.status(401);
    throw new Error("Not authorized, No Token");
  }
});

module.exports = { checkAuth, checkAdmin };
