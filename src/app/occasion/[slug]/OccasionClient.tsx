"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, ChevronRight, Package } from "lucide-react";
import { motion } from "framer-motion";
import { GIFT_SECTIONS, OCCASION_DETAILS } from "@/lib/constants";
import { ProductGrid } from "@/features/products/components/ProductGrid";
import { Product } from "@/features/products/types";

interface OccasionClientProps {
  occasion: { name: string; slug: string; image: string };
  details: { subtitle: string; description: string; heroImage: string; colorPalette: string[] } | null;
  products: Product[];
}

export default function OccasionClient({ occasion, details, products }: OccasionClientProps) {
  const detail = details || OCCASION_DETAILS[occasion.slug] || {
    subtitle: `Shop ${occasion.name} Gifts`,
    description: `Discover our curated collection for ${occasion.name}.`,
    heroImage: occasion.image,
    colorPalette: ["#f8fafc", "#f1f5f9", "#e2e8f0"],
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 md:px-8 pt-28 pb-4">
        <nav className="flex items-center text-[10px] uppercase tracking-[0.2em] font-medium text-foreground/50">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3 mx-2" />
          <Link href="/gift-guide" className="hover:text-foreground transition-colors">Gift Guide</Link>
          <ChevronRight className="w-3 h-3 mx-2" />
          <span className="text-foreground/80">{occasion.name} Gifts</span>
        </nav>
      </div>

      {/* Hero Banner */}
      <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src={detail.heroImage} alt={occasion.name} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent" />
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-background/50 mb-4 block mix-blend-difference">Gift Guide</span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-background mb-4 tracking-tight mix-blend-difference">
              {occasion.name}
            </h1>
            <p className="text-lg md:text-xl text-background/80 font-light mb-2 mix-blend-difference">{detail.subtitle}</p>
            <p className="text-sm text-background/60 font-light max-w-lg leading-relaxed mix-blend-difference">{detail.description}</p>
          </motion.div>
        </div>
      </section>

      {/* Curated Message */}
      <section className="py-24 md:py-32 bg-background text-center">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Sparkles className="w-6 h-6 mx-auto mb-6 text-foreground/40 stroke-[1.5]" />
            <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-6 tracking-tight">
              Find the Perfect {occasion.name} Gift
            </h2>
            <p className="text-foreground/50 text-sm font-light leading-relaxed max-w-xl mx-auto">
              {detail.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          {products.length > 0 ? (
            <ProductGrid products={products} columns={4} />
          ) : (
            <div className="text-center py-24">
              <Package className="w-10 h-10 mx-auto mb-4 stroke-[1] text-foreground/20" />
              <h3 className="font-serif text-2xl text-foreground/60 mb-2">Curating {occasion.name} Collection</h3>
              <p className="text-foreground/40 text-sm font-light">New pieces are being added. Check back soon.</p>
              <Link
                href="/shop/all"
                className="inline-block mt-8 text-[10px] uppercase tracking-[0.2em] font-medium border border-foreground/30 px-8 py-3 hover:bg-foreground hover:text-background transition-colors"
              >
                Browse All Jewellery
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Explore Other Occasions */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-foreground tracking-tight">Explore Other Occasions</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {GIFT_SECTIONS.filter(o => o.slug !== occasion.slug).map((occ, index) => (
              <motion.div
                key={occ.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <Link href={`/occasion/${occ.slug}`} className="group block">
                  <div className="relative aspect-square overflow-hidden bg-background mb-4">
                    <Image src={occ.image} alt={occ.name} fill className="object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
                    <div className="absolute inset-0 bg-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <h3 className="text-center text-[10px] uppercase tracking-[0.2em] font-medium text-foreground group-hover:text-foreground/60 transition-colors">
                    {occ.name}
                  </h3>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background text-center">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl md:text-5xl text-foreground mb-6 tracking-tight">
              Can&apos;t Decide?
            </h2>
            <p className="text-foreground/50 text-sm font-light mb-10 max-w-md mx-auto">
              Let our team help you find the perfect piece. We&apos;re just a message away.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-medium text-foreground group border-b border-foreground pb-2"
            >
              Get Personalised Advice
              <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-2 stroke-[1.5]" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
