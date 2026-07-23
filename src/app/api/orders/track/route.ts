import { NextRequest, NextResponse } from "next/server";
import { getOrderByOrderNumber } from "@/lib/data";

export async function GET(request: NextRequest) {
  const orderNumber = request.nextUrl.searchParams.get("orderNumber");

  if (!orderNumber) {
    return NextResponse.json({ order: null });
  }

  try {
    const order = await getOrderByOrderNumber(orderNumber);
    return NextResponse.json({ order });
  } catch {
    return NextResponse.json({ order: null });
  }
}
