import Link from "next/link";
import { money, type Service } from "@/lib/data";

const TONE: Record<string, string> = {
  Web: "#244c7a",
  Design: "#a23b2a",
  Writing: "#7a5f12",
  Video: "#2f5d50",
  Marketing: "#58406b",
};

function Glyph({ category }: { category: string }) {
  const p = { stroke: "#fff", strokeWidth: 3, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (category) {
    case "Web":
      return <path d="M14 14 6 24l8 10M34 14l8 10-8 10M28 10l-8 28" {...p} />;
    case "Design":
      return (<><circle cx="18" cy="20" r="9" {...p} /><rect x="22" y="22" width="16" height="16" {...p} /></>);
    case "Writing":
      return <path d="M8 12h32M8 22h32M8 32h20" {...p} />;
    case "Video":
      return (<><rect x="6" y="12" width="36" height="24" {...p} /><path d="M20 18v12l10-6z" {...p} /></>);
    default:
      return <path d="M8 38V28M20 38V20M32 38V12M44 38V6" {...p} />;
  }
}

export function Cover({ s, tall }: { s: Service; tall?: boolean }) {
  return (
    <div
      className={`flex items-center justify-center ${tall ? "h-48" : "h-[72px] w-[72px] shrink-0"}`}
      style={{ background: TONE[s.category] ?? "#333" }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 48 48" className={tall ? "h-24 w-24" : "h-10 w-10"}>
        <Glyph category={s.category} />
      </svg>
    </div>
  );
}

export function ServiceCard({ s }: { s: Service }) {
  return (
    <Link
      href={`/service/${s.id}`}
      className="group grid grid-cols-[72px_1fr_auto] items-center gap-x-4 border-b py-4 sm:gap-x-5"
      style={{ borderColor: "var(--line)" }}
    >
      <Cover s={s} />
      <div className="min-w-0">
        <h3 className="font-semibold leading-snug group-hover:underline group-hover:underline-offset-4">{s.title}</h3>
        <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
          {s.seller}, {s.sellerLevel.toLowerCase()}. {s.category}.
        </p>
        <p className="mt-0.5 text-sm">
          <span style={{ color: "#b45309" }}>★</span> {s.rating.toFixed(1)}{" "}
          <span style={{ color: "var(--muted)" }}>from {s.reviews} reviews</span>
        </p>
      </div>
      <p className="text-right text-sm tabular-nums" style={{ color: "var(--muted)" }}>
        From<br />
        <span className="text-xl font-extrabold" style={{ color: "var(--ink)" }}>{money(s.from)}</span>
      </p>
    </Link>
  );
}
