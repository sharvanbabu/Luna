import { NextResponse } from 'next/server';
import axios from 'axios';

// Note: To use this in production, you must set these environment variables in your Hosting dashboard:
// JIRA_DOMAIN (e.g., yourcompany.atlassian.net)
// JIRA_EMAIL (your Atlassian account email)
// JIRA_API_TOKEN (generated from Atlassian security settings)

export async function GET(request: Request) {
  try {
    const domain = process.env.JIRA_DOMAIN;
    const email = process.env.JIRA_EMAIL;
    const apiToken = process.env.JIRA_API_TOKEN;

    if (!domain || !email || !apiToken) {
      return NextResponse.json(
        { error: "Jira API configuration is missing. Please add JIRA_DOMAIN, JIRA_EMAIL, and JIRA_API_TOKEN to your environment variables." },
        { status: 500 }
      );
    }

    // Using Basic Auth as required by Jira REST API
    const authHeader = `Basic ${Buffer.from(`${email}:${apiToken}`).toString('base64')}`;

    // This JQL query fetches issues assigned to the current user that are unresolved
    // You can customize the JQL from the frontend by accepting a query param if needed. 
    const jqlConfig = `assignee=currentUser() AND resolution=Unresolved`;

    const response = await axios.get(`https://${domain}/rest/api/3/search`, {
       params: {
          jql: jqlConfig,
          maxResults: 50,
          fields: "summary,status,duedate,priority"
       },
       headers: {
          'Authorization': authHeader,
          'Accept': 'application/json'
       }
    });

    // Formatting response to match what the HR dashboard mock metric logic might eventually expect
    const issues = response.data.issues.map((issue: any) => ({
       id: issue.id,
       key: issue.key,
       summary: issue.fields.summary,
       status: issue.fields.status.name,
       priority: issue.fields.priority.name,
       dueDate: issue.fields.duedate
    }));

    return NextResponse.json({
        totalAssigned: response.data.total,
        issues: issues
    });

  } catch (error: any) {
    console.error("Jira API Error:", error.response?.data || error.message);
    return NextResponse.json(
      { error: "Failed to fetch data from Jira API.", details: error.response?.data || error.message },
      { status: error.response?.status || 500 }
    );
  }
}
