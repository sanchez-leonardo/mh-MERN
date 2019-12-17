const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  itinerary: { type: Schema.Types.ObjectId, required: true },
  title: { type: String, required: false },
  address: { type: String, required: false },
  img: { type: String, required: false },
  duration: { type: String, required: false },
  price: { type: String, required: false },
  sumary: { type: String, required: false }
});

const activity = mongoose.model("activity", activitySchema, "activities");

module.exports = activity;
