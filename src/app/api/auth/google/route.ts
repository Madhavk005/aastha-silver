import { NextRequest, NextResponse } from "next/server";
import {
  clearOAuthPendingCookies,
  safeInternalRedirect,
  OAUTH_PKCE_COOKIE,
  OAUTH_REDIRECT_COOKIE,
  createSessionClient,
} from "@/lib/auth-server";

export async function GET(request: NextRequest) {
  const failRedirect = (error: string) => {
    const response = NextResponse.redirect(new URL(`/sign-in?error=${error}`, request.url));
    clearOAuthPendingCookies(response);
    return response;
  };

  try {
    const code = request.nextUrl.searchParams.get("code");
    const gotError = request.nextUrl.searchParams.get("error");
    const verifier = request.cookies.get(OAUTH_PKCE_COOKIE)?.value;

    if (gotError || !code) {
      return failRedirect(gotError === "access_denied" ? "provider" : "google");
    }
    if (!verifier) {
      return failRedirect("session");
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (!supabaseUrl || !publishableKey) {
      return failRedirect("config");
    }

    const tokenRes = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=pkce`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: publishableKey,
      },
      body: JSON.stringify({ auth_code: code, code_verifier: verifier }),
    });

    if (!tokenRes.ok) {
      console.error(
        "Google OAuth exchange error:",
        tokenRes.status,
        await tokenRes.text().catch(() => "")
      );
      return failRedirect("exchange_failed");
    }

    const data = await tokenRes.json();

    const supabase = await createSessionClient();
    try {
      await supabase.auth.setSession({
        access_token: data.access_token,
        refresh_token: data.refresh_token,
      });
    } catch (err) {
      console.error("Google OAuth setSession error:", err);
      return failRedirect("exchange_failed");
    }

    const redirectPath = safeInternalRedirect(
      request.cookies.get(OAUTH_REDIRECT_COOKIE)?.value ?? null,
      "/account"
    );

    const response = NextResponse.redirect(new URL(redirectPath, request.url));
    clearOAuthPendingCookies(response);
    return response;
  } catch (err) {
    console.error("Google OAuth error:", err);
    return failRedirect("internal");
  }
}