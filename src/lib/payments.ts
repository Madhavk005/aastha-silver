import crypto from "crypto";
import type { Product } from "@/features/products/types";

export const GST_RATE = 0.18;

export type CartLine = {
  id: string;
  price?: number;
  quantity?: unknown;
};

export type RecomputedLine = { id: string; name: string; quantity: number; price: number };

export function parseQuantity(raw: unknown): number | null {
  const qty = typeof raw === "number" ? raw : typeof raw === "string" ? Number(raw) : NaN;
  return Number.isInteger(qty) && qty >= 1 && qty <= 99 ? qty : null;
}

export function calculateServerTotal(subtotal: number): number {
  return Math.round(subtotal * (1 + GST_RATE));
}

export async function recomputeItems(
  items: CartLine[],
  products: Product[]
): Promise<{ lines: RecomputedLine[]; subtotal: number } | null> {
  if (!Array.isArray(items) || items.length === 0) return null;

  const byId = new Map(products.map((p) => [p._id, p]));
  const lines: RecomputedLine[] = [];
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

export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string,
  secret: string
): boolean {
  const generated = crypto
    .createHmac("sha256", secret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");
  return generated === signature;
}
