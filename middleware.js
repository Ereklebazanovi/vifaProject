import { NextResponse } from 'next/server';

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  // Check if this is a blog post request
  const blogMatch = pathname.match(/^\/blog\/([a-z0-9-]+)$/);

  if (blogMatch) {
    const slug = blogMatch[1];

    // Clone headers and add custom meta tags via response
    const response = NextResponse.next();

    // These headers will be used by the page
    response.headers.set('X-Blog-Slug', slug);

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/blog/:slug*']
};
