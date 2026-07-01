import React from "react";
import { ProductGrid } from "@/features/products/components/ProductGrid";
import { Product } from "@/features/products/types";
import { sanityFetch } from "@/sanity/lib/fetch";
import { getProductsByCategoryQuery, getAllProductsQuery } from "@/sanity/lib/queries";

// Mock data generator for testing
const generateMockProducts = (category: string): Product[] => {
  return Array.from({ length: 12 }).map((_, i) => ({
    _id: `product-${i}`,
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} Item ${i + 1}`,
    slug: { current: `item-${i + 1}` },
    price: Math.floor(Math.random() * 5000) + 1500,
    images: ["/images/featured-ring.png"],
    category: { _ref: category },
    isNew: i < 3,
  }));
};

export default async function CategoryPage(props: { params: Promise<{ category: string }> }) {
  const params = await props.params;
  const categorySlug = params.category;
  const categoryName = categorySlug.replace("-", " ");
  
  // Choose query based on if it's "all" or specific
  const query = categorySlug === "all" ? getAllProductsQuery : getProductsByCategoryQuery;
  const queryParams = categorySlug === "all" ? {} : { category: categorySlug };

  const fetchedProducts = await sanityFetch<Product[]>({
    query,
    params: queryParams,
  });

  const products = fetchedProducts && fetchedProducts.length > 0 
    ? fetchedProducts 
    : generateMockProducts(categoryName);

  return (
    <div className="min-h-screen bg-[#FDFCF8] pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="font-serif text-4xl md:text-5xl text-[#1A1D1A] mb-4 text-center capitalize">
          {categoryName}
        </h1>
        <p className="text-gray-500 text-center mb-16 max-w-xl mx-auto font-light text-sm md:text-base">
          Discover our curated selection of {categoryName}, designed for the modern aesthetic with timeless appeal.
        </p>

        <ProductGrid products={products} />
      </div>
    </div>
  );
}
