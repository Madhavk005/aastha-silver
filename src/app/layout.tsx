import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { CartDrawer } from "@/features/cart/components/CartDrawer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { ExitIntentPopup } from "@/components/layout/ExitIntentPopup";

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
  description: "Premium Sterling Silver Jewellery designed for everyday elegance. Handcrafted pieces capturing quiet luxury.",
  keywords: ["silver jewellery", "premium silver", "sterling silver", "india", "luxury jewellery", "minimalist jewellery"],
  metadataBase: new URL("https://aasthasilver.com"),
  openGraph: {
    title: "Aastha Silver | Premium Sterling Silver Jewellery",
    description: "Premium Sterling Silver Jewellery designed for everyday elegance.",
    url: "https://aasthasilver.com",
    siteName: "Aastha Silver",
    images: [
      {
          url: "/images/hero.jpg",
          width: 1200,
          height: 630,
          alt: "Aastha Silver Collections",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Aastha Silver | Premium Sterling Silver Jewellery",
      description: "Premium Sterling Silver Jewellery designed for everyday elegance.",
      images: ["/images/hero.jpg"],
    },
};

import { shadcn } from "@clerk/ui/themes";
import { CustomCursor } from "@/components/ui/CustomCursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} ${jetbrainsMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground cursor-none">
        <CustomCursor />
        <ClerkProvider appearance={{ theme: shadcn }}>
          <TooltipProvider>
            <Navbar />
            <CartDrawer />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <FloatingActions />
            <ExitIntentPopup />
          </TooltipProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
