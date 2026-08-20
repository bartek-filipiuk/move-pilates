# Multi-stage Dockerfile for Payload CMS + Next.js
# Requires `output: 'standalone'` in next.config.js

FROM node:22.17.0-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time env vars (Payload CMS needs DB during build for schema, Next.js needs NEXT_PUBLIC_*)
ARG DATABASE_URI
ARG PAYLOAD_SECRET
ARG NEXT_PUBLIC_SERVER_URL
ARG NEXT_PUBLIC_SITE_NAME
ENV DATABASE_URI=${DATABASE_URI}
ENV PAYLOAD_SECRET=${PAYLOAD_SECRET}
ENV NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL}
ENV NEXT_PUBLIC_SITE_NAME=${NEXT_PUBLIC_SITE_NAME}

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Create writable media directory for Payload uploads
RUN mkdir -p /app/public/media && chown nextjs:nodejs /app/public/media

RUN mkdir .next
RUN chown nextjs:nodejs .next

# Standalone build output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy full node_modules + src for Payload migrations at runtime
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/src ./src
COPY --from=builder --chown=nextjs:nodejs /app/tsconfig.json ./tsconfig.json

USER nextjs

EXPOSE 3000

ENV PORT=3000

# Schema sync: push NEVER runs with NODE_ENV=production (db-postgres connect.js),
# so run migrations here. clear-dev-migrations removes the dev push marker first -
# without that, `payload migrate` opens an interactive prompt and hangs in a TTY-less
# container (the March 2026 deploy hang). Server starts even if migrate fails, so a
# broken migration degrades to "new field won't save" instead of taking the site down.
CMD ["sh", "-c", "node src/scripts/clear-dev-migrations.mjs && npx payload migrate --config ./src/payload.config.ts; HOSTNAME=0.0.0.0 node server.js"]
