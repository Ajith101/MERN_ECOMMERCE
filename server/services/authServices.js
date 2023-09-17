const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (user) => {
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "7d" });
  return token;
};

const generateRefreshToken = (user) => {
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "3d" });
  return token;
};

const hashPassword = (password) => {
  const hash = bcrypt.hash(password, 10);
  return hash;
};

const comparePassword = (password, dbPassword) => {
  return bcrypt.compare(password, dbPassword);
};

module.exports = {
  createToken,
  hashPassword,
  comparePassword,
  generateRefreshToken,
};
