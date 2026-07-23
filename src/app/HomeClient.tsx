"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, ShieldCheck, Sparkles, Heart, Gift, RefreshCw, Truck, Camera } from "lucide-react";
import { ProductGrid } from "@/features/products/components/ProductGrid";
import { RecentlyViewed } from "@/features/products/components/RecentlyViewed";
import { Product } from "@/features/products/types";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { USP_CARDS, REVIEWS, INSTAGRAM_POSTS } from "@/lib/constants";

const CELEBRITIES = [
  { name: "Zendaya", role: "Actor", img: "/images/hero.jpg", quote: "True luxury is effortless." },
  { name: "Hailey Bieber", role: "Model", img: "/images/editorial-1.jpg", quote: "Silver that speaks volumes." },
  { name: "Deepika Padukone", role: "Actor", img: "/images/editorial-2.jpg", quote: "A modern heirloom." },
  { name: "Kendall Jenner", role: "Model", img: "/images/editorial-portrait.jpg", quote: "Perfect for the everyday." },
  { name: "Gigi Hadid", role: "Model", img: "/images/featured-rings.jpg", quote: "Minimal yet striking." },
  { name: "Priyanka Chopra", role: "Actor", img: "/images/philosophy.jpg", quote: "Bold and beautiful." },
];

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const s = size === "sm" ? "w-3 h-3" : "w-4 h-4";
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${s} ${i < rating ? 'fill-foreground text-foreground' : 'fill-none text-foreground/15'}`} strokeWidth={1.5} />
      ))}
    </div>
  );
}

const ICON_MAP: Record<string, React.ElementType> = {
  ShieldCheck, Sparkles, Heart, Gift, RefreshCw, Truck,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function HomeClient({ products }: { products: Product[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const heroImgY = useTransform(scrollYProgress, [0, 0.4], ["0%", "18%"]);
  const smoothHeroY = useSpring(heroImgY, { stiffness: 100, damping: 30 });

  return (
    <div ref={containerRef} className="flex flex-col min-h-screen bg-background text-foreground overflow-hidden selection:bg-champagne selection:text-white">

      {/* Hero */}
      <section className="relative min-h-[100dvh] w-full overflow-hidden flex flex-col">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-foreground/[0.02] pointer-events-none" />

        <div className="flex-1 flex flex-col px-6 md:px-12 pt-36 pb-10 relative z-10">
          {/* Top bar */}
          <div className="flex justify-between items-start w-full mb-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-foreground/40 px-4 py-2 rounded-full border border-sage/20 bg-sage/10 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-sage" />
                Autumn / Winter 2024
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <span className="text-[9px] uppercase tracking-[0.25em] text-foreground/30 font-mono">
                Est. 2024
              </span>
            </motion.div>
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 py-8">
            {/* Left: Text */}
            <div className="md:w-1/2 text-center md:text-left">
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ opacity: 0, y: 80 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                  className="font-serif text-[15vw] md:text-[8vw] leading-[0.85] tracking-tighter text-foreground font-light"
                >
                  Aastha
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h2
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
                  className="font-serif text-[15vw] md:text-[8vw] leading-[0.85] tracking-tighter text-foreground font-light italic mt-[-0.08em]"
                >
                  Silver
                </motion.h2>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-sm md:text-base text-foreground/50 font-light leading-relaxed max-w-sm mt-8 md:mt-10 mx-auto md:mx-0"
              >
                Elevating modern luxury through artisanal craftsmanship and uncompromising purity.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.85 }}
                className="mt-10 flex flex-col sm:flex-row items-center gap-4"
              >
                <Link
                  href="/shop"
                  className="group inline-flex items-center gap-3 bg-emerald text-background px-8 py-4 text-[9px] uppercase tracking-[0.2em] font-medium transition-all duration-500 hover:bg-deep-forest rounded-xl"
                >
                  Explore Collection
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-1 stroke-[1.5]" />
                </Link>
                <Link
                  href="/best-sellers"
                  className="group inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] font-medium text-foreground/50 hover:text-foreground transition-colors"
                >
                  Best Sellers
                  <ArrowRight className="w-3 h-3 transition-transform duration-500 group-hover:translate-x-1 stroke-[1.5]" />
                </Link>
              </motion.div>
            </div>

            {/* Right: Image */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
              className="md:w-1/2 w-full max-w-lg"
            >
              <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-3xl shadow-xl shadow-foreground/5">
                <motion.div style={{ y: smoothHeroY }} className="absolute inset-0 w-full h-[130%] -top-[15%]">
                  <Image
                    src="/images/hero.jpg"
                    alt="Aastha Silver Collection"
                    fill
                    priority
                    className="object-cover object-center"
                  />
                </motion.div>
                <div className="absolute inset-0 ring-1 ring-inset ring-foreground/10 rounded-3xl" />

                {/* Glass tag */}
                <div className="absolute top-4 left-4 bg-background/40 backdrop-blur-xl px-4 py-2 rounded-xl border border-background/20">
                  <p className="text-[8px] uppercase tracking-[0.2em] font-medium text-foreground/70">
                    Premium 925 Silver
                  </p>
                </div>

              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

      {/* Featured Collections */}
      <section className="py-20 md:py-28 bg-background relative z-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-[9px] uppercase tracking-[0.3em] text-foreground/40 mb-3 block font-medium">Collections</span>
              <h2 className="font-serif text-4xl md:text-6xl text-foreground tracking-tight font-light">
                Curated <span className="italic text-foreground/50">Editions</span>
              </h2>
            </div>
            <Link href="/shop" className="hidden md:flex text-[9px] uppercase tracking-[0.2em] font-medium items-center gap-2 text-foreground/50 hover:text-foreground transition-colors">
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-7 group"
            >
              <Link href="/shop/chains" className="block w-full">
                <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl shadow-sm transition-shadow duration-500 group-hover:shadow-md">
                  <Image
                    src="/images/featured-necklace.jpg"
                    alt="Chains Collection"
                    fill
                    className="object-cover transition-all duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl" />
                </div>
                <div className="flex justify-between items-center mt-6">
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl text-foreground">Chains</h3>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-foreground/40 mt-1 font-medium">Everyday Elegance</p>
                  </div>
                  <span className="text-[10px] text-foreground/30 font-mono">01</span>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-4 md:col-start-10 md:mt-32 group"
            >
              <Link href="/shop/rings" className="block w-full">
                <div className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl shadow-sm transition-shadow duration-500 group-hover:shadow-md">
                  <Image
                    src="/images/featured-rings.jpg"
                    alt="Rings Collection"
                    fill
                    className="object-cover transition-all duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl" />
                </div>
                <div className="flex justify-between items-center mt-6">
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl text-foreground">Rings</h3>
                    <p className="text-[9px] uppercase tracking-[0.2em] text-foreground/40 mt-1 font-medium">Timeless Statements</p>
                  </div>
                  <span className="text-[10px] text-foreground/30 font-mono">02</span>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Banner */}
      <section className="relative py-40 md:py-56 bg-foreground text-background overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 0.08 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          <Image
            src="/images/philosophy.jpg"
            alt=""
            fill
            className="object-cover"
          />
        </motion.div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
            <div className="md:col-span-4">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-[9px] uppercase tracking-[0.3em] text-background/50 font-medium block"
              >
                The Philosophy
              </motion.span>
            </div>
            <div className="md:col-span-8">
              <motion.blockquote
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
                variants={containerVariants}
                className="text-4xl sm:text-5xl md:text-7xl font-serif leading-[1.1] tracking-tight font-light"
              >
                <motion.span variants={itemVariants} className="block text-balance">
                  &ldquo;True elegance is&nbsp;whispered,
                </motion.span>
                <motion.span variants={itemVariants} className="block text-background/40 italic mt-2">
                  not&nbsp;shouted.&rdquo;
                </motion.span>
              </motion.blockquote>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-background/40 text-sm font-light mt-12 max-w-lg leading-relaxed"
              >
                We craft modern heirlooms where form meets light. Every piece is a quiet rebellion against the ordinary — designed to be felt, not just seen.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* USP Cards */}
      <section className="py-32 md:py-40 bg-background relative z-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[9px] uppercase tracking-[0.3em] text-foreground/40 mb-4 block font-medium"
            >
              Why Choose Us
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-serif text-4xl md:text-6xl text-foreground tracking-tight font-light"
            >
              Crafted with <span className="italic text-foreground/50">Purpose</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {USP_CARDS.map((card, index) => {
              const Icon = ICON_MAP[card.icon] || ShieldCheck;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="group p-8 md:p-10 bg-foreground/[0.02] hover:bg-foreground/[0.04] transition-all duration-500 rounded-2xl border border-foreground/5 hover:border-foreground/10"
                >
                  <div className="w-10 h-10 flex items-center justify-center mb-6 rounded-xl bg-foreground/5 transition-colors duration-500">
                    <Icon className="w-5 h-5 text-foreground/50 transition-colors duration-500 stroke-[1.5]" />
                  </div>
                  <h3 className="font-serif text-xl text-foreground mb-3">{card.title}</h3>
                  <p className="text-foreground/50 text-sm font-light leading-relaxed">{card.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-32 md:py-40 bg-background relative z-10 border-t border-foreground/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-8">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="uppercase tracking-[0.3em] text-[9px] text-foreground/40 mb-4 block font-medium"
              >
                New Additions
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="font-serif text-5xl md:text-6xl text-foreground tracking-tight font-light leading-[1]"
              >
                Latest <span className="italic text-foreground/50">Arrivals</span>
              </motion.h2>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Link
                href="/shop"
                className="hidden md:inline-flex items-center justify-center bg-emerald text-background px-8 py-4 text-[9px] font-medium tracking-[0.2em] uppercase transition-all duration-500 hover:bg-deep-forest rounded-xl"
              >
                Discover All
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            <ProductGrid products={products} columns={4} />
          </motion.div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-32 md:py-40 bg-foreground/[0.02] relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[9px] uppercase tracking-[0.3em] text-foreground/40 mb-4 block font-medium"
            >
              Real Stories
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-serif text-4xl md:text-6xl text-foreground tracking-tight font-light"
            >
              Loved by <span className="italic text-foreground/50">You</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {REVIEWS.map((review, index) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="bg-background p-8 md:p-10 flex flex-col border border-foreground/5 hover:border-foreground/15 transition-all duration-500 rounded-2xl shadow-sm"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-foreground/10">
                    <Image src={review.image} alt={review.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground">{review.name}</h4>
                    <p className="text-[8px] uppercase tracking-[0.15em] text-foreground/30 font-medium">Verified Buyer</p>
                  </div>
                </div>
                <StarRating rating={review.rating} />
                <p className="mt-5 text-foreground/60 text-sm font-light leading-[180%] flex-1">
                  &ldquo;{review.text}&rdquo;
                </p>
                <p className="mt-6 text-[9px] uppercase tracking-[0.15em] text-foreground/20 font-medium">
                  {review.product}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Celebrities — The Muse */}
      <section className="py-32 md:py-40 bg-background relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[9px] uppercase tracking-[0.3em] text-foreground/40 mb-4 block font-medium"
            >
              The Muse
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-serif text-4xl md:text-6xl text-foreground tracking-tight font-light"
            >
              As Seen <span className="italic text-foreground/50">On</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="mt-6 text-foreground/40 text-sm font-light max-w-lg mx-auto"
            >
              Worn by icons who define modern elegance. Discover why the world&apos;s most stylish women choose Aastha Silver.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
            {CELEBRITIES.map((celeb, index) => (
              <motion.div
                key={celeb.name}
                initial={{ opacity: 0, y: 24, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group relative"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-secondary shadow-sm transition-shadow duration-500 group-hover:shadow-lg">
                  <Image
                    src={celeb.img}
                    alt={celeb.name}
                    fill
                    className="object-cover transition-all duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-background text-[9px] uppercase tracking-[0.15em] font-medium mb-1 drop-shadow-sm">
                      {celeb.role}
                    </p>
                    <p className="text-background font-serif italic text-sm leading-snug drop-shadow-sm">
                      &ldquo;{celeb.quote}&rdquo;
                    </p>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-xs font-medium text-foreground/80 group-hover:text-foreground transition-colors">{celeb.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 flex justify-center"
          >
            <Link
              href="/celebrities"
              className="inline-flex items-center gap-3 text-[9px] uppercase tracking-[0.2em] font-medium text-foreground/50 group hover:text-foreground transition-colors"
            >
              <span className="relative overflow-hidden pb-1">
                <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">Meet All Our Muses</span>
                <span className="absolute inset-0 inline-block translate-y-full transition-transform duration-500 group-hover:translate-y-0">Meet All Our Muses</span>
              </span>
              <ArrowRight className="w-3 h-3 transition-transform duration-500 group-hover:translate-x-2 stroke-[1.5]" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-32 md:py-40 bg-foreground/[0.02] relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[9px] uppercase tracking-[0.3em] text-foreground/40 mb-4 block font-medium"
            >
              Our Ethos
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-serif text-4xl md:text-6xl text-foreground tracking-tight font-light"
            >
              The Story Behind <span className="italic text-foreground/50">the Silver</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            {[
              {
                title: "Rooted in Craft",
                subtitle: "Generations of Mastery",
                text: "Every Aastha piece is shaped by master artisans who have refined their skill over generations. Our ateliers blend traditional techniques with contemporary design, creating jewellery that honours the past while embracing the present.",
                image: "/images/editorial-1.jpg",
              },
              {
                title: "Designed for Life",
                subtitle: "Beyond Trends",
                text: "We reject the transient nature of fast fashion. Each collection is built around the concept of permanence — pieces designed to be worn daily, passed down, and treasured across decades.",
                image: "/images/editorial-2.jpg",
              },
            ].map((story, index) => (
              <motion.div
                key={story.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.9, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="group"
              >
                <div className="relative aspect-[4/5] overflow-hidden mb-8 rounded-2xl shadow-sm transition-shadow duration-500 group-hover:shadow-md">
                  <Image src={story.image} alt={story.title} fill className="object-cover transition-all duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl" />
                </div>
                <span className="text-[9px] uppercase tracking-[0.2em] text-foreground/30 font-medium">{story.subtitle}</span>
                <h3 className="font-serif text-2xl md:text-3xl text-foreground mt-2 mb-4">{story.title}</h3>
                <p className="text-foreground/50 text-sm font-light leading-relaxed">{story.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 flex justify-center"
          >
            <Link
              href="/about"
              className="inline-flex items-center gap-3 text-[9px] uppercase tracking-[0.2em] font-medium text-foreground/60 group hover:text-foreground transition-colors"
            >
              <span className="relative overflow-hidden pb-1">
                <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full">Read Our Full Story</span>
                <span className="absolute inset-0 inline-block translate-y-full transition-transform duration-500 group-hover:translate-y-0">Read Our Full Story</span>
              </span>
              <ArrowRight className="w-3 h-3 transition-transform duration-500 group-hover:translate-x-2 stroke-[1.5]" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Instagram Gallery */}
      <section className="py-32 md:py-40 bg-background relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Camera className="w-5 h-5 mx-auto mb-6 text-foreground/30 stroke-[1.5]" />
            </motion.div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[9px] uppercase tracking-[0.3em] text-foreground/40 mb-4 block font-medium"
            >
              Follow Us
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-serif text-4xl md:text-6xl text-foreground tracking-tight font-light"
            >
              <a
                href="https://www.instagram.com/aastha_silver/"
                target="_blank"
                rel="noopener noreferrer"
                className="italic text-foreground/50 hover:text-foreground transition-colors"
              >
                @aastha_silver
              </a>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-6 text-foreground/40 text-sm font-light max-w-md mx-auto"
            >
              Tag us in your looks for a chance to be featured. Join our community of silver lovers.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Link
                href="/gallery"
                className="inline-flex items-center gap-3 mt-8 text-[9px] uppercase tracking-[0.2em] font-medium text-foreground/50 hover:text-foreground group transition-colors"
              >
                View Full Gallery
                <ArrowRight className="w-3 h-3 transition-transform duration-500 group-hover:translate-x-2 stroke-[1.5]" />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {INSTAGRAM_POSTS.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: 0.5, delay: index * 0.04 }}
                className="relative aspect-square overflow-hidden group cursor-pointer rounded-xl shadow-sm transition-shadow duration-500 hover:shadow-md"
              >
                <Image
                  src={post.src}
                  alt={post.alt}
                  fill
                  className="object-cover transition-all duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-background/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center rounded-xl">
                  <div className="bg-background/40 backdrop-blur-md p-3 rounded-full">
                    <Camera className="w-5 h-5 text-foreground/80" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recently Viewed */}
      <RecentlyViewed />

    </div>
  );
}
