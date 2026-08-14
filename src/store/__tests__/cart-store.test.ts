// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import { useCartStore } from "@/store/cart-store";

const item = { id: "p1", name: "Silver Ring", price: 2000, image: "/img.jpg", slug: "silver-ring" };

beforeEach(() => {
  useCartStore.setState({ items: [], isOpen: false });
  localStorage.clear();
});

describe("cart store", () => {
  it("adds a new item with quantity 1 and opens the cart", () => {
    useCartStore.getState().addItem(item);
    const { items, isOpen } = useCartStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(1);
    expect(isOpen).toBe(true);
  });

  it("increments quantity when the same item is added again", () => {
    useCartStore.getState().addItem(item);
    useCartStore.getState().addItem(item);
    const { items } = useCartStore.getState();
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(2);
  });

  it("removes an item", () => {
    useCartStore.getState().addItem(item);
    useCartStore.getState().removeItem("p1");
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it("updates quantity", () => {
    useCartStore.getState().addItem(item);
    useCartStore.getState().updateQuantity("p1", 5);
    expect(useCartStore.getState().items[0].quantity).toBe(5);
  });

  it("clears the cart", () => {
    useCartStore.getState().addItem(item);
    useCartStore.getState().clearCart();
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it("computes totals and counts", () => {
    useCartStore.getState().addItem(item);
    useCartStore.getState().addItem({ ...item, id: "p2", price: 500 });
    expect(useCartStore.getState().getTotal()).toBe(2500);
    expect(useCartStore.getState().getItemCount()).toBe(2);
    useCartStore.getState().addItem(item);
    expect(useCartStore.getState().getTotal()).toBe(4500);
    expect(useCartStore.getState().getItemCount()).toBe(3);
  });

  it("toggles the cart drawer", () => {
    const { toggleCart, openCart, closeCart } = useCartStore.getState();
    toggleCart();
    expect(useCartStore.getState().isOpen).toBe(true);
    closeCart();
    expect(useCartStore.getState().isOpen).toBe(false);
    openCart();
    expect(useCartStore.getState().isOpen).toBe(true);
  });
});
