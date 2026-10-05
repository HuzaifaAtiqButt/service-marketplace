"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { getServerSnapshot, getSnapshot, subscribe } from "@/lib/orders";

export function Header() {
  const orders = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return (
    <header className="border-b" style={{ borderColor: "var(--line)", background: "var(--card)" }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <svg width="30" height="30" viewBox="0 0 36 36" aria-hidden="true">
            <rect width="36" height="36" rx="9" fill="var(--brand)" />
            <path d="M10 14h16l-1.6 10H11.6z" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinejoin="round" />
            <path d="M14 14a4 4 0 0 1 8 0" fill="none" stroke="#fff" strokeWidth="2.2" />
          </svg>
          <span className="text-lg font-semibold tracking-tight">Service Marketplace</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm">
          <Link href="/" className="hover:underline">Browse</Link>
          <Link href="/orders" className="hover:underline">
            My orders
            {orders.length > 0 && (
              <span className="ml-1.5 rounded-full px-1.5 py-0.5 text-xs text-white" style={{ background: "var(--brand)" }}>
                {orders.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
