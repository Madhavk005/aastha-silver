import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 text-center">
      <span className="text-[9px] uppercase tracking-[0.3em] text-foreground/40 mb-6 font-medium">Error 404</span>
      <h1 className="font-serif text-6xl md:text-8xl text-foreground tracking-tight mb-6">
        Lost in <span className="italic text-foreground/40">Silver</span>
      </h1>
      <p className="text-foreground/50 text-sm font-light max-w-sm mb-10">
        The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back to something beautiful.
      </p>
      <Link
        href="/"
        className="group inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 text-[9px] uppercase tracking-[0.2em] font-medium transition-all duration-500 hover:bg-foreground/90 rounded-xl"
      >
        Back to Homepage
        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-1 stroke-[1.5]" />
      </Link>
      <div className="mt-8 flex items-center gap-6">
        <Link href="/shop" className="text-[9px] uppercase tracking-[0.2em] font-medium text-foreground/40 hover:text-foreground transition-colors">
          Shop
        </Link>
        <Link href="/contact" className="text-[9px] uppercase tracking-[0.2em] font-medium text-foreground/40 hover:text-foreground transition-colors">
          Contact
        </Link>
      </div>
    </div>
  );
}