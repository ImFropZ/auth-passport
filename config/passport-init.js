require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/user-model");

passport.use(
  new GoogleStrategy(
    {
      callbackURL: "/auth/google/redirect",
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
    (accessToken, _, profile, done) => {
      // Passport callback function
      User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          console.log("User is : " + currentUser);
          done(null, currentUser);
        } else {
          new User({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
          })
            .save()
            .then((newUser) => {
              console.log("New User Created :" + newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    if (user) done(null, user);
    else
      done(() => {
        console.log("Error");
      }, false);
  });
});
