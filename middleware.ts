import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

function applyRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxRequests = 30; 

  const record = rateLimitMap.get(ip);
  if (!record || record.expiresAt < now) {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + windowMs });
    return true; 
  }

  if (record.count >= maxRequests) {
    return false; 
  }

  record.count += 1;
  return true; 
}

export async function middleware(req: NextRequest) {
  
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  const isAllowed = applyRateLimit(ip);

  if (!isAllowed) {
    return NextResponse.json({ error: "Too Many Requests" }, { status: 429 });
  }
  const pathname = req.nextUrl.pathname;
  const protectedPrefixes = [
    "/dashboard",
    "/my-clubs",
    "/my-events",
    "/my-certificates",
    "/my-blogs",
    "/my-projects",
    "/notifications",
    "/settings",
    "/admin",
    "/super-admin",
  ];
  const requiresAuth = protectedPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (requiresAuth) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      const signInUrl = new URL("/auth/signin", req.url);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
