"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, Loader2, ShieldCheck, Sparkles } from "lucide-react";
import { useAuth } from "@/lib/auth";

function SocialButton({ label, icon, onClick }: { label: string; icon: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full h-12 border border-foreground/15 hover:border-foreground/40 hover:bg-foreground/[0.02] rounded-xl flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.2em] font-medium text-foreground/70 hover:text-foreground transition-all duration-300"
    >
      {icon}
      {label}
    </button>
  );
}

export default function SignInPage() {
  const router = useRouter();
  const { refresh } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [redirect, setRedirect] = useState("/account");
  const [urlError, setUrlError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const r = params.get("redirect");
    if (r && r.startsWith("/") && !r.startsWith("//")) {
      const t = setTimeout(() => setRedirect(r), 0);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    const e = new URLSearchParams(window.location.search).get("error");
    if (e) {
      const messages: Record<string, string> = {
        google: "Google sign-in failed. Please try again.",
        provider: "That sign-in option is not available. Please try another.",
        session: "Your sign-in session expired. Please try again.",
        exchange_failed: "We couldn't complete the sign-in. Please try again.",
        config: "Sign-in is temporarily unavailable. Please try again later.",
        internal: "Something went wrong. Please try again.",
      };
      const t = setTimeout(() => setUrlError(messages[e] ?? "Sign-in failed. Please try again."), 0);
      return () => clearTimeout(t);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setUrlError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      await refresh();
      router.push(redirect);
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left panel - decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-foreground relative overflow-hidden flex-col justify-between p-16">
        <div className="absolute inset-0">
          <Image src="/images/editorial-portrait.jpg" alt="Aastha Silver jewellery editorial" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/90" />
        </div>

        {/* Decorative shimmer */}
        <div className="absolute top-1/4 right-1/4 w-48 h-48 rounded-full bg-champagne/5 blur-3xl" />
        <div className="absolute bottom-1/3 left-1/3 w-32 h-32 rounded-full bg-white/5 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/" className="relative z-10 font-serif text-2xl tracking-[0.05em] font-light text-background inline-block">
            Aastha Silver
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 max-w-md"
        >
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-champagne mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Private collection access
          </div>
          <p className="font-serif text-5xl font-light text-background leading-[1.02] mb-6">
            Every piece tells<br />a story of elegance.
          </p>
          <p className="text-background/75 text-sm font-light leading-relaxed max-w-xs">
            Sign in to access your orders, saved addresses, and wishlist.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative z-10 flex items-center gap-2 text-background/70 text-[10px] uppercase tracking-[0.16em]"
        >
          <ShieldCheck className="w-4 h-4 text-champagne" /> Secure account access
        </motion.div>
      </div>

      {/* Right panel - form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-8 py-16 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-champagne/5 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-foreground/[0.02] blur-3xl" />

        <div className="w-full max-w-md relative z-10">
          {/* Mobile logo */}
          <Link href="/" className="font-serif text-xl tracking-[0.05em] font-light text-foreground lg:hidden block mb-12">
            Aastha Silver
          </Link>

          <span className="text-[10px] uppercase tracking-[0.24em] font-medium text-champagne mb-4 block">
            Your Aastha account
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-light text-foreground mb-3 tracking-tight">
            Welcome back
          </h1>
          <p className="text-foreground/50 text-sm font-light mb-10">
            {"Don't have an account? "}
            <Link href="/sign-up" className="text-foreground underline underline-offset-4 hover:text-foreground/70 transition-colors font-medium">
              Create one
            </Link>
          </p>

          {urlError ? (
            <div className="mb-6 px-5 py-4 bg-red-50/80 border border-red-200/50 text-red-700 text-sm font-light rounded-xl backdrop-blur-sm flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
              {urlError}
            </div>
          ) : error ? (
            <div className="mb-6 px-5 py-4 bg-red-50/80 border border-red-200/50 text-red-700 text-sm font-light rounded-xl backdrop-blur-sm flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
              {error}
            </div>
          ) : null}

          {/* Social Login */}
          <div className="space-y-3 mb-8">
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-foreground/10" />
              <span className="text-[9px] uppercase tracking-[0.2em] text-foreground/30 font-medium">or continue with</span>
              <div className="flex-1 h-px bg-foreground/10" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <SocialButton
                label="Google"
                icon={
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                }
                onClick={() => window.location.href = `/api/auth/oauth?provider=google&redirect=${encodeURIComponent(redirect)}`}
              />
              <SocialButton
                label="Microsoft"
                icon={
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <rect x="1" y="1" width="10.5" height="10.5" fill="#F25022" />
                    <rect x="12.5" y="1" width="10.5" height="10.5" fill="#7FBA00" />
                    <rect x="1" y="12.5" width="10.5" height="10.5" fill="#00A4EF" />
                    <rect x="12.5" y="12.5" width="10.5" height="10.5" fill="#FFB900" />
                  </svg>
                }
                onClick={() => window.location.href = `/api/auth/oauth?provider=microsoft&redirect=${encodeURIComponent(redirect)}`}
              />
              <SocialButton
                label="Apple"
                icon={
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                }
                onClick={() => window.location.href = `/api/auth/oauth?provider=apple&redirect=${encodeURIComponent(redirect)}`}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-medium text-foreground/60">
                Email Address
              </label>
              <input
                id="sign-in-email"
                type="email"
                required
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input-bordered"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] uppercase tracking-[0.2em] font-medium text-foreground/60">
                  Password
                </label>
                <Link
                  href="/contact"
                  className="text-[10px] uppercase tracking-[0.15em] font-medium text-foreground/40 hover:text-foreground transition-colors"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="sign-in-password"
                  type={showPass ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="input-bordered pr-12"
                  placeholder="........."
                />
                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              id="sign-in-submit"
              type="submit"
              disabled={loading}
              className="btn-primary w-full h-12 mt-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-3.5 h-3.5 stroke-[1.5]" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-foreground/5 text-center">
            <p className="text-[9px] text-foreground/30 uppercase tracking-[0.2em]">
              Protected by encrypted 256-bit SSL
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}