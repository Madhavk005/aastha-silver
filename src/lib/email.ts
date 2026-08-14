import "server-only";
import { Resend } from "resend";

export type OrderForEmail = {
  id: string;
  total: number;
  currency: string;
  items: { name: string; quantity: number; price: number }[];
  customer?: { firstName?: string; lastName?: string; email?: string } | null;
};

function money(amount: number, currency: string) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency }).format(amount);
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://aasthasilver.com";

export async function sendOrderConfirmationEmail(order: OrderForEmail): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!apiKey || !from) return false;

  const email = order.customer?.email;
  if (!email) return false;

  const name =
    `${order.customer?.firstName ?? ""} ${order.customer?.lastName ?? ""}`.trim() || "there";

  const itemsHtml = order.items
    .map(
      (i) =>
        `<tr><td style="padding:8px 0;border-bottom:1px solid #eee">${escapeHtml(i.name)} × ${i.quantity}</td><td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right">${money(
          i.price * i.quantity,
          order.currency
        )}</td></tr>`
    )
    .join("");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: email,
      subject: `Order ${order.id} confirmed — AASTHA SILVER`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
          <h1 style="font-size:18px;letter-spacing:2px;text-transform:uppercase">Aastha Silver</h1>
          <p>Dear ${escapeHtml(name)},</p>
          <p>Thank you for your order. Your order <strong>${escapeHtml(order.id)}</strong> has been placed successfully.</p>
          <table style="width:100%;border-collapse:collapse;margin:16px 0">${itemsHtml}</table>
          <p style="text-align:right;font-weight:bold">Total: ${money(order.total, order.currency)}</p>
          <p style="margin-top:24px;font-size:13px;color:#666">
            Track your order at <a href="${SITE_URL}/track-order">${SITE_URL}/track-order</a>.
          </p>
        </div>`,
    });

    if (error) {
      console.error("Order email send error:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Order email send error:", err);
    return false;
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}