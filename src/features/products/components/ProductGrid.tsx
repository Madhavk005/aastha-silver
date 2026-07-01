"use client"

import { Product } from "../types"
import { ProductCard } from "./ProductCard"

interface ProductGridProps {
  products: Product[]
  columns?: 2 | 3 | 4
}

export function ProductGrid({ products, columns = 4 }: ProductGridProps) {
  const gridClass = {
    2: "grid-cols-2 sm:grid-cols-2",
    3: "grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 lg:grid-cols-4",
  }[columns]

  if (!products?.length) {
    return (
      <div className="py-20 text-center text-gray-500 font-serif text-xl">
        No products found.
      </div>
    )
  }

  return (
    <div className={`grid gap-x-6 gap-y-12 ${gridClass}`}>
      {products.map((product, index) => (
        <ProductCard 
          key={product._id} 
          product={product} 
          priority={index < 4} // Load first 4 images faster
        />
      ))}
    </div>
  )
}
