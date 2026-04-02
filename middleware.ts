import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';

  if (hostname.includes('vifadigital')) {
    const url = request.nextUrl.clone();
    url.pathname = '/index-vifa.html';
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!assets/|_next/|.*\\..*).*)'],
};
