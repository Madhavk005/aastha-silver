import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Droplets, Box, Sun } from "lucide-react";

export default function JewelleryCarePage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="text-center mb-16">
          <span className="uppercase tracking-[0.1em] text-[10px] text-gray-400 mb-4 block">Product Care</span>
          <h1 className="font-serif text-5xl md:text-6xl text-[#1A1D1A] mb-6 leading-[1.1]">
            Jewellery Care
          </h1>
          <p className="text-gray-500 font-light max-w-xl mx-auto">
            Aastha Silver pieces are crafted from premium 925 sterling silver, designed to last a lifetime. Here is how to maintain their timeless brilliance.
          </p>
        </div>

        <div className="relative aspect-[16/9] w-full rounded-[2rem] overflow-hidden mb-20 bg-secondary">
          <Image 
            src="/images/featured-necklace.jpg" 
            alt="Jewellery Care" 
            fill 
            className="object-cover"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-black/5">
            <Sparkles className="w-8 h-8 text-black mb-6 stroke-[1.5]" />
            <h3 className="font-serif text-2xl text-[#1A1D1A] mb-4">Everyday Wear</h3>
            <p className="text-gray-500 font-light text-sm leading-relaxed">
              Sterling silver thrives when worn. The natural oils in your skin help keep tarnishing at bay. We encourage you to make Aastha Silver a part of your daily rotation, but advise removing your pieces during strenuous activities to prevent scratching.
            </p>
          </div>

          <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-black/5">
            <Droplets className="w-8 h-8 text-black mb-6 stroke-[1.5]" />
            <h3 className="font-serif text-2xl text-[#1A1D1A] mb-4">Water & Chemicals</h3>
            <p className="text-gray-500 font-light text-sm leading-relaxed">
              Always remove your jewelry before swimming, showering, or bathing. Chemicals in chlorine, salt water, perfumes, lotions, and cosmetics can accelerate tarnishing and compromise the silver&apos;s finish.
            </p>
          </div>

          <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-black/5">
            <Box className="w-8 h-8 text-black mb-6 stroke-[1.5]" />
            <h3 className="font-serif text-2xl text-[#1A1D1A] mb-4">Proper Storage</h3>
            <p className="text-gray-500 font-light text-sm leading-relaxed">
              When not being worn, store your pieces in the original Aastha Silver pouch or an airtight container. Keep pieces separate to avoid scratching, and store them in a cool, dark place.
            </p>
          </div>

          <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-black/5">
            <Sun className="w-8 h-8 text-black mb-6 stroke-[1.5]" />
            <h3 className="font-serif text-2xl text-[#1A1D1A] mb-4">Cleaning Ritual</h3>
            <p className="text-gray-500 font-light text-sm leading-relaxed">
              To restore your silver&apos;s natural luster, gently polish it using a microfiber or specialized silver cleaning cloth. Avoid using harsh chemical dips or abrasive materials, which can permanently damage the surface.
            </p>
          </div>
        </div>

        <div className="mt-20 flex justify-center border-t border-black/10 pt-12">
          <Link href="/shop" className="inline-flex items-center gap-4 uppercase tracking-[0.1em] text-xs font-medium text-[#1A1D1A] group border-b border-black pb-3">
            Explore the Collection
            <ArrowRight className="w-4 h-4 transition-transform duration-500 ease-out group-hover:translate-x-3 stroke-[1.5]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
