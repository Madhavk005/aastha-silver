import React from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Contact | Aastha Silver",
  description: "Get in touch with Aastha Silver. We'd love to hear from you about our premium sterling silver jewellery.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <div className="text-center mb-16">
          <span className="uppercase tracking-[0.3em] text-[10px] text-foreground/50 mb-4 block">Get in Touch</span>
          <h1 className="font-serif text-5xl md:text-6xl text-foreground mb-6 leading-[1.1]">Contact Us</h1>
          <p className="text-foreground/60 font-light max-w-xl mx-auto">
            We&apos;re here to help. Whether you have a question about our pieces, your order, or need styling advice &mdash; reach out anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <div>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-[10px] uppercase tracking-[0.15em] font-medium text-foreground/60">Full Name *</label>
                  <input required id="name" type="text" className="w-full h-12 bg-transparent border border-foreground/20 px-4 text-sm font-light text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground transition-colors" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-[10px] uppercase tracking-[0.15em] font-medium text-foreground/60">Email *</label>
                  <input required id="email" type="email" className="w-full h-12 bg-transparent border border-foreground/20 px-4 text-sm font-light text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground transition-colors" placeholder="your@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-[10px] uppercase tracking-[0.15em] font-medium text-foreground/60">Subject</label>
                <input id="subject" type="text" className="w-full h-12 bg-transparent border border-foreground/20 px-4 text-sm font-light text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground transition-colors" placeholder="How can we help?" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-[10px] uppercase tracking-[0.15em] font-medium text-foreground/60">Message *</label>
                <textarea required id="message" rows={6} className="w-full bg-transparent border border-foreground/20 px-4 py-3 text-sm font-light text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground transition-colors resize-none" placeholder="Tell us more about your inquiry..." />
              </div>
              <button type="submit" className="w-full h-14 bg-foreground text-background hover:bg-foreground/90 uppercase tracking-[0.2em] text-[10px] font-medium transition-colors">
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-10">
            <div>
              <h3 className="font-serif text-2xl text-foreground mb-6">Visit or Write</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-foreground/40 mt-0.5 stroke-[1.5]" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Email</p>
                    <a href="mailto:hello@aasthasilver.com" className="text-sm text-foreground/60 font-light hover:text-foreground transition-colors">hello@aasthasilver.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-foreground/40 mt-0.5 stroke-[1.5]" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Phone</p>
                    <a href="tel:+919999999999" className="text-sm text-foreground/60 font-light hover:text-foreground transition-colors">+91 99999 99999</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-foreground/40 mt-0.5 stroke-[1.5]" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Address</p>
                    <p className="text-sm text-foreground/60 font-light">Mumbai, Maharashtra, India</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-foreground/40 mt-0.5 stroke-[1.5]" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Response Time</p>
                    <p className="text-sm text-foreground/60 font-light">We typically respond within 24 hours on business days.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-foreground/10 pt-8">
              <h3 className="font-serif text-xl text-foreground mb-4">Prefer self-service?</h3>
              <p className="text-sm text-foreground/60 font-light mb-6">Browse our FAQ or check your order status from your account.</p>
              <div className="flex gap-4">
                <Link href="/faq" className="text-[10px] uppercase tracking-[0.2em] font-medium border border-foreground/30 px-6 py-3 hover:bg-foreground hover:text-background transition-colors">FAQ</Link>
                <Link href="/account" className="text-[10px] uppercase tracking-[0.2em] font-medium border border-foreground/30 px-6 py-3 hover:bg-foreground hover:text-background transition-colors">My Account</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
