import { STATUSES, type Status } from "./data";

export type Order = {
  id: string;
  serviceId: string;
  serviceTitle: string;
  seller: string;
  pkg: string;
  price: number;
  days: number;
  note: string;
  status: Status;
  placedAt: string;
};

const KEY = "service-marketplace-orders-v1";
const EMPTY: Order[] = [];

let cache: Order[] | null = null;
const listeners = new Set<() => void>();

function read(): Order[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Order[];
    return Array.isArray(parsed) ? parsed : EMPTY;
  } catch {
    return EMPTY;
  }
}

export function getSnapshot(): Order[] {
  if (cache === null) cache = read();
  return cache;
}

export function getServerSnapshot(): Order[] {
  return EMPTY;
}

export function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function commit(next: Order[]) {
  cache = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // Storage may be blocked. The app still works for this visit.
  }
  listeners.forEach((l) => l());
}

export function placeOrder(o: Omit<Order, "id" | "status" | "placedAt">): string {
  const id = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
  commit([{ ...o, id, status: "Placed", placedAt: new Date().toISOString() }, ...getSnapshot()]);
  return id;
}

export function advance(id: string) {
  commit(
    getSnapshot().map((o) => {
      if (o.id !== id) return o;
      const next = STATUSES[Math.min(STATUSES.indexOf(o.status) + 1, STATUSES.length - 1)];
      return { ...o, status: next };
    }),
  );
}

export function cancel(id: string) {
  commit(getSnapshot().filter((o) => o.id !== id));
}

export function reset() {
  commit(EMPTY);
}
