require("dotenv").config();
require("./config/passport-init");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongooes = require("mongoose");

// Define
const PORT = process.env.PORT | 3000;

const app = express();

// Set view engine
app.set("view engine", "ejs");

// Connect MongoDB
mongooes.connect(process.env.MONGODB_URI).then(() => {
  console.log("Database is connected.");
});

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.render("home");
});

const authRoutes = require("./routes/auth-routes");
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`The server is hosting on http://localhost:${PORT}`);
});
