import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import { Header } from "@/components/Header";
import "./globals.css";

const body = Schibsted_Grotesk({ variable: "--font-body", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Service Marketplace",
  description: "Browse services, compare packages and place an order. Demo project with sample data, no account needed.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} antialiased`}>
      <body>
        <Header />
        {children}
        <footer className="mx-auto max-w-6xl px-5 py-10 text-sm sm:px-8" style={{ color: "var(--muted)" }}>
          A demo with made-up sellers. No payments are taken, and your orders stay in this browser.
        </footer>
      </body>
    </html>
  );
}
