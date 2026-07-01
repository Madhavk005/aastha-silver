"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const CELEBRITIES = [
  { id: 1, name: "Zendaya", role: "Actor", img: "/images/featured-necklace.png", quote: "True luxury is effortless." },
  { id: 2, name: "Hailey Bieber", role: "Model", img: "/images/featured-ring.png", quote: "Silver that speaks volumes." },
  { id: 3, name: "Deepika Padukone", role: "Actor", img: "/images/editorial.png", quote: "A modern heirloom." },
  { id: 4, name: "Kendall Jenner", role: "Model", img: "/images/featured-necklace.png", quote: "Perfect for the everyday." },
  { id: 5, name: "Gigi Hadid", role: "Model", img: "/images/featured-ring.png", quote: "Minimal yet striking." },
  { id: 6, name: "Priyanka Chopra", role: "Actor", img: "/images/editorial.png", quote: "Bold and beautiful." },
];

export default function CelebritiesPage() {
  return (
    <div className="min-h-screen bg-[#FDFCF8] pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="uppercase tracking-[0.1em] text-xs text-gray-400 mb-6 block"
          >
            The Muse
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl text-[#1A1D1A] mb-8 leading-[1.1]"
          >
            As Seen On
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-500 font-light leading-relaxed"
          >
            Discover the iconic women who embody the spirit of Aastha Silver. 
            From red carpets to everyday moments, our pieces are chosen by those 
            who define modern elegance and quiet luxury.
          </motion.p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {CELEBRITIES.map((celeb, index) => (
            <motion.div 
              key={celeb.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="break-inside-avoid relative group rounded-[2rem] overflow-hidden"
            >
              <div className="relative w-full aspect-[3/4] bg-[#F5F3EC]">
                <Image
                  src={celeb.img}
                  alt={celeb.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                
                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                  <div className="text-white text-right">
                    <span className="uppercase tracking-[0.1em] text-[10px] bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-full">
                      {celeb.role}
                    </span>
                  </div>
                  
                  <div className="text-white">
                    <p className="font-serif italic text-lg mb-4 text-white/90">
                      "{celeb.quote}"
                    </p>
                    <h3 className="font-serif text-3xl mb-1">{celeb.name}</h3>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
