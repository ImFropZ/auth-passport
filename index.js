require("dotenv").config();
require("./config/passport-init");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongooes = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");

// Define
const PORT = process.env.PORT | 3000;

const app = express();

// Set view engine
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(cors());
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_SECRET_KEY],
  })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Connect MongoDB
mongooes.connect(process.env.MONGODB_URI).then(() => {
  console.log("Database is connected.");
});

app.get("/", (req, res) => {
  res.render("home");
});

// Auth Route
const routes = require("./routes/index");
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`The server is hosting on http://localhost:${PORT}`);
});
