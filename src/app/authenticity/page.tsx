import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function AuthenticityPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="text-center mb-16">
          <span className="uppercase tracking-[0.1em] text-[10px] text-gray-400 mb-4 block">Our Promise</span>
          <h1 className="font-serif text-5xl md:text-6xl text-[#1A1D1A] mb-6 leading-[1.1]">
            Authenticity
          </h1>
          <p className="text-gray-500 font-light max-w-xl mx-auto">
            Our commitment to quality is unwavering. Every Aastha Silver piece is a testament to genuine craftsmanship and certified materials.
          </p>
        </div>

        <div className="bg-white rounded-[2rem] p-8 md:p-16 shadow-sm border border-black/5 mb-16">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden bg-secondary flex items-center justify-center border-4 border-white shadow-inner">
                 <ShieldCheck className="w-24 h-24 text-black stroke-[1]" />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="font-serif text-3xl text-[#1A1D1A] mb-6">The 925 Hallmark</h2>
              <p className="text-gray-500 font-light mb-6 leading-relaxed text-sm">
                Sterling silver is an alloy composed of 92.5% pure silver and 7.5% of other metals, typically copper. This precise ratio is essential: pure silver is too soft for durable jewelry, and the addition of copper provides the necessary strength without compromising the silver&apos;s beautiful color and luster.
              </p>
              <p className="text-gray-500 font-light leading-relaxed text-sm">
                Every piece from Aastha Silver bears the standard &quot;925&quot; hallmark, an international symbol guaranteeing its purity and authenticity. When you wear our pieces, you wear certified quality.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="flex flex-col items-center text-center p-8">
            <CheckCircle2 className="w-6 h-6 text-black mb-4 stroke-[1.5]" />
            <h3 className="uppercase tracking-[0.15em] text-xs font-medium text-[#1A1D1A] mb-3">Sourced Ethically</h3>
            <p className="text-gray-500 font-light text-xs leading-relaxed">
              We trace our materials back to their origins, ensuring they are mined and processed under strict environmental and ethical standards.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-8">
            <CheckCircle2 className="w-6 h-6 text-black mb-4 stroke-[1.5]" />
            <h3 className="uppercase tracking-[0.15em] text-xs font-medium text-[#1A1D1A] mb-3">Nickel-Free</h3>
            <p className="text-gray-500 font-light text-xs leading-relaxed">
              All our jewelry is entirely free of nickel, making it hypoallergenic and perfectly safe for sensitive skin.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-8">
            <CheckCircle2 className="w-6 h-6 text-black mb-4 stroke-[1.5]" />
            <h3 className="uppercase tracking-[0.15em] text-xs font-medium text-[#1A1D1A] mb-3">Artisan Crafted</h3>
            <p className="text-gray-500 font-light text-xs leading-relaxed">
              Beyond the metal itself, our authenticity lies in the hands of the master artisans who shape each individual piece.
            </p>
          </div>
        </div>

        <div className="mt-20 flex justify-center border-t border-black/10 pt-12">
          <Link href="/shop" className="inline-flex items-center gap-4 uppercase tracking-[0.1em] text-xs font-medium text-[#1A1D1A] group border-b border-black pb-3">
            Shop Authentic Silver
            <ArrowRight className="w-4 h-4 transition-transform duration-500 ease-out group-hover:translate-x-3 stroke-[1.5]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
