const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    //cookie will last 30 days => (30days * 24hrs * 60mins * 60secs * 1000ms)
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

//require returns a function which can be immediately invoked to take in the app object
require("./routes/oAuthRoutes")(app);
require("./routes/paymentRoutes")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "/../client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Listening to port: ", PORT);
});
