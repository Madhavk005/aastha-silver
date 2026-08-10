import { NextResponse } from "next/server";
import { getSessionFromCookies } from "@/lib/auth-server";

export async function GET() {
  const user = await getSessionFromCookies();
  if (user) return NextResponse.json({ user });
  return NextResponse.json({ user: null }, { status: 401 });
}