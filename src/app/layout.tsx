import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import { Header } from "@/components/Header";
import "./globals.css";

const body = Hanken_Grotesk({ variable: "--font-body", subsets: ["latin"] });

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
        <footer className="mx-auto max-w-5xl px-5 py-10 text-xs sm:px-8" style={{ color: "var(--muted)" }}>
          Demo project with made-up sellers and sample data. No payments are taken and orders stay in your browser.
        </footer>
      </body>
    </html>
  );
}
