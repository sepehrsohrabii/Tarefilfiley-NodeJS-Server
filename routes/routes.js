const express = require("express");
const { check } = require("express-validator");
const passport = require("passport");

const multer = require("multer");
const signupController = require("../controllers/signupController");
const loginController = require("../controllers/loginController");

const userController = require("../controllers/userController");
const categoryController = require("../controllers/categoryController");
const restaurantController = require("../controllers/restaurantController");
const productController = require("../controllers/productController");

const router = express.Router();
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 megabytes
  },
});

router.get("/signup", signupController.get);
router.post(
  "/signup",
  [
    check("name", "نام مجموعه باید وارد شود.").notEmpty(),
    check("email", "لطفا ایمیل را به صورت صحیح وارد کنید.").isEmail(),
    check("password", "کلمه عبور باید شامل حداقل ۶ کاراکتر باشد.").isLength({
      min: 6,
    }),
  ],
  signupController.post
);

router.get("/user", userController);

router.get("/login", loginController.get);
router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  (req, res) => {
    res.status(200).send(req.sessionID);
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.send({ message: "Successfully logged out." });
});

router.post("/restaurant/create", restaurantController.create);
router.post(
  "/restaurant/update",
  upload.single("image"),
  restaurantController.update
);
router.post("/restaurant/all", restaurantController.all);
router.delete("/restaurant/remove", restaurantController.remove);
router.post(
  "/restaurant/get-data",
  restaurantController.getData
);

router.post("/category/create", categoryController.create);
router.post("/category/all", categoryController.all);
router.delete("/category/remove", categoryController.remove);

router.post(
  "/product/create",
  upload.single("image"),
  productController.create
);
router.post("/product/all", productController.all);
router.delete("/product/remove", productController.remove);

module.exports = router;
