"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Heart, ChevronRight, ZoomIn, X, Check, Star, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { Product, ProductVariant } from "@/features/products/types";
import { ProductCard } from "@/features/products/components/ProductCard";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { useRecentlyViewedStore } from "@/store/recently-viewed-store";
import { RecentlyViewed } from "@/features/products/components/RecentlyViewed";
import { CompleteTheLook } from "@/features/products/components/CompleteTheLook";
import { formatCurrency } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductClient({ product, relatedProducts, sameCategoryProducts }: { product: Product, relatedProducts: Product[], sameCategoryProducts?: Product[] }) {
  const { addItem: addCartItem } = useCartStore();
  const { addItem: addWishlistItem, hasItem: hasWishlistItem, removeItem: removeWishlistItem } = useWishlistStore();
  const { addItem: addRecentItem } = useRecentlyViewedStore();

  const isWishlisted = hasWishlistItem(product._id);
  const router = useRouter();

  const [activeImage, setActiveImage] = useState(product.images?.[0] || "/placeholder.jpg");
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const trackedRef = useRef(false);

  React.useEffect(() => {
    if (trackedRef.current) return;
    trackedRef.current = true;
    addRecentItem({
      id: product._id,
      name: product.title,
      price: product.price,
      image: product.images?.[0] || "/placeholder.jpg",
      slug: product.slug.current,
    });
    }, [product._id, product.title, product.price, product.slug, product.images, addRecentItem]);

  const galleryImages = product.images && product.images.length > 0 ? product.images : [activeImage];

  const hasVariants = product.variants && product.variants.length > 0;

  const handleAddToCart = () => {
    addCartItem({
      id: product._id,
      name: hasVariants && selectedVariant ? `${product.title} - ${selectedVariant}` : product.title,
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
    <div className="min-h-screen bg-background pt-28 md:pt-36 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Breadcrumbs */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center text-[9px] uppercase tracking-[0.2em] font-medium text-foreground/40 mb-12"
        >
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 mx-2 stroke-[1.5]" />
          <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3 mx-2 stroke-[1.5]" />
          <span className="text-foreground/60">{product.title}</span>
        </motion.nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">

          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4"
          >
            <div
              className="relative w-full aspect-[4/5] overflow-hidden group cursor-crosshair"
              onClick={() => setIsZoomed(true)}
            >
              <Image
                src={activeImage}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.03]"
                priority
              />
              <div className="absolute inset-0 bg-foreground/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-md p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <ZoomIn className="w-4 h-4 text-foreground/50" />
              </div>
            </div>
            {galleryImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-16 md:w-20 aspect-square flex-shrink-0 overflow-hidden transition-all duration-300 ${activeImage === img ? 'ring-1 ring-foreground' : 'opacity-50 hover:opacity-80'}`}
                  >
                    <Image src={img} alt={`${product.title} thumbnail ${idx}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-start pt-4"
          >
            <span className="uppercase tracking-[0.15em] text-[9px] text-foreground/30 mb-4 block font-medium">
              {product.category || "Jewellery"}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-3 leading-[1.1]">
              {product.title}
            </h1>

            {product.rating && product.rating > 0 && (
              <div className="flex items-center gap-2 mb-5">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < Math.round(product.rating!) ? 'fill-foreground text-foreground' : 'fill-none text-foreground/15'}`} strokeWidth={1.5} />
                  ))}
                </div>
                <span className="text-xs text-foreground/40 font-light">
                  {product.rating.toFixed(1)} ({product.reviewCount || 0} {product.reviewCount === 1 ? 'review' : 'reviews'})
                </span>
              </div>
            )}

            <div className="flex items-baseline gap-3 mb-8 pt-2">
              <p className="text-2xl md:text-3xl font-light text-foreground tracking-tight">
                {formatCurrency(product.price)}
              </p>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <p className="text-sm text-foreground/30 line-through font-light">
                  {formatCurrency(product.compareAtPrice)}
                </p>
              )}
            </div>

            {hasVariants && (
              <div className="mb-8">
                <h3 className="text-[9px] uppercase tracking-[0.2em] font-medium text-foreground/40 mb-4">
                  {product.variants![0].name}: <span className="text-foreground/70">{selectedVariant || "Select"}</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants!.map((variant: ProductVariant) => (
                    <button
                      key={variant.value}
                      onClick={() => setSelectedVariant(variant.value)}
                      className={`px-5 py-3 text-[9px] uppercase tracking-[0.1em] font-medium border transition-all duration-300 ${
                        selectedVariant === variant.value
                          ? 'border-foreground bg-foreground text-background'
                          : 'border-foreground/15 text-foreground/60 hover:border-foreground/40'
                      }`}
                    >
                      {variant.value}
                      {selectedVariant === variant.value && (
                        <Check className="inline-block w-3 h-3 ml-2 stroke-[2]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.description && (
              <div className="text-foreground/50 text-sm font-light leading-[180%] mb-10 border-t border-foreground/5 pt-8">
                <p>{product.description}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleAddToCart}
                variant="outline"
                className="flex-1 h-12 bg-transparent border-foreground text-foreground hover:bg-foreground hover:text-background uppercase tracking-[0.2em] text-[9px] font-medium transition-all duration-500"
              >
                Add to Cart
              </Button>
              <Button
                onClick={handleBuyNow}
                className="flex-1 h-12 bg-foreground text-background hover:bg-foreground/90 uppercase tracking-[0.2em] text-[9px] font-medium transition-all duration-500"
              >
                Buy Now
              </Button>
              <Button
                onClick={toggleWishlist}
                variant="outline"
                className={`w-12 h-12 border-foreground flex items-center justify-center transition-colors duration-500 ${
                  isWishlisted ? "bg-foreground/5 border-foreground text-foreground" : "hover:bg-foreground hover:text-background"
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-4 h-4 stroke-[1.2] ${isWishlisted ? "fill-current" : ""}`} />
              </Button>
            </div>

            {/* Trust badges */}
            <div className="mt-10 flex flex-wrap gap-6 border-t border-foreground/5 pt-8">
              {[
                { icon: ShieldCheck, label: "Authentic 925 Silver" },
                { icon: Truck, label: "Free shipping ₹10,000+" },
                { icon: RotateCcw, label: "14-day returns" },
              ].map(({ icon: TrustIcon, label }) => (
                <div key={label} className="flex items-center gap-2 text-[9px] uppercase tracking-[0.15em] font-medium text-foreground/40">
                  <TrustIcon className="w-3.5 h-3.5 stroke-[1.5]" />
                  {label}
                </div>
              ))}
            </div>

            <div className="mt-10 space-y-5">
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer list-none text-xs font-medium uppercase tracking-[0.1em] text-foreground/60 hover:text-foreground transition-colors">
                  Material & Care
                  <span className="transition-transform duration-300 group-open:rotate-180">
                    <svg fill="none" height="20" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="20"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </summary>
                <p className="text-foreground/40 mt-4 text-sm font-light leading-relaxed">
                  925 Sterling Silver. To maintain its brilliance, avoid contact with perfumes, lotions, and water. Store in the provided pouch when not in use.
                </p>
              </details>

              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer list-none text-xs font-medium uppercase tracking-[0.1em] text-foreground/60 hover:text-foreground transition-colors">
                  Shipping & Returns
                  <span className="transition-transform duration-300 group-open:rotate-180">
                    <svg fill="none" height="20" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="20"><path d="M6 9l6 6 6-6"></path></svg>
                  </span>
                </summary>
                <p className="text-foreground/40 mt-4 text-sm font-light leading-relaxed">
                  Complimentary express shipping on orders above ₹10,000. Returns accepted within 14 days of delivery in original, unworn condition.
                </p>
              </details>
            </div>
          </motion.div>
        </div>

        {/* Sticky Mobile Cart Bar */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-t border-foreground/10 p-4 flex gap-3 md:hidden">
          <Button
            onClick={handleAddToCart}
            variant="outline"
            className="flex-1 h-12 bg-transparent border-foreground text-foreground hover:bg-foreground hover:text-background uppercase tracking-[0.2em] text-[9px] font-medium transition-all duration-500"
          >
            Add to Cart — {formatCurrency(product.price)}
          </Button>
          <Button
            onClick={handleBuyNow}
            className="flex-1 h-12 bg-foreground text-background hover:bg-foreground/90 uppercase tracking-[0.2em] text-[9px] font-medium transition-all duration-500"
          >
            Buy Now
          </Button>
        </div>

        {/* Complete The Look */}
        <CompleteTheLook products={sameCategoryProducts || relatedProducts} />

        {/* Related Products */}
        <div className="mt-32 pt-24 border-t border-foreground/5">
          <h2 className="font-serif text-3xl md:text-4xl text-center text-foreground mb-12 font-light">
            You might also like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
               <ProductCard key={relatedProduct._id} product={relatedProduct} />
            ))}
          </div>
          <RecentlyViewed />
        </div>

      </div>

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center"
            onClick={() => setIsZoomed(false)}
          >
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10"
            >
              <X className="w-8 h-8 stroke-[1.5]" />
            </button>

            <div className="relative w-full h-full max-w-5xl max-h-[90vh] mx-auto p-4 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={activeImage}
                  alt={product.title}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </motion.div>
            </div>

            {galleryImages.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); setActiveImage(img); }}
                    className={`relative w-14 h-14 overflow-hidden bg-white/10 ring-1 transition-all ${
                      activeImage === img ? 'ring-white opacity-100' : 'ring-white/20 opacity-40 hover:opacity-70'
                    }`}
                  >
                    <Image src={img} alt={`${product.title} ${idx}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
