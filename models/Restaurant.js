const mongoose = require("mongoose");

const { Schema } = mongoose;

const RestaurantSchema = new Schema({
  persianName: { type: String, default: "جدید" },
  englishName: { type: String, default: "New" },
  phoneNumber: { type: String, default: "۰۹۱۱..." },
  openingHours: { type: String, default: "روزها ..." },
  image: { type: String, default: null },
  logo: { type: String, default: null },
  link: { type: String, required: true, unique: true },
  creator: String,
  created_at: { type: Date, default: Date.now },
});

const RestaurantModel = mongoose.model("restaurants", RestaurantSchema);

module.exports = RestaurantModel;
