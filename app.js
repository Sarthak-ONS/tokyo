const { App } = require("@slack/bolt");
const { appHomeView } = require("./views");

const { SIGNING_SECRET, OAUTH_BOT_TOKEN } = process.env;

const slackApp = new App({
  signingSecret: SIGNING_SECRET,
  token: OAUTH_BOT_TOKEN,
  ignoreSelf: false,
});

slackApp.event("app_home_opened", async ({ event, client }) => {
  await client.views.publish({
    user_id: event.user,
    view: appHomeView,
  });
});

module.exports = slackApp;
