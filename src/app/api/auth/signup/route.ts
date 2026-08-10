import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createSessionClient, userFromSupabase, type SessionUser } from "@/lib/auth-server";

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!url || !secretKey) throw new Error("Supabase authentication is not configured.");

  return createClient(url, secretKey);
}

export async function POST(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!url || !secretKey) {
    return NextResponse.json(
      { error: "Sign-up is temporarily unavailable. Please try again later." },
      { status: 503 }
    );
  }

  try {
    const { email: rawEmail, password, name: rawName } = await request.json();
    const email = typeof rawEmail === "string" ? rawEmail.trim().toLowerCase() : "";
    const name = typeof rawName === "string" ? rawName.trim().slice(0, 100) : "";

    if (!email || !password || !name || typeof password !== "string" || password.length < 8) {
      return NextResponse.json(
        { error: "Enter a name, valid email, and password of at least 8 characters." },
        { status: 400 }
      );
    }

    const { data: authData, error: authError } = await getSupabaseAdmin().auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      email_confirm: true,
    });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    const supabase = await createSessionClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      return NextResponse.json({ user: userFromSupabase(authData.user) });
    }

    const user: SessionUser = userFromSupabase(authData.user);
    return NextResponse.json({ user });
  } catch (err) {
    console.error("signup error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}