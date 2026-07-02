import React from "react";
import Link from "next/link";

const FOOTER_LINKS = {
  Shop: [
    { name: "Rings", href: "/collections/rings" },
    { name: "Earrings", href: "/collections/earrings" },
    { name: "Necklaces", href: "/collections/necklaces" },
    { name: "Bracelets", href: "/collections/bracelets" },
    { name: "Gift Sets", href: "/collections/gift-sets" },
  ],
  About: [
    { name: "Our Story", href: "/about" },
    { name: "Craftsmanship", href: "/craftsmanship" },
    { name: "Sustainability", href: "/sustainability" },
    { name: "Journal", href: "/journal" },
  ],
  Support: [
    { name: "Contact Us", href: "/contact" },
    { name: "FAQ", href: "/faq" },
    { name: "Shipping & Returns", href: "/delivery" },
    { name: "Jewellery Care", href: "/jewellery-care" },
  ],
  Legal: [
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#215650] text-white pt-16 md:pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">
          
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-8">
              <span className="font-serif text-3xl tracking-wide font-light text-white">
                Aastha Silver
              </span>
            </Link>
            <p className="text-gray-400 font-light leading-relaxed max-w-sm mb-10">
              Premium Sterling Silver Jewellery designed for everyday elegance. 
              Authentic, modern, and crafted to last a lifetime.
            </p>
            <form className="flex max-w-sm border-b border-white/20 pb-2 transition-colors focus-within:border-white">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent text-white placeholder:text-gray-500 px-2 py-2 outline-none font-light text-sm"
                required
              />
              <button
                type="submit"
                className="text-white uppercase tracking-[0.15em] text-[10px] font-medium px-4 hover:text-gray-300 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 lg:col-span-3">
            <div>
              <h3 className="text-white mb-6 uppercase tracking-[0.2em] text-[10px] font-medium">Shop</h3>
              <ul className="flex flex-col gap-4">
                {FOOTER_LINKS.Shop.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-400 font-light text-sm hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white mb-6 uppercase tracking-[0.2em] text-[10px] font-medium">About</h3>
              <ul className="flex flex-col gap-4">
                {FOOTER_LINKS.About.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-400 font-light text-sm hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white mb-6 uppercase tracking-[0.2em] text-[10px] font-medium">Support</h3>
              <ul className="flex flex-col gap-4">
                {FOOTER_LINKS.Support.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-400 font-light text-sm hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-gray-500 font-light text-xs text-center md:text-left gap-4 md:gap-0">
          <p>&copy; {new Date().getFullYear()} Aastha Silver. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            {FOOTER_LINKS.Legal.map((link) => (
              <Link key={link.name} href={link.href} className="hover:text-white transition-colors">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
