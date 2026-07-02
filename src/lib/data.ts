import { Product } from "@/features/products/types";

export const hardcodedProducts: Product[] = [
  {
    _id: "prod-1",
    title: "Classic Silver Chain",
    slug: { current: "classic-silver-chain" },
    price: 4999,
    images: ["/images/featured-necklace.png"],
    description: "A timeless classic sterling silver chain, perfect for everyday wear.",
    category: "necklaces",
    isFeatured: true,
  },
  {
    _id: "prod-2",
    title: "Minimalist Silver Ring",
    slug: { current: "minimalist-silver-ring" },
    price: 2499,
    images: ["/images/featured-ring.png"],
    description: "A beautifully crafted minimal ring in 925 sterling silver.",
    category: "rings",
    isFeatured: true,
  },
  {
    _id: "prod-3",
    title: "Elegant Silver Earrings",
    slug: { current: "elegant-silver-earrings" },
    price: 3499,
    images: ["/images/editorial.png"],
    description: "Elegant and subtle silver earrings for a sophisticated look.",
    category: "earrings",
    isFeatured: true,
  },
  {
    _id: "prod-4",
    title: "Sterling Silver Bracelet",
    slug: { current: "sterling-silver-bracelet" },
    price: 5999,
    images: ["/images/featured-necklace.png"],
    description: "A premium sterling silver bracelet that adds a touch of quiet luxury.",
    category: "bracelets",
    isFeatured: false,
  }
];

export async function getProducts(): Promise<Product[]> {
  return hardcodedProducts;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return hardcodedProducts.find(p => p.slug.current === slug) || null;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  if (category === "all") return hardcodedProducts;
  return hardcodedProducts.filter(p => p.category === category);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return hardcodedProducts.filter(p => p.isFeatured);
}

export const hardcodedDeliveryPolicy = {
  title: "Delivery Information",
  content: "We offer worldwide shipping. Domestic orders within India usually arrive in 3-5 business days. International orders may take 7-14 business days depending on the destination. All packages are insured and require a signature upon delivery.",
};

export async function getDeliveryPolicy() {
  return hardcodedDeliveryPolicy;
}
