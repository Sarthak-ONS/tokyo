const { App } = require("@slack/bolt");
const { appHomeView, createJiraIssueView } = require("./views");
const { createJiraIssue, fetchAllIssueTypes } = require("./helpers");
const EVENTS = require("./events.constants");

const { SIGNING_SECRET, OAUTH_BOT_TOKEN } = process.env;

const slackApp = new App({
  signingSecret: SIGNING_SECRET,
  token: OAUTH_BOT_TOKEN,
});

slackApp.event(EVENTS.APP_HOME_OPENED, async ({ event, client }) => {
  await client.views.publish({
    user_id: event.user,
    view: appHomeView,
  });
});

slackApp.event(EVENTS.MESSAGE, async ({ event, client }) => {
  try {
    const res = await createJiraIssue({ issueSummary: event.text });

    await client.chat.postMessage({
      channel: event.channel,
      text: `Issue created: ${res.key} - ${res.self}`,
      thread_ts: event.ts,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `Issue created: ${res.key} - ${res.self}`,
          },
          accessory: {
            type: "button",
            text: {
              type: "plain_text",
              text: "View Issue",
              emoji: true,
            },
            value: "click_me_123",
            url: res.self,
            action_id: "button-action",
          },
        },
      ],
    });
  } catch (error) {
    await client.chat.postMessage({
      channel: event.channel,
      text: "Something went wrong. Please try again!",
    });
  }
});

slackApp.command(EVENTS.CREATE_ISSUE_COMMAND, async ({ ack, body, client }) => {
  await ack();

  const jiraIssues = await fetchAllIssueTypes({
    projectID: "10002",
  });

  const view = createJiraIssueView({
    issueTypes: jiraIssues,
  });

  await client.views.open({
    trigger_id: body.trigger_id,
    view,
  });
});

slackApp.view("create_issue_modal_callback", async ({ ack, body, client }) => {
  await ack();

  const { issue_summary, issue_type } = body.view.state.values;

  const res = await createJiraIssue({
    issueSummary: Object.values(issue_summary)[0].value,
    issueTypeID: Object.values(issue_type)[0].selected_option.value,
  });

  await client.chat.postMessage({
    channel: body.user.id,
    text: `Issue created: ${res.key} - ${res.self}`,
  });
});

slackApp.error((error) => {
  console.error(error);
});

module.exports = slackApp;
