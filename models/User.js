const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  restaurants: [],
  created_at: { type: Date, default: Date.now },
});

const UserModel = mongoose.model("users", UserSchema);

UserModel.validPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

UserModel.encryptPassword = async (myPlainTextPassword) => {
  const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
  const salt = await bcrypt.genSaltSync(saltRounds);
  const hash = await bcrypt.hashSync(myPlainTextPassword, salt);
  return hash;
};

module.exports = UserModel;
