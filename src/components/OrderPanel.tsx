"use client";

import Link from "next/link";
import { useState } from "react";
import { money, type Service } from "@/lib/data";
import { placeOrder } from "@/lib/orders";

export function OrderPanel({ s }: { s: Service }) {
  const [idx, setIdx] = useState(1);
  const [note, setNote] = useState("");
  const [placed, setPlaced] = useState<string | null>(null);
  const p = s.packages[idx];

  return (
    <div className="border-2" style={{ background: "var(--card)", borderColor: "var(--ink)" }}>
      <div role="tablist" aria-label="Packages" className="grid grid-cols-3 border-b" style={{ borderColor: "var(--line)" }}>
        {s.packages.map((x, i) => (
          <button
            key={x.name}
            role="tab"
            aria-selected={i === idx}
            onClick={() => {
              setIdx(i);
              setPlaced(null);
            }}
            className="px-2 py-3 text-sm font-medium"
            style={i === idx ? { borderBottom: "2px solid var(--brand)", color: "var(--brand)" } : { color: "var(--muted)" }}
          >
            {x.name}
          </button>
        ))}
      </div>
      <div className="p-5">
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-semibold">{money(p.price)}</span>
          <span className="text-sm" style={{ color: "var(--muted)" }}>{p.days} day delivery</span>
        </div>
        <ul className="mt-4 space-y-2 text-sm">
          {p.features.map((f) => (
            <li key={f} className="flex gap-2">
              <span style={{ color: "var(--brand)" }}>✓</span>
              {f}
            </li>
          ))}
        </ul>
        <label className="mt-4 block text-sm">
          Notes for the seller (optional)
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            maxLength={300}
            className="mt-1 w-full border-2 bg-transparent px-3 py-2 text-sm"
            style={{ borderColor: "var(--ink)" }}
          />
        </label>
        <button
          onClick={() =>
            setPlaced(
              placeOrder({
                serviceId: s.id,
                serviceTitle: s.title,
                seller: s.seller,
                pkg: p.name,
                price: p.price,
                days: p.days,
                note: note.trim(),
              }),
            )
          }
          className="mt-4 w-full px-4 py-3 text-sm font-bold text-white"
          style={{ background: "var(--brand)" }}
        >
          Place demo order ({money(p.price)})
        </button>
        <p role="status" aria-live="polite" className="mt-3 min-h-5 text-sm">
          {placed && (
            <>
              Order {placed} placed. No payment is taken in this demo.{" "}
              <Link href="/orders" className="underline" style={{ color: "var(--brand)" }}>
                View my orders
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
