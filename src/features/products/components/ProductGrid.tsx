"use client"

import { Product } from "../types"
import { ProductCard } from "./ProductCard"
import Image from "next/image"
import Link from "next/link"
import { Heart, Star } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { useCartStore } from "@/store/cart-store"
import { useWishlistStore } from "@/store/wishlist-store"

interface ProductGridProps {
  products: Product[]
  columns?: 2 | 3 | 4
  viewMode?: "grid" | "list"
}

export function ProductGrid({ products, columns = 4, viewMode = "grid" }: ProductGridProps) {
  const gridClass = {
    2: "grid-cols-2",
    3: "grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 lg:grid-cols-4",
  }[columns]

  if (!products?.length) {
    return (
      <div className="py-20 text-center text-foreground/30 font-serif text-xl">
        No products found.
      </div>
    )
  }

  if (viewMode === "list") {
    return (
      <div className="flex flex-col gap-6">
        {products.map((product, index) => (
          <ProductListItem key={product._id} product={product} priority={index < 4} />
        ))}
      </div>
    )
  }

  return (
    <div className={`grid gap-x-6 gap-y-12 ${gridClass}`}>
      {products.map((product, index) => (
        <ProductCard
          key={product._id}
          product={product}
          priority={index < 4}
        />
      ))}
    </div>
  )
}

function ProductListItem({ product, priority }: { product: Product; priority?: boolean }) {
  const { addItem: addCartItem } = useCartStore()
  const { addItem: addWishlistItem, hasItem: hasWishlistItem, removeItem: removeWishlistItem } = useWishlistStore()
  const isWishlisted = hasWishlistItem(product._id)
  const mainImage = product.images?.[0] || null
  const slug = product.slug?.current || "#"
  const title = product.title || "Untitled"

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addCartItem({ id: product._id, name: title, price: product.price, image: mainImage || '', slug })
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isWishlisted) removeWishlistItem(product._id)
    else addWishlistItem({ id: product._id, name: title, price: product.price, image: mainImage || '', slug })
  }

  const rating = Math.round(product.rating || 0)

  return (
    <Link href={`/product/${slug}`} className="group flex gap-6 border border-foreground/5 p-4 md:p-6 hover:border-foreground/20 transition-all duration-500">
      <div className="relative w-28 md:w-40 aspect-[3/4] flex-shrink-0 bg-secondary overflow-hidden">
        {mainImage ? (
          <Image src={mainImage} alt={title} fill priority={priority} className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="160px" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-foreground/30 text-[10px] uppercase tracking-[0.2em]">No Image</div>
        )}
      </div>
      <div className="flex-1 flex flex-col justify-center gap-2">
        <h3 className="uppercase tracking-[0.2em] text-[10px] font-medium text-foreground">{title}</h3>
        {rating > 0 && (
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-2.5 h-2.5 ${i < rating ? 'fill-foreground text-foreground' : 'fill-none text-foreground/15'}`} strokeWidth={1.5} />
              ))}
            </div>
            {(product.reviewCount ?? 0) > 0 && <span className="text-[8px] text-foreground/40">({product.reviewCount})</span>}
          </div>
        )}
        <p className="text-foreground/50 text-sm font-light line-clamp-2">{product.description || ''}</p>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-foreground text-sm font-medium">{formatCurrency(product.price)}</span>
          {(product.compareAtPrice ?? 0) > product.price && (
            <span className="text-foreground/30 text-xs line-through">{formatCurrency(product.compareAtPrice!)}</span>
          )}
        </div>
        <div className="flex gap-3 mt-2">
          <button onClick={handleAddToCart} className="text-[10px] uppercase tracking-[0.2em] font-medium border border-foreground/30 px-5 py-2 hover:bg-foreground hover:text-background transition-colors">
            Add to Cart
          </button>
          <button onClick={handleToggleWishlist} className="text-[10px] uppercase tracking-[0.2em] font-medium text-foreground/50 hover:text-foreground transition-colors">
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-foreground' : ''}`} />
          </button>
        </div>
      </div>
    </Link>
  )
}
