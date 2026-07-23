"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-foreground/5 flex items-center justify-center mx-auto mb-8">
          <svg className="w-8 h-8 text-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <h1 className="font-serif text-4xl text-foreground mb-4">Something went wrong</h1>
        <p className="text-foreground/60 font-light mb-10 leading-relaxed">
          An unexpected error occurred. Please try again or contact us if the problem persists.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="h-12 px-8 bg-foreground text-background uppercase tracking-[0.2em] text-[10px] font-medium hover:bg-foreground/90 transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="h-12 px-8 border border-foreground/30 text-foreground uppercase tracking-[0.2em] text-[10px] font-medium hover:bg-foreground hover:text-background transition-colors inline-flex items-center"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
