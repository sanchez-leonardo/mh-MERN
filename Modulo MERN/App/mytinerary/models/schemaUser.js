const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: { type: String, required: true, unique: true },
  userPassword: { type: String, required: !this.userGoogleId == null },
  userEmail: {
    type: String,
    required: true
  },
  userFirstName: { type: String, required: false },
  userLastName: { type: String, required: false },
  userCountry: { type: String, required: false },
  userGoogleId: { type: String, required: false },
  userFavs: { type: [Schema.Types.ObjectId], ref: "itinerary", required: false }
});

const user = mongoose.model("user", userSchema, "users");

module.exports = user;
