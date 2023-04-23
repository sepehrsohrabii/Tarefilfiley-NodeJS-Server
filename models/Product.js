const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductSchema = new Schema({
  image: String,
  title: String,
  description: String,
  price: String,
  category: String,
  restaurant: String,
  creator: String,
  created_at: { type: Date, default: Date.now },
});
ProductSchema.index(
  {
    title: 1,
    description: 1,
    price: 1,
    category: 1,
    restaurant: 1,
    creator: 1,
  },
  { unique: true }
);
const ProductModel = mongoose.model("products", ProductSchema);

module.exports = ProductModel;
