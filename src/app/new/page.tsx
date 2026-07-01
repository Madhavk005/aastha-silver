import React from "react";
import CategoryPage from "../collections/[category]/page";

export default function NewPage() {
  return <CategoryPage params={Promise.resolve({ category: "new arrivals" })} />;
}
