import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";

export default function ShopIndex() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="font-serif text-5xl md:text-6xl lg:text-8xl text-foreground mb-16 text-center tracking-tight">
          Collections
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {CATEGORIES.map((category) => (
            <Link 
              key={category.slug}
              href={`/shop/${category.slug}`}
              className="group block"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-secondary mb-6">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-[1500ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
              
              <div className="flex items-center justify-between border-b border-foreground/10 pb-4">
                <h2 className="font-serif text-2xl lg:text-3xl text-foreground group-hover:text-foreground/80 transition-colors">
                  {category.name}
                </h2>
                <ArrowRight className="w-6 h-6 -translate-x-4 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:opacity-100 stroke-[1.5] text-foreground" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
