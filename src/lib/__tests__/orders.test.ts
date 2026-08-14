import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

const prismaMock = vi.hoisted(() => ({
  order: {
    findUnique: vi.fn(),
  },
}));
vi.mock("@/lib/db", () => ({ prisma: prismaMock }));

import { getOrderByOrderNumber } from "@/lib/orders";

const baseOrder = {
  id: "AS-2026-0001",
  userId: null,
  items: [
    { id: "p1", name: "Ring", quantity: 2, price: 1000 },
    { id: "unknown", name: undefined, quantity: undefined, price: undefined },
  ],
  subtotal: 2000,
  shipping: 0,
  total: 2360,
  currency: "INR",
  paymentId: null,
  razorpayOrderId: null,
  status: "payment_pending",
  customer: { firstName: "Priya", lastName: "Sharma" },
  shippingAddress: { address: "12 MG Road", city: "Mumbai", state: "MH", zipCode: "400001" },
  createdAt: new Date("2026-08-01T00:00:00Z"),
  updatedAt: new Date("2026-08-01T00:00:00Z"),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("getOrderByOrderNumber", () => {
  it("returns null for empty input", async () => {
    expect(await getOrderByOrderNumber("")).toBeNull();
    expect(prismaMock.order.findUnique).not.toHaveBeenCalled();
  });

  it("returns the mapped order when found", async () => {
    prismaMock.order.findUnique.mockResolvedValue(baseOrder);
    const order = await getOrderByOrderNumber("AS-2026-0001");
    expect(order?.orderNumber).toBe("AS-2026-0001");
    expect(order?.status).toBe("payment_pending");
    expect(order?.items).toEqual([
      { id: "p1", name: "Ring", quantity: 2, price: 1000 },
      { id: "unknown", name: "Item", quantity: 1, price: 0 },
    ]);
    expect(order?.customerName).toBe("Priya Sharma");
    expect(order?.shippingAddress).toBe("12 MG Road, Mumbai, MH, 400001");
    expect(prismaMock.order.findUnique).toHaveBeenCalledWith({ where: { id: "AS-2026-0001" } });
  });

  it("returns null when not found", async () => {
    prismaMock.order.findUnique.mockResolvedValue(null);
    expect(await getOrderByOrderNumber("AS-NOPE")).toBeNull();
  });

  it("handles missing customer info defensively", async () => {
    prismaMock.order.findUnique.mockResolvedValue({ ...baseOrder, customer: null, shippingAddress: null });
    const order = await getOrderByOrderNumber("AS-2026-0001");
    expect(order?.customerName).toBe("Aastha Silver");
    expect(order?.shippingAddress).toBe("");
  });
});