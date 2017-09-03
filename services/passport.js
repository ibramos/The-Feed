const passport = require("passport");
const passportGoogleStrategy = require("passport-google-oauth20");
const keys = require("../server/config/keys");

/**
 * Authenticate using Passport's Google Strategy.
 * @param {String} {clientID} - keys.googleClientID generated from Google+ API.
 * @param {String} {clientSecret} - keys.googleClientSecret generated from Google+ API.
 */

passport.use(
  new passportGoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/oAuth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("accessToken: ", accessToken);
      console.log("refreshToken: ", refreshToken);
      console.log("profile: ", profile);
      console.log("done: ", done);
    }
  )
);
