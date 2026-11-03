# FoodAway

A food ordering app built with Next.js (Pages Router): browse the menu, choose a size, and pay on delivery or online with Stripe.

## Stack

- **Next.js 16** with SSR (home, order page) and SSG/ISR (dish pages)
- **Sanity** for the menu and orders
- **Route e-commerce API** for sign up and log in
- **Zustand** for the persisted cart and session
- **Stripe Checkout** for online payments
- **Motion** and CSS Modules for the interface

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Fill in `.env.local`:

| Variable | Used for |
| --- | --- |
| `SANITY_API_TOKEN` | Reading the menu and orders, creating orders (server only, needs write access) |
| `STRIPE_SECRET_KEY` | Online payments (server only) |
| `NEXT_PUBLIC_ROUTE_API_URL` | Optional, overrides the Route API base URL |
