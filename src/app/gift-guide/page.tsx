import React from "react";
import CategoryPage from "../collections/[category]/page";

export default function GiftGuidePage() {
  return <CategoryPage params={Promise.resolve({ category: "gift guide" })} />;
}
