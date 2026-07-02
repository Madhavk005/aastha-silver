import React from "react";
import { CollectionClient } from "./CollectionClient";
import { getProductsByCategory } from "@/lib/data";

export default async function CategoryPage(props: { params: Promise<{ category: string }> }) {
  const params = await props.params;
  const categorySlug = params.category;
  const categoryName = categorySlug.replace("-", " ");
  
  const products = await getProductsByCategory(categorySlug);

  return (
    <CollectionClient initialProducts={products} categoryName={categoryName} />
  );
}
