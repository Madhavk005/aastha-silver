import React from "react";
import CategoryPage from "../shop/[category]/page";

export default function GiftGuidePage() {
  return <CategoryPage params={Promise.resolve({ category: "gift guide" })} />;
}
