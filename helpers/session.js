require("dotenv").config({
  path: "../variables.env",
});
const Session = require("express-session");
const MongoStore = require("connect-mongo");

const sessionMiddleware = Session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    ttl: 1 * 24 * 60 * 60, // session expires in 1 day
  }),
});

module.exports = sessionMiddleware;
