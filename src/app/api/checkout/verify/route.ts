import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    const secret = process.env.RAZORPAY_KEY_SECRET || "placeholder_secret";
    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    await prisma.order.updateMany({
      where: { razorpayOrderId: razorpay_order_id },
      data: {
        status: "paid",
        paymentId: razorpay_payment_id,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}