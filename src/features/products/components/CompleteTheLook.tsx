"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/features/products/types";
import { formatCurrency } from "@/lib/utils";

interface CompleteTheLookProps {
  products: Product[];
}

export function CompleteTheLook({ products }: CompleteTheLookProps) {
  if (products.length === 0) return null;

  return (
    <div className="mt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-10"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/50 mb-3 block">Style It Together</span>
        <h2 className="font-serif text-3xl md:text-4xl text-foreground tracking-tight">
          Complete the <span className="italic text-foreground/60">Look</span>
        </h2>
        <p className="text-foreground/40 text-xs font-light mt-2 max-w-md">
          Pair with these complementary pieces for a perfectly curated ensemble.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.slice(0, 4).map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Link href={`/product/${item.slug?.current || "#"}`} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden bg-secondary mb-4">
                <Image
                  src={item.images?.[0] || "/placeholder.jpg"}
                  alt={item.title || "Product"}
                  fill
                  className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <span className="text-[9px] uppercase tracking-[0.15em] text-foreground/40">{item.category || "Jewellery"}</span>
              <h3 className="font-serif text-sm text-foreground mt-1 group-hover:text-foreground/60 transition-colors">{item.title}</h3>
              <p className="text-xs text-foreground/50 font-light mt-0.5">{formatCurrency(item.price)}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
