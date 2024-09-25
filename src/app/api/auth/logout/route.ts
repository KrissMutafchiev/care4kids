import { NextResponse } from 'next/server';

export async function POST() {
  // Create a response object
  const response = NextResponse.json({ message: 'Logged out successfully' });

  // Clear cookies by setting them with empty values and a past expiration date
  response.cookies.set('jwtToken', '', {
    maxAge: -1,
    path: '/',
  });

  response.cookies.set('userData', '', {
    maxAge: -1,
    path: '/',
  });

  return response;
}