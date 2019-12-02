const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: { type: String, required: true },
  userPassword: { type: String, required: true },
  userEmail: { type: String, required: true },
  userFirstName: { type: String },
  userLastName: { type: String },
  userCountry: { type: String }
});

const user = mongoose.model("user", userSchema);

module.exports = user;
