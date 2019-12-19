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

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecretKey
};

exports.jwt = passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.userId).select(
        "-userPassword"
      );

      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      console.log(error);
    }
  })
);

exports.google = passport.use(
  new GoogleStrategy(
    {
      clientID: googleIds.clientId,
      clientSecret: googleIds.clientSecret,
      callbackURL: "http://localhost:3030/api/users/login/google/callback"
    },
    async function(accessToken, refreshToken, profile, cb) {
      try {
        const googleUser = await User.findOne({
          userEmail: profile.emails[0].value
        }).select("-userPassword");

        if (!googleUser) {
          const newGoogleUser = await User.create({
            userName: profile.displayName,
            userEmail: profile.emails[0].value,
            userGoogleId: profile.id
          });
          delete newGoogleUser.userPassword;
          cb(null, newGoogleUser);
        }
        return cb(null, googleUser);
      } catch (error) {
        console.log(error);
        cb(error, null);
      }
    }
  )
);
