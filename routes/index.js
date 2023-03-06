const router = require("express").Router();

const authRoutes = require("./auth-routes");
router.use("/auth", authRoutes);

const profileRoutes = require("./profile-routes");
router.use("/profile", profileRoutes);

module.exports = router;
