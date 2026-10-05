import { Browse } from "@/components/Browse";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
      <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
        Find a service for your next project
      </h1>
      <p className="mt-3 max-w-xl text-lg leading-relaxed" style={{ color: "var(--muted)" }}>
        Pick a package, place an order, and follow it until it is delivered.
      </p>
      <div className="mt-10">
        <Browse />
      </div>
    </main>
  );
}
