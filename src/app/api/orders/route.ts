import { NextResponse } from "next/server";
import { getSessionFromCookies } from "@/lib/auth-server";
import { getOrdersByUserId } from "@/lib/orders";

export async function GET() {
  const user = await getSessionFromCookies();
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });

  try {
    const orders = await getOrdersByUserId(user.id);
    return NextResponse.json({ orders });
  } catch {
    return NextResponse.json({ orders: [] });
  }
}