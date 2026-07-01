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
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 transition-all duration-500"
    >
      <div className={cn(
        "rounded-full px-6 lg:px-10 flex items-center justify-between transition-all duration-500",
        isScrolled
          ? "bg-white/90 backdrop-blur-lg border border-black/10 py-4 shadow-xl shadow-black/5"
          : "bg-transparent py-4"
      )}>
        
        {/* Mobile Left */}
        <div className="flex items-center gap-4 lg:hidden">
          <Sheet>
            <SheetTrigger render={
              <button aria-label="Open menu" className="p-2 -ml-2 text-foreground/80 hover:text-foreground transition-colors">
                <Menu className="w-5 h-5" />
              </button>
            } />
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetTitle className="font-serif text-2xl mb-8">Aastha Silver</SheetTitle>
              <nav className="flex flex-col gap-6">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              <div className="mt-12 pt-6 border-t border-black/10">
                {isLoaded && isSignedIn ? (
                  <div className="flex items-center gap-3">
                    <UserButton />
                    <span className="text-sm font-medium">My Account</span>
                  </div>
                ) : isLoaded && !isSignedIn ? (
                  <SignInButton mode="modal">
                    <button aria-label="Sign In" className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors flex items-center gap-3">
                      <User className="w-5 h-5 stroke-[1.5]" />
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
            <span className="font-serif text-2xl tracking-wide font-medium">Aastha Silver</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center justify-center flex-1 gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xs uppercase tracking-[0.1em] font-medium text-black/70 hover:text-black transition-colors"
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
