//Base modules
const express = require("express");
const router = express.Router();
//Model (if needed)
const User = require("../models/schemaUser");
//express-validator methods
const { userValidationRules, validate } = require('./userValidator')
//BCrypt
const bcrypt = require('bcrypt')

//  GET
//  /users
//  Returns all users (Dev Reasons)
router.get("/", (req, res) => {
  User.find().then(users => res.json(users));
});

//  GET
//  /users/:userName
//  Returns one user (Dev Reasons)
router.get("/:userName", (req, res) => {
  const userId = mongoose.Types.ObjectId(req.params.userName);

  User.find(userId).then(user => res.json(user));
});

//  POST
//  /users
//  Adds a User
router.post("/", userValidationRules(), validate, async (req, res) => {

  if (await User.exists({ userName: req.body.userName })) {
    return res.status(403).send({ error: "User name taken" });
  }


  try {

    hashedPassword = await bcrypt.hash(req.body.userPassword, 10)

    const newUser = new User({
      userName: req.body.userName,
      userPassword: hashedPassword,
      userEmail: req.body.userEmail,
      userFirstName: req.body.userFirstName,
      userLastName: req.body.userLastName,
      userCountry: req.body.userCountry
    });

    await newUser.save();
    return res.status(201).send({ user: "created" })

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

//POST
// /login
// Logs a user IN
// router.post("/login", userValidationRules(), validate, async (req, res) => {




// }


module.exports = router;
