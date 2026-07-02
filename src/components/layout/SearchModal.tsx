"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { getProducts } from "@/lib/data";
import { Product } from "@/features/products/types";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);

  const TRENDING_SEARCHES = ["Silver Chains", "Minimalist Rings", "Stud Earrings", "Wedding Bands"];
  const POPULAR_CATEGORIES = [
    { name: "Necklaces", slug: "necklaces" },
    { name: "Rings", slug: "rings" },
    { name: "Earrings", slug: "earrings" },
    { name: "Bracelets", slug: "bracelets" }
  ];

  useEffect(() => {
    async function fetchSearch() {
      if (query.trim().length > 1) {
        const allProducts = await getProducts();
        const searchTerms = query.toLowerCase().split(' ');
        
        const filtered = allProducts.filter((p) => {
          const searchableText = `${p.title} ${p.category} ${p.description || ''}`.toLowerCase();
          return searchTerms.every(term => searchableText.includes(term));
        });
        
        setResults(filtered.slice(0, 8)); // limit to 8 for better grid
      } else {
        setResults([]);
      }
    }
    fetchSearch();
  }, [query]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setQuery(""); // Reset query when opened
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white/70 backdrop-blur-3xl border-b border-white/20 animate-in fade-in duration-300">
      {/* Search Header */}
      <div className="border-b border-black/5">
        <div className="container mx-auto px-4 md:px-8 py-6 flex items-center gap-4">
          <Search className="w-6 h-6 text-black/50" />
          <input
            autoFocus
            type="text"
            placeholder="Search for jewelry, collections, or styles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none text-xl md:text-3xl font-serif text-[#0F0F0F] placeholder:text-black/20 focus:outline-none focus:ring-0"
          />
          {query && (
            <button 
              onClick={() => setQuery("")} 
              className="text-xs uppercase tracking-widest text-black/50 hover:text-black mr-4 transition-colors"
            >
              Clear
            </button>
          )}
          <button onClick={onClose} className="p-2 text-black/50 hover:text-black transition-colors bg-[#F5F5F5] rounded-full">
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 flex-1 overflow-y-auto py-12">
        {query.trim().length <= 1 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-500 fade-in">
            {/* Trending Searches */}
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.2em] font-medium text-black/40 mb-6">Trending Searches</h3>
              <ul className="space-y-4">
                {TRENDING_SEARCHES.map((term) => (
                  <li key={term}>
                    <button 
                      onClick={() => setQuery(term)}
                      className="text-lg font-serif text-[#0F0F0F] hover:text-gray-500 transition-colors flex items-center gap-2 group"
                    >
                      <Search className="w-4 h-4 text-black/20 group-hover:text-black/50 transition-colors" />
                      {term}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {/* Popular Categories */}
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.2em] font-medium text-black/40 mb-6">Popular Categories</h3>
              <div className="flex flex-wrap gap-3">
                {POPULAR_CATEGORIES.map((cat) => (
                  <Link 
                    key={cat.slug} 
                    href={`/collections/${cat.slug}`}
                    onClick={onClose}
                    className="px-6 py-3 bg-[#F5F5F5] text-xs uppercase tracking-[0.1em] text-[#0F0F0F] hover:bg-[#215650] hover:text-white transition-colors rounded-full"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center mt-20 animate-in fade-in">
            <Search className="w-12 h-12 text-black/10 mx-auto mb-6" />
            <h3 className="font-serif text-2xl text-[#0F0F0F] mb-2">No results found</h3>
            <p className="text-gray-500 font-light">We couldn&apos;t find anything matching &quot;{query}&quot;.</p>
            <button 
              onClick={() => setQuery("")}
              className="mt-8 text-xs uppercase tracking-widest border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
            <div className="flex justify-between items-end mb-8">
              <h3 className="text-[10px] uppercase tracking-[0.2em] font-medium text-black/40">
                Products ({results.length})
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
              {results.map((product) => (
                <Link
                  key={product._id}
                  href={`/product/${product.slug.current}`}
                  onClick={onClose}
                  className="group flex flex-col"
                >
                  <div className="relative aspect-[4/5] bg-[#F5F5F5] overflow-hidden mb-4">
                    <Image
                      src={product.images?.[0] || "/placeholder.jpg"}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#0F0F0F] group-hover:text-gray-500 transition-colors line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-2 font-light">{formatCurrency(product.price)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
