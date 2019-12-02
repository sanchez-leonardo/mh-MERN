//Base modules
const express = require("express");
const router = express.Router();
//Model (if needed)
const User = require("../models/schemaUser");

//  GET
//  /cities
//  Returns all cities
router.get("/", (req, res) => {
  User.find().then(users => res.json(users));
});

//  GET
//  /user/:userName
//  Returns one user
router.get("/:userName", (req, res) => {
  const userId = mongoose.Types.ObjectId(req.params.userName);

  User.find(userId).then(user => res.json(user));
});

//  POST
//  /users
//  Adds a User
router.post("/", async (req, res) => {
  const newUser = new User({
    userName: req.body.userName,
    userPassword: req.body.userPassword,
    userEmail: req.body.userEmail,
    userFirstName: req.body.userName,
    userLastName: req.body.userLastName,
    userCountry: req.body.userCountry
  });

  if (await User.exists({ name: req.body.userName })) {
    res.status(403).send("User name taken");
  } else {
    await newUser.save();
  }
});

module.exports = router;
