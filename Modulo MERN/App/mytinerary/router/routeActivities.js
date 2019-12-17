//Base modules
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
//Model
const Activities = require("../models/schemaActivity");

//  GET
//  /itineraries
//  Returns all activities
router.get("/", (req, res) => {
  Activities.find().then(activities => res.json(activities));
});

//  GET
//  /itineraries/:Itineraryid
//  Returns all itineraries
router.get("/:itineraryId", (req, res) => {
  const itineraryId = mongoose.Types.ObjectId(req.params.itineraryId);

  Activities.find({ itinerary: itineraryId }).then(activities => {
    res.json(activities);
  });
});

module.exports = router;
