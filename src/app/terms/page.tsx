import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Terms & Conditions | Aastha Silver",
  description: "Aastha Silver terms and conditions. Please read these terms carefully before using our website.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <div className="text-center mb-16">
          <span className="uppercase tracking-[0.3em] text-[10px] text-foreground/50 mb-4 block">Legal</span>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6">Terms &amp; Conditions</h1>
          <p className="text-foreground/50 text-sm font-light">Last updated: July 2026</p>
        </div>

        <div className="prose prose-sm max-w-none text-foreground/70 font-light leading-relaxed space-y-8">
          <section>
            <h2 className="font-serif text-2xl text-foreground font-normal mb-4">1. General</h2>
            <p>By accessing and placing an order with Aastha Silver, you confirm that you are in agreement with and bound by the terms and conditions contained herein. These terms apply to the entire website and any products or services offered.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground font-normal mb-4">2. Products &amp; Pricing</h2>
            <p>All products are described as accurately as possible. However, Aastha Silver does not warrant that product descriptions, images, or other content are error-free. We reserve the right to modify prices at any time without prior notice. All prices are in Indian Rupees (INR) and inclusive of applicable taxes unless stated otherwise.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground font-normal mb-4">3. Orders &amp; Payment</h2>
            <p>By placing an order, you agree to provide current, complete, and accurate purchase and account information. We reserve the right to refuse or cancel any order at our sole discretion. Payment must be received in full before any order is processed and shipped.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground font-normal mb-4">4. Shipping &amp; Delivery</h2>
            <p>Shipping timelines are estimates and not guaranteed. Aastha Silver is not liable for delays caused by courier partners, customs clearance, or unforeseen circumstances. Risk of loss and title pass to you upon delivery.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground font-normal mb-4">5. Returns &amp; Refunds</h2>
            <p>Please refer to our <Link href="/shipping-returns" className="text-foreground underline underline-offset-2">Shipping &amp; Returns page</Link> for detailed information on our return and refund policy.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground font-normal mb-4">6. Intellectual Property</h2>
            <p>All content on this website, including images, text, designs, logos, and product designs, is the intellectual property of Aastha Silver and may not be reproduced without explicit written permission.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground font-normal mb-4">7. Limitation of Liability</h2>
            <p>Aastha Silver shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our products or website, to the fullest extent permitted by law.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground font-normal mb-4">8. Governing Law</h2>
            <p>These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground font-normal mb-4">9. Contact</h2>
            <p>For any questions regarding these terms, please contact us at <a href="mailto:hello@aasthasilver.com" className="text-foreground underline underline-offset-2">hello@aasthasilver.com</a> or visit our <Link href="/contact" className="text-foreground underline underline-offset-2">Contact page</Link>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
