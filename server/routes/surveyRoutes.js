const _ = require("lodash");
const Path = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const requireSignIn = require("../middlewares/requireSignIn");
const requireCredits = require("../middlewares/requireCredits");
const Mailer = require("../services/Mailer");
const surveyTemplate = require("../services/templates/surveyTemplate");

const Survey = mongoose.model("surveys");

module.exports = app => {
  app.get("/api/surveys", requireSignIn, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false
    });
    res.send(surveys);
  });

  app.get("/api/surveys/:surveyID/:choice", (req, res) => {
    res.send("Thank you for your response.");
  });

  app.post("/api/surveys/webhooks", (req, res) => {
    const parsedURL = new Path("/api/surveys/:surveyID/:choice");
    _.chain(req.body)
      .map(({ email, url }) => {
        //do not destructure because match can be null
        const match = parsedURL.test(new URL(url).pathname);
        if (match) {
          return { email, surveyID: match.surveyID, choice: match.choice };
        }
      })
      .compact()
      .uniqBy("email", "surveyID")
      .each(({ surveyID, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyID,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { "recipients.$.responded": true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();

    res.send({});
  });

  app.post("/api/surveys", requireSignIn, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(",").map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
