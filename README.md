# BolderQrepo
Bålder Quartet website repository

Overview
A Next.js-based storefront and media site for Bålder Quartet. Features a shoppable score catalog, ticket/booking CTAs, media embeds, and an about page per member. Includes Stripe Checkout for payments, webhook-driven order logging to MySQL, and tokenized PDF delivery with per-item download links.

Key Features
  - Homepage sections: tickets CTA, featured video, album/channel links, streaming/shop CTA, shop preview, and quartet story.
  - Shop: score catalog, quick view, cart, Stripe Checkout, and per-item download links emailed post-purchase.
  - Downloads: PDFs stored outside /public (private-scores/), delivered via signed token links; tokens logged with expiry.
  - Pages: Shop, Contact (email form), About (per-member sections), Media, Checkout, Success/Cancel.
  - Backend: Next.js API routes for checkout session creation, webhook handling, download endpoint, events admin, etc.
  - Persistence: Azure MySQL (orders, order_tokens) for order and token records.

