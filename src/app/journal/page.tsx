import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function JournalPage() {
  return (
    <div className="min-h-screen bg-[#FDFCF8] pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
        <span className="uppercase tracking-[0.1em] text-[10px] text-gray-400 mb-8 block">The Journal</span>
        <h1 className="font-serif text-5xl md:text-6xl text-[#1A1D1A] mb-8 leading-[1.1]">
          Coming Soon
        </h1>
        
        <p className="text-gray-500 font-light leading-relaxed mb-12 max-w-lg mx-auto">
          We are currently crafting stories about our design process, inspiration, and the 
          artisans behind Aastha Silver. Stay tuned for our editorial journal.
        </p>

        <Link href="/" className="inline-flex items-center gap-4 uppercase tracking-[0.1em] text-xs font-medium text-[#1A1D1A] group border-b border-black pb-3">
          Return to Homepage
          <ArrowRight className="w-4 h-4 transition-transform duration-500 ease-out group-hover:translate-x-3 stroke-[1.5]" />
        </Link>
      </div>
    </div>
  );
}
