import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));
vi.mock("@/utils/supabase/server", () => ({ createClient: vi.fn() }));

import { safeInternalRedirect, userFromSupabase } from "@/lib/auth-server";

describe("safeInternalRedirect", () => {
  it("falls back for missing paths", () => {
    expect(safeInternalRedirect(null)).toBe("/account");
    expect(safeInternalRedirect("")).toBe("/account");
  });

  it("blocks open redirects", () => {
    expect(safeInternalRedirect("https://evil.com")).toBe("/account");
    expect(safeInternalRedirect("//evil.com")).toBe("/account");
  });

  it("blocks api routes and protocol-relative URLs", () => {
    expect(safeInternalRedirect("/api/auth/logout")).toBe("/account");
    expect(safeInternalRedirect("//example.com")).toBe("/account");
  });

  it("allows safe internal paths", () => {
    expect(safeInternalRedirect("/wishlist")).toBe("/wishlist");
    expect(safeInternalRedirect("/shop/necklaces?sort=price")).toBe("/shop/necklaces?sort=price");
  });
});

describe("userFromSupabase", () => {
  it("uses full_name, then name, then email prefix", () => {
    expect(userFromSupabase({ id: "1", user_metadata: { full_name: "Priya Sharma" } }).name).toBe("Priya Sharma");
    expect(userFromSupabase({ id: "1", user_metadata: { name: "Priya" } }).name).toBe("Priya");
    expect(userFromSupabase({ id: "1", email: "priya@example.com" }).name).toBe("priya");
  });

  it("defaults email and handles null metadata", () => {
    const user = userFromSupabase({ id: "x" });
    expect(user).toEqual({ id: "x", email: "", name: "" });
  });
});