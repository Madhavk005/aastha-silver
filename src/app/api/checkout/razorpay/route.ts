import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { getProducts } from "@/lib/data";
import { getSessionFromCookies } from "@/lib/auth-server";
import { prisma } from "@/lib/db";
import type { Product } from "@/features/products/types";

const GST_RATE = 0.18;

type CartLine = {
  id: string;
  price?: number;
  quantity?: unknown;
};

function parseQuantity(raw: unknown): number | null {
  const qty = typeof raw === "number" ? raw : typeof raw === "string" ? Number(raw) : NaN;
  return Number.isInteger(qty) && qty >= 1 && qty <= 99 ? qty : null;
}

async function recomputeItems(
  items: CartLine[],
  products: Product[]
): Promise<{ lines: { id: string; name: string; quantity: number; price: number }[]; subtotal: number } | null> {
  if (!Array.isArray(items) || items.length === 0) return null;

  const byId = new Map(products.map((p) => [p._id, p]));
  const lines: { id: string; name: string; quantity: number; price: number }[] = [];
  let subtotal = 0;

  for (const line of items) {
    const productId = typeof line.id === "string" ? line.id.split(":")[0] : "";
    const product = byId.get(productId);
    const quantity = parseQuantity(line.quantity);
    if (!product || typeof product.price !== "number" || product.price < 0 || quantity === null) {
      return null;
    }
    lines.push({
      id: line.id,
      name: typeof product.title === "string" ? product.title : "",
      quantity,
      price: product.price,
    });
    subtotal += product.price * quantity;
  }

  return { lines, subtotal };
}

export async function POST(req: NextRequest) {
  try {
    const user = await getSessionFromCookies();
    if (!user) {
      return NextResponse.json({ error: "Authentication required." }, { status: 401 });
    }

    const body = await req.json();
    const { items } = body;

    const products = (await getProducts()) || [];
    const recomputed = await recomputeItems(items ?? [], products);
    if (recomputed === null) {
      return NextResponse.json(
        { error: "Invalid or empty cart. Please refresh your cart and try again." },
        { status: 400 }
      );
    }

    const clientAmount = typeof body.amount === "number" ? Math.round(body.amount) : NaN;
    const serverTotal = Math.round(recomputed.subtotal * (1 + GST_RATE));
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
        userId: user.id,
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