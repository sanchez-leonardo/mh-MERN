const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itinerarySchema = new Schema({
  city: Schema.Types.ObjectId,
  user: String,
  profile_pic: String,
  title: String,
  rating: String,
  duration: String,
  price: String,
  hashtags: Array
});

const itinerary = mongoose.model("itinerary", itinerarySchema);

module.exports = itinerary;
