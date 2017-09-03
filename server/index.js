const express = require("express");
require("../services/passport");

const app = express();

//require returns a function which can be immediately invoked to take in the app argument
require("../routes/oAuthRoutes")(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Listening to port: ", PORT);
});
