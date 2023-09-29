const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoute = require("./routes/productRoute");
const cloudinary = require("cloudinary");
const fileUpload = require("express-fileupload");
const brandRoute = require("./routes/brandRoute");
const categoryRoute = require("./routes/categoryRoute");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");

dotenv.config();
const app = express();

connectDB();
const PORT = process.env.PORT | 2040;

app.use(fileUpload());
app.use(
  cors({
    origin: process.env.BASE_URL,
    credentials: true,
    methods: "PUT,POST,GET,DELETE,PATCH,HEAD",
  })
);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/products", productRoute);
app.use("/api/category", categoryRoute);
app.use("/api/user", userRoutes);
app.use("/api/brand", brandRoute);

app.use(notFound);
app.use(errorHandler);

process.on("unhandledRejection", (err) => {
  console.log(err.message);
  console.log(`shutting down the server due to unhandled Promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});

const server = app.listen(PORT, () => {
  console.log(`connected to ${PORT}`);
});
