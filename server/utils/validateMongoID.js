const mongoose = require("mongoose");

const validateID = async (id) => {
  const checkExist = mongoose.Types.ObjectId.isValid(id);
  if (!checkExist) throw new Error("Id is not valid");
};

module.exports = validateID;
