"use client"

import { useRecentlyViewedStore } from "@/store/recently-viewed-store"
import { ProductCard } from "./ProductCard"
import { Product } from "../types"

export function RecentlyViewed() {
  const { items } = useRecentlyViewedStore()

  if (items.length === 0) return null

  const recentlyViewedProducts: Product[] = items.map((item) => ({
    _id: item.id,
    title: item.name,
    slug: { current: item.slug },
    price: item.price,
    images: [item.image],
    inStock: true,
    rating: 0,
    reviewCount: 0,
  }))

  return (
    <section className="py-24 border-t border-foreground/10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-12">
          <span className="uppercase tracking-[0.3em] text-[10px] text-foreground/50 mb-4 block">Continue Browsing</span>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground tracking-tight font-light">
            Recently Viewed
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {recentlyViewedProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
