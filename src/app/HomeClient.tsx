"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, ShieldCheck, Sparkles, Hand } from "lucide-react";
import { ProductGrid } from "@/features/products/components/ProductGrid";
import { Product } from "@/features/products/types";
import { motion, useScroll, useTransform, Variants } from "framer-motion";

const FADE_UP_ANIMATION_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 20, duration: 1.2 } },
};

export default function HomeClient({ products }: { products: Product[] }) {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFCF8] overflow-hidden">
      
      {/* Hero Section - Cinematic Bottom-Aligned with Parallax */}
      <section className="relative h-[100dvh] w-full flex items-end justify-start overflow-hidden bg-black">
        <motion.div style={{ y: heroY }} className="absolute inset-0 w-full h-full origin-top">
          <Image
            src="/images/hero.png"
            alt="Elegant minimal sterling silver jewelry"
            fill
            className="object-cover opacity-70"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        
        <motion.div 
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.2, delayChildren: 0.5 } }
          }}
          className="relative z-10 w-full px-4 md:px-12 lg:px-24 pb-24 md:pb-32 flex flex-col items-start md:flex-row md:items-end justify-between gap-12"
        >
          <div className="max-w-4xl">
            <motion.span variants={FADE_UP_ANIMATION_VARIANTS} className="text-white/70 uppercase tracking-[0.5em] text-[9px] md:text-[10px] mb-8 block font-medium">
              The New Collection
            </motion.span>
            <motion.h1 variants={FADE_UP_ANIMATION_VARIANTS} className="font-serif text-[4rem] sm:text-7xl md:text-8xl lg:text-[11rem] text-white tracking-tight font-light leading-[0.85] mb-12">
              Everyday <br/><span className="italic font-light text-white/90">Elegance</span>
            </motion.h1>
          </div>
          <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="mb-4 md:mb-0">
            <Link 
              href="/collections/all"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white/5 backdrop-blur-xl border border-white/20 text-white px-12 py-6 text-[10px] font-medium tracking-[0.2em] uppercase transition-all duration-700 hover:border-white/60 hover:bg-white/10"
            >
              <span className="relative z-10 transition-colors duration-500">Shop Now</span>
              <div className="absolute inset-0 -translate-y-full bg-white/5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Infinite Marquee */}
      <div className="w-full bg-[#1A1D1A] py-6 overflow-hidden flex whitespace-nowrap">
        <motion.div 
          className="flex gap-12 text-white/80 uppercase tracking-[0.1em] text-xs font-medium"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 25, repeat: Infinity }}
        >
          {Array(10).fill("QUIET LUXURY • TIMELESS CRAFT • 925 STERLING SILVER •").map((text, i) => (
            <span key={i}>{text}</span>
          ))}
        </motion.div>
      </div>

      {/* Editorial Categories - Offset Grid Layout */}
      <section className="py-20 md:py-32 lg:py-48 bg-[#FDFCF8]">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
            variants={FADE_UP_ANIMATION_VARIANTS}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8"
          >
            <h2 className="font-serif text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[5rem] text-[#1A1D1A] max-w-3xl leading-[1.05] tracking-tight font-light">
              Curated for the <span className="italic text-black/40">modern</span> wearer.
            </h2>
            <Link href="/collections" className="hidden md:flex items-center gap-4 uppercase tracking-[0.1em] text-xs font-medium text-[#1A1D1A] group pb-2 border-b border-transparent hover:border-black transition-all">
              Explore All 
              <ArrowRight className="w-4 h-4 transition-transform duration-500 ease-out group-hover:translate-x-2 stroke-[1.5]" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
            {/* Large Category */}
            <motion.div 
              initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-7"
            >
              <Link href="/collections/necklaces" className="group flex flex-col">
                <div className="relative w-full aspect-[4/5] md:aspect-[16/11] overflow-hidden bg-[#F5F3EC] mb-8 rounded-[2rem]">
                  <Image
                    src="/images/featured-necklace.png"
                    alt="Necklaces"
                    fill
                    className="object-cover transition-transform duration-[2.5s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-700 group-hover:bg-black/10" />
                </div>
                <div className="flex justify-between items-center border-b border-black/10 pb-4">
                  <h3 className="text-[#1A1D1A] uppercase tracking-[0.2em] text-xs font-medium">Necklaces</h3>
                  <span className="text-gray-400 text-xs italic font-serif">01</span>
                </div>
              </Link>
            </motion.div>

            {/* Small Categories Stack */}
            <div className="md:col-span-5 flex flex-col gap-12 mt-8 md:mt-48">
              <motion.div 
                initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link href="/collections/rings" className="group flex flex-col">
                  <div className="relative w-full aspect-square md:aspect-[4/5] overflow-hidden bg-[#F5F3EC] mb-8 rounded-[2rem]">
                    <Image
                      src="/images/featured-ring.png"
                      alt="Rings"
                      fill
                      className="object-cover transition-transform duration-[2.5s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors duration-700 group-hover:bg-black/10" />
                  </div>
                  <div className="flex justify-between items-center border-b border-black/10 pb-4">
                    <h3 className="text-[#1A1D1A] uppercase tracking-[0.2em] text-xs font-medium">Rings</h3>
                    <span className="text-gray-400 text-xs italic font-serif">02</span>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-20 md:py-32 lg:py-40 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={FADE_UP_ANIMATION_VARIANTS}
            className="flex flex-col items-center text-center mb-24"
          >
            <span className="uppercase tracking-[0.3em] text-[10px] text-gray-400 mb-6 block">The Essentials</span>
            <h2 className="font-serif text-5xl md:text-6xl text-[#1A1D1A] tracking-tight">Most <span className="italic">Desired</span></h2>
          </motion.div>
          
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }}>
            <ProductGrid products={products} columns={4} />
          </motion.div>
          
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={FADE_UP_ANIMATION_VARIANTS} className="mt-24 flex justify-center">
            <Link 
              href="/best-sellers" 
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-[#1A1D1A] bg-transparent text-[#1A1D1A] px-12 py-5 text-xs font-medium tracking-[0.1em] uppercase transition-all duration-700"
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-500">View Full Collection</span>
              <div className="absolute inset-0 translate-y-full bg-[#1A1D1A] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* The Muse / Celebrity Section */}
      <section className="py-16 md:py-24 lg:py-32 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <span className="uppercase tracking-[0.1em] text-xs text-gray-400 mb-4 block">As Seen On</span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#1A1D1A] mb-6">
              The Muse
            </h2>
          </motion.div>

          <div className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {[
              { id: 1, name: "Zendaya", role: "Actor", img: "/images/featured-necklace.png" },
              { id: 2, name: "Hailey Bieber", role: "Model", img: "/images/featured-ring.png" },
              { id: 3, name: "Deepika Padukone", role: "Actor", img: "/images/editorial.png" },
              { id: 4, name: "Kendall Jenner", role: "Model", img: "/images/featured-necklace.png" },
            ].map((celeb, idx) => (
              <motion.div 
                key={celeb.id}
                initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative min-w-[280px] md:min-w-[400px] aspect-[3/4] rounded-[2rem] overflow-hidden snap-center group cursor-pointer"
              >
                <Image
                  src={celeb.img}
                  alt={celeb.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
                <div className="absolute bottom-8 left-8 text-white">
                  <h3 className="font-serif text-2xl mb-1">{celeb.name}</h3>
                  <p className="text-xs uppercase tracking-[0.1em] text-white/70">{celeb.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
            <Link 
              href="/celebrities"
              className="inline-flex items-center gap-4 uppercase tracking-[0.1em] text-xs font-medium text-[#1A1D1A] group border-b border-black pb-2"
            >
              View All Features
              <ArrowRight className="w-4 h-4 transition-transform duration-500 ease-out group-hover:translate-x-3 stroke-[1.5]" />
            </Link>
          </div>
        </div>
      </section>

      {/* Editorial Section - Magazine Overlap */}
      <section className="py-20 md:py-32 lg:py-48 bg-[#FDFCF8] overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <div className="relative grid grid-cols-1 lg:grid-cols-12 items-center">
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, ease: "easeOut" }}
              className="lg:col-span-7 relative aspect-[3/4] lg:aspect-square overflow-hidden z-10 rounded-[2rem]"
            >
              <Image
                src="/images/editorial.png"
                alt="Timeless Elegance"
                fill
                className="object-cover"
              />
            </motion.div>
            
            <motion.div 
              initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 lg:-ml-32 z-20 bg-white p-12 md:p-16 lg:p-24 shadow-2xl shadow-black/5 mt-8 lg:mt-0 rounded-[2rem]"
            >
              <span className="uppercase tracking-[0.3em] text-[10px] text-gray-400 mb-8 block">Our Philosophy</span>
              <h2 className="font-serif text-4xl md:text-6xl mb-8 text-[#1A1D1A] leading-[1.1] tracking-tight">
                Quiet luxury.<br />
                <span className="italic text-gray-400">Timeless</span> craft.
              </h2>
              <p className="text-gray-500 text-sm md:text-base mb-12 leading-loose font-light">
                We believe that true luxury lies in simplicity and uncompromising quality. 
                Our collections are designed not to overpower, but to elevate—becoming 
                a seamless extension of your personal style. Every piece is handcrafted 
                in premium 925 sterling silver to stand the test of time.
              </p>
              <Link 
                href="/about"
                className="inline-flex items-center gap-4 uppercase tracking-[0.1em] text-xs font-medium text-[#1A1D1A] group border-b border-black pb-3"
              >
                Discover Our Story
                <ArrowRight className="w-4 h-4 transition-transform duration-500 ease-out group-hover:translate-x-3 stroke-[1.5]" />
              </Link>
            </motion.div>

          </div>
        </div>
      </section>
      
      {/* Why Aastha Silver - Minimalist Grid */}
      <section className="py-32 bg-[#1A1D1A] text-white">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 text-center">
            {[
              { icon: ShieldCheck, title: "925 Sterling Silver", desc: "Premium quality silver that stands the test of time, hallmarked for purity." },
              { icon: Star, title: "Hypoallergenic", desc: "Safe for sensitive skin, nickel-free and comfortable for everyday wear." },
              { icon: Sparkles, title: "Lifetime Shine", desc: "Specially coated to prevent tarnishing and maintain that day-one brilliance." },
              { icon: Hand, title: "Handcrafted", desc: "Meticulously finished by skilled artisans, ensuring every piece is unique." },
            ].map((feature, i) => (
              <motion.div 
                key={feature.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1 }}
                className="flex flex-col items-center"
              >
                <feature.icon className="w-6 h-6 mb-8 opacity-70 stroke-[1]" />
                <h3 className="uppercase tracking-[0.2em] text-[10px] font-medium mb-4">{feature.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed font-light">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
