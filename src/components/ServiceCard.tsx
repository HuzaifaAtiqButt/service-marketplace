import Link from "next/link";
import { money, type Service } from "@/lib/data";

export function Cover({ s, tall }: { s: Service; tall?: boolean }) {
  const initials = s.title.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  return (
    <div
      className={`flex items-center justify-center text-4xl font-semibold text-white ${tall ? "h-56" : "h-36"}`}
      style={{ background: `linear-gradient(135deg, hsl(${s.hue} 65% 45%), hsl(${(s.hue + 40) % 360} 70% 35%))` }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

export function ServiceCard({ s }: { s: Service }) {
  return (
    <Link
      href={`/service/${s.id}`}
      className="block overflow-hidden rounded-xl border transition hover:-translate-y-0.5 hover:shadow-md"
      style={{ background: "var(--card)", borderColor: "var(--line)" }}
    >
      <Cover s={s} />
      <div className="p-4">
        <p className="text-xs" style={{ color: "var(--muted)" }}>{s.seller} · {s.sellerLevel}</p>
        <h3 className="mt-1 line-clamp-2 min-h-[2.75rem] font-medium leading-snug">{s.title}</h3>
        <div className="mt-3 flex items-center justify-between text-sm">
          <span>
            <span style={{ color: "#d97706" }}>★</span> {s.rating.toFixed(1)}{" "}
            <span style={{ color: "var(--muted)" }}>({s.reviews})</span>
          </span>
          <span className="font-semibold">From {money(s.from)}</span>
        </div>
      </div>
    </Link>
  );
}
