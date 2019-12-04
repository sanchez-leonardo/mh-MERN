//Base modules
const express = require("express");
const router = express.Router();
//Model (if needed)
const User = require("../models/schemaUser");
//express-validator methods
const { userValidationRules, validate } = require('./userValidator')

//  GET
//  /cities
//  Returns all users
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
router.post("/", userValidationRules(), validate, async (req, res) => {
  console.log(req.body);

  if (await User.exists({ userName: req.body.userName })) {
    return res.status(403).send("User name taken");
  }

  const newUser = new User({
    userName: req.body.userName,
    userPassword: req.body.userPassword,
    userEmail: req.body.userEmail,
    userFirstName: req.body.userFirstName,
    userLastName: req.body.userLastName,
    userCountry: req.body.userCountry
  });

  try {

    await newUser.save();
    res.status(201).send("User Created")

  }
  catch (e) {

    if (e.name === "MongoError") {
      console.log('Error: ', e.errmsg)
      return res.status(403).send(e.errmsg)
    }

    console.log('Error: ', e.message)
    return res.status(403).send(e.message)
  }


});

module.exports = router;
