const router = require("express").Router();
const passport = require("passport");

// Auth Login
router.get("/login", (req, res) => {
  res.render("login");
});

// Auth Logout
router.get("/logout", (req, res) => {
  res.send("Logout");
});

// Auth Google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// Auth Google Redirect
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  console.log(req.query.code);
  res.send("You in the callback");
});

module.exports = router;
