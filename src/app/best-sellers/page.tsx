import React from "react";
import CategoryPage from "../shop/[category]/page";

export default function BestSellersPage() {
  return <CategoryPage params={Promise.resolve({ category: "best sellers" })} />;
}
