require("dotenv").config({
  path: "./variables.env",
});
const express = require("express");
const morgan = require("morgan");
const path = require("path");

const flash = require("connect-flash");

const passport = require("passport");
const cors = require("cors");
const router = require("./routes/routes");
const mongodb = require("./configs/db");
const sessionMiddleware = require("./helpers/session");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(sessionMiddleware);

require("./helpers/passport");

app.use(passport.initialize());
app.use(passport.session());
const port = process.env.PORT || 3000;
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(flash());
app.use(express.urlencoded({ extended: false }));
mongodb.connect();
app.use(cors(corsOptions));
app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
