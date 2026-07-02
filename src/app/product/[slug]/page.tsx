import React from "react";
import { Product } from "@/features/products/types";
import ProductClient from "./ProductClient";
import { getProductBySlug, getProducts } from "@/lib/data";

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
  const allProducts = await getProducts();
  const relatedProducts = allProducts.filter(p => p._id !== product._id).slice(0, 4);
  
  return <ProductClient product={product} relatedProducts={relatedProducts} />;
}
