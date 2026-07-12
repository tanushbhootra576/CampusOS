import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Simple in-memory rate limiter using a Map (Sliding window over 1 minute)
// Note: In a real distributed app, use Redis (@upstash/ratelimit)
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

function applyRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 30; // 30 requests per minute

  const record = rateLimitMap.get(ip);
  if (!record || record.expiresAt < now) {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + windowMs });
    return true; // Allowed
  }

  if (record.count >= maxRequests) {
    return false; // Rate limited
  }

  record.count += 1;
  return true; // Allowed
}

export async function middleware(req: NextRequest) {
  // 1. Rate Limiting
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const isAllowed = applyRateLimit(ip);

  if (!isAllowed) {
    return NextResponse.json({ error: "Too Many Requests" }, { status: 429 });
  }

  // 2. Protect Routes
  // We want to protect the `/dashboard` route (and any other protected ones)
  const pathname = req.nextUrl.pathname;
  if (pathname.startsWith("/dashboard")) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    
    if (!token) {
      // Redirect to sign in if no valid JWT token is found
      const signInUrl = new URL("/api/auth/signin", req.url);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

// Specify which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
