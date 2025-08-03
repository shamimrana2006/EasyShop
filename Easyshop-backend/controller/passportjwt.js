const passport = require("passport");
const { Users_collection } = require("../models/MongoDB_model");
require("dotenv").config();
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

var main_token_cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["token"];
  }
  return token;
};

const mainopts = {
  jwtFromRequest: main_token_cookieExtractor,
  secretOrKey: process.env.SECRETE_JWT_KEY,
};

passport.use(
  "jwt",
  new JwtStrategy(mainopts, async function (jwt_payload, done) {
    try {
      const user = await Users_collection.findOne({
        UserName: jwt_payload.UserName,
      });

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);
