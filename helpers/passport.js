const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const UserModel = require("../models/User");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      const user = await UserModel.findOne({
        email,
      });

      if (!user) {
        return done(null, false, { message: "ایمیل اشتباه است." });
      }
      if (!UserModel.validPassword(user, password)) {
        return done(null, false, { message: "پسورد اشتباه است." });
      }
      return done(null, user);
    }
  )
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  UserModel.findById(id, (err, user) => {
    if (err) return done(err);
    done(null, user);
  });
});
