const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    //cookie will last 30 days => (30days * 24hrs * 60mins * 60secs * 1000ms)
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

//require returns a function which can be immediately invoked to take in the app argument
require("./routes/oAuthRoutes")(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Listening to port: ", PORT);
});
