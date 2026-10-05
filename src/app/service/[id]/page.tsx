import Link from "next/link";
import { notFound } from "next/navigation";
import { Cover } from "@/components/ServiceCard";
import { OrderPanel } from "@/components/OrderPanel";
import { SERVICES } from "@/lib/data";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const s = SERVICES.find((x) => x.id === id);
  return { title: s ? `${s.title} | Service Marketplace` : "Service not found" };
}

export default async function ServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const s = SERVICES.find((x) => x.id === id);
  if (!s) notFound();

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Link href="/" className="text-sm underline" style={{ color: "var(--muted)" }}>
        Back to all services
      </Link>
      <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight">{s.title}</h1>
          <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
            {s.seller}, {s.sellerLevel.toLowerCase()}. <span style={{ color: "#b45309" }}>★</span> {s.rating.toFixed(1)} from {s.reviews} reviews
          </p>
          <div className="mt-5 overflow-hidden rounded-none">
            <Cover s={s} tall />
          </div>
          <h2 className="mt-6 font-semibold">About this service</h2>
          <p className="mt-2 text-sm leading-relaxed">{s.summary}</p>

          <h2 className="mt-6 font-semibold">Compare packages</h2>
          <div className="mt-3 overflow-x-auto border" style={{ borderColor: "var(--line)", background: "var(--card)" }}>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left" style={{ color: "var(--muted)" }}>
                  <th className="p-3">Package</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Delivery</th>
                  <th className="p-3">Includes</th>
                </tr>
              </thead>
              <tbody>
                {s.packages.map((p) => (
                  <tr key={p.name} className="border-t align-top" style={{ borderColor: "var(--line)" }}>
                    <td className="p-3 font-medium">{p.name}</td>
                    <td className="p-3">${p.price}</td>
                    <td className="p-3">{p.days} days</td>
                    <td className="p-3">{p.features.join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <aside>
          <OrderPanel s={s} />
        </aside>
      </div>
    </main>
  );
}
