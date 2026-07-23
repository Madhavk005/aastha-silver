"use client";

import React, { useState, useMemo } from "react";
import { ProductGrid } from "@/features/products/components/ProductGrid";
import { Product } from "@/features/products/types";
import { SlidersHorizontal, ChevronDown, LayoutGrid, List } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface CollectionClientProps {
  initialProducts: Product[];
  categoryName: string;
  categoryImage?: string | null;
}

type SortOption = "featured" | "price-asc" | "price-desc" | "newest";

const ITEMS_PER_PAGE = 12;

export function CollectionClient({ initialProducts, categoryName, categoryImage }: CollectionClientProps) {
  const [sortOption, setSortOption_] = useState<SortOption>("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [maxPrice, setMaxPrice_] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const setSortOption = (option: SortOption) => { setSortOption_(option); setCurrentPage(1); };
  const setMaxPrice = (price: number | null) => { setMaxPrice_(price); setCurrentPage(1); };

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...initialProducts];
    if (maxPrice) result = result.filter(p => p.price <= maxPrice);
    switch (sortOption) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "newest": break;
      case "featured": default: break;
    }
    return result;
  }, [initialProducts, sortOption, maxPrice]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAndSortedProducts, currentPage]);

  return (
    <div className="min-h-screen bg-background pb-24">

      {/* Category Banner */}
      <section className="relative pt-32 pb-24 md:pb-32 overflow-hidden min-h-[45vh] md:min-h-[55vh] flex items-center">
        {categoryImage && (
          <div className="absolute inset-0">
            <Image src={categoryImage} alt={categoryName} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px]" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="text-[9px] uppercase tracking-[0.3em] text-foreground/40 mb-6 block font-medium">Collection</span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-foreground mb-6 capitalize tracking-tight leading-[1]">
              {categoryName}
            </h1>
            <p className="text-foreground/50 max-w-xl mx-auto font-light text-sm md:text-base leading-relaxed">
              Discover our curated selection of {categoryName}, designed for the modern aesthetic with timeless appeal.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-center my-10 pb-6 border-b border-foreground/5 gap-6">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] font-medium text-foreground/50 hover:text-foreground transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4 stroke-[1.5]" />
              {showFilters ? "Hide Filters" : "Filters"}
            </button>

            <div className="flex items-center gap-1 border border-foreground/10 p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 transition-colors ${viewMode === "grid" ? 'bg-foreground/10 text-foreground' : 'text-foreground/30 hover:text-foreground'}`}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-4 h-4 stroke-[1.5]" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 transition-colors ${viewMode === "list" ? 'bg-foreground/10 text-foreground' : 'text-foreground/30 hover:text-foreground'}`}
                aria-label="List view"
              >
                <List className="w-4 h-4 stroke-[1.5]" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[9px] uppercase tracking-[0.2em] font-medium text-foreground/40">
              {filteredAndSortedProducts.length} {filteredAndSortedProducts.length === 1 ? 'product' : 'products'}
            </span>
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="appearance-none bg-transparent border border-foreground/15 px-4 py-2 pr-8 text-[9px] uppercase tracking-[0.2em] font-medium text-foreground/60 cursor-pointer focus:outline-none focus:border-foreground transition-colors"
              >
                <option value="featured" className="bg-background">Featured</option>
                <option value="newest" className="bg-background">New Arrivals</option>
                <option value="price-asc" className="bg-background">Price: Low to High</option>
                <option value="price-desc" className="bg-background">Price: High to Low</option>
              </select>
              <ChevronDown className="w-3 h-3 stroke-[1.5] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-foreground/30" />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="w-full lg:w-56 flex-shrink-0"
              >
                <div className="sticky top-32 space-y-8">
                  <div>
                    <h3 className="text-[9px] uppercase tracking-[0.2em] font-medium text-foreground/50 mb-5">Price Range</h3>
                    <div className="space-y-3">
                      {[
                        { label: "All Prices", value: null },
                        { label: "Under ₹5,000", value: 5000 },
                        { label: "Under ₹10,000", value: 10000 },
                      ].map((opt) => (
                        <label key={opt.label} className="flex items-center gap-3 cursor-pointer group">
                          <input type="radio" name="price" checked={maxPrice === opt.value} onChange={() => setMaxPrice(opt.value)} className="accent-foreground" />
                          <span className="text-sm font-light text-foreground/50 group-hover:text-foreground transition-colors">{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-foreground/5 pt-8">
                    <h3 className="text-[9px] uppercase tracking-[0.2em] font-medium text-foreground/50 mb-5">Material</h3>
                    <p className="text-sm font-light text-foreground/40">925 Sterling Silver</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products */}
          <div className="flex-1">
            <ProductGrid products={paginatedProducts} viewMode={viewMode} />

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-16 pt-12 border-t border-foreground/5">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-[9px] uppercase tracking-[0.2em] font-medium text-foreground/40 hover:text-foreground disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-8 h-8 text-[10px] font-medium transition-colors ${
                        currentPage === i + 1
                          ? 'bg-foreground text-background'
                          : 'text-foreground/40 hover:text-foreground'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-[9px] uppercase tracking-[0.2em] font-medium text-foreground/40 hover:text-foreground disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
