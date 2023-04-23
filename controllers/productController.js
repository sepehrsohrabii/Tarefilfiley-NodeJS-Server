const ProductModel = require("../models/Product");

const create = async (req, res) => {
  const {
    item,
    productImage,
    productTitle,
    productDescription,
    productPrice,
    productCategory,
    userID,
    restaurantID,
  } = req.body;
  if (item) {
    const existingProduct = await ProductModel.findOne({
      $and: [
        { title: item.title },
        { description: item.description },
        { price: item.price },
        { category: item.category },
        { restaurant: restaurantID },
        { creator: userID },
      ],
    });
    if (existingProduct) {
      existingProduct.image = productImage;
      existingProduct.title = productTitle;
      existingProduct.description = productDescription;
      existingProduct.price = productPrice;
      existingProduct.category = productCategory;
      existingProduct.restaurant = restaurantID;
      existingProduct.creator = userID;
      await existingProduct.save();
    }
  } else {
    const newProduct = new ProductModel({
      image: productImage,
      title: productTitle,
      description: productDescription,
      price: productPrice,
      category: productCategory,
      restaurant: restaurantID,
      creator: userID,
    });
    await newProduct.save();
  }
  res.status(200).send("Product document created/updated successfully");
};
const all = async (req, res) => {
  const { userID, restaurantID } = req.body;
  const allProducts = await ProductModel.find({
    creator: userID,
    restaurant: restaurantID,
  });
  res.send(allProducts);
};
const remove = async (req, res) => {
  const { userID, restaurantID, productID } = req.body;
  await ProductModel.deleteMany({
    creator: userID,
    restaurant: restaurantID,
    _id: productID,
  });
  res.status(200).send("Category with all products deleted successfully");
};
module.exports = {
  create,
  all,
  remove,
};
