const { JIRA_AUTHORIZD_EMAIL, JIRA_SECURITY_TOKEN, JIRA_URL } = process.env;

// Bug - 10010
// Story 10008
// Task  10009
// Subtask 10012

const createJiraIssue = async ({ issueSummary, issueType = "10009" }) => {
  try {
    console.log("CREATING JIRA ISSUE FOR ", { issueSummary, issueType });

    const response = await fetch(`${JIRA_URL}/rest/api/3/issue`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(
          `${JIRA_AUTHORIZD_EMAIL}:${JIRA_SECURITY_TOKEN}`
        ).toString("base64")}`,
      },
      body: JSON.stringify({
        fields: {
          project: {
            key: "RP",
          },
          summary: issueSummary,
          issuetype: {
            id: issueType,
          },
        },
      }),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    throw Error("Failed to create Jira issue: " + error.message);
  }
};

module.exports = createJiraIssue;
