import "server-only";
import { prisma } from "@/lib/db";

export async function getOrdersByUserId(userId: string) {
  if (!userId || userId === "placeholder") return [];
  const orders = await prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  return orders.map(orderToApiShape);
}

export async function getOrderByOrderNumber(orderNumber: string) {
  if (!orderNumber) return null;
  const order = await prisma.order.findUnique({ where: { id: orderNumber } });
  return order ? orderToApiShape(order) : null;
}

function orderToApiShape(order: {
  id: string;
  userId: string;
  items: unknown;
  subtotal: number;
  shipping: number;
  total: number;
  currency: string;
  paymentId: string | null;
  razorpayOrderId: string | null;
  status: string;
  customer: unknown;
  shippingAddress: unknown;
  createdAt: Date;
  updatedAt: Date;
}) {
  const items = Array.isArray(order.items)
    ? (order.items as { id?: string; name?: string; quantity?: number; price?: number }[]).map(
        (i) => ({
          id: i.id ?? "",
          name: i.name ?? "Item",
          quantity: i.quantity ?? 1,
          price: i.price ?? 0,
        })
      )
    : [];
  const customer =
    order.customer && typeof order.customer === "object" && !Array.isArray(order.customer)
      ? (order.customer as Record<string, unknown>)
      : {};
  const shippingAddress =
    order.shippingAddress &&
    typeof order.shippingAddress === "object" &&
    !Array.isArray(order.shippingAddress)
      ? (order.shippingAddress as Record<string, unknown>)
      : {};

  return {
    _id: order.id,
    orderNumber: order.id,
    status: order.status,
    _createdAt: order.createdAt.toISOString(),
    items,
    totalAmount: order.total,
    paymentId: order.paymentId,
    customerName:
      typeof customer.firstName === "string" ? `${customer.firstName} ${customer.lastName ?? ""}`.trim() : "Aastha Silver",
    shippingAddress: [
      shippingAddress.address,
      shippingAddress.city,
      shippingAddress.state,
      shippingAddress.zipCode,
    ]
      .filter((v) => typeof v === "string" && v)
      .join(", "),
  };
}