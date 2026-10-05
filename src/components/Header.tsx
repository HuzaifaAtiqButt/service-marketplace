"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { getServerSnapshot, getSnapshot, subscribe } from "@/lib/orders";

export function Header() {
  const orders = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return (
    <header style={{ background: "var(--band)", color: "#fff" }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="text-xl font-extrabold tracking-tight">
          Service Marketplace
        </Link>
        <nav className="flex items-center gap-6 text-sm font-semibold">
          <Link href="/" className="underline-offset-4 hover:underline">Browse</Link>
          <Link href="/orders" className="underline-offset-4 hover:underline">
            My orders
            {orders.length > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 text-xs" style={{ background: "var(--brand)" }}>
                {orders.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
