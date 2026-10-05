import { Browse } from "@/components/Browse";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Find a service for your next project</h1>
      <p className="mt-2 max-w-xl text-sm" style={{ color: "var(--muted)" }}>
        Compare packages from independent sellers, then place an order and follow it from start to finish.
      </p>
      <div className="mt-6">
        <Browse />
      </div>
    </main>
  );
}
