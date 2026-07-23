"use client"

import Image from "next/image"
import Link from "next/link"
import { Product } from "../types"
import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Heart, Star, ShoppingBag } from "lucide-react"
import { useCartStore } from "@/store/cart-store"
import { useWishlistStore } from "@/store/wishlist-store"

interface ProductCardProps {
  product: Product
  priority?: boolean
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addItem: addCartItem } = useCartStore()
  const { addItem: addWishlistItem, hasItem: hasWishlistItem, removeItem: removeWishlistItem } = useWishlistStore()

  const isWishlisted = hasWishlistItem(product._id)
  const mainImage = product.images?.[0] || null
  const slug = product.slug?.current || "#"
  const title = product.title || "Untitled"

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addCartItem({
      id: product._id,
      name: title,
      price: product.price,
      image: mainImage || '',
      slug,
    })
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isWishlisted) {
      removeWishlistItem(product._id)
    } else {
      addWishlistItem({
        id: product._id,
        name: title,
        price: product.price,
        image: mainImage || '',
        slug,
      })
    }
  }

  const rating = Math.round(product.rating || 0)

  return (
    <Link href={`/product/${slug}`} className="group block">
      <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden mb-5">
        {mainImage ? (
          <Image
            src={mainImage}
            alt={title}
            fill
            priority={priority}
            className="object-cover object-center transition-all duration-[1.2s] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.04]"
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-foreground/30 text-[10px] uppercase tracking-[0.2em]">
            No Image
          </div>
        )}

        <div className="absolute inset-0 bg-foreground/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {product.inStock === false && (
          <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm px-3 py-1">
            <span className="text-[7px] uppercase tracking-[0.2em] font-medium text-foreground/70">Out of Stock</span>
          </div>
        )}

        <button
          onClick={handleToggleWishlist}
          className="absolute top-3 right-3 p-2 rounded-full bg-background/60 backdrop-blur-sm text-foreground/70 hover:text-foreground transition-all lg:opacity-0 lg:group-hover:opacity-100 lg:translate-y-1 lg:group-hover:translate-y-0 duration-500"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 transition-colors stroke-[1.2] ${isWishlisted ? 'fill-foreground text-foreground' : 'fill-transparent'}`} />
        </button>

        <div className="absolute inset-x-3 bottom-3 lg:inset-x-4 lg:bottom-6 lg:translate-y-[120%] lg:group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]">
          <Button
            onClick={handleAddToCart}
            className="w-full bg-background/80 backdrop-blur-xl border border-foreground/10 text-foreground hover:bg-foreground hover:text-background h-10 lg:h-12 uppercase tracking-[0.2em] text-[9px] lg:text-[10px] font-medium transition-all duration-500"
          >
            <ShoppingBag className="w-3 h-3 mr-2 lg:hidden" strokeWidth={1.5} />
            <span className="hidden lg:inline">Quick Add</span>
            <span className="lg:hidden">Add</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 items-center text-center px-1">
        {rating > 0 && (
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-2.5 h-2.5 ${i < rating ? 'fill-foreground text-foreground' : 'fill-none text-foreground/15'}`} strokeWidth={1.5} />
              ))}
            </div>
            {(product.reviewCount ?? 0) > 0 && (
              <span className="text-[7px] text-foreground/30 font-medium">({product.reviewCount})</span>
            )}
          </div>
        )}
        <h3 className="uppercase tracking-[0.2em] text-[10px] font-medium text-foreground group-hover:text-foreground/60 transition-colors duration-500 line-clamp-1">{title}</h3>
        <div className="flex items-center gap-3">
          <span className="text-foreground/60 text-xs font-light tracking-wide">{formatCurrency(product.price)}</span>
          {(product.compareAtPrice ?? 0) > product.price && (
            <span className="text-foreground/20 text-xs line-through font-light tracking-wide">
              {formatCurrency(product.compareAtPrice!)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
