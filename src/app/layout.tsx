import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Header } from "@/components/Header";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Service Marketplace",
  description: "Browse services, compare packages and place an order. Demo project with sample data, no account needed.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} antialiased`}>
      <body>
        <Header />
        {children}
        <footer className="mx-auto max-w-6xl px-4 py-8 text-xs sm:px-6" style={{ color: "var(--muted)" }}>
          Demo project with made-up sellers and sample data. No payments are taken and orders stay in your browser.
        </footer>
      </body>
    </html>
  );
}
