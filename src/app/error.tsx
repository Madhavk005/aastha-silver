"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import * as Sentry from "@sentry/nextjs";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Subtle decorative circles */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-champagne/5 blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full bg-foreground/[0.02] blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-md mx-auto px-4 text-center relative z-10"
      >
        <div className="w-20 h-20 rounded-2xl bg-foreground/[0.03] border border-foreground/5 flex items-center justify-center mx-auto mb-8">
          <svg className="w-10 h-10 text-foreground/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>

        <span className="text-[9px] uppercase tracking-[0.3em] text-foreground/30 mb-4 block font-medium">
          Error
        </span>

        <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4 tracking-tight">
          Something went wrong
        </h1>
        <p className="text-foreground/50 font-light mb-10 leading-relaxed text-sm max-w-xs mx-auto">
          An unexpected error occurred. Please try again or contact us if the problem persists.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="btn-primary text-background"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="btn-outline"
          >
            Home
          </Link>
        </div>

        <div className="mt-16 pt-8 border-t border-foreground/5">
          <Link
            href="/contact"
            className="text-[9px] uppercase tracking-[0.2em] font-medium text-foreground/30 hover:text-foreground transition-colors"
          >
            Need help? Contact us
          </Link>
        </div>
      </motion.div>
    </div>
  );
}