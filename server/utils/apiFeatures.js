class APIFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  filter() {
    const { search, sort, categoryId, rating, brand } = this.queryStr;
    let queryObject = {};
    if (categoryId) {
      queryObject.category = categoryId;
    }
    if (brand) {
      queryObject.brand = brand;
    }

    if (search) {
      queryObject.name = { $regex: search, $options: "i" };
    }
    if (rating) {
      queryObject.totalRatings = { $lte: rating };
    }

    const sortOptions = {
      high: "-price",
      low: "price",
      "a-z": "name",
      "z-a": "-name",
    };
    const sortKeys = sortOptions[sort] || sortOptions.newest;
    this.query.find(queryObject).sort(sortKeys);
    return this;
  }
  paginate() {
    const currentPage = Number(this.queryStr.page) || 1;
    const limit = 10;
    const skip = (currentPage - 1) * limit;
    this.query.limit(limit).skip(skip);
    return this;
  }
}

module.exports = APIFeatures;
