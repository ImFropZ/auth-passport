const mongooes = require("mongoose");
const Schema = mongooes.Schema;

const userSchema = new Schema(
  {
    username: String,
    googleId: String,
    email: String,
  },
  { collection: "user" }
);

const User = mongooes.model("user", userSchema);

module.exports = User;
