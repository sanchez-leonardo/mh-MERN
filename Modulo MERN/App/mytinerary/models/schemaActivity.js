const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  itinerary: Schema.Types.ObjectId,
  title: String,
  address: String,
  img: String,
  duration: String,
  price: String,
  sumary: String
});

const activity = mongoose.model("activity", activitySchema);

module.exports = activity;
