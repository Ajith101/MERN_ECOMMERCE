const getAllProducts = (req, res) => {
  try {
    const products = require("../products.json");
    const results = products?.map((item) => {
      return {
        id: item.id,
        title: item.title,
        category: item.category,
        description: item.description,
        thumbnail: item.thumbnail,
        discountPercentage: item.discountPercentage,
        price: item.price,
      };
    });
    return res.status(200).json(results);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};
const bySingleProduct = (req, res) => {
  try {
    const { id } = req.body;
    const products = require("../products.json");
    const isExist = products.find((item) => id == item.id);
    if (isExist) return res.status(200).json({ ...isExist, qty: 1 });
    else return res.status(404).json({ message: "Item not found single" });
  } catch (error) {
    return res.status(404).json({ message: "Something went wrong" });
  }
};
const searchProducts = (req, res) => {
  const { values } = req.query;
  try {
    const products = require("../products.json");
    const result =
      values.length &&
      products.filter((item) => {
        return item.title.toLowerCase().includes(values);
      });
    if (result.length) {
      const filteredResult = result.map((item) => {
        return {
          title: item.title,
          category: item.category,
          thumbnail: item.thumbnail,
          id: item.id,
        };
      });
      return res.status(200).json(filteredResult);
    } else return res.status(200).json([]);
  } catch (error) {
    return res.status(404).json({ message: "Something went wrong" });
  }
};
const byCategory = (req, res) => {
  try {
    const { category } = req.body;
    const products = require("../products.json");
    const results = products.filter((item) => {
      return item.category.toLowerCase() === category.toLowerCase();
    });
    return res.status(200).json(results);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};
const trendingItems = (req, res) => {
  try {
    const products = require("../products.json");
    const results = products?.filter((item) => {
      return item.discountPercentage > 15;
    });
    const response = results?.slice(0, 10).map((item) => {
      return {
        id: item.id,
        title: item.title,
        category: item.category,
        description: item.description,
        thumbnail: item.thumbnail,
        discountPercentage: item.discountPercentage,
        price: item.price,
        rating: item.rating,
      };
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};

const getAllCategoryNames = (req, res) => {
  try {
    const products = require("../products.json");
    const names = products.map((item) => {
      return item.category;
    });
    const results = names?.filter((item, id) => {
      return names.indexOf(item) === id;
    });
    return res.status(200).json(results);
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};

module.exports = {
  getAllProducts,
  bySingleProduct,
  searchProducts,
  byCategory,
  trendingItems,
  getAllCategoryNames,
};
