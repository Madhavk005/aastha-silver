import { NextRequest, NextResponse } from "next/server";
import {
  generatePkcePair,
  safeInternalRedirect,
  setOAuthPendingCookies,
} from "@/lib/auth-server";

const PROVIDERS = new Set(["google", "microsoft", "apple"]);

export async function GET(request: NextRequest) {
  try {
    const provider = (request.nextUrl.searchParams.get("provider") || "google").toLowerCase();
    if (!PROVIDERS.has(provider)) {
      return NextResponse.redirect(new URL("/sign-in?error=provider", request.url));
    }
    const redirectPath = safeInternalRedirect(request.nextUrl.searchParams.get("redirect"), "/account");

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const apiKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
    if (!supabaseUrl || !apiKey) {
      return NextResponse.redirect(new URL("/sign-in?error=config", request.url));
    }

    const { verifier, challenge } = await generatePkcePair();

    const authorizeUrl = new URL(`${supabaseUrl}/auth/v1/authorize`);
    authorizeUrl.searchParams.set("provider", provider === "microsoft" ? "azure" : provider);
    authorizeUrl.searchParams.set("redirect_to", `${request.nextUrl.origin}/api/auth/google`);
    authorizeUrl.searchParams.set("code_challenge", challenge);
    authorizeUrl.searchParams.set("code_challenge_method", "s256");
    authorizeUrl.searchParams.set("apikey", apiKey);

    const response = NextResponse.redirect(authorizeUrl);
    setOAuthPendingCookies(response, verifier, redirectPath);
    return response;
  } catch (err) {
    console.error("OAuth initiation error:", err);
    return NextResponse.redirect(new URL("/sign-in?error=internal", request.url));
  }
}