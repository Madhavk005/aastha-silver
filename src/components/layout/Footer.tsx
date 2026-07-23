"use client";

import React from "react";
import Link from "next/link";
import { Heart, ChevronRight, Sparkles } from "lucide-react";
import { FaInstagram } from "react-icons/fa";

const FOOTER_LINKS = {
  Shop: [
    { name: "Women", href: "/shop/women" },
    { name: "Men", href: "/shop/men" },
    { name: "Unisex", href: "/shop/unisex" },
    { name: "Chains", href: "/shop/chains" },
    { name: "Rings", href: "/shop/rings" },
    { name: "Anklets", href: "/shop/anklets" },
    { name: "Bracelets", href: "/shop/bracelets" },
    { name: "Pendants & Charms", href: "/shop/pendants-charms" },
  ],
  About: [
    { name: "Our Story", href: "/about" },
    { name: "Authenticity", href: "/authenticity" },
    { name: "Journal", href: "/journal" },
    { name: "Gallery", href: "/gallery" },
  ],
  Support: [
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" },
    { name: "Track Order", href: "/track-order" },
    { name: "Shipping & Returns", href: "/shipping-returns" },
    { name: "Jewellery Care", href: "/jewellery-care" },
  ],
  Legal: [
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-foreground text-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 pt-20 md:pt-28 pb-10">

        {/* Newsletter — Inner Circle */}
        <div className="relative mb-20 p-8 md:p-10 rounded-2xl border border-champagne/10 bg-champagne/[0.03] overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-champagne/10 border border-champagne/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-champagne" />
              </div>
              <div>
                <h3 className="font-serif text-xl text-background">
                  Join the <span className="italic text-champagne">Inner Circle</span>
                </h3>
                <p className="text-background/40 text-xs font-light mt-0.5">
                  Early access, private sales & studio stories.
                </p>
              </div>
            </div>
            <form className="w-full md:w-auto flex gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                required
                className="flex-1 md:w-64 bg-transparent border border-background/20 px-4 py-3 text-sm font-light text-background placeholder:text-background/25 focus:outline-none focus:border-champagne transition-all duration-500 rounded-xl"
              />
              <button
                type="submit"
                className="uppercase tracking-[0.2em] text-[9px] font-medium text-foreground bg-champagne px-6 py-3 transition-all duration-500 hover:bg-champagne rounded-xl whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12 mb-20">

          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-8">
              <span className="font-serif text-3xl tracking-wide font-light text-background">
                Aastha Silver
              </span>
            </Link>
            <p className="text-background/50 font-light leading-relaxed max-w-sm text-sm mb-10">
              Premium Sterling Silver Jewellery designed for everyday elegance. Authentic, modern, and crafted to last a lifetime.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="https://www.instagram.com/aastha_silver/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/40 hover:text-background transition-colors"
                aria-label="Follow us on Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <Link href="/contact" className="text-background/40 hover:text-background transition-colors text-[9px] uppercase tracking-[0.2em] font-medium">
                Get in Touch
              </Link>
            </div>
          </div>

          {/* Link Columns */}
          <div className="lg:col-span-7 lg:col-start-6 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-background/80 mb-6 uppercase tracking-[0.2em] text-[9px] font-medium">{category}</h3>
                <ul className="flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-background/50 font-light text-sm hover:text-background transition-colors duration-300 inline-flex items-center gap-1 group/link"
                      >
                        {link.name}
                        <ChevronRight className="w-2.5 h-2.5 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300 stroke-[1.5]" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-background/10 text-background/40 font-light text-xs text-center md:text-left gap-6 md:gap-0">
          <p>&copy; {new Date().getFullYear()} Aastha Silver. Crafted with <Heart className="w-3 h-3 inline-block fill-background/30 text-background/30" /> in India.</p>
          <div className="flex items-center gap-6">
            <a
              href="https://www.instagram.com/aastha_silver/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/20 hover:text-background/50 transition-colors text-[9px] uppercase tracking-[0.2em] font-medium flex items-center gap-1.5"
            >
              <FaInstagram className="w-3.5 h-3.5" />
              @aastha_silver
            </a>
            <span className="text-background/15 text-[9px] uppercase tracking-[0.2em] font-medium">
              925 Sterling Silver · Hallmarked · Authentic
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
