import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const clientId = process.env.ATLASSIAN_CLIENT_ID;
  let redirectUri = process.env.NEXT_PUBLIC_APP_URL ? `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/atlassian/callback` : 'http://localhost:3000/api/auth/atlassian/callback';
  
  // Quick fix in case URL has trailing slash
  if (redirectUri.endsWith('//api/auth/atlassian/callback')) {
    redirectUri = redirectUri.replace('//api', '/api');
  }

  if (!clientId) {
    return NextResponse.json({ error: "Missing ATLASSIAN_CLIENT_ID in environment variables." }, { status: 500 });
  }

  const state = crypto.randomBytes(16).toString('hex');
  
  // Save state for CSRF protection
  cookies().set('atlassian_oauth_state', state, { httpOnly: true, secure: process.env.NODE_ENV === 'production', path: '/' });

  // The referer indicates where the user initiated the auth flow
  const referer = request.headers.get('referer') || '/dashboard';
  cookies().set('atlassian_auth_referer', referer, { httpOnly: true, secure: process.env.NODE_ENV === 'production', path: '/' });

  const authUrl = new URL('https://auth.atlassian.com/authorize');
  authUrl.searchParams.append('audience', 'api.atlassian.com');
  authUrl.searchParams.append('client_id', clientId);
  authUrl.searchParams.append('scope', 'read:jira-work read:jira-user offline_access');
  authUrl.searchParams.append('redirect_uri', redirectUri);
  authUrl.searchParams.append('state', state);
  authUrl.searchParams.append('response_type', 'code');
  authUrl.searchParams.append('prompt', 'consent'); // Force consent for offline access refresh tokens

  return NextResponse.redirect(authUrl.toString());
}
