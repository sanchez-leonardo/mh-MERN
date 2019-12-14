//Passport
const passport = require("passport");
//User Schema
const User = require("../models/schemaUser");
//Passport Strategies
const JwtStrategy = require("passport-jwt").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
//Token extractor
const ExtractJwt = require("passport-jwt").ExtractJwt;
//secret keys
const jwtSecretKey = require("../config_keys").jwtSecretKey;
const googleIds = require("../config_keys").googleThings;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = jwtSecretKey;

exports.jwt = passport.use(
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

exports.google = passport.use(new GoogleStrategy({
  clientID: googleIds.clientId,
  clientSecret: googleIds.clientSecret,
  callbackURL: "http://localhost:3030/api/users/login/google/callback"
},
  async function (accessToken, refreshToken, profile, cb) {
    //console.log('profile Google', profile)
    try {
      const userRequired = await User.findOne({ userEmail: profile.emails[0].value }).select('-userPassword')

      if (!userRequired) {
        const userCreated = await User.create({
          userName: profile.displayName,
          userPassword: profile.id,
          userEmail: profile.emails[0].value
        })
        delete userCreated.userPassword;
        cb(null, userCreated)
      }
      return cb(null, userRequired);

    } catch (error) {
      console.log(error)
      cb(error, null)
    }
  }
));
