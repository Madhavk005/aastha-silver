import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const prismaMock = vi.hoisted(() => ({
  newsletterSubscriber: {
    upsert: vi.fn(),
  },
}));
vi.mock("@/lib/db", () => ({ prisma: prismaMock }));

import { POST } from "@/app/api/newsletter/route";

function post(email: string) {
  return POST(new NextRequest("http://localhost/api/newsletter", {
    method: "POST",
    body: JSON.stringify({ email }),
  }));
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe("newsletter route", () => {
  it("rejects invalid emails with 400", async () => {
    for (const bad of ["", "not-an-email", "@missing.com", "a@b", "a b@c.com"]) {
      const res = await post(bad);
      expect(res.status).toBe(400);
      expect(prismaMock.newsletterSubscriber.upsert).not.toHaveBeenCalled();
    }
  });

  it("normalizes and subscribes a valid email", async () => {
    const res = await post("  Priya@Example.COM ");
    expect(res.status).toBe(200);
    expect(prismaMock.newsletterSubscriber.upsert).toHaveBeenCalledWith({
      where: { email: "priya@example.com" },
      update: {},
      create: { email: "priya@example.com" },
    });
  });

  it("treats duplicate submissions as success (upsert)", async () => {
    prismaMock.newsletterSubscriber.upsert.mockResolvedValue({});
    const res = await post("priya@example.com");
    expect(res.status).toBe(200);
  });

  it("returns 500 when persistence fails", async () => {
    prismaMock.newsletterSubscriber.upsert.mockRejectedValue(new Error("db down"));
    const res = await post("priya@example.com");
    expect(res.status).toBe(500);
  });
});