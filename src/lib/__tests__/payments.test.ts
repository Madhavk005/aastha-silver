import { describe, expect, it } from "vitest";
import crypto from "crypto";
import {
  parseQuantity,
  calculateServerTotal,
  recomputeItems,
  verifyRazorpaySignature,
} from "@/lib/payments";
import type { Product } from "@/features/products/types";

const products: Product[] = [
  {
    _id: "p1",
    title: "Silver Ring",
    slug: { current: "silver-ring" },
    price: 2000,
    images: [],
  },
  {
    _id: "p2",
    title: "Silver Chain",
    slug: { current: "silver-chain" },
    price: 500,
    images: [],
  },
];

describe("parseQuantity", () => {
  it("accepts valid integer quantities", () => {
    expect(parseQuantity(1)).toBe(1);
    expect(parseQuantity(99)).toBe(99);
    expect(parseQuantity("3")).toBe(3);
  });

  it("rejects zero, negatives, fractions, and out-of-range values", () => {
    expect(parseQuantity(0)).toBeNull();
    expect(parseQuantity(-2)).toBeNull();
    expect(parseQuantity(100)).toBeNull();
    expect(parseQuantity(2.5)).toBeNull();
    expect(parseQuantity("abc")).toBeNull();
    expect(parseQuantity(null)).toBeNull();
    expect(parseQuantity(undefined)).toBeNull();
  });
});

describe("calculateServerTotal", () => {
  it("adds 18% GST and rounds", () => {
    expect(calculateServerTotal(1000)).toBe(1180);
    expect(calculateServerTotal(150)).toBe(177);
    expect(calculateServerTotal(0)).toBe(0);
  });
});

describe("recomputeItems", () => {
  it("recomputes line items from server-side product data", async () => {
    const result = await recomputeItems(
      [
        { id: "p1", quantity: 2 },
        { id: "p2", quantity: 1 },
      ],
      products
    );
    expect(result).not.toBeNull();
    expect(result!.lines).toEqual([
      { id: "p1", name: "Silver Ring", quantity: 2, price: 2000 },
      { id: "p2", name: "Silver Chain", quantity: 1, price: 500 },
    ]);
    expect(result!.subtotal).toBe(4500);
  });

  it("supports variant ids by stripping the variant suffix", async () => {
    const result = await recomputeItems([{ id: "p1:size-7", quantity: 1 }], products);
    expect(result!.lines[0].id).toBe("p1:size-7");
    expect(result!.lines[0].price).toBe(2000);
  });

  it("rejects empty carts", async () => {
    expect(await recomputeItems([], products)).toBeNull();
    expect(await recomputeItems(undefined as never, products)).toBeNull();
  });

  it("rejects unknown products and invalid quantities", async () => {
    expect(await recomputeItems([{ id: "nope", quantity: 1 }], products)).toBeNull();
    expect(await recomputeItems([{ id: "p1", quantity: 0 }], products)).toBeNull();
    expect(await recomputeItems([{ id: "p1" }], products)).toBeNull();
  });
});

describe("verifyRazorpaySignature", () => {
  const secret = "test_secret";

  it("accepts a valid signature", () => {
    const signature = crypto
      .createHmac("sha256", secret)
      .update("order_123|pay_456")
      .digest("hex");
    expect(verifyRazorpaySignature("order_123", "pay_456", signature, secret)).toBe(true);
  });

  it("rejects tampered signatures", () => {
    expect(verifyRazorpaySignature("order_123", "pay_456", "badsig", secret)).toBe(false);
    expect(verifyRazorpaySignature("order_999", "pay_456", crypto.createHmac("sha256", secret).update("order_123|pay_456").digest("hex"), secret)).toBe(false);
  });
});
