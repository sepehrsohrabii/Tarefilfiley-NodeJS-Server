const mongoose = require("mongoose");
const UserModel = require("../models/User");

const userController = async (req, res) => {
  const sessionId = req.headers.authorization.replace("Bearer ", "");
  const sessions = await mongoose.connection.client.db().collection("sessions");
  const session = await sessions.findOne({ _id: sessionId });
  if (session) {
    const sessionJson = JSON.parse(session.session);
    const User = await UserModel.findById(sessionJson.passport.user);
    res.status(200).send({
      id: User.id,
      name: User.name,
      restaurants: User.restaurants,
    });
  } else {
    res.status(404).send("Session not found");
  }
};

module.exports = userController;
