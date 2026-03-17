import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  
  const savedState = cookies().get('atlassian_oauth_state')?.value;
  const referer = cookies().get('atlassian_auth_referer')?.value || '/dashboard';

  let redirectTarget = referer;
  
  if (!code || state !== savedState) {
    if (redirectTarget.includes('?')) redirectTarget += '&jira=error';
    else redirectTarget += '?jira=error';
    return NextResponse.redirect(new URL(redirectTarget, request.url));
  }

  const clientId = process.env.ATLASSIAN_CLIENT_ID;
  const clientSecret = process.env.ATLASSIAN_CLIENT_SECRET;
  let redirectUri = process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/atlassian/callback` : 'http://localhost:3000/api/auth/atlassian/callback';
  if (redirectUri.endsWith('//api/auth/atlassian/callback')) {
    redirectUri = redirectUri.replace('//api', '/api');
  }

  try {
    // 1. Exchange OAuth code for an access_token & refresh_token
    const tokenResponse = await axios.post('https://auth.atlassian.com/oauth/token', {
      grant_type: 'authorization_code',
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: redirectUri
    }, {
      headers: { 'Content-Type': 'application/json' }
    });

    const { access_token, refresh_token } = tokenResponse.data;

    // 2. Discover the cloudId using accessible-resources
    const resourcesResponse = await axios.get('https://api.atlassian.com/oauth/token/accessible-resources', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    if (!resourcesResponse.data || resourcesResponse.data.length === 0) {
      throw new Error("No accessible Jira resources found for this user.");
    }

    const site = resourcesResponse.data.find((resource: any) => resource.scopes.includes('read:jira-work')) || resourcesResponse.data[0];
    const cloudId = site.id;

    // 3. Store tokens and cloudId securely in HttpOnly cookies
    const cookieOptions = { httpOnly: true, secure: process.env.NODE_ENV === 'production', path: '/' };
    cookies().set('atlassian_access_token', access_token, cookieOptions);
    cookies().set('atlassian_cloud_id', cloudId, cookieOptions);
    if (refresh_token) {
      cookies().set('atlassian_refresh_token', refresh_token, cookieOptions);
    }

    // Clear state/referer
    cookies().delete('atlassian_oauth_state');
    cookies().delete('atlassian_auth_referer');

    // 4. Redirect back securely to the setup page with a URL marker
    if (redirectTarget.includes('?')) redirectTarget += '&jira=connected';
    else redirectTarget += '?jira=connected';
    
    return NextResponse.redirect(new URL(redirectTarget, request.url));

  } catch (error: any) {
    console.error("Atlassian OAuth Error:", error.response?.data || error.message);
    if (redirectTarget.includes('?')) redirectTarget += '&jira=error';
    else redirectTarget += '?jira=error';
    return NextResponse.redirect(new URL(redirectTarget, request.url));
  }
}
