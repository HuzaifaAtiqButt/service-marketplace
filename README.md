# Service Marketplace

A small marketplace demo: browse services, compare packages, place an order, and follow it from start to finish.

This is a demo project. The sellers are made up, no payments are taken, there is no database, and orders stay in your browser (localStorage).

## What it shows

- Browse with search, category filter, and sorting by reviews, rating or price.
- A service page with a Basic, Standard and Premium package comparison and an order form.
- Orders with four stages (placed, in progress, delivered, completed). A button lets you act as the seller and move an order forward.
- Statically generated service pages, a shared order store built on `useSyncExternalStore`, keyboard-friendly controls, and light and dark themes.

## Stack

Next.js, React, TypeScript, Tailwind CSS. No UI or state libraries.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Going further

A production version would add accounts, payments, seller dashboards and messaging on a real database. This demo keeps the order flow so it can run without any account or keys.
