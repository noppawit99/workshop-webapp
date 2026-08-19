<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Commands

- `npm run dev` — dev server (localhost:3000)
- `npm run build` — production build (includes type-checking)
- `npm run lint` — ESLint (flat config)
- `npx prisma generate` — regenerate Prisma client after schema changes

No `test` or `typecheck` scripts exist. `next build` is the only type-check gate.

## Prisma / Database

- **MariaDB** with Prisma 7 + `@prisma/adapter-mariadb` driver adapter
- Schema: `prisma/schema.prisma` — client output goes to `generated/prisma/` (gitignored)
- Always run `npx prisma generate` after editing the schema
- Import path: `import prisma from "../../generated/prisma/client"` (not `@prisma/client`)
- `prisma.config.ts` loads env via `dotenv/config`
- SQL seed/setup scripts in `docs/`

## Auth

- [better-auth](https://www.better-auth.com/) with Prisma adapter, email+password enabled
- Server: `src/lib/auth.ts`, Client: `src/lib/auth-client.ts`
- API route: `src/app/api/auth/`

## App Structure

- Route groups: `(auth)` (login/signup), `(front)` (main app pages)
- Path alias: `@/*` → `./src/*`
- State: zustand (`src/lib/cart-store.ts`)
- UI: shadcn (radix-rhea style, lucide icons) + Tailwind CSS 4
- Dockerfile uses standalone output mode
