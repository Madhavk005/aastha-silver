"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Search, Heart, User, ShoppingBag, Menu, ChevronDown, X, ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCartStore } from "@/store/cart-store";
import { useAuth, UserButton, SignInButton } from "@clerk/nextjs";
import { SearchModal } from "./SearchModal";
import { CATEGORIES, GIFT_SECTIONS } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";

const NAV_LINKS = [
  { name: "Shop", href: "/shop", hasDropdown: true },
  { name: "New", href: "/new", hasDropdown: false },
  { name: "Best Sellers", href: "/best-sellers", hasDropdown: false },
  { name: "The Muse", href: "/celebrities", hasDropdown: false },
  { name: "Gift Guide", href: "/gift-guide", hasDropdown: true },
  { name: "About", href: "/about", hasDropdown: false },
];

function Underline({ active }: { active: boolean }) {
  return (
    <span
      className={cn(
        "absolute -bottom-2 left-1/2 -translate-x-1/2 h-[2px] bg-foreground transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        active ? "w-full" : "w-0 group-hover:w-full"
      )}
    />
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileSubMenu, setMobileSubMenu] = useState<string | null>(null);
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { openCart, getItemCount } = useCartStore();
  const cartItemCount = getItemCount();
  const { isLoaded, isSignedIn } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    const mountId = requestAnimationFrame(() => {
      setIsMounted(true);
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(mountId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleDropdownEnter = useCallback((name: string) => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    dropdownTimer.current = setTimeout(() => setActiveDropdown(name), 80);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    dropdownTimer.current = setTimeout(() => setActiveDropdown(null), 150);
  }, []);

  const isActive = (href: string) => {
    if (href === "/shop") return pathname.startsWith("/shop") || pathname.startsWith("/product");
    if (href === "/gift-guide") return pathname.startsWith("/occasion");
    return pathname === href || pathname.startsWith(href);
  };

  const iconBtnClass = "p-2 text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-all duration-300 rounded-lg";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        isScrolled
          ? "bg-background/80 backdrop-blur-2xl border-b border-foreground/10 shadow-sm"
          : "bg-transparent"
      )}
    >
      {/* Announcement Banner */}
      <div className="bg-foreground text-background relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 py-2.5 flex items-center justify-center text-[9px] uppercase tracking-[0.2em] font-medium">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2"
          >
            <svg className="w-3 h-3 text-champagne" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            <span className="hidden sm:inline">Free shipping on orders above ₹10,000</span>
            <span className="hidden sm:inline mx-2">·</span>
            <span>Use&nbsp;<span className="font-semibold tracking-wider">WELCOME10</span>&nbsp;for 10% off</span>
          </motion.div>
        </div>
      </div>

      <div className={cn(
        "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        isScrolled ? "py-3" : "py-5"
      )}>
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">

          {/* Mobile Left */}
          <div className="flex items-center gap-2 lg:hidden">
            <Sheet>
              <SheetTrigger render={
                <button aria-label="Open menu" className={iconBtnClass}>
                  <Menu className="w-5 h-5" />
                </button>
              } />
              <SheetContent side="left" className="w-[300px] sm:w-[360px] bg-background border-r-0 p-0 flex flex-col">
                <div className="p-6 pb-0 flex items-center justify-between">
                  <SheetTitle className="font-serif text-xl tracking-[0.05em] font-light text-foreground">
                    Aastha Silver
                  </SheetTitle>
                  <SheetTrigger render={
                    <button aria-label="Close menu" className={iconBtnClass}>
                      <X className="w-4 h-4" />
                    </button>
                  } />
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-8">
                  {mobileSubMenu ? (
                    <div>
                      <button
                        onClick={() => setMobileSubMenu(null)}
                        className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-medium text-foreground/50 hover:text-foreground transition-colors mb-8"
                      >
                        <ArrowRight className="w-3 h-3 rotate-180" />
                        Back
                      </button>

                      {mobileSubMenu === "shop" && (
                        <div className="space-y-1">
                          <Link
                            href="/shop"
                            onClick={() => setMobileSubMenu(null)}
                            className="block px-4 py-3 text-xs uppercase tracking-[0.2em] font-medium text-foreground/40 hover:text-foreground transition-colors"
                          >
                            View All
                          </Link>
                          <div className="h-[1px] bg-foreground/5 my-2" />
                          {CATEGORIES.map((cat) => (
                            <Link
                              key={cat.slug}
                              href={`/shop/${cat.slug}`}
                              onClick={() => setMobileSubMenu(null)}
                              className="block px-4 py-3 text-sm font-light text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-all rounded-lg"
                            >
                              {cat.name}
                            </Link>
                          ))}
                        </div>
                      )}

                      {mobileSubMenu === "gift-guide" && (
                        <div className="space-y-1">
                          <Link
                            href="/gift-guide"
                            onClick={() => setMobileSubMenu(null)}
                            className="block px-4 py-3 text-xs uppercase tracking-[0.2em] font-medium text-foreground/40 hover:text-foreground transition-colors"
                          >
                            View All
                          </Link>
                          <div className="h-[1px] bg-foreground/5 my-2" />
                          {GIFT_SECTIONS.map((occ) => (
                            <Link
                              key={occ.slug}
                              href={`/occasion/${occ.slug}`}
                              onClick={() => setMobileSubMenu(null)}
                              className="block px-4 py-3 text-sm font-light text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-all rounded-lg"
                            >
                              {occ.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <nav className="flex flex-col gap-1">
                      {NAV_LINKS.map((link) => (
                        <div key={link.name}>
                          {link.hasDropdown ? (
                            <button
                              onClick={() => setMobileSubMenu(link.name === "Shop" ? "shop" : "gift-guide")}
                              className="w-full flex items-center justify-between px-4 py-4 text-lg font-serif font-light text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-all rounded-lg"
                            >
                              {link.name}
                              <ChevronDown className="w-4 h-4 -rotate-90 stroke-[1.5]" />
                            </button>
                          ) : (
                            <Link
                              href={link.href}
                              onClick={() => setMobileSubMenu(null)}
                              className={cn(
                                "block px-4 py-4 text-lg font-serif font-light transition-all rounded-lg",
                                isActive(link.href)
                                  ? "text-foreground bg-foreground/5"
                                  : "text-foreground/80 hover:text-foreground hover:bg-foreground/5"
                              )}
                            >
                              {link.name}
                            </Link>
                          )}
                        </div>
                      ))}
                    </nav>
                  )}
                </div>

                <div className="px-6 py-6 border-t border-foreground/10">
                  {isLoaded && isSignedIn ? (
                    <Link
                      href="/account"
                      onClick={() => setMobileSubMenu(null)}
                      className="flex items-center gap-4 text-xs uppercase tracking-[0.2em] font-medium text-foreground/70 hover:text-foreground transition-colors"
                    >
                      <UserButton />
                      My Account
                    </Link>
                  ) : isLoaded && !isSignedIn ? (
                    <SignInButton mode="modal">
                      <button aria-label="Sign In" className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-medium text-foreground/70 hover:text-foreground transition-colors">
                        <User className="w-4 h-4 stroke-[1.5]" />
                        Sign In / Register
                      </button>
                    </SignInButton>
                  ) : null}
                </div>
              </SheetContent>
            </Sheet>
            <button
              aria-label="Search"
              onClick={() => setIsSearchOpen(true)}
              className={iconBtnClass}
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Logo */}
          <div className="flex-1 lg:flex-none text-center lg:text-left">
            <Link href="/" className="inline-block">
              <span className="font-serif text-xl md:text-2xl tracking-[0.05em] font-light">Aastha Silver</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center justify-center flex-1 gap-8 xl:gap-12 h-full">
            {NAV_LINKS.map((link) => (
              <div
                key={link.name}
                className="relative h-full flex items-center"
                onMouseEnter={() => link.hasDropdown && handleDropdownEnter(link.name)}
                onMouseLeave={handleDropdownLeave}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "relative text-[10px] uppercase tracking-[0.2em] font-medium py-6 flex items-center gap-1 transition-colors duration-300 group",
                    isActive(link.href)
                      ? "text-foreground"
                      : "text-foreground/60 hover:text-foreground"
                  )}
                >
                  {link.name}
                  {link.hasDropdown && (
                    <ChevronDown className={cn(
                      "w-3 h-3 transition-transform duration-300",
                      activeDropdown === link.name && "rotate-180"
                    )} />
                  )}
                  <Underline active={isActive(link.href)} />
                </Link>

                {/* Shop Mega Menu */}
                <AnimatePresence>
                  {link.name === "Shop" && activeDropdown === "Shop" && (
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 12, scale: 0.97 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-full left-1/2 -translate-x-1/2 w-[820px] bg-card border border-foreground/10 shadow-lg z-50"
                      onMouseEnter={() => handleDropdownEnter("Shop")}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <div className="p-8">
                        <div className="flex items-center justify-between mb-6">
                          <span className="text-[9px] uppercase tracking-[0.3em] text-foreground/40 font-medium">Categories</span>
                          <Link
                            href="/shop"
                            className="text-[9px] uppercase tracking-[0.2em] font-medium text-foreground/50 hover:text-foreground transition-colors flex items-center gap-1.5"
                          >
                            View All
                            <ArrowRight className="w-3 h-3 stroke-[1.5]" />
                          </Link>
                        </div>
                        <div className="grid grid-cols-4 gap-6">
                          {CATEGORIES.map((cat) => (
                            <Link
                              key={cat.slug}
                              href={`/shop/${cat.slug}`}
                              className="group/item"
                            >
                              <div className="relative aspect-[4/5] bg-secondary overflow-hidden mb-3">
                                <Image
                                  src={cat.image}
                                  alt={cat.name}
                                  fill
                                  className="object-cover transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/item:scale-110"
                                />
                                <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500" />
                              </div>
                              <h3 className="font-serif text-base text-card-foreground group-hover/item:text-foreground/60 transition-colors text-center">
                                {cat.name}
                              </h3>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Gift Guide Dropdown */}
                <AnimatePresence>
                  {link.name === "Gift Guide" && activeDropdown === "Gift Guide" && (
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 12, scale: 0.97 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute top-full left-1/2 -translate-x-1/2 bg-card border border-foreground/10 shadow-lg z-50 min-w-[260px]"
                      onMouseEnter={() => handleDropdownEnter("Gift Guide")}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <div className="p-5">
                        <span className="text-[9px] uppercase tracking-[0.3em] text-foreground/40 font-medium block mb-4">
                          Shop by Occasion
                        </span>
                        <div className="space-y-0.5">
                          {GIFT_SECTIONS.map((occ) => (
                            <Link
                              key={occ.slug}
                              href={`/occasion/${occ.slug}`}
                              className="block px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] font-medium text-card-foreground/60 hover:text-card-foreground hover:bg-foreground/5 transition-all rounded-md"
                            >
                              {occ.name}
                            </Link>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-foreground/5">
                          <Link
                            href="/gift-guide"
                            className="flex items-center justify-between px-4 py-2.5 text-[9px] uppercase tracking-[0.2em] font-medium text-foreground/50 hover:text-foreground transition-colors"
                          >
                            View All Gifts
                            <ArrowRight className="w-3 h-3 stroke-[1.5]" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-1 lg:gap-2">
            <button
              aria-label="Search"
              onClick={() => setIsSearchOpen(true)}
              className={cn(iconBtnClass, "hidden lg:flex")}
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>
            <Link href="/wishlist" aria-label="Wishlist" className={iconBtnClass}>
              <Heart className="w-5 h-5 stroke-[1.5]" />
            </Link>

            <div className="hidden lg:flex items-center">
              {isLoaded && isSignedIn ? (
                <div className={iconBtnClass}>
                  <UserButton userProfileMode="navigation" userProfileUrl="/account" />
                </div>
              ) : isLoaded && !isSignedIn ? (
                <SignInButton mode="modal">
                  <button aria-label="Sign In" className={iconBtnClass}>
                    <User className="w-5 h-5 stroke-[1.5]" />
                  </button>
                </SignInButton>
              ) : null}
            </div>

            <button
              onClick={openCart}
              aria-label="Cart"
              className={cn(iconBtnClass, "relative")}
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {isMounted && cartItemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-foreground text-background text-[8px] w-4 h-4 flex items-center justify-center font-medium rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
