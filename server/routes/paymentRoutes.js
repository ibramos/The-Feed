const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireSignIn = require("../middlewares/requireSignIn");

module.exports = app => {
  app.post("/api/payment", requireSignIn, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 to purchase 10 credits",
      source: req.body.id
    });

    //if cookie is available, passport will assign the user the specific user model from MongoDB
    req.user.credits += 10;

    //assigned to a variable to ensure the most updated version
    const user = await req.user.save();

    res.send(user);
  });
};
