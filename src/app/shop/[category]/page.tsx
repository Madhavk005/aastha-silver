import React from "react";
import { CollectionClient } from "./CollectionClient";
import { getProductsByCategory } from "@/lib/data";
import { getAllCategories } from "@/lib/data";

export default async function CategoryPage(props: { params: Promise<{ category: string }> }) {
  const params = await props.params;
  const categorySlug = params.category;

  let categoryName = "All Jewellery";
  let categoryImage: string | null = null;

  if (categorySlug !== "all") {
    const categories = await getAllCategories();
    const matched = categories.find(c => c.slug?.current === categorySlug);
    if (matched) {
      categoryName = matched.title;
      categoryImage = matched.image || null;
    } else {
      categoryName = categorySlug.replace("-", " ");
    }
  }

  const products = await getProductsByCategory(categorySlug);

  return (
    <CollectionClient
      initialProducts={products}
      categoryName={categoryName}
      categoryImage={categoryImage}
    />
  );
}
