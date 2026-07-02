"use client";

import React, { useState, useMemo } from "react";
import { ProductGrid } from "@/features/products/components/ProductGrid";
import { Product } from "@/features/products/types";
import { SlidersHorizontal, ChevronDown } from "lucide-react";

interface CollectionClientProps {
  initialProducts: Product[];
  categoryName: string;
}

type SortOption = "featured" | "price-asc" | "price-desc" | "newest";

export function CollectionClient({ initialProducts, categoryName }: CollectionClientProps) {
  const [sortOption, setSortOption] = useState<SortOption>("featured");
  const [showFilters, setShowFilters] = useState(false);

  // Derive min/max for filters or simply define price brackets
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...initialProducts];

    // Filter
    if (maxPrice) {
      result = result.filter(p => p.price <= maxPrice);
    }

    // Sort
    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        // In a real app with timestamps, we'd sort by date. 
        // Here we just reverse for visual difference
        result.reverse(); 
        break;
      case "featured":
      default:
        break; // Keep initial order
    }

    return result;
  }, [initialProducts, sortOption, maxPrice]);

  return (
    <div className="min-h-screen bg-[#FDFCF8] pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <h1 className="font-serif text-4xl md:text-5xl text-[#1A1D1A] mb-4 text-center capitalize">
          {categoryName}
        </h1>
        <p className="text-gray-500 text-center mb-16 max-w-xl mx-auto font-light text-sm md:text-base">
          Discover our curated selection of {categoryName}, designed for the modern aesthetic with timeless appeal.
        </p>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12 pb-6 border-b border-black/5 gap-6">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-medium text-black hover:text-black/60 transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4 stroke-[1.5]" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>

          <div className="flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-black/50 hidden sm:inline-block">Sort By:</span>
            <div className="relative">
              <select 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="appearance-none bg-transparent border border-black/10 px-4 py-2 pr-10 text-[10px] uppercase tracking-[0.2em] font-medium text-black cursor-pointer focus:outline-none focus:border-black rounded-none"
              >
                <option value="featured">Featured</option>
                <option value="newest">New Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <ChevronDown className="w-4 h-4 stroke-[1.5] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-black/50" />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          {showFilters && (
            <div className="w-full lg:w-64 flex-shrink-0 animate-in slide-in-from-left-4 duration-300">
              <div className="sticky top-32 space-y-8">
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.2em] font-medium text-black mb-4">Price Range</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="radio" name="price" checked={maxPrice === null} onChange={() => setMaxPrice(null)} className="accent-black" />
                      <span className="text-sm font-light text-gray-500 group-hover:text-black transition-colors">All Prices</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="radio" name="price" checked={maxPrice === 5000} onChange={() => setMaxPrice(5000)} className="accent-black" />
                      <span className="text-sm font-light text-gray-500 group-hover:text-black transition-colors">Under ₹5,000</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="radio" name="price" checked={maxPrice === 10000} onChange={() => setMaxPrice(10000)} className="accent-black" />
                      <span className="text-sm font-light text-gray-500 group-hover:text-black transition-colors">Under ₹10,000</span>
                    </label>
                  </div>
                </div>
                
                <div className="border-t border-black/5 pt-8">
                  <h3 className="text-[10px] uppercase tracking-[0.2em] font-medium text-black mb-4">Material</h3>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" checked readOnly className="accent-black" />
                    <span className="text-sm font-light text-black">925 Sterling Silver</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            <ProductGrid products={filteredAndSortedProducts} />
          </div>
        </div>

      </div>
    </div>
  );
}
