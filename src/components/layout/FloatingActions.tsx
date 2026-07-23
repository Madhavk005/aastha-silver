"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

export function FloatingActions() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const whatsappNumber = "919999999999";
  const whatsappMessage = encodeURIComponent("Hi! I'm interested in Aastha Silver jewellery.");

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      {/* Instagram */}
      <a
        href="https://www.instagram.com/aastha_silver/"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-background/90 backdrop-blur-xl shadow-lg border border-foreground/10 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-background transition-all duration-300"
        aria-label="Follow us on Instagram"
      >
        <FaInstagram className="w-5 h-5" />
      </a>

      {/* WhatsApp */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#25D366] shadow-lg flex items-center justify-center text-white hover:scale-110 hover:shadow-xl transition-all duration-300"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="w-7 h-7" />
      </a>

      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className={cn(
          "w-12 h-12 rounded-full bg-background/90 backdrop-blur-xl shadow-lg border border-foreground/10 flex items-center justify-center text-foreground hover:bg-background transition-all duration-500",
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0 pointer-events-none"
        )}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5 stroke-[1.5]" />
      </button>
    </div>
  );
}
