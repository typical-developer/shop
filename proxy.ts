import { NextResponse, type NextRequest } from "next/server";

export function proxy(_request: NextRequest): Response {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|_next/data|_vercel|eve(?:/|$)|_eve_internal(?:/|$)|agent/ucp-profile\\.json$|apple-icon\\.png$|favicon\\.ico$|icon\\.svg$|icons/|llms\\.txt$|manifest\\.webmanifest$|og-default\\.png$|robots\\.txt$|sitemap\\.xml$|sitemap/).*)",
  ],
};
