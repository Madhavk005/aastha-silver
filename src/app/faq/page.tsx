import React from "react";
import { Plus } from "lucide-react";

export const metadata = {
  title: "FAQ | Aastha Silver",
  description: "Frequently asked questions about Aastha Silver jewellery, shipping, returns, and care.",
};

const FAQS = [
  {
    question: "What materials do you use?",
    answer: "All our jewellery is handcrafted using premium 925 sterling silver. Many pieces feature cubic zirconia or semi-precious stones, and our gold-tone items are thickly plated with 18k gold over a sterling silver base (vermeil) to ensure longevity."
  },
  {
    question: "How should I care for my jewellery?",
    answer: "To maintain the brilliance of your pieces, we recommend removing them before swimming, bathing, or exercising. Avoid direct contact with perfumes, lotions, and harsh chemicals. Store your jewellery in the provided Aastha Silver pouch when not in use."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship globally. International orders typically arrive within 7-14 business days depending on the destination and local customs processing."
  },
  {
    question: "What is your return policy?",
    answer: "We accept returns within 14 days of delivery. Items must be unworn, in their original condition, and returned with all original packaging. Custom or engraved pieces are final sale."
  }
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#FDFCF8] pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <div className="text-center mb-16">
          <span className="uppercase tracking-[0.3em] text-[10px] text-gray-400 mb-4 block">Support</span>
          <h1 className="font-serif text-4xl md:text-5xl text-[#1A1D1A]">
            Frequently Asked Questions
          </h1>
        </div>

        <div className="space-y-6">
          {FAQS.map((faq, index) => (
            <details key={index} className="group bg-white border border-black/5 p-6 cursor-pointer">
              <summary className="flex justify-between items-center list-none text-sm font-medium uppercase tracking-[0.1em] text-[#1A1D1A]">
                {faq.question}
                <span className="transition group-open:rotate-45">
                  <Plus className="w-5 h-5 stroke-[1]" />
                </span>
              </summary>
              <p className="text-gray-500 mt-6 text-sm font-light leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
