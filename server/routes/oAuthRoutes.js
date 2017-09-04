const passport = require("passport");

//Google strategy is wired with the string "google"
module.exports = app => {
  app.get(
    "/oAuth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get("/oAuth/google/callback", passport.authenticate("google"));

  app.get("/api/logoutUser", (req, res) => {
    req.logout();
    res.send(req.user);
  });

  app.get("/api/currentUser", (req, res) => {
    res.send(req.user);
  });
};
