"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { getServerSnapshot, getSnapshot, subscribe } from "@/lib/orders";

export function Header() {
  const orders = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return (
    <header className="border-b-2" style={{ borderColor: "var(--ink)" }}>
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <svg width="26" height="26" viewBox="0 0 36 36" aria-hidden="true">
            <rect width="36" height="36" fill="var(--ink)" />
            <path d="M9 13h18M9 18h18M9 23h11" stroke="var(--bg)" strokeWidth="3" />
            <circle cx="26" cy="24" r="3.4" fill="var(--brand)" />
          </svg>
          <span className="text-lg font-extrabold tracking-tight">Service Marketplace</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="underline-offset-4 hover:underline">Browse</Link>
          <Link href="/orders" className="underline-offset-4 hover:underline">
            My orders
            {orders.length > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 text-xs text-white" style={{ background: "var(--brand)" }}>
                {orders.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
