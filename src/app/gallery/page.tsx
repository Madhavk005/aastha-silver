"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Camera, Heart, ChevronRight, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GALLERY_IMAGES } from "@/lib/constants";

const ALL_TAGS = Array.from(new Set(GALLERY_IMAGES.map(img => img.tag)));

export default function GalleryPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filtered = activeTag
    ? GALLERY_IMAGES.filter(img => img.tag === activeTag)
    : GALLERY_IMAGES;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 md:px-8 pt-28 pb-4">
        <nav className="flex items-center text-[10px] uppercase tracking-[0.2em] font-medium text-foreground/50">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 mx-2" />
          <span className="text-foreground/80">Customer Gallery</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Camera className="w-8 h-8 mx-auto mb-6 text-foreground/30 stroke-[1.5]" />
            <h1 className="font-serif text-5xl md:text-7xl text-foreground mb-4 tracking-tight">
              Our <span className="italic text-foreground/60">Community</span>
            </h1>
            <p className="text-foreground/50 text-sm font-light max-w-lg mx-auto mb-8">
              Tag your photos with <span className="text-foreground/80 font-medium">#AasthaSilver</span> for a chance to be featured in our gallery.
            </p>
            <a
              href="https://instagram.com/aasthasilver"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-medium text-foreground group border border-foreground/30 px-8 py-4 hover:bg-foreground hover:text-background transition-colors"
            >
              <ExternalLink className="w-4 h-4 stroke-[1.5]" />
              Follow @aasthasilver
            </a>
          </motion.div>
        </div>
      </section>

      {/* Tag Filters */}
      <div className="container mx-auto px-4 md:px-8 mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setActiveTag(null)}
            className={`text-[9px] uppercase tracking-[0.15em] font-medium px-5 py-2.5 transition-colors ${
              activeTag === null ? 'bg-foreground text-background' : 'bg-secondary text-foreground/60 hover:text-foreground border border-foreground/10'
            }`}
          >
            All
          </button>
          {ALL_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`text-[9px] uppercase tracking-[0.15em] font-medium px-5 py-2.5 transition-colors ${
                activeTag === tag ? 'bg-foreground text-background' : 'bg-secondary text-foreground/60 hover:text-foreground border border-foreground/10'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          <AnimatePresence>
            {filtered.map((img, index) => (
              <motion.div
                key={`${img.src}-${index}`}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.03 }}
                className="break-inside-avoid group cursor-pointer relative overflow-hidden bg-secondary"
                onClick={() => setSelectedImage(index)}
              >
                <div className="relative w-full">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={600}
                    height={600}
                    className="w-full h-auto object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-2">
                        <Heart className="w-3 h-3 text-background fill-background" />
                        <span className="text-[9px] text-background font-medium">{img.user}</span>
                      </div>
                      <span className="text-[8px] uppercase tracking-[0.1em] text-background/70">{img.tag}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="text-foreground/40 text-sm font-light">No photos found for this tag.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>

            <div className="relative max-w-4xl max-h-[85vh] w-full h-full flex items-center justify-center">
              <motion.div
                key={selectedImage}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full flex items-center justify-center"
                onClick={e => e.stopPropagation()}
              >
                <Image
                  src={filtered[selectedImage].src}
                  alt={filtered[selectedImage].alt}
                  width={1200}
                  height={1200}
                  className="max-h-full w-auto object-contain"
                />
              </motion.div>
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/10 px-4 py-2">
              <Heart className="w-3 h-3 text-white" />
              <span className="text-xs text-white/80">{filtered[selectedImage].user}</span>
              <span className="text-[9px] text-white/50 mx-2">|</span>
              <span className="text-[9px] uppercase tracking-[0.1em] text-white/50">{filtered[selectedImage].tag}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
