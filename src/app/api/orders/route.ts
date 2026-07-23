import { NextRequest, NextResponse } from "next/server";
import { getOrdersByUserId } from "@/lib/data";

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ orders: [] });
  }

  try {
    const orders = await getOrdersByUserId(userId);
    return NextResponse.json({ orders });
  } catch {
    return NextResponse.json({ orders: [] });
  }
}
