import { sanityFetch } from "@/sanity/lib/fetch";
import { getProductsByCategoryQuery, getFeaturedProductsQuery, getProductBySlugQuery, getAllProductsQuery, getAllCategoriesQuery, getOrdersByUserIdQuery, getOrderByOrderNumberQuery, getPolicyBySlugQuery } from "@/sanity/lib/queries";
import type { Product } from "@/features/products/types";

export async function getAllCategories(): Promise<{ title: string; slug: { current: string }; image?: string; description?: string }[]> {
  const cats = await sanityFetch<{ title: string; slug: { current: string }; image?: string; description?: string }[]>({ query: getAllCategoriesQuery });
  return cats || [];
}

export async function getProducts(): Promise<Product[]> {
  const products = await sanityFetch<Product[]>({ query: getAllProductsQuery });
  return products || [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = await sanityFetch<Product>({ query: getProductBySlugQuery, params: { slug } });
  return product || null;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  if (category === "all") return getProducts();
  const products = await sanityFetch<Product[]>({ query: getProductsByCategoryQuery, params: { category } });
  return products || [];
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await sanityFetch<Product[]>({ query: getFeaturedProductsQuery });
  return products || [];
}

export async function getOrdersByUserId(userId: string) {
  if (!userId || userId === "placeholder") return [];
  const orders = await sanityFetch<unknown[]>({ query: getOrdersByUserIdQuery, params: { userId } });
  return orders || [];
}

export async function getOrderByOrderNumber(orderNumber: string) {
  if (!orderNumber) return null;
  const order = await sanityFetch<unknown>({ query: getOrderByOrderNumberQuery, params: { orderNumber } });
  return order || null;
}

export async function getDeliveryPolicy() {
  const policy = await sanityFetch<{ title?: string; content?: string } | null>({
    query: getPolicyBySlugQuery,
    params: { slug: "delivery-information" },
  });
  return policy || { title: "Delivery Information", content: "" };
}

export async function getPolicyBySlug(slug: string) {
  if (!slug) return null;
  const policy = await sanityFetch<unknown>({ query: getPolicyBySlugQuery, params: { slug } });
  return policy || null;
}
