import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { CartDrawer } from "@/features/cart/components/CartDrawer";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Aastha Silver",
    default: "Aastha Silver | Premium Sterling Silver Jewellery",
  },
  description: "Premium Sterling Silver Jewellery designed for everyday elegance. Elegant, authentic, modern luxury.",
  keywords: ["silver jewellery", "premium silver", "sterling silver", "india", "luxury jewellery"],
  metadataBase: new URL("https://aasthasilver.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${inter.variable} ${cormorant.variable} ${jetbrainsMono.variable} h-full antialiased scroll-smooth`}
      >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <TooltipProvider>
          <Navbar />
          <CartDrawer />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </TooltipProvider>
      </body>
      </html>
    </ClerkProvider>
  );
}
