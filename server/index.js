const express = require("express");
const morgan = require("morgan");
const winston = require("winston");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
require("./models/User");
require("./models/Survey");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

const logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: "info",
      filename: "thefeed.log",
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: false
    }),
    new winston.transports.Console({
      level: "debug",
      handleExceptions: true,
      json: false,
      colorize: true
    })
  ],
  exitOnError: false
});

logger.stream = {
  write: function(message, encoding) {
    logger.info(message);
  }
};

app.use(require("morgan")("combined", { stream: logger.stream }));
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
require("./routes/surveyRoutes")(app);

if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.use(express.static(path.resolve(__dirname, "..", "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "client", "build", "index.html")
    );
  });
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Listening to port: ", PORT);
});
