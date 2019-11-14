const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itinerarySchema = new Schema({
    user: String,
    profile_pic: String,
    city: String,
    title: String,
    rating: Number,
    duration: Number,
    price: Number,
    hashtags: Array
});

const itinerary = mongoose.model('itinerary', itinerarySchema);

module.exports = itinerary;