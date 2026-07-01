import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { Resend } from "resend";

const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || "placeholder",
});

const resend = new Resend(process.env.RESEND_API_KEY || "placeholder");

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

    // Signature is valid. Update the order in Sanity.
    const order = await writeClient.fetch(
      `*[_type == "order" && razorpayOrderId == $rzpId][0]`,
      { rzpId: razorpay_order_id }
    );

    if (order) {
      await writeClient
        .patch(order._id)
        .set({ status: "paid", razorpayPaymentId: razorpay_payment_id })
        .commit();

      // Send order confirmation email using Resend
      if (order.customerEmail) {
        try {
          await resend.emails.send({
            from: "Aastha Silver <orders@aasthasilver.com>", // You must verify this domain in Resend
            to: order.customerEmail,
            subject: `Order Confirmation - Aastha Silver (${order.orderNumber})`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1A1D1A;">
                <h1 style="text-align: center; border-bottom: 1px solid #eaeaea; padding-bottom: 20px;">Aastha Silver</h1>
                <p>Hi ${order.customerName},</p>
                <p>Thank you for your purchase. We have received your payment of ₹${order.totalAmount} and are now processing your order.</p>
                <h3 style="margin-top: 30px;">Order Details:</h3>
                <ul>
                  ${order.items.map((item: { quantity: number; name: string; price: number }) => `<li>${item.quantity}x ${item.name} - ₹${item.price}</li>`).join("")}
                </ul>
                <h3 style="margin-top: 30px;">Shipping To:</h3>
                <p>
                  ${order.shippingAddress.street}<br/>
                  ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}<br/>
                  ${order.shippingAddress.country}
                </p>
                <p style="margin-top: 40px; font-size: 12px; color: #666; text-align: center;">
                  Timeless Craft. Quiet Luxury.<br/>
                  Aastha Silver
                </p>
              </div>
            `,
          });
        } catch (emailError) {
          console.error("Failed to send receipt email:", emailError);
          // Don't fail the verification just because the email failed
        }
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
