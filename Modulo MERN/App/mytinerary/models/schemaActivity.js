const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  title: String,
  adress: String,
  img: String,
  duration: String,
  price: String,
  sumary: String
});

const activity = mongoose.model('activity', activitySchema);

module.exports = activity;
