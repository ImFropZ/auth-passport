// const passport = require("passport");

function authentication(req, res, next) {
  if (!req.user) {
    return res.redirect("/auth/login");
  }
  next();
}

module.exports = {
  authentication,
};
