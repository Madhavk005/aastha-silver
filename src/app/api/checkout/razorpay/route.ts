import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "placeholder_secret",
});

// Admin client to write data
const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || "placeholder",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      amount, 
      currency = "INR", 
      items, 
      customerDetails, 
      shippingAddress 
    } = body;

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
    
    // 2. Save Pending Order to Sanity
    // In dev mode without a token, this might fail, so we wrap it in a try-catch 
    // or just let it fail so the user knows they need an API token.
    try {
      await writeClient.create({
        _type: "order",
        orderNumber: receiptId,
        razorpayOrderId: razorpayOrder.id,
        customerName: `${customerDetails.firstName} ${customerDetails.lastName}`.trim(),
        customerEmail: customerDetails.email,
        customerPhone: customerDetails.phone,
        shippingAddress: {
          street: shippingAddress.address,
          city: shippingAddress.city,
          state: shippingAddress.state,
          zipCode: shippingAddress.zipCode,
          country: shippingAddress.country,
        },
        items: items.map((item: { id: string; name: string; quantity: number; price: number }) => ({
          _key: item.id,
          productId: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: amount,
        status: "pending",
      });
    } catch (sanityError) {
      console.warn("Could not save to Sanity. Check SANITY_API_TOKEN.", sanityError);
      // We still return the razorpayOrder so frontend doesn't break if CMS isn't fully configured
    }

    return NextResponse.json(razorpayOrder, { status: 200 });
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
