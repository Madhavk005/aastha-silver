import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

const prismaMock = vi.hoisted(() => ({
  order: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
  },
}));
vi.mock("@/lib/db", () => ({ prisma: prismaMock }));

import { getOrdersByUserId, getOrderByOrderNumber } from "@/lib/orders";

const baseOrder = {
  id: "AS-2026-0001",
  userId: "u1",
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

describe("getOrdersByUserId", () => {
  it("returns an empty list for missing or placeholder users without hitting the db", async () => {
    expect(await getOrdersByUserId("")).toEqual([]);
    expect(await getOrdersByUserId("placeholder")).toEqual([]);
    expect(prismaMock.order.findMany).not.toHaveBeenCalled();
  });

  it("fetches and maps orders to API shape", async () => {
    prismaMock.order.findMany.mockResolvedValue([baseOrder]);
    const orders = await getOrdersByUserId("u1");
    expect(orders).toEqual([
      {
        _id: "AS-2026-0001",
        orderNumber: "AS-2026-0001",
        status: "payment_pending",
        _createdAt: "2026-08-01T00:00:00.000Z",
        items: [
          { id: "p1", name: "Ring", quantity: 2, price: 1000 },
          { id: "unknown", name: "Item", quantity: 1, price: 0 },
        ],
        totalAmount: 2360,
        paymentId: null,
        customerName: "Priya Sharma",
        shippingAddress: "12 MG Road, Mumbai, MH, 400001",
      },
    ]);
    expect(prismaMock.order.findMany).toHaveBeenCalledWith({
      where: { userId: "u1" },
      orderBy: { createdAt: "desc" },
    });
  });

  it("handles missing customer info defensively", async () => {
    prismaMock.order.findMany.mockResolvedValue([{ ...baseOrder, customer: null, shippingAddress: null }]);
    const [order] = await getOrdersByUserId("u1");
    expect(order.customerName).toBe("Aastha Silver");
    expect(order.shippingAddress).toBe("");
  });
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
    expect(prismaMock.order.findUnique).toHaveBeenCalledWith({ where: { id: "AS-2026-0001" } });
  });
});