"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Product } from "@/features/products/types";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { formatCurrency } from "@/lib/utils";

export default function ProductClient({ product }: { product: Product }) {
  const { addItem: addCartItem } = useCartStore();
  const { addItem: addWishlistItem, hasItem: hasWishlistItem, removeItem: removeWishlistItem } = useWishlistStore();

  const isWishlisted = hasWishlistItem(product._id);
  
  const mainImage = product.images?.[0]
    ? typeof product.images[0] === 'string'
      ? product.images[0]
      : product.images[0] // fallback if it's not a string, though it should be handled
    : "/images/featured-ring.png";

  const handleAddToCart = () => {
    addCartItem({
      id: product._id,
      name: product.title,
      price: product.price,
      image: mainImage,
      slug: product.slug.current,
    });
  };

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeWishlistItem(product._id);
    } else {
      addWishlistItem({
        id: product._id,
        name: product.title,
        price: product.price,
        image: mainImage,
        slug: product.slug.current,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] pt-24 md:pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Product Image Gallery */}
          <div className="space-y-6">
            <div className="relative w-full aspect-[4/5] bg-[#F5F3EC] rounded-[2rem] overflow-hidden">
              <Image
                src={mainImage}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">
            <div className="mb-8">
              <span className="uppercase tracking-[0.1em] text-[10px] text-gray-400 mb-4 block">
                {product.category?._ref || "Jewellery"}
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1A1D1A] mb-4">
                {product.title}
              </h1>
              <p className="text-2xl font-light text-[#1A1D1A] mb-8">
                {formatCurrency(product.price)}
              </p>
              
              <div className="prose prose-sm md:prose-base text-gray-500 font-light leading-relaxed mb-10">
                <p>
                  Handcrafted in premium 925 sterling silver, this signature piece captures the essence of quiet luxury. 
                  Its minimalist silhouette is designed to be worn effortlessly, either as a standalone statement or layered 
                  with your daily rotation.
                </p>
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1 h-14 bg-black text-white hover:bg-black/80 rounded-full shadow-lg uppercase tracking-[0.1em] text-xs font-medium transition-all"
                >
                  Add to Cart
                </Button>
                <Button 
                  onClick={toggleWishlist}
                  variant="outline" 
                  className={`w-14 h-14 rounded-full border-black/10 flex items-center justify-center transition-colors ${
                    isWishlisted ? "bg-red-50 border-red-100 text-red-500 hover:bg-red-100" : "hover:bg-black/5"
                  }`}
                >
                  <Heart className={`w-5 h-5 stroke-[1.5] ${isWishlisted ? "fill-current" : ""}`} />
                </Button>
              </div>
              
              <div className="mt-12 space-y-6 border-t border-black/5 pt-8">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none text-sm font-medium uppercase tracking-[0.1em] text-[#1A1D1A]">
                    Material & Care
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="text-gray-500 mt-4 text-sm font-light leading-relaxed">
                    925 Sterling Silver. To maintain its brilliance, avoid contact with perfumes, lotions, and water. Store in the provided pouch when not in use.
                  </p>
                </details>
                
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none text-sm font-medium uppercase tracking-[0.1em] text-[#1A1D1A]">
                    Shipping & Returns
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="text-gray-500 mt-4 text-sm font-light leading-relaxed">
                    Complimentary express shipping on orders above ₹10,000. Returns accepted within 14 days of delivery in original, unworn condition.
                  </p>
                </details>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
