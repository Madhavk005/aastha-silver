import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "placeholder_secret",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, currency = "INR" } = body;

    if (!amount) {
      return NextResponse.json({ error: "Amount is required" }, { status: 400 });
    }

    const receiptId = "receipt_" + Math.random().toString(36).substring(7);

    // 1. Create Razorpay Order
    const options = {
      amount: Math.round(amount * 100), 
      currency,
      receipt: receiptId,
    };

    const razorpayOrder = await razorpay.orders.create(options);
    
    return NextResponse.json(razorpayOrder, { status: 200 });
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
