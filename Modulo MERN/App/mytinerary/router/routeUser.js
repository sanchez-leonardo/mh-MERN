//Base modules
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const passport = require("passport");

//Model
const User = require("../models/schemaUser");
//For Favs
const ItinerarySchema = require("../models/schemaItinerary");

//express-validator methods
const {
  userCreationRules,
  userLoginRules,
  validate
} = require("./userValidator");

//BCrypt
const bcrypt = require("bcryptjs");

//JWT
const jwt = require("jsonwebtoken");
const jwtSecretThing = require("../config_keys").jwtSecretKey;

//  POST
//  /users
//  Adds a User
router.post("/", userCreationRules(), validate, async (req, res) => {
  if (await User.exists({ userName: req.body.userName })) {
    return res.status(403).json({ error: "User name taken" });
  }

  if (await User.exists({ userEmail: req.body.userEmail })) {
    return res.status(403).json({ error: "Email already registered" });
  }

  try {
    let hashedPassword = await bcrypt.hash(req.body.userPassword, 10);

    let newUser = new User({
      userName: req.body.userName,
      userPassword: hashedPassword,
      userEmail: req.body.userEmail,
      userFirstName: req.body.userFirstName,
      userLastName: req.body.userLastName,
      userCountry: req.body.userCountry
    });

    let user = await newUser.save();
    return res.status(201).json({ userId: user._id, userName: user.userName });
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).send(error);
  }
});

//POST
// /login
// Generates a Token with the ID, name and email
router.post("/login", userLoginRules(), validate, async (req, res) => {
  try {
    let user = await User.findOne({ userEmail: req.body.userEmail });

    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    bcrypt.compare(
      req.body.userPassword,
      user.userPassword,
      (error, success) => {
        if (error) {
          return res.status(400).json({ error: error });
        }

        if (!success) {
          return res.status(400).json({ error: "Invalid Password" });
        }

        let payload = {
          userId: user._id,
          userName: user.userName,
          userEmail: user.userEmail
        };

        let options = { expiresIn: 43200 };

        jwt.sign(payload, jwtSecretThing, options, (error, token) => {
          if (error) {
            return res.status(400).json({
              error: "An error ocurred: " + error
            });
          }

          return res.status(200).json({
            token: token
          });
        });
      }
    );
  } catch (error) {
    return res
      .status(500)
      .json({ error: "something wrong with authentication" });
  }
});

// GET
// /login/google
// Login with google
router.get(
  "/login/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

// GET
// /login/google/callback
// Login with google callback
router.get(
  "/login/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/"
  }),
  async function(req, res) {
    // Successful authentication, redirect home.
    try {
      let payload = {
        userId: req.user._id,
        userName: req.user.userName,
        userEmail: req.user.userEmail
      };

      let options = { expiresIn: 43200 };

      let token = await jwt.sign(payload, jwtSecretThing, options);

      res.redirect(`http://localhost:3000/?token=${token}`);
    } catch (error) {
      res.redirect(`http://localhost:3000/?error=500`);
    }
  }
);

// GET
// /:userId *Auth needed*
// Returns a particular user's info
router.get(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let userId = mongoose.Types.ObjectId(req.params.userId);

      let user = await User.findOne({ _id: userId })
        .select("-userPassword")
        .populate({ path: "userFavs", model: ItinerarySchema });

      res.status(200).json(user);
    } catch (error) {
      res.send(500).send(error);
      console.log(error);
    }
  }
);

// POST
// /:userId/addfav/:itineraryId *Auth needed*
// Adds a user's favs
router.post(
  "/:userId/addFav/:itineraryId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let userId = mongoose.Types.ObjectId(req.params.userId);
      let itineraryId = req.params.itineraryId;

      let user = await User.findOne({ _id: userId }).select("-userPassword");

      if (!user.userFavs.includes(itineraryId)) {
        user.userFavs.push(itineraryId);

        await user.save();

        let updatedUser = await User.findOne({ _id: userId })
          .select("-userPassword")
          .populate({ path: "userFavs", model: ItinerarySchema });

        res.status(200).json(updatedUser.userFavs);
      } else {
        res.status(400).json({ error: "element already in favs" });
      }
    } catch (error) {
      res.send(500).send(error);
      console.log(error);
    }
  }
);

// POST
// /:userId/remfav/:itineraryId *Auth needed*
// Removes a user's fav
router.post(
  "/:userId/remfav/:itineraryId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let userId = mongoose.Types.ObjectId(req.params.userId);
      let itineraryId = req.params.itineraryId;

      let user = await User.findOne({ _id: userId }).select("-userPassword");

      if (user.userFavs.includes(itineraryId)) {
        let newFavs = user.userFavs.filter(fav => fav != itineraryId);
        user.userFavs = newFavs;

        await user.save();

        let updatedUser = await User.findOne({ _id: userId })
          .select("-userPassword")
          .populate({ path: "userFavs", model: ItinerarySchema });

        res.status(200).json(updatedUser.userFavs);
      } else {
        res.status(400).json({ error: "element not in favs" });
      }
    } catch (error) {
      res.send(500).send(error);
      console.log(error);
    }
  }
);

module.exports = router;
