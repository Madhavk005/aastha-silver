import React from "react";
import { Product } from "@/features/products/types";
import ProductClient from "./ProductClient";
import { getProductBySlug } from "@/lib/data";

export default async function ProductPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const { slug } = params;

  const fetchedProduct = await getProductBySlug(slug);

  // Generate fallback product if not found
  const product: Product = fetchedProduct || {
    _id: `product-${slug}`,
    title: slug.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase()),
    slug: { current: slug },
    price: Math.floor(Math.random() * 5000) + 1500,
    images: ["/images/featured-ring.png"],
    category: "Jewellery"
  };
  
  return <ProductClient product={product} />;
}
