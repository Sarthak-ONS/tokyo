const { App, LogLevel } = require("@slack/bolt");
const { appHomeView } = require("./views");
const EVENTS = require("./events.constants");

const { SIGNING_SECRET, OAUTH_BOT_TOKEN } = process.env;

const slackApp = new App({
  signingSecret: SIGNING_SECRET,
  token: OAUTH_BOT_TOKEN,
  ignoreSelf: false,
  logLevel: LogLevel.DEBUG,
});

slackApp.event(EVENTS.APP_HOME_OPENED, async ({ event, client }) => {
  await client.views.publish({
    user_id: event.user,
    view: appHomeView,
  });
});

module.exports = slackApp;
