"use client";

import { useState, useEffect } from "react";
import { X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const POPUP_STORAGE_KEY = "aastha-exit-intent-dismissed";

export function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const dismissed = sessionStorage.getItem(POPUP_STORAGE_KEY);
    if (dismissed) return;

    let timeoutId: NodeJS.Timeout;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY > 0) return;
      if (dismissed) return;
      timeoutId = setTimeout(() => setIsVisible(true), 100);
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem(POPUP_STORAGE_KEY, "true");
    setIsVisible(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem(POPUP_STORAGE_KEY, "true");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70]"
            onClick={handleDismiss}
          />
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[520px] bg-background z-[70] flex flex-col max-h-[90vh] overflow-y-auto"
          >
            <div className="relative p-10 md:p-16 text-center">
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 p-2 text-foreground/40 hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>

              <Sparkles className="w-8 h-8 mx-auto mb-8 text-foreground/30 stroke-[1.5]" />

              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4 tracking-tight">
                Before You Go
              </h2>
              <p className="text-foreground/60 text-sm font-light mb-8 max-w-sm mx-auto leading-relaxed">
                Subscribe for 10% off your first order and early access to our new collection drops.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full h-12 bg-transparent border border-foreground/20 px-4 text-sm font-light text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground transition-colors text-center"
                />
                <button
                  type="submit"
                  className="w-full h-12 bg-foreground text-background uppercase tracking-[0.2em] text-[10px] font-medium hover:bg-foreground/90 transition-colors"
                >
                  Claim 10% Off
                </button>
              </form>

              <p className="mt-6 text-[10px] text-foreground/30 font-light">
                No spam. Unsubscribe anytime.
              </p>

              <button
                onClick={handleDismiss}
                className="mt-6 text-[10px] uppercase tracking-[0.15em] text-foreground/40 hover:text-foreground transition-colors"
              >
                No thanks, I&apos;ll pay full price
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
