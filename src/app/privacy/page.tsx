import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Aastha Silver",
  description: "Aastha Silver privacy policy. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <div className="text-center mb-16">
          <span className="uppercase tracking-[0.3em] text-[10px] text-foreground/50 mb-4 block">Legal</span>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6">Privacy Policy</h1>
          <p className="text-foreground/50 text-sm font-light">Last updated: July 2026</p>
        </div>

        <div className="prose prose-sm max-w-none text-foreground/70 font-light leading-relaxed space-y-8">
          <section>
            <h2 className="font-serif text-2xl text-foreground font-normal mb-4">1. Information We Collect</h2>
            <p>When you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information (including credit card numbers, Razorpay/UPI), email address, and phone number. We refer to this information as &ldquo;Order Information.&rdquo;</p>
            <p>We also collect device information such as your web browser, IP address, time zone, and cookies when you browse the Site.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground font-normal mb-4">2. How We Use Your Information</h2>
            <p>We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations).</p>
            <p>Additionally, we use this information to communicate with you, screen our orders for potential risk or fraud, and provide you with information or advertising relating to our products or services.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground font-normal mb-4">3. Data Protection</h2>
            <p>We implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information. All payment transactions are processed through Razorpay&apos;s secure gateway and are encrypted.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground font-normal mb-4">4. Third-Party Services</h2>
            <p>We use Razorpay for payment processing, Sanity for content management, and Clerk for authentication. These third-party providers have their own privacy policies governing the use of your personal information. We recommend reviewing their policies.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground font-normal mb-4">5. Cookies</h2>
            <p>We use cookies to maintain your session, remember items in your cart, and understand browsing behaviour. You can choose to disable cookies in your browser settings, though this may affect your shopping experience.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground font-normal mb-4">6. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal data at any time. If you have an account, you can update your information from your account dashboard. For any other requests, please contact us at hello@aasthasilver.com.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-foreground font-normal mb-4">7. Contact</h2>
            <p>For questions about this privacy policy, please email us at <a href="mailto:hello@aasthasilver.com" className="text-foreground underline underline-offset-2">hello@aasthasilver.com</a> or visit our <Link href="/contact" className="text-foreground underline underline-offset-2">Contact page</Link>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
