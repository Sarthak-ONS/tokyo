const createJiraIssue = ({ issueTypes = [] }) => {
  const formattedIssueTypes = issueTypes.map((issueType) => ({
    text: {
      type: "plain_text",
      text: issueType.name,
      emoji: true,
    },
    value: issueType.id,
  }));

  return {
    type: "modal",
    callback_id: "create_issue_modal_callback",
    title: {
      type: "plain_text",
      text: "Create Issue",
      emoji: true,
    },
    submit: {
      type: "plain_text",
      text: "Create",
      emoji: true,
    },
    close: {
      type: "plain_text",
      text: "Cancel",
      emoji: true,
    },
    blocks: [
      {
        type: "input",
        block_id: "issue_summary",
        element: {
          type: "plain_text_input",
          multiline: true,
        },
        label: {
          type: "plain_text",
          text: "Description of Issue",
          emoji: true,
        },
      },
      {
        type: "actions",
        block_id: "issue_type",
        elements: [
          {
            type: "radio_buttons",
            options: formattedIssueTypes,
          },
        ],
      },
    ],
  };
};

module.exports = createJiraIssue;
