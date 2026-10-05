"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { STATUSES, money } from "@/lib/data";
import { advance, cancel, getServerSnapshot, getSnapshot, reset, subscribe } from "@/lib/orders";

export default function OrdersPage() {
  const orders = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">My orders</h1>
        {orders.length > 0 && (
          <button onClick={reset} className="text-sm underline" style={{ color: "var(--muted)" }}>
            Clear all
          </button>
        )}
      </div>
      <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
        In a real marketplace the seller moves an order forward. Here you can press the button to act as the seller.
      </p>

      {orders.length === 0 ? (
        <div className="mt-6 border p-8 text-center" style={{ borderColor: "var(--line)", background: "var(--card)" }}>
          <p className="text-sm">You have no orders yet.</p>
          <Link href="/" className="mt-3 inline-block text-sm underline" style={{ color: "var(--brand)" }}>
            Browse services
          </Link>
        </div>
      ) : (
        <ul className="mt-6 space-y-4">
          {orders.map((o) => {
            const step = STATUSES.indexOf(o.status);
            return (
              <li key={o.id} className="border-2 p-5" style={{ background: "var(--card)", borderColor: "var(--ink)" }}>
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-xs" style={{ color: "var(--muted)" }}>{o.id}</p>
                    <Link href={`/service/${o.serviceId}`} className="font-medium hover:underline">
                      {o.serviceTitle}
                    </Link>
                    <p className="text-sm" style={{ color: "var(--muted)" }}>
                      {o.seller}, {o.pkg} package, {o.days} day delivery
                    </p>
                  </div>
                  <p className="text-lg font-semibold">{money(o.price)}</p>
                </div>

                <ol className="mt-4 grid grid-cols-4 gap-2 text-xs" aria-label="Order progress">
                  {STATUSES.map((st, i) => (
                    <li key={st}>
                      <div className="h-1.5 rounded-full" style={{ background: i <= step ? "var(--brand)" : "var(--line)" }} />
                      <span className="mt-1 block" style={{ color: i <= step ? "var(--ink)" : "var(--muted)", fontWeight: i === step ? 600 : 400 }}>
                        {st}
                      </span>
                    </li>
                  ))}
                </ol>

                {o.note && <p className="mt-3 text-sm" style={{ color: "var(--muted)" }}>Your note: {o.note}</p>}

                <div className="mt-4 flex gap-2">
                  {step < STATUSES.length - 1 && (
                    <button
                      onClick={() => advance(o.id)}
                      className="px-3 py-2 text-sm font-semibold text-white"
                      style={{ background: "var(--brand)" }}
                    >
                      Act as seller: move to {STATUSES[step + 1].toLowerCase()}
                    </button>
                  )}
                  {step === 0 && (
                    <button onClick={() => cancel(o.id)} className="border-2 px-3 py-2 text-sm font-medium" style={{ borderColor: "var(--line)" }}>
                      Cancel order
                    </button>
                  )}
                  {step === STATUSES.length - 1 && (
                    <span className="text-sm" style={{ color: "var(--brand)" }}>Order completed</span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
