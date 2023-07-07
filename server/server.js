const express = require("express");
const productRoute = require("./routes/productRoute");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

const PORT = 2020;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/products", productRoute);

app.listen(PORT, () => {
  console.log(`connected to ${PORT}`);
});
