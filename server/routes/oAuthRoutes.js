const passport = require("passport");

//Google strategy is wired with the string "google"
module.exports = app => {
  app.get(
    "/oAuth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
      prompt : "select_account"
    })
  );

  app.get(
    "/oAuth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/surveys");
    }
  );

  app.get("/api/logoutUser", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/currentUser", (req, res) => {
    res.send(req.user);
  });
};
