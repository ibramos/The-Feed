const passport = require("passport");
const passportGoogleStrategy = require("passport-google-oauth20");
const mongoose = require("mongoose");
const keys = require("../config/keys");
const User = mongoose.model("users");

/**
 * Generate identifying piece of information for users.
 * @param {Object} user - Mongoose document obtained from database.
 * @param {Function} done - Used to end function.
 */
passport.serializeUser((user, done) => {
  /**
   * Callback after every instance of passport usage.
   * @param {Null} null
   * @param {String} user.id - Generated based on MongoDB naming convention. Did not use googleID because oAuth is only used to create sign in. Internal identication will be used after oAuth confirmation.
   */
  done(null, user.id);
});

/**
 * Transform identification to a Mongoose model.
 * @param {String} id - Mongoose document id.
 * @param {Function} done - Used to end function.
 */
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

/**
 * Authenticate using Passport's Google Strategy.
 * @param {String} keys.googleClientID - Generated from Google+ API.
 * @param {String} keys.googleClientSecret - Generated from Google+ API.
 */
passport.use(
  new passportGoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/oAuth/google/callback",
      proxy: true
    },
    /**
     * Callback after Google oAuth confirmation.
     * @param {String} accessToken - Google specific token after authentication.
     * @param {String} refreshToken - Token to renew access.
     * @param {Object} profile - Contains Google account information.
     * @param {Function} done - Used to end function.
     */
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleID: profile.id }).then(userExists => {
        if (userExists) {
          done(null, userExists);
        } else {
          new User({ googleID: profile.id })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
