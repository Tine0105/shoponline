require("../utils/MongooseUtil");
const Models = require("./Models");
const Product = Models.Product;

const CategoryDAO = {
  async selectALL() {
    const query = {};
    const categories = await Models.Category.find(query).exec();
    return categories;
  },

  async insert(category) {
    const mongoose = require("mongoose");
    category._id = new mongoose.Types.ObjectId();
    const result = await Models.Category.create(category);
    return result;
  },

  async update(category) {
    const newvalues = { name: category.name };
    const result = await Models.Category.findByIdAndUpdate(
      category._id,
      newvalues,
      { new: true },
    );
    return result;
  },

  async delete(_id) {
    const mongoose = require("mongoose");
    // find products that embed this category by matching embedded category._id
    const products = await Product.find({ "category._id": _id }).exec();
    if (products && products.length > 0) {
      throw new Error("Category has products, cannot delete");
    }

    const result = await Models.Category.findByIdAndDelete(_id);
    return result;
  },
  async selectByID(_id) {
    const category = await Models.Category.findById(_id).exec();
    return category;
  },
};
module.exports = CategoryDAO;
