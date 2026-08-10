import { NextRequest, NextResponse } from "next/server";
import { createSessionClient, userFromSupabase, type SessionUser } from "@/lib/auth-server";

export async function POST(request: NextRequest) {
  try {
    const { email: rawEmail, password } = await request.json();
    const email = typeof rawEmail === "string" ? rawEmail.trim().toLowerCase() : "";

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const supabase = await createSessionClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error || !data.user) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const user: SessionUser = userFromSupabase(data.user);
    return NextResponse.json({ user });
  } catch (err) {
    console.error("login error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}