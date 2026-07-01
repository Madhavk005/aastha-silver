import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FDFCF8] pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <h1 className="font-serif text-5xl md:text-6xl text-[#1A1D1A] mb-12 text-center leading-[1.1]">
          Our Story
        </h1>
        
        <div className="prose prose-lg mx-auto text-gray-500 font-light leading-loose space-y-12">
          <p className="text-2xl font-serif text-[#1A1D1A] text-center leading-relaxed">
            "We believe that true luxury lies in simplicity. It doesn't shout. It is found 
            in the subtle details, the weight of a well-crafted piece, and the way it becomes 
            a natural extension of the wearer."
          </p>
          
          <div className="w-16 h-[1px] bg-black/10 mx-auto my-12" />

          <p>
            Aastha Silver was born from a desire to return to the essentials. In a world saturated 
            with fast fashion and fleeting trends, we sought to create a brand that celebrates the 
            enduring legacy of pure 925 sterling silver. 
          </p>
          <p>
            Every piece in our collection is an homage to traditional craftsmanship, viewed through 
            the lens of modern minimalism. We collaborate exclusively with master artisans who have 
            honed their skills over generations, ensuring that the legacy of their craft lives on 
            in every curve, clasp, and polished surface.
          </p>
          
          <div className="relative aspect-[16/9] w-full rounded-[2rem] overflow-hidden my-16 bg-[#F5F3EC]">
            <Image 
              src="/images/editorial.png" 
              alt="Artisan Craftsmanship" 
              fill 
              className="object-cover"
            />
          </div>

          <h3 className="font-serif text-3xl text-[#1A1D1A] mb-6">Sustainable by Design</h3>
          <p>
            Our commitment to quiet luxury extends beyond aesthetics. We source our materials 
            responsibly and design with uncompromising intention. We reject the concept of seasonal 
            collections that lose their relevance; instead, we build a permanent archive of timeless 
            essentials. 
          </p>
          <p>
            When you acquire a piece from Aastha Silver, you are investing in an heirloom—something 
            designed to withstand the test of time and eventually be passed down.
          </p>
        </div>

        <div className="mt-20 flex justify-center">
          <Link href="/collections" className="inline-flex items-center gap-4 uppercase tracking-[0.1em] text-xs font-medium text-[#1A1D1A] group border-b border-black pb-3">
            Explore the Collection
            <ArrowRight className="w-4 h-4 transition-transform duration-500 ease-out group-hover:translate-x-3 stroke-[1.5]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
