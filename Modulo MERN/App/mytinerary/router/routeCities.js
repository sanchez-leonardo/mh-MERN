//Base modules
const express = require("express");
const router = express.Router();
//Model
const City = require("../models/schemaCity");

//  GET
//  /cities
//  Returns all cities
router.get("/", (req, res) => {
  City.find()
    .sort({ city: 1 })
    .then(cities => res.json(cities));
});

//  GET
//  /cities/:id
//  Returns one city
router.get("/:city", (req, res) => {
  const cityId = mongoose.Types.ObjectId(req.params.city);

  City.find(cityId).then(city => res.json(city));
});

//  POST
//  /cities
//  Adds a city
router.post("/", (req, res) => {
  const newCity = new cityModel({
    name: req.body.name,
    country: req.body.country
  });

  newCity
    .save()
    .then(city => {
      res.status(201).json(city);
    })
    .catch(err => {
      res.status(500).json({ error: "Server error" });
    });
});

module.exports = router;
