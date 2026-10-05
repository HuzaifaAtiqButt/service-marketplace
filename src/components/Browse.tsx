"use client";

import { useMemo, useState } from "react";
import { CATEGORIES, SERVICES } from "@/lib/data";
import { ServiceCard, toneOf } from "./ServiceCard";

type Sort = "popular" | "price-low" | "price-high" | "rating";

export function Browse() {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("popular");

  const matchesText = (s: (typeof SERVICES)[number]) => {
    const term = q.trim().toLowerCase();
    return !term || s.title.toLowerCase().includes(term) || s.seller.toLowerCase().includes(term) || s.summary.toLowerCase().includes(term);
  };

  const list = useMemo(() => {
    const out = SERVICES.filter((s) => (cat === "All" || s.category === cat) && matchesText(s));
    const by: Record<Sort, (a: (typeof out)[number], b: (typeof out)[number]) => number> = {
      popular: (a, b) => b.reviews - a.reviews,
      "price-low": (a, b) => a.from - b.from,
      "price-high": (a, b) => b.from - a.from,
      rating: (a, b) => b.rating - a.rating,
    };
    return [...out].sort(by[sort]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cat, q, sort]);

  const count = (c: string) => SERVICES.filter((s) => (c === "All" || s.category === c) && matchesText(s)).length;

  return (
    <div className="grid gap-8 md:grid-cols-[210px_1fr]">
      <aside className="space-y-6">
        <label className="block text-sm font-bold">
          Search
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Logo, landing page, blog"
            className="mt-1 w-full border-2 bg-[var(--card)] px-3 py-2 text-base font-normal"
            style={{ borderColor: "var(--ink)" }}
          />
        </label>
        <div role="group" aria-label="Categories">
          <p className="mb-1 text-sm font-bold">Category</p>
          <ul>
            {CATEGORIES.map((c) => (
              <li key={c}>
                <button
                  onClick={() => setCat(c)}
                  aria-pressed={cat === c}
                  className="flex w-full items-center justify-between border-l-4 px-3 py-1.5 text-left text-base"
                  style={{
                    borderColor: cat === c ? (c === "All" ? "var(--brand)" : toneOf(c)) : "transparent",
                    fontWeight: cat === c ? 800 : 500,
                    background: cat === c ? "var(--card)" : "transparent",
                  }}
                >
                  <span>{c}</span>
                  <span className="text-sm tabular-nums" style={{ color: "var(--muted)" }}>{count(c)}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <label className="block text-sm font-bold">
          Sort by
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="mt-1 w-full border-2 bg-[var(--card)] px-2 py-2 text-base font-normal"
            style={{ borderColor: "var(--ink)" }}
          >
            <option value="popular">Most reviewed</option>
            <option value="rating">Top rated</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
          </select>
        </label>
      </aside>

      <section aria-label="Results">
        <p className="border-b-2 pb-2 text-sm font-bold" style={{ borderColor: "var(--ink)" }}>
          {list.length} service{list.length === 1 ? "" : "s"}
        </p>
        {list.length === 0 ? (
          <p className="mt-4 border-2 border-dashed p-8 text-base" style={{ borderColor: "var(--line)" }}>
            No services match. Try a different word or choose All.
          </p>
        ) : (
          list.map((s) => <ServiceCard key={s.id} s={s} />)
        )}
      </section>
    </div>
  );
}
