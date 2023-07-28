const express = require("express");
const productRoute = require("./routes/productRoute");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

const PORT = process.env.PORT | 2040;

app.use(
  cors({
    origin: `${process.env.BASE_URL}`,
    methods: "GET ,PUT , POST ,DELETE",
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Alow-Origin", `${process.env.BASE_URL}`);
  res.setHeader("Access-Control-Alow-Methods", "GET ,PUT ,POST ,DELETE");
  res.setHeader("Access-Control-Alow-Credentials", "true");
  next();
});

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", productRoute);

app.listen(PORT, () => {
  console.log(`connected to ${PORT}`);
});
