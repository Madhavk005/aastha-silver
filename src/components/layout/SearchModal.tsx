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

  useEffect(() => {
    async function fetchSearch() {
      if (query.length > 1) {
        const allProducts = await getProducts();
        const filtered = allProducts.filter(
          (p) =>
            p.title.toLowerCase().includes(query.toLowerCase()) ||
            (p.category && p.category.toLowerCase().includes(query.toLowerCase()))
        );
        setResults(filtered.slice(0, 6)); // limit to 6
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
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#FDFCF8]/95 backdrop-blur-md animate-in fade-in duration-300">
      <div className="container mx-auto px-4 md:px-8 py-8 flex items-center gap-4">
        <Search className="w-6 h-6 text-black/50" />
        <input
          autoFocus
          type="text"
          placeholder="Search for jewelry..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-transparent border-none text-2xl md:text-4xl font-serif text-[#1A1D1A] placeholder:text-black/20 focus:outline-none focus:ring-0"
        />
        <button onClick={onClose} className="p-2 text-black/50 hover:text-black transition-colors">
          <X className="w-8 h-8 stroke-[1]" />
        </button>
      </div>

      <div className="container mx-auto px-4 md:px-8 flex-1 overflow-y-auto pb-24">
        {query.length > 1 && results.length === 0 ? (
          <div className="text-center text-gray-500 mt-20 font-light">
            No results found for &quot;{query}&quot;
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-8">
            {results.map((product) => (
              <Link
                key={product._id}
                href={`/product/${product.slug.current}`}
                onClick={onClose}
                className="group flex flex-col"
              >
                <div className="relative aspect-[4/5] bg-[#F9F8F5] overflow-hidden mb-4">
                  <Image
                    src={product.images?.[0] || "/placeholder.jpg"}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#1A1D1A] group-hover:text-gray-500 transition-colors">
                  {product.title}
                </h3>
                <p className="text-xs text-gray-400 mt-1">{formatCurrency(product.price)}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
