import { cookies } from "next/headers";
import type { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export const OAUTH_PKCE_COOKIE = "auth_oauth_verifier";
export const OAUTH_REDIRECT_COOKIE = "auth_oauth_redirect";

export type SessionUser = {
  id: string;
  email: string;
  name: string;
};

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  bytes.forEach((byte) => (binary += String.fromCharCode(byte)));
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function generatePkcePair() {
  const verifierBytes = new Uint8Array(32);
  crypto.getRandomValues(verifierBytes);
  const verifier = toBase64Url(verifierBytes);
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier));
  return { verifier, challenge: toBase64Url(new Uint8Array(digest)) };
}

const OAUTH_COOKIE_SECONDS = 10 * 60;

export function setOAuthPendingCookies(response: NextResponse, verifier: string, redirectPath: string) {
  response.cookies.set(OAUTH_PKCE_COOKIE, verifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/auth/google",
    maxAge: OAUTH_COOKIE_SECONDS,
  });
  response.cookies.set(OAUTH_REDIRECT_COOKIE, redirectPath, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/auth/google",
    maxAge: OAUTH_COOKIE_SECONDS,
  });
}

export function clearOAuthPendingCookies(response: NextResponse) {
  response.cookies.set(OAUTH_PKCE_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/auth/google",
    maxAge: 0,
  });
  response.cookies.set(OAUTH_REDIRECT_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/auth/google",
    maxAge: 0,
  });
}

export function safeInternalRedirect(raw: string | null, fallback = "/account"): string {
  if (!raw) return fallback;
  if (!raw.startsWith("/") || raw.startsWith("//") || raw.startsWith("/api/")) return fallback;
  return raw;
}

export function userFromSupabase(user: {
  id: string;
  email?: string | null;
  user_metadata?: Record<string, unknown>;
}): SessionUser {
  const metadata = user.user_metadata ?? {};
  const name =
    typeof metadata.full_name === "string" && metadata.full_name
      ? metadata.full_name
      : typeof metadata.name === "string" && metadata.name
        ? metadata.name
        : (user.email ?? "").split("@")[0];

  return {
    id: user.id,
    email: user.email ?? "",
    name,
  };
}

export async function createSessionClient() {
  const cookieStore = await cookies();
  return createClient(cookieStore);
}

export async function getSessionFromCookies(): Promise<SessionUser | null> {
  const supabase = await createSessionClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;
  return userFromSupabase(data.user);
}