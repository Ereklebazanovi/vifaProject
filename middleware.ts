export const config = {
  // Match all paths except static assets and files with extensions
  matcher: ['/((?!assets/|.*\\..+).*)'],
};

export default async function middleware(request: Request): Promise<Response | undefined> {
  const hostname = new URL(request.url).hostname;

  if (hostname.includes('vifadigital')) {
    // Fetch the VIFA-specific HTML and serve it transparently (URL stays the same)
    const vifaUrl = new URL('/index-vifa.html', request.url);
    return fetch(vifaUrl.toString());
  }

  // For all other domains (inventogeo.com), continue normally
  return undefined;
}
