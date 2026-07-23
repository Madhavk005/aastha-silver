import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Order | Aastha Silver",
  description: "Track your Aastha Silver order. Enter your order ID to see real-time delivery status.",
};

export default function TrackOrderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
