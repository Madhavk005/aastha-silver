import { NextResponse } from "next/server";
import { createSessionClient } from "@/lib/auth-server";

export async function POST() {
  try {
    const supabase = await createSessionClient();
    await supabase.auth.signOut();
  } catch {
    // Session may already be invalid; clearing below still applies.
  }
  return NextResponse.json({ success: true });
}