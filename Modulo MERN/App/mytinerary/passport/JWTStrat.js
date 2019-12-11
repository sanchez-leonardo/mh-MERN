//Passport
const passport = require("passport");
//User Schema
const User = require("../models/schemaUser");
//Passport Strategy
const JwtStrategy = require("passport-jwt").Strategy;
//Token extractor
const ExtractJwt = require("passport-jwt").ExtractJwt;
//jwt Key
const jwtSecretKey = require("../config_keys").jwtSecretKey;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = jwtSecretKey;

module.exports = passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
      .then(user => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch(err => console.log(err));
  })
);
