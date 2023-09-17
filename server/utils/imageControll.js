const brandModel = require("../models/brandModel");
const categoryModel = require("../models/categoryModel");
const cloudinary = require("cloudinary");

const deleteCategoryImage = async (req, res) => {
  try {
    const { id, public_id } = req.body;
    const isExist = await categoryModel.findOne({
      _id: id,
      "image.public_id": public_id,
    });
    if (isExist) {
      await cloudinary.v2.uploader.destroy(public_id);
      await categoryModel.findByIdAndUpdate(id, { image: {} }, { new: true });
      return res.status(200).json({ message: "Deleted image" });
    } else {
      return res.status(404).json({ message: "Item not valid" });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};
const deleteBrandImage = async (req, res) => {
  try {
    const { id, public_id } = req.body;
    const isExist = await brandModel.findOne({
      _id: id,
      "image.public_id": public_id,
    });
    if (isExist) {
      await cloudinary.v2.uploader.destroy(public_id);
      await brandModel.findByIdAndUpdate(id, { image: {} }, { new: true });
      return res.status(200).json({ message: "Deleted image" });
    } else {
      return res.status(404).json({ message: "Item not valid" });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

module.exports = { deleteCategoryImage, deleteBrandImage };
