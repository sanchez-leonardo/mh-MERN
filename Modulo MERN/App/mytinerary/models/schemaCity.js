const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
  city: String,
  country: String
});

const City = mongoose.model('city', citySchema);

module.exports = City;
