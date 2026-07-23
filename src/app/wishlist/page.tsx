"use client"

import { useWishlistStore } from "@/store/wishlist-store"
import { ProductCard } from "@/features/products/components/ProductCard"
import { Product } from "@/features/products/types"
import { Heart } from "lucide-react"
import Link from "next/link"

export default function WishlistPage() {
  const { items, clearWishlist } = useWishlistStore()

  // Transform WishlistItem to Product type for the ProductCard
  // This is a temporary mapping until we fetch live data using the IDs
  const wishlistProducts: Product[] = items.map(item => ({
    _id: item.id,
    title: item.name,
    slug: { current: item.slug },
    price: item.price,
    images: [item.image], 
  }))

  return (
    <div className="container mx-auto px-4 md:px-8 py-16">
      <div className="flex flex-col items-center mb-12 text-center">
        <Heart className="w-8 h-8 text-forest mb-4" />
        <h1 className="font-serif text-4xl md:text-5xl text-forest mb-4">Your Wishlist</h1>
        <p className="text-gray-500 max-w-xl">
          A curated collection of your favorite pieces. Save them for later or add them to your cart.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center space-y-6 py-20 bg-secondary/50 rounded-sm">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-black mb-2 shadow-sm">
            <Heart className="w-6 h-6 stroke-[1.5]" />
          </div>
          <p className="font-serif text-3xl text-[#0F0F0F]">Your wishlist is empty.</p>
          <p className="text-gray-500 text-sm font-light max-w-xs">Save your favorite pieces here to find them quickly later.</p>
          <Link href="/shop/all" className="mt-8 bg-transparent border border-black text-black hover:bg-black hover:border-black hover:text-white rounded-full px-10 py-4 uppercase tracking-[0.15em] text-[10px] transition-colors inline-flex items-center justify-center font-medium">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="flex justify-end mb-6">
            <button 
              onClick={clearWishlist}
              className="text-sm text-gray-500 hover:text-red-500 transition-colors underline underline-offset-4"
            >
              Clear Wishlist
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {wishlistProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
