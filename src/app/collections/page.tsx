import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const CATEGORIES = [
  { name: "Necklaces", slug: "necklaces", image: "/images/featured-necklace.png" },
  { name: "Rings", slug: "rings", image: "/images/featured-ring.png" },
  { name: "Earrings", slug: "earrings", image: "/images/editorial.png" },
];

export default function CollectionsIndex() {
  return (
    <div className="min-h-screen bg-[#FDFCF8] pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="font-serif text-5xl md:text-6xl text-[#1A1D1A] mb-16 text-center">
          All Collections
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CATEGORIES.map((category) => (
            <Link 
              key={category.slug}
              href={`/collections/${category.slug}`}
              className="group block"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#F5F3EC] mb-6">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
              
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl text-[#1A1D1A] group-hover:text-black transition-colors">
                  {category.name}
                </h2>
                <ArrowRight className="w-5 h-5 -translate-x-4 opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:opacity-100 stroke-[1.5]" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
