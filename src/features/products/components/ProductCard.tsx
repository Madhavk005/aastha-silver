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
      <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden bg-[#FAFAFA] mb-6">
        {mainImage ? (
          <Image
            src={mainImage}
            alt={product.title}
            fill
            priority={priority}
            className="object-cover object-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.03]"
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400">
            No Image
          </div>
        )}

        {/* Floating Actions overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 hidden lg:block" />
        
        <button
          onClick={handleToggleWishlist}
          className="absolute top-4 right-4 p-2 rounded-none text-black/40 hover:text-black transition-all lg:opacity-0 lg:group-hover:opacity-100 lg:translate-y-2 lg:group-hover:translate-y-0 duration-500"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-5 h-5 transition-colors stroke-[1.2] ${isWishlisted ? 'fill-[#215650] text-[#215650]' : 'fill-transparent'}`} />
        </button>

        <div className="hidden lg:block absolute inset-x-4 bottom-6 translate-y-[120%] lg:group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]">
          <Button 
            onClick={handleAddToCart}
            className="w-full bg-white/90 backdrop-blur-md text-black hover:bg-[#215650] hover:text-white rounded-none h-12 uppercase tracking-[0.2em] text-[10px] font-medium transition-all duration-500"
          >
            Quick Add
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2 items-center text-center px-2">
        <h3 className="uppercase tracking-[0.2em] text-[10px] font-medium text-[#0F0F0F] group-hover:text-black/60 transition-colors duration-500">{product.title}</h3>
        <div className="flex items-center gap-3">
          <span className="text-gray-500 text-xs font-light tracking-wide">{formatCurrency(product.price)}</span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-gray-300 text-xs line-through font-light tracking-wide">
              {formatCurrency(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
