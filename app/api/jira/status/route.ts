import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET() {
  const accessToken = cookies().get('atlassian_access_token')?.value;
  const domain = cookies().get('atlassian_domain')?.value;

  if (accessToken && domain) {
    return NextResponse.json({ connected: true, domain });
  }

  return NextResponse.json({ connected: false });
}
