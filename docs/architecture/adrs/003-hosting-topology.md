# ADR 003: Next.js on Cloudflare Workers via OpenNext

## Decision

Deploy the app on Cloudflare Workers using OpenNext.

## Why

- compatible with our Next.js App Router architecture
- gives global edge delivery, static asset serving, image bindings, and worker deployment
- lines up with the planned R2 incremental cache strategy

## Migration Strategy

- keep Cloudflare bindings behind infrastructure boundaries
- avoid Cloudflare-specific logic in business modules
- retain portability to another Node-compatible platform if needed
