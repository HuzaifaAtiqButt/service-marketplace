"use client";

import { useMemo, useState } from "react";
import { CATEGORIES, SERVICES } from "@/lib/data";
import { ServiceCard } from "./ServiceCard";

type Sort = "popular" | "price-low" | "price-high" | "rating";

export function Browse() {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("popular");

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    const out = SERVICES.filter(
      (s) =>
        (cat === "All" || s.category === cat) &&
        (!term || s.title.toLowerCase().includes(term) || s.seller.toLowerCase().includes(term) || s.summary.toLowerCase().includes(term)),
    );
    const by: Record<Sort, (a: (typeof out)[number], b: (typeof out)[number]) => number> = {
      popular: (a, b) => b.reviews - a.reviews,
      "price-low": (a, b) => a.from - b.from,
      "price-high": (a, b) => b.from - a.from,
      rating: (a, b) => b.rating - a.rating,
    };
    return [...out].sort(by[sort]);
  }, [cat, q, sort]);

  return (
    <section>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <label className="block text-sm font-medium sm:w-96">
          Search
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Logo, landing page, blog posts"
            className="mt-1 w-full border-2 bg-transparent px-3 py-2 text-base font-normal"
            style={{ borderColor: "var(--ink)" }}
          />
        </label>
        <label className="flex items-center gap-2 text-sm font-medium">
          Sort by
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="border-2 bg-transparent px-2 py-2 font-normal"
            style={{ borderColor: "var(--ink)" }}
          >
            <option value="popular">Most reviewed</option>
            <option value="rating">Top rated</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
          </select>
        </label>
      </div>

      <div className="mt-6 flex flex-wrap gap-x-6 border-b-2" style={{ borderColor: "var(--ink)" }} role="group" aria-label="Categories">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            aria-pressed={cat === c}
            className="-mb-[2px] border-b-4 py-2 text-sm font-semibold"
            style={{ borderColor: cat === c ? "var(--brand)" : "transparent", color: cat === c ? "var(--ink)" : "var(--muted)" }}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="mt-4 text-sm" style={{ color: "var(--muted)" }}>
        {list.length} service{list.length === 1 ? "" : "s"}
      </p>
      {list.length === 0 ? (
        <p className="mt-4 border-2 border-dashed p-8 text-sm" style={{ borderColor: "var(--line)" }}>
          No services match. Try a different word or choose All.
        </p>
      ) : (
        <div className="mt-1 border-t" style={{ borderColor: "var(--line)" }}>
          {list.map((s) => (
            <ServiceCard key={s.id} s={s} />
          ))}
        </div>
      )}
    </section>
  );
}
