"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
export interface PolicyData {
  title?: string;
  subtitle?: string;
  content?: string;
}

export default function DeliveryClient({ initialData }: { initialData: PolicyData | null }) {
  const title = initialData?.title || "Delivery & Returns";
  const subtitle = initialData?.subtitle || "Everything you need to know about receiving your Aastha Silver pieces.";

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="uppercase tracking-[0.1em] text-[10px] text-gray-400 mb-4 block">Client Services</span>
          <h1 className="font-serif text-4xl md:text-5xl text-[#0F0F0F] mb-6">
            {title}
          </h1>
          <p className="text-gray-500 font-light">{subtitle}</p>
        </motion.div>

        <div className="space-y-16">
          
          {initialData?.content ? (
            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="prose prose-sm text-gray-600 font-light leading-relaxed">
                <p>{initialData.content}</p>
              </div>
            </motion.section>
          ) : (
            // Fallback content
            <>
              <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="font-serif text-2xl text-[#0F0F0F] mb-6 border-b border-black/10 pb-4">Shipping Methods & Costs</h2>
                <div className="space-y-6 text-gray-600 font-light leading-relaxed text-sm">
                  <p>We take pride in securely packaging and delivering your luxury silver jewelry. All our shipments are fully insured until they reach your doorstep.</p>
                  
                  <div className="bg-secondary p-6 rounded-[2rem]">
                    <h3 className="font-medium text-[#0F0F0F] uppercase tracking-[0.1em] text-xs mb-4">Domestic (India)</h3>
                    <ul className="space-y-4">
                      <li className="flex justify-between items-center border-b border-black/5 pb-2">
                        <span>Standard Delivery (3-5 business days)</span>
                        <span>Free on orders over ₹5,000</span>
                      </li>
                      <li className="flex justify-between items-center border-b border-black/5 pb-2">
                        <span>Standard Delivery (Orders under ₹5,000)</span>
                        <span>₹150</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Express Delivery (1-2 business days)</span>
                        <span>₹350</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-secondary p-6 rounded-[2rem]">
                    <h3 className="font-medium text-[#0F0F0F] uppercase tracking-[0.1em] text-xs mb-4">International</h3>
                    <ul className="space-y-4">
                      <li className="flex justify-between items-center border-b border-black/5 pb-2">
                        <span>Global Express (5-7 business days)</span>
                        <span>Calculated at checkout</span>
                      </li>
                    </ul>
                    <p className="text-xs text-gray-500 mt-4 italic">Please note: International orders may be subject to local customs duties and taxes, which are the responsibility of the recipient.</p>
                  </div>
                </div>
              </motion.section>

              <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="font-serif text-2xl text-[#0F0F0F] mb-6 border-b border-black/10 pb-4">Order Tracking</h2>
                <div className="prose prose-sm text-gray-600 font-light leading-relaxed">
                  <p>
                    Once your order has been dispatched, you will receive a confirmation email containing a tracking number. 
                    You can use this number on our courier partner&apos;s website to monitor the status of your delivery in real-time. 
                    If you have an account with us, you can also view your order status in your account dashboard.
                  </p>
                </div>
              </motion.section>

              <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="font-serif text-2xl text-[#0F0F0F] mb-6 border-b border-black/10 pb-4">Returns & Exchanges</h2>
                <div className="prose prose-sm text-gray-600 font-light leading-relaxed">
                  <p>
                    We want you to be completely satisfied with your Aastha Silver purchase. If for any reason you are not, 
                    we accept returns within 14 days of delivery for a full refund or exchange.
                  </p>
                  <h3 className="text-[#0F0F0F] font-medium mt-6 mb-2">Conditions for Return</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Items must be unworn, in their original condition, and with all tags attached.</li>
                    <li>The original packaging, including boxes and pouches, must be returned intact.</li>
                    <li>Custom or personalized pieces are final sale and cannot be returned.</li>
                    <li>Earrings cannot be returned for hygiene reasons, unless faulty.</li>
                  </ul>
                  
                  <h3 className="text-[#0F0F0F] font-medium mt-6 mb-2">How to Return</h3>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Contact our client services team at care@aasthasilver.com with your order number.</li>
                    <li>We will provide you with a return authorization and a prepaid shipping label (for domestic orders).</li>
                    <li>Carefully package the item and hand it over to our courier partner.</li>
                    <li>Refunds will be processed to your original payment method within 5-7 business days of receiving the return.</li>
                  </ol>

                  <h3 className="text-[#0F0F0F] font-medium mt-8 mb-2 border-l-2 border-black pl-4">Mandatory Unboxing Video</h3>
                  <div className="bg-secondary p-6 rounded-[1rem] mt-4">
                    <p className="mb-4 text-[#0F0F0F] font-medium">To process any claims for transit damage, missing items, or incorrect products, an unboxing video is strictly mandatory.</p>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      <li>The video must clearly show the sealed package from all sides before opening.</li>
                      <li>It must be a single, continuous, unedited video from opening the outer package to inspecting the jewelry.</li>
                      <li>Claims without a valid unboxing video will not be entertained under any circumstances.</li>
                    </ul>
                  </div>
                </div>
              </motion.section>
            </>
          )}
          
        </div>

        <div className="mt-20 flex justify-center border-t border-black/10 pt-12">
          <Link href="/shop" className="inline-flex items-center gap-4 uppercase tracking-[0.1em] text-xs font-medium text-[#0F0F0F] group border-b border-black pb-3">
            Continue Shopping
            <ArrowRight className="w-4 h-4 transition-transform duration-500 ease-out group-hover:translate-x-3 stroke-[1.5]" />
          </Link>
        </div>

      </div>
    </div>
  );
}
