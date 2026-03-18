import { NextResponse } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const accessToken = cookies().get('atlassian_access_token')?.value;
    const cloudId = cookies().get('atlassian_cloud_id')?.value;

    if (!accessToken || !cloudId) {
      return NextResponse.json(
        { error: "Jira API configuration is missing. Please authenticate via Atlassian OAuth." },
        { status: 401 }
      );
    }

    // This JQL query fetches issues assigned to the current user that are unresolved
    const jqlConfig = `assignee=currentUser() AND resolution=Unresolved`;

    // Fetch issues using proxy URL and OAuth Bearer token
    const response = await axios.get(`https://api.atlassian.com/ex/jira/${cloudId}/rest/api/3/search`, {
       params: {
          jql: jqlConfig,
          maxResults: 50,
          fields: "summary,status,duedate,priority,customfield_10016,updated,created"
       },
       headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json'
       }
    });

    const issues = response.data.issues.map((issue: any) => ({
       id: issue.id,
       key: issue.key,
       summary: issue.fields.summary,
       status: issue.fields.status.name,
       priority: issue.fields.priority.name,
       dueDate: issue.fields.duedate,
       updated: issue.fields.updated,
       created: issue.fields.created,
       storyPoints: issue.fields.customfield_10016 || 0
    }));

    return NextResponse.json({
        totalAssigned: response.data.total,
        totalPoints: issues.reduce((acc: number, task: any) => acc + (task.storyPoints || 0), 0),
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
