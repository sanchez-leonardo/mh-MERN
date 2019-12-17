const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itinerarySchema = new Schema({
  city: { type: Schema.Types.ObjectId, required: true },
  user: { type: String, required: true },
  profile_pic: { type: String, required: false },
  title: { type: String, required: true },
  rating: { type: Number, required: false, default: 0 },
  duration: { type: String, required: false },
  total_price: { type: String, required: false },
  hashtags: { type: [String], required: false }
});

const itinerary = mongoose.model("itinerary", itinerarySchema, "itineraries");

module.exports = itinerary;
