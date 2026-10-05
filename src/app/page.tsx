import { Browse } from "@/components/Browse";

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
      <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
        Find a service for your next project
      </h1>
      <p className="mt-3 max-w-xl text-base leading-relaxed" style={{ color: "var(--muted)" }}>
        Compare packages from independent sellers, place an order, and follow it until it is delivered.
      </p>
      <div className="mt-8">
        <Browse />
      </div>
    </main>
  );
}
