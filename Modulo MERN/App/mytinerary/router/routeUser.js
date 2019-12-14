//Base modules
const express = require("express");
const router = express.Router();
const passport = require("passport");

//Model (if needed)
const User = require("../models/schemaUser");

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
    const hashedPassword = await bcrypt.hash(req.body.userPassword, 10);

    const newUser = new User({
      userName: req.body.userName,
      userPassword: hashedPassword,
      userEmail: req.body.userEmail,
      userFirstName: req.body.userFirstName,
      userLastName: req.body.userLastName,
      userCountry: req.body.userCountry
    });

    const user = await newUser.save();
    return res.status(201).json({ userId: user._id, userName: user.userName });
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json(error);
  }
});

//POST
// /login
// Generates a Token with the ID and name of User
router.post("/login", userLoginRules(), validate, async (req, res) => {
  try {
    const user = await User.findOne({ userEmail: req.body.userEmail });

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

        const payload = {
          userId: user._id,
          userName: user.userName,
          userEmail: user.userEmail
        };

        const options = { expiresIn: 43200 };

        jwt.sign(payload, jwtSecretThing, options, (error, token) => {
          if (error) {
            return res.status(400).json({
              error: "An error ocurred: " + error
            });
          }

          return res.status(200).json({
            token: token,
            user: {
              userId: user._id,
              userName: user.userName,
              userEmail: user.userEmail
            }
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
    //console.log('User with google', req.user)
    // Successful authentication, redirect home.
    //Crear pagina de carga para pasar token por url y realizar el pedido a backend
    try {
      const payload = {
        userId: req.user._id,
        userName: req.user.userName,
        userEmail: req.user.userEmail
      };

      const options = { expiresIn: 43200 };

      const token = await jwt.sign(payload, jwtSecretThing, options);

      res.redirect(`http://localhost:3000/log-in/${token}`);
    } catch (error) {
      console.log(error);
    }
  }
);

module.exports = router;
