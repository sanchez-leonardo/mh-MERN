const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const citySchema = new Schema({
  city: { type: String, required: true },
  country: { type: String, required: false },
  img: { type: String, required: false }
});

const City = mongoose.model("city", citySchema, "cities");

module.exports = City;
