import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: {},
      create: { email },
    });

    return NextResponse.json({ success: true, email }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}