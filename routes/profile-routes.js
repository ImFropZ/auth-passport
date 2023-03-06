const router = require("express").Router();
const authenticate = require("../middlewares/authentication").authentication;

router.get("/", authenticate, (req, res) => {
  res.render("profile", { user: req.user });
});

module.exports = router;
