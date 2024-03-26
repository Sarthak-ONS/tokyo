const { JIRA_AUTHORIZD_EMAIL, JIRA_SECURITY_TOKEN, JIRA_URL } = process.env;

const fetchAllIssueTypes = async ({ projectID }) => {
  try {
    const response = await fetch(
      `${JIRA_URL}/rest/api/2/issuetype/project?projectId=${projectID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(
            `${JIRA_AUTHORIZD_EMAIL}:${JIRA_SECURITY_TOKEN}`
          ).toString("base64")}`,
        },
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    throw Error("Failed to fetch Jira issue types: " + error.message);
  }
};

module.exports = fetchAllIssueTypes;
