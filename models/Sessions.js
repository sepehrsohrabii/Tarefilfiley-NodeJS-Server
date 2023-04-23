const mongoose = require("mongoose");

const { Schema } = mongoose;

const SessionSchema = new Schema({}, { strict: false });

const Session = mongoose.model("sessions", SessionSchema);

module.exports = Session;
