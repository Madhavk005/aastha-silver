"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Heart, ChevronRight, ZoomIn } from "lucide-react";
import { Product } from "@/features/products/types";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { formatCurrency } from "@/lib/utils";

export default function ProductClient({ product, relatedProducts }: { product: Product, relatedProducts: Product[] }) {
  const { addItem: addCartItem } = useCartStore();
  const { addItem: addWishlistItem, hasItem: hasWishlistItem, removeItem: removeWishlistItem } = useWishlistStore();

  const isWishlisted = hasWishlistItem(product._id);
  const router = useRouter();
  
  const [activeImage, setActiveImage] = React.useState(product.images?.[0] || "/images/featured-ring.png");
  // Ensure we have an array for the gallery
  const galleryImages = product.images && product.images.length > 0 ? product.images : [activeImage, "/images/featured-necklace.png", "/images/hero.png"];

  const handleAddToCart = () => {
    addCartItem({
      id: product._id,
      name: product.title,
      price: product.price,
      image: activeImage,
      slug: product.slug.current,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeWishlistItem(product._id);
    } else {
      addWishlistItem({
        id: product._id,
        name: product.title,
        price: product.price,
        image: activeImage,
        slug: product.slug.current,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] pt-24 md:pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-[10px] uppercase tracking-[0.2em] font-medium text-black/50 mb-12">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 mx-2" />
          <Link href="/collections" className="hover:text-black transition-colors">Collections</Link>
          <ChevronRight className="w-3 h-3 mx-2" />
          <span className="text-black/80">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Product Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative w-full aspect-[4/5] bg-[#F9F8F5] overflow-hidden group cursor-crosshair">
              <Image
                src={activeImage}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-125"
                priority
              />
              <div className="absolute bottom-4 right-4 bg-white/50 backdrop-blur-md p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4 text-black/70" />
              </div>
            </div>
            {/* Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {galleryImages.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 aspect-square flex-shrink-0 overflow-hidden bg-[#F9F8F5] transition-all duration-300 ${activeImage === img ? 'ring-1 ring-black ring-offset-2' : 'opacity-60 hover:opacity-100'}`}
                  >
                    <Image src={img} alt={`${product.title} thumbnail ${idx}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">
            <div className="mb-8">
              <span className="uppercase tracking-[0.1em] text-[10px] text-gray-400 mb-4 block">
                {product.category || "Jewellery"}
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

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleAddToCart}
                  variant="outline"
                  className="flex-1 h-14 bg-transparent border-black text-black hover:bg-black/5 rounded-none uppercase tracking-[0.2em] text-[10px] font-medium transition-all"
                >
                  Add to Cart
                </Button>
                <Button 
                  onClick={handleBuyNow}
                  className="flex-1 h-14 bg-black text-white hover:bg-black/80 rounded-none shadow-lg uppercase tracking-[0.2em] text-[10px] font-medium transition-all"
                >
                  Buy Now
                </Button>
                <Button 
                  onClick={toggleWishlist}
                  variant="outline" 
                  className={`w-14 h-14 rounded-none border-black flex items-center justify-center transition-colors ${
                    isWishlisted ? "bg-red-50 border-red-200 text-red-500 hover:bg-red-100" : "hover:bg-black/5"
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 stroke-[1.2] ${isWishlisted ? "fill-current" : ""}`} />
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

        {/* Related Products */}
        <div className="mt-32 pt-24 border-t border-black/5">
          <h2 className="font-serif text-3xl md:text-4xl text-center text-[#1A1D1A] mb-12">
            You might also like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
                <Link
                  key={relatedProduct._id}
                  href={`/product/${relatedProduct.slug.current}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#F5F3EC] mb-4">
                    <Image
                      src={relatedProduct.images?.[0] || "/placeholder.jpg"}
                      alt={relatedProduct.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#1A1D1A] group-hover:text-black/50 transition-colors">
                    {relatedProduct.title}
                  </h3>
                  <p className="text-gray-400 text-xs font-light mt-2">{formatCurrency(relatedProduct.price)}</p>
                </Link>
              ))}
          </div>
        </div>

      </div>
    </div>
  );
}
