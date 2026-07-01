import React from "react";
import { sanityFetch } from "@/sanity/lib/fetch";
import { getProductBySlugQuery } from "@/sanity/lib/queries";
import { Product } from "@/features/products/types";
import ProductClient from "./ProductClient";

export default async function ProductPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const { slug } = params;

  // Try to fetch real product from Sanity
  const fetchedProduct = await sanityFetch<Product>({
    query: getProductBySlugQuery,
    params: { slug },
  });

  // Generate fallback product if Sanity is not connected or product not found
  const product: Product = fetchedProduct || {
    _id: `product-${slug}`,
    title: slug.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase()),
    slug: { current: slug },
    price: Math.floor(Math.random() * 5000) + 1500,
    images: ["/images/featured-ring.png"],
    category: { _ref: "Jewellery" }
  };
  
  return <ProductClient product={product} />;
}
