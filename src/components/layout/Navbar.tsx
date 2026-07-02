"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Heart, User, ShoppingBag, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCartStore } from "@/store/cart-store";
import { useAuth, UserButton, SignInButton } from "@clerk/nextjs";
const NAV_LINKS = [
  { name: "Collections", href: "/collections" },
  { name: "New", href: "/new" },
  { name: "Best Sellers", href: "/best-sellers" },
  { name: "The Muse", href: "/celebrities" },
  { name: "Gift Guide", href: "/gift-guide" },
  { name: "About", href: "/about" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { openCart, getItemCount } = useCartStore();
  const cartItemCount = getItemCount();
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    // Avoid synchronous setState in effect (React 19 best practice)
    const mountId = requestAnimationFrame(() => {
      setIsMounted(true);
    });
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll(); // Set initial scroll state

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(mountId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        isScrolled 
          ? "bg-white/95 backdrop-blur-xl border-b border-black/5 py-4 shadow-sm"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        
        {/* Mobile Left */}
        <div className="flex items-center gap-4 lg:hidden">
          <Sheet>
            <SheetTrigger render={
              <button aria-label="Open menu" className="p-2 -ml-2 text-foreground/80 hover:text-foreground transition-colors">
                <Menu className="w-5 h-5" />
              </button>
            } />
            <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-[#FDFCF8] border-r-0 p-8 flex flex-col">
              <SheetTitle className="font-serif text-2xl tracking-[0.05em] font-light mb-12 text-[#1A1D1A]">Aastha Silver</SheetTitle>
              <nav className="flex flex-col gap-8 flex-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-2xl font-serif font-light text-[#1A1D1A]/80 hover:text-[#1A1D1A] transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto pt-8 border-t border-black/10">
                {isLoaded && isSignedIn ? (
                  <div className="flex items-center gap-4">
                    <UserButton />
                    <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#1A1D1A]/70">My Account</span>
                  </div>
                ) : isLoaded && !isSignedIn ? (
                  <SignInButton mode="modal">
                    <button aria-label="Sign In" className="text-xs uppercase tracking-[0.2em] font-medium text-[#1A1D1A]/70 hover:text-[#1A1D1A] transition-colors flex items-center gap-3">
                      <User className="w-4 h-4 stroke-[1.5]" />
                      Sign In / Register
                    </button>
                  </SignInButton>
                ) : null}
              </div>
            </SheetContent>
          </Sheet>
          <button aria-label="Search" className="text-foreground/80 hover:text-foreground transition-colors">
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
        <nav className="hidden lg:flex items-center justify-center flex-1 gap-12">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#1A1D1A]/60 hover:text-[#1A1D1A] transition-colors duration-300"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop & Mobile Right Icons */}
        <div className="flex items-center gap-4 lg:gap-6">
          <button aria-label="Search" className="hidden lg:block text-black/70 hover:text-black transition-colors">
            <Search className="w-5 h-5 stroke-[1.5]" />
          </button>
          <Link href="/wishlist" aria-label="Wishlist" className="text-black/70 hover:text-black transition-colors">
            <Heart className="w-5 h-5 stroke-[1.5]" />
          </Link>
          
          <div className="hidden lg:flex items-center gap-4">
            {isLoaded && isSignedIn ? (
              <UserButton />
            ) : isLoaded && !isSignedIn ? (
              <SignInButton mode="modal">
                <button aria-label="Sign In" className="text-black/70 hover:text-black transition-colors flex items-center">
                  <User className="w-5 h-5 stroke-[1.5]" />
                </button>
              </SignInButton>
            ) : null}
          </div>

          <button 
            onClick={openCart}
            aria-label="Cart" 
            className="text-black/70 hover:text-black transition-colors relative"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
            {isMounted && cartItemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
