# Payload CMS on Cloudflare Workers

A sample blog built with [Payload](https://payloadcms.com) and deployed to [Cloudflare Workers](https://workers.cloudflare.com), using D1 for the database and R2 for media storage. Based on the official [with-cloudflare-d1](https://github.com/payloadcms/payload/tree/main/templates/with-cloudflare-d1) template.

## Tech Stack

- **Payload** (v3) — content management with Lexical rich text
- **Next.js 15** — frontend rendering via [OpenNext for Cloudflare](https://opennext.js.org/cloudflare)
- **Cloudflare D1** — SQLite database at the edge
- **Cloudflare R2** — object storage for media uploads
- **Wrangler** — CLI for local development and deployment

## Collections

| Collection   | Description                                          |
| ------------ | ---------------------------------------------------- |
| **Users**    | Auth-enabled collection with admin panel access       |
| **Posts**    | Blog posts with rich text, hero image, and categories |
| **Categories** | Taxonomy for organizing posts                      |
| **Media**    | Upload-enabled collection backed by R2 storage        |

Posts use Payload's Lexical editor with a custom **Text and Media** block, which allows embedding side-by-side text and image layouts directly within rich text content.

## Prerequisites

- Node.js 18.20.2+ or 20.9.0+
- pnpm 9 or 10
- A [Cloudflare account](https://dash.cloudflare.com/sign-up) on the **Workers Paid** plan (required due to bundle size limits)
- Wrangler CLI authenticated (`pnpm wrangler login`)

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Create Cloudflare resources

Create a D1 database and R2 bucket via the Cloudflare dashboard or Wrangler CLI:

```bash
pnpm wrangler d1 create <your-database-name>
pnpm wrangler r2 bucket create <your-bucket-name>
```

### 3. Configure bindings

Update `wrangler.jsonc` with your D1 database ID, database name, and R2 bucket name:

```jsonc
{
  "d1_databases": [
    {
      "binding": "D1",
      "database_name": "<your-database-name>",
      "database_id": "<your-database-id>"
    }
  ],
  "r2_buckets": [
    {
      "binding": "R2",
      "bucket_name": "<your-bucket-name>"
    }
  ]
}
```

### 4. Set environment variables

If not generated for you, create a `.env` file with your Payload secret:

```bash
PAYLOAD_SECRET=<generate with `openssl rand -hex 32`>
```

### 5. Run locally

```bash
pnpm dev
```

Wrangler automatically binds to your remote D1 and R2 resources during local development.

## Deployment

### Generate migrations

Before your first deploy (or after schema changes), create a migration:

```bash
pnpm payload migrate:create
```

### Deploy

```bash
pnpm run deploy
```

This runs migrations against your remote D1 database, builds the app with OpenNext, and deploys the worker to Cloudflare.

## Project Structure

```
src/
├── app/
│   ├── (frontend)/          # Public-facing routes
│   │   ├── posts/[slug]/    # Individual post pages
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── styles.css
│   │   └── components/
│   │       ├── RichText/    # Lexical rich text renderer
│   │       └── TextAndMedia/# Custom block component
│   ├── (payload)/           # Payload admin panel
├── collections/             # Payload collection configs
├── migrations/              # D1 migration files
├── payload.config.ts
└── payload-types.ts         # Auto-generated types
```

## Logging

This project uses a custom console-based logger in production. Payload's default logger (`pino-pretty`) relies on Node.js APIs unavailable in Workers.

- Production logs are JSON-formatted for Cloudflare's observability tools
- Local development uses the default `pino-pretty` logger
- Control log level with the `PAYLOAD_LOG_LEVEL` environment variable

To view production logs, enable [Workers Logs](https://developers.cloudflare.com/workers/observability/logs/workers-logs/#enable-workers-logs) in the Cloudflare dashboard.

## Known Limitations

- **Worker size limits** — the Workers Paid plan is required due to the 3MB bundle limit on the free tier
- **GraphQL** — full support is not guaranteed on Workers due to [upstream issues](https://github.com/cloudflare/workerd/issues/5175)
- **Image optimization** — Next.js image optimization requires [Cloudflare Images](https://developers.cloudflare.com/images/) to be enabled on your account, or set `images: { unoptimized: true }` in `next.config.ts`
