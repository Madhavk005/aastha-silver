"use client";

import { useState, useEffect, useRef } from "react";
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

const DEBOUNCE_MS = 300;
const MAX_RESULTS = 8;

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const TRENDING_SEARCHES = ["Silver Chains", "Minimalist Rings", "Stud Earrings", "Wedding Bands"];
  const POPULAR_CATEGORIES = [
    { name: "Necklaces", slug: "necklaces" },
    { name: "Rings", slug: "rings" },
    { name: "Earrings", slug: "earrings" },
    { name: "Bracelets", slug: "bracelets" }
  ];

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedQuery(query), DEBOUNCE_MS);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query]);

  useEffect(() => {
    async function fetchSearch() {
      if (debouncedQuery.trim().length < 2) {
        setResults([]);
        return;
      }
      const allProducts = await getProducts();
      const searchTerms = debouncedQuery.toLowerCase().split(' ');
      
      const filtered = allProducts.filter((p) => {
        const searchableText = `${p.title} ${p.category} ${p.description || ''}`.toLowerCase();
        return searchTerms.every(term => searchableText.includes(term));
      });
      
      setResults(filtered.slice(0, MAX_RESULTS));
    }
    fetchSearch();
  }, [debouncedQuery]);

  // Lock body scroll
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen) {
      document.body.style.overflow = "hidden";
      timer = setTimeout(() => setQuery(""), 0); // Reset query when opened
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      if (timer) clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background/90 backdrop-blur-3xl border-b border-foreground/10 animate-in fade-in duration-300">
      {/* Search Header */}
      <div className="border-b border-foreground/10">
        <div className="container mx-auto px-4 md:px-8 py-6 flex items-center gap-4">
          <Search className="w-6 h-6 text-foreground/50" />
          <input
            autoFocus
            type="text"
            placeholder="Search for jewelry, collections, or styles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none text-xl md:text-3xl font-serif text-foreground placeholder:text-foreground/20 focus:outline-none focus:ring-0"
          />
          {query && (
            <button 
              onClick={() => setQuery("")} 
              className="text-xs uppercase tracking-widest text-foreground/50 hover:text-foreground mr-4 transition-colors"
            >
              Clear
            </button>
          )}
          <button onClick={onClose} className="p-2 text-foreground/50 hover:text-foreground transition-colors bg-secondary rounded-full">
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 flex-1 overflow-y-auto py-12">
        {query.trim().length <= 1 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-500 fade-in">
            {/* Trending Searches */}
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.2em] font-medium text-foreground/40 mb-6">Trending Searches</h3>
              <ul className="space-y-4">
                {TRENDING_SEARCHES.map((term) => (
                  <li key={term}>
                    <button 
                      onClick={() => setQuery(term)}
                      className="text-lg font-serif text-foreground hover:text-foreground/60 transition-colors flex items-center gap-2 group"
                    >
                      <Search className="w-4 h-4 text-foreground/20 group-hover:text-foreground/50 transition-colors" />
                      {term}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {/* Popular Categories */}
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.2em] font-medium text-foreground/40 mb-6">Popular Categories</h3>
              <div className="flex flex-wrap gap-3">
                {POPULAR_CATEGORIES.map((cat) => (
                  <Link 
                    key={cat.slug} 
                    href={`/shop/${cat.slug}`}
                    onClick={onClose}
                    className="px-6 py-3 bg-secondary text-xs uppercase tracking-[0.1em] text-foreground hover:bg-foreground hover:text-background transition-colors rounded-full"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : results.length === 0 && debouncedQuery.trim().length > 1 ? (
          <div className="text-center mt-20 animate-in fade-in">
            <Search className="w-12 h-12 text-foreground/10 mx-auto mb-6" />
            <h3 className="font-serif text-2xl text-foreground mb-2">No results found</h3>
            <p className="text-foreground/50 font-light">We couldn&apos;t find anything matching &quot;{debouncedQuery}&quot;.</p>
            <button 
              onClick={() => setQuery("")}
              className="mt-8 text-xs uppercase tracking-widest border-b border-foreground pb-1 hover:text-foreground/50 hover:border-foreground/50 transition-colors"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
            <div className="flex justify-between items-end mb-8">
              <h3 className="text-[10px] uppercase tracking-[0.2em] font-medium text-foreground/40">
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
                  <div className="relative aspect-[4/5] bg-secondary overflow-hidden mb-4">
                    <Image
                      src={product.images?.[0] || "/placeholder.jpg"}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-[10px] uppercase tracking-[0.2em] font-medium text-foreground group-hover:text-foreground/50 transition-colors line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="text-xs text-foreground/50 mt-2 font-light">{formatCurrency(product.price)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
