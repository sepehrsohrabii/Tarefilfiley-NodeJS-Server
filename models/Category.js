const mongoose = require("mongoose");

const { Schema } = mongoose;

const CategorySchema = new Schema({
  title: { type: String, unique: false },
  restaurant: String,
  creator: String,
  created_at: { type: Date, default: Date.now },
});
CategorySchema.index({ title: 1, restaurant: 1, creator: 1 }, { unique: true });
const CategoryModel = mongoose.model("categories", CategorySchema);

module.exports = CategoryModel;
