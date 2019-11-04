//Base modules
const express = require('express');
const router = express.Router();
//Model (if needed)
const City = require('../models/schemaCity');

//  GET
//  /cities
//  Returns all cities
router.get('/', (req, res) => {
  City.find().then(cities => res.json(cities));
});

//TBA Fails to get body elements, body parser needed?
//  POST
//  /cities
//  Adds a city
router.post('/', (req, res) => {
  const newCity = new City({
    city: req.body.city,
    country: req.body.country
  });

  newCity.save().then(city => res.json(city));
});

module.exports = router;
