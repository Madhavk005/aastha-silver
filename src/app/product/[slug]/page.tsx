import React from "react";
import { Product } from "@/features/products/types";
import ProductClient from "./ProductClient";
import { getProductBySlug, getProducts } from "@/lib/data";

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const product = await getProductBySlug(params.slug);

  if (!product) return {};

  return {
    title: product.title,
    description: product.description || `Buy ${product.title} at Aastha Silver.`,
    openGraph: {
      images: [
        {
          url: product.images?.[0] || "/images/hero.png",
          width: 800,
          height: 1000,
        },
      ],
    },
  };
}

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
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: product.images?.[0] || 'https://aasthasilver.com/images/hero.png',
    description: product.description || `Buy ${product.title} at Aastha Silver.`,
    sku: product._id,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: `https://aasthasilver.com/product/${product.slug.current}`,
      seller: {
        '@type': 'Organization',
        name: 'Aastha Silver'
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductClient product={product} relatedProducts={relatedProducts} />
    </>
  );
}
