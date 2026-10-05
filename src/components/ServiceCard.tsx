import Link from "next/link";
import { money, type Service } from "@/lib/data";

const TONE: Record<string, string> = {
  Web: "#2447b8",
  Design: "#d6334a",
  Writing: "#b86b00",
  Video: "#0e7a5f",
  Marketing: "#6b2fb3",
};

export const toneOf = (category: string) => TONE[category] ?? "#333";

const initials = (name: string) => name.split(" ").map((w) => w[0]).join("");

export function Cover({ s, tall }: { s: Service; tall?: boolean }) {
  if (tall) {
    return (
      <div className="flex h-44 items-end p-5" style={{ background: toneOf(s.category) }} aria-hidden="true">
        <span className="text-6xl font-extrabold leading-none tracking-tight text-white">{s.category}</span>
      </div>
    );
  }
  return (
    <span
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
      style={{ background: toneOf(s.category) }}
      aria-hidden="true"
    >
      {initials(s.seller)}
    </span>
  );
}

export function ServiceCard({ s }: { s: Service }) {
  return (
    <Link
      href={`/service/${s.id}`}
      className="group grid grid-cols-[44px_1fr_auto] items-center gap-x-4 border-b px-1 py-4 sm:grid-cols-[44px_1fr_120px_auto]"
      style={{ borderColor: "var(--line)" }}
    >
      <Cover s={s} />
      <div className="min-w-0">
        <h3 className="font-bold leading-snug group-hover:underline group-hover:underline-offset-4">{s.title}</h3>
        <p className="mt-0.5 text-sm" style={{ color: "var(--muted)" }}>
          {s.seller}, {s.sellerLevel.toLowerCase()}
        </p>
      </div>
      <p className="hidden text-sm sm:block">
        <span style={{ color: "#b45309" }}>★</span> <span className="font-semibold">{s.rating.toFixed(1)}</span>{" "}
        <span style={{ color: "var(--muted)" }}>({s.reviews})</span>
      </p>
      <p className="text-right tabular-nums">
        <span className="block text-xs" style={{ color: "var(--muted)" }}>From</span>
        <span className="text-xl font-extrabold">{money(s.from)}</span>
      </p>
    </Link>
  );
}
