import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { getProducts } from "@/lib/data";
import { prisma } from "@/lib/db";
import { calculateServerTotal, recomputeItems, type CartLine } from "@/lib/payments";
import { sendOrderConfirmationEmail, type OrderForEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items } = body;

    const products = (await getProducts()) || [];
    const recomputed = await recomputeItems((items ?? []) as CartLine[], products);
    if (recomputed === null) {
      return NextResponse.json(
        { error: "Invalid or empty cart. Please refresh your cart and try again." },
        { status: 400 }
      );
    }

    const clientAmount = typeof body.amount === "number" ? Math.round(body.amount) : NaN;
    const serverTotal = calculateServerTotal(recomputed.subtotal);
    if (!Number.isFinite(clientAmount) || Math.abs(clientAmount - serverTotal) > 1) {
      console.warn(`Amount mismatch: client=${clientAmount}, server=${serverTotal}`);
      return NextResponse.json(
        { error: "Order total has changed. Please review your cart." },
        { status: 400 }
      );
    }

    const customer = body.customerDetails;
    const shippingAddress = body.shippingAddress;

    const order = await prisma.order.create({
      data: {
        items: recomputed.lines,
        subtotal: recomputed.subtotal,
        shipping: 0,
        total: serverTotal,
        status: "payment_pending",
        ...(customer && typeof customer === "object" ? { customer } : {}),
        ...(shippingAddress && typeof shippingAddress === "object" ? { shippingAddress } : {}),
      },
    });

    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
      key_secret: process.env.RAZORPAY_KEY_SECRET || "placeholder_secret",
    });

    try {
      const razorpayOrder = await razorpay.orders.create({
        amount: Math.round(serverTotal * 100),
        currency: "INR",
        receipt: order.id,
      });

      await prisma.order.update({
        where: { id: order.id },
        data: { razorpayOrderId: razorpayOrder.id },
      });

      sendOrderConfirmationEmail({
        id: order.id,
        total: order.total,
        currency: order.currency,
        items: recomputed.lines,
        customer: (order.customer as OrderForEmail["customer"]) ?? null,
      });

      return NextResponse.json(razorpayOrder, { status: 200 });
    } catch (err) {
      console.error("Razorpay order creation error:", err);
      await prisma.order.update({
        where: { id: order.id },
        data: { status: "payment_failed" },
      });
      return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}