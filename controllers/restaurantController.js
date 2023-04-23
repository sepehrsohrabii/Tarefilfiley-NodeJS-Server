const { UniqueString } = require("unique-string-generator");
const CategoryModel = require("../models/Category");
const ProductModel = require("../models/Product");
const RestaurantModel = require("../models/Restaurant");

const create = async (req, res) => {
  const restaurant = new RestaurantModel({
    link: UniqueString(),
    creator: req.body.userID,
  });
  await restaurant.save();
  res.send(restaurant.id);
};

const update = async (req, res) => {
  const {
    restaurantID,
    persianName,
    englishName,
    link,
    img,
    logo,
    phone,
    hours,
    userID,
  } = req.body;
  const restaurant = await RestaurantModel.findById(restaurantID).exec();
  restaurant.persianName = persianName;
  restaurant.englishName = englishName;
  restaurant.image = img;
  restaurant.logo = logo;
  restaurant.phoneNumber = phone;
  restaurant.openingHours = hours;
  restaurant.link = link;
  restaurant.creator = userID;
  await restaurant.save();
  res.send(restaurant);
};
const all = async (req, res) => {
  const { userID } = req.body;
  const allRestaurant = await RestaurantModel.find({
    creator: userID,
  });
  res.send(allRestaurant);
};
const remove = async (req, res) => {
  const { userID, restaurantID } = req.body;
  await ProductModel.deleteMany({
    creator: userID,
    restaurant: restaurantID,
  });
  await CategoryModel.deleteMany({
    creator: userID,
    restaurant: restaurantID,
  });
  await RestaurantModel.deleteMany({
    creator: userID,
    _id: restaurantID,
  });
  res
    .status(200)
    .send("Restaurant with all categories and products deleted successfully");
};
const getData = async (req, res) => {
  const { restaurantLink } = req.body;
  try {
    const restaurant = await RestaurantModel.findOne({
      link: restaurantLink,
    }).exec();
    const categories = await CategoryModel.find({
      restaurant: restaurant._id,
    });
    const products = await ProductModel.find({
      restaurant: restaurant._id,
    });
    res.status(200).send({
      restaurant,
      categories,
      products,
    });
  } catch (error) {
    res.status(400).send({
      error,
    });
  }
};
module.exports = { create, update, all, remove, getData };
