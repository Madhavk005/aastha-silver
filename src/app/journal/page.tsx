import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Journal | Aastha Silver",
  description: "Read about our design philosophy, styling tips, and the craftsmanship behind Aastha Silver.",
};

const ARTICLES = [
  {
    title: "The Art of Layering: A Guide to Necklaces",
    excerpt: "Discover how to perfectly balance lengths, weights, and textures to create an effortless stacked look.",
    category: "Styling",
    date: "July 2, 2026",
    image: "/images/featured-necklace.png"
  },
  {
    title: "Understanding 925 Sterling Silver",
    excerpt: "What makes sterling silver the premier choice for accessible luxury? We break down the alloy that shapes our collections.",
    category: "Craftsmanship",
    date: "June 15, 2026",
    image: "/images/featured-ring.png"
  },
  {
    title: "Behind the Campaign: The Muse",
    excerpt: "An exclusive look behind the scenes of our latest editorial shoot capturing the essence of quiet luxury.",
    category: "Editorial",
    date: "May 28, 2026",
    image: "/images/editorial.png"
  }
];

export default function JournalPage() {
  return (
    <div className="min-h-screen bg-[#FDFCF8] pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <span className="uppercase tracking-[0.3em] text-[10px] text-gray-400 mb-4 block">Editorial</span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1A1D1A]">
            The Journal
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {ARTICLES.map((article, index) => (
            <Link key={index} href={`/journal/article-${index}`} className="group flex flex-col">
              <div className="relative aspect-[4/5] overflow-hidden bg-[#F5F3EC] mb-6">
                <Image 
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-black/50">
                  {article.category}
                </span>
                <span className="text-[10px] uppercase tracking-[0.1em] text-gray-400 font-light">
                  {article.date}
                </span>
              </div>
              
              <h2 className="font-serif text-2xl text-[#1A1D1A] mb-3 group-hover:text-black/60 transition-colors">
                {article.title}
              </h2>
              <p className="text-gray-500 text-sm font-light leading-relaxed mb-6 flex-1">
                {article.excerpt}
              </p>
              
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-medium text-black">
                Read Article
                <ArrowRight className="w-3 h-3 transition-transform duration-500 group-hover:translate-x-2" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
