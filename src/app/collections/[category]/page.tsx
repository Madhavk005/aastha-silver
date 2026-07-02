import React from "react";
import { ProductGrid } from "@/features/products/components/ProductGrid";
import { getProductsByCategory } from "@/lib/data";

export default async function CategoryPage(props: { params: Promise<{ category: string }> }) {
  const params = await props.params;
  const categorySlug = params.category;
  const categoryName = categorySlug.replace("-", " ");
  
  const products = await getProductsByCategory(categorySlug);

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
