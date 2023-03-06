const router = require("express").Router();
const passport = require("passport");

// Auth Login
router.get("/login", (req, res) => {
  res.render("login");
});

// Auth Logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});

// Auth Google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

// Auth Google Redirect
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  // console.log(req.user);
  res.redirect("/profile");
});

module.exports = router;
