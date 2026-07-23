import React from "react";
import Link from "next/link";


export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center pt-24 pb-16">
      <div className="max-w-xl mx-auto px-4 text-center">
        <div className="mb-10 inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#1A1D1A]/5 text-[#1A1D1A]">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        
        <h1 className="font-serif text-4xl md:text-5xl text-[#1A1D1A] mb-6">Order Confirmed</h1>
        
        <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-12 font-light">
          Thank you for your purchase. Your order has been received and is currently being processed. 
          A confirmation email has been sent to you with your order details.
        </p>

        <Link 
          href="/"
          className="inline-flex items-center justify-center h-14 bg-[#1A1D1A] text-white hover:bg-black rounded-full px-12 uppercase tracking-[0.1em] text-xs font-medium transition-all shadow-lg"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}
