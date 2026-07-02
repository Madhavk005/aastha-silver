"use client"

import Image from "next/image"
import Link from "next/link"
import { Product } from "../types"
import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingBag } from "lucide-react"
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
  
  const mainImage = product.images?.[0] || null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault() // prevent navigating to product page
    addCartItem({
      id: product._id,
      name: product.title,
      price: product.price,
      image: mainImage || '',
      slug: product.slug.current,
    })
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isWishlisted) {
      removeWishlistItem(product._id)
    } else {
      addWishlistItem({
        id: product._id,
        name: product.title,
        price: product.price,
        image: mainImage || '',
        slug: product.slug.current,
      })
    }
  }

  return (
    <Link 
      href={`/product/${product.slug.current}`}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F5F3EC] mb-5 rounded-2xl">
        {mainImage ? (
          <Image
            src={mainImage}
            alt={product.title}
            fill
            priority={priority}
            className="object-cover object-center transition-transform duration-[900ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-105"
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
            No Image
          </div>
        )}

        {/* Floating Actions overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 hidden lg:block" />
        
        <button
          onClick={handleToggleWishlist}
          className="absolute top-3 right-3 lg:top-4 lg:right-4 p-2 rounded-full text-gray-400 hover:text-black transition-all lg:opacity-0 lg:group-hover:opacity-100 lg:translate-y-1 lg:group-hover:translate-y-0 duration-500 bg-white/50 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 lg:w-5 lg:h-5 transition-colors stroke-[1.5] ${isWishlisted ? 'fill-black text-black' : ''}`} />
        </button>

        <div className="hidden lg:block absolute inset-x-4 bottom-4 translate-y-[150%] lg:group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
          <Button 
            onClick={handleAddToCart}
            className="w-full bg-white/95 text-black hover:bg-black hover:text-white rounded-full shadow-lg h-12 uppercase tracking-[0.1em] text-xs font-medium transition-colors"
          >
            Quick Add
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-1 items-center text-center mt-4">
        <h3 className="uppercase tracking-[0.15em] text-xs font-medium text-[#1A1D1A]">{product.title}</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-gray-500 text-sm font-light">{formatCurrency(product.price)}</span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-gray-400 text-xs line-through font-light">
              {formatCurrency(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
