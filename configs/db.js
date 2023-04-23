const mongoose = require("mongoose");

const mongodb = {
  connect: async () => {
    await mongoose
      .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .catch((error) => console.error(error));
  },
};

module.exports = mongodb;
