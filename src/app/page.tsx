import HomeClient from "./HomeClient";
import { getFeaturedProducts } from "@/lib/data";

export default async function Home() {
  const displayProducts = await getFeaturedProducts();
  return <HomeClient products={displayProducts} />;
}
