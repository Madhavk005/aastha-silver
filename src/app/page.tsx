import { sanityFetch } from "@/sanity/lib/fetch";
import { getFeaturedProductsQuery } from "@/sanity/lib/queries";
import { Product } from "@/features/products/types";
import HomeClient from "./HomeClient";

// Fallback mock data
const MOCK_BEST_SELLERS: Product[] = [
  { _id: "1", title: "Classic Signet Ring", slug: { current: "classic-signet-ring" }, price: 2499, images: ["/images/featured-ring.png"] },
  { _id: "2", title: "Minimalist Bar Necklace", slug: { current: "minimalist-bar-necklace" }, price: 1899, compareAtPrice: 2199, images: ["/images/featured-necklace.png"] },
  { _id: "3", title: "Emerald Cut Studs", slug: { current: "emerald-cut-studs" }, price: 3299, images: ["/images/editorial.png"] },
  { _id: "4", title: "Pearl Drop Earrings", slug: { current: "pearl-drop-earrings" }, price: 2999, images: ["/images/hero.png"] },
];

export default async function Home() {
  const fetchedProducts = await sanityFetch<Product[]>({
    query: getFeaturedProductsQuery,
  });

  const displayProducts = fetchedProducts && fetchedProducts.length > 0 
    ? fetchedProducts 
    : MOCK_BEST_SELLERS;

  return <HomeClient products={displayProducts} />;
}
