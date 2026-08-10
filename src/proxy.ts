import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

// Routes that require authentication
const PROTECTED_ROUTES = ["/account", "/checkout"];

export async function proxy(request: NextRequest) {
  const { pathname } = new URL(request.url);

  const { supabase, response: supabaseResponse } = createClient(request);

  // Refresh the session so tokens stay valid (skipped when no session exists).
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isProtected = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isProtected && !user) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(signInUrl);
  }

  return supabaseResponse;
}

export const config = {
  // Apply to all routes except API handlers, static assets, and metadata files.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};