// app/api/auth/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const jwt = searchParams.get('jwt');

  if (jwt) {
    const cookieStore = cookies();
    cookieStore.set('JWT', jwt, { maxAge: 60 * 60 * 24, httpOnly: true });

    // After setting the cookie, redirect to the homepage or another destination
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.json({ error: 'JWT token is missing' }, { status: 400 });
}
