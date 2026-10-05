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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search services, for example logo or landing page"
          aria-label="Search services"
          className="w-full rounded-lg border bg-transparent px-3 py-2 text-sm sm:max-w-md"
          style={{ borderColor: "var(--line)" }}
        />
        <label className="flex items-center gap-2 text-sm">
          Sort
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="rounded-lg border bg-transparent px-2 py-2"
            style={{ borderColor: "var(--line)" }}
          >
            <option value="popular">Most reviewed</option>
            <option value="rating">Top rated</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
          </select>
        </label>
      </div>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Categories">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            aria-pressed={cat === c}
            className="rounded-full border px-3 py-1.5 text-sm"
            style={
              cat === c
                ? { background: "var(--brand)", borderColor: "var(--brand)", color: "#fff" }
                : { borderColor: "var(--line)" }
            }
          >
            {c}
          </button>
        ))}
      </div>

      <p className="mt-5 text-sm" style={{ color: "var(--muted)" }}>
        {list.length} service{list.length === 1 ? "" : "s"}
      </p>
      {list.length === 0 ? (
        <p className="mt-6 rounded-xl border p-8 text-center text-sm" style={{ borderColor: "var(--line)" }}>
          No services match. Try a different word or category.
        </p>
      ) : (
        <div className="mt-3 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((s) => (
            <ServiceCard key={s.id} s={s} />
          ))}
        </div>
      )}
    </section>
  );
}
