//Base modules
const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

//Model (if needed)
const Itinerary = require('../models/schemaItinerary');

//  GET
//  /itineraries
//  Returns all itineraries
router.get('/', (req, res) => {
  Itinerary.find().then(itineraries => res.json(itineraries));
});

//  GET
//  /itineraries/:city
//  Returns itineraries of a particular city
router.get('/:city', (req, res) => {
  const cityId = mongoose.Types.ObjectId(req.params.city);

  Itinerary.find({ city: cityId }).then(itineraries => {
    res.json(itineraries);
  });
});

module.exports = router;
