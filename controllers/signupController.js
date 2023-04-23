/* eslint-disable consistent-return */
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const UserModel = require("../models/User");

const get = (req, res) => {};
const post = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    let user = await UserModel.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "کاربری با این ایمیل وجود دارد." }] });
    }

    user = new UserModel({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.json({ msg: "User registered" });
  } catch (err) {
    res.status(500).send("ارور از سمت ماست لطفا مجدد تلاش کنید.");
  }
};

module.exports = {
  get,
  post,
};
