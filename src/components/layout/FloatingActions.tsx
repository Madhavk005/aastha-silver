"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

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
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Replace this with the actual client phone number
  const whatsappNumber = "919999999999"; 
  const whatsappMessage = encodeURIComponent("Hi! I'm interested in Aastha Silver jewellery.");

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-4">
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={cn(
          "w-12 h-12 rounded-full bg-white/80 backdrop-blur-xl shadow-lg border border-white/40 flex items-center justify-center text-[#215650] hover:bg-white transition-all duration-500",
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0 pointer-events-none"
        )}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5 stroke-[1.5]" />
      </button>

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#25D366] shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
        aria-label="Chat on WhatsApp"
      >
        {/* Custom SVG for WhatsApp icon to ensure brand recognition */}
        <svg
          viewBox="0 0 24 24"
          width="28"
          height="28"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white fill-current"
        >
          <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.265-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.525.146-.18.194-.3.297-.495.101-.21.05-.39-.025-.54-.075-.15-.672-1.62-.922-2.205-.24-.585-.477-.51-.673-.51-.176-.015-.371-.015-.571-.015-.194 0-.525.075-.796.375-.27.3-1.045 1.02-1.045 2.49 0 1.47 1.076 2.895 1.222 3.105.15.195 2.1 3.255 5.116 4.56.719.315 1.275.51 1.714.645.719.225 1.376.195 1.895.12.586-.09 1.767-.72 2.014-1.425.248-.705.248-1.29.176-1.425-.075-.135-.274-.21-.575-.36z"></path>
          <path d="M12.004 22.001A9.957 9.957 0 014.81 19.34l-3.21.84 1.26-3.15A9.96 9.96 0 1112.004 22.001z"></path>
        </svg>
      </a>
    </div>
  );
}
