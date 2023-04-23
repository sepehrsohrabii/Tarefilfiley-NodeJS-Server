const CategoryModel = require("../models/Category");
const ProductModel = require("../models/Product");

const create = async (req, res) => {
  const { title, categoryName, userID, restaurantID } = req.body;
  const existingCategory = await CategoryModel.findOne({
    $and: [{ title }, { restaurant: restaurantID }, { creator: userID }],
  });
  if (existingCategory) {
    existingCategory.title = categoryName;
    await existingCategory.save();
  } else {
    const newCategory = new CategoryModel({
      title: categoryName,
      restaurant: restaurantID,
      creator: userID,
    });

    await newCategory.save();
  }
  res.status(200).send("category document created/updated successfully");
};
const all = async (req, res) => {
  const { userID, restaurantID } = req.body;
  const allCategories = await CategoryModel.find({
    creator: userID,
    restaurant: restaurantID,
  });
  res.send(allCategories);
};
const remove = async (req, res) => {
  const { userID, restaurantID, categoryID } = req.body;
  await ProductModel.deleteMany({
    creator: userID,
    restaurant: restaurantID,
    category: categoryID,
  });
  await CategoryModel.deleteMany({
    creator: userID,
    restaurant: restaurantID,
    _id: categoryID,
  });
  res.status(200).send("Category with all products deleted successfully");
};
module.exports = {
  create,
  all,
  remove,
};
