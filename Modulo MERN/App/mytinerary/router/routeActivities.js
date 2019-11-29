//Base modules
const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

//Model (if needed)
const Activities = require('../models/schemaActivity');

//  GET
//  /itineraries
//  Returns all itineraries
router.get('/', (req, res) => {
  Activities.find().then(activities => res.json(activities));
});

module.exports = router;
