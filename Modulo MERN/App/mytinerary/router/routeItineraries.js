//Base modules
const express = require('express');
const router = express.Router();
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
//  Returns itineraries from a city
router.get('/:city', (req, res) => {

});

module.exports = router;