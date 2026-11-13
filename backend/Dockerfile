FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY prisma ./prisma
COPY prisma.config.ts tsconfig*.json nest-cli.json ./
COPY src ./src
COPY entrypoint.sh ./entrypoint.sh
ARG APP_VERSION=development
ENV APP_VERSION=${APP_VERSION}
RUN DATABASE_URL=postgresql://build:build@localhost:5432/build npx prisma generate && npm run build && npm prune --omit=dev

FROM node:22-alpine AS runner
ARG APP_VERSION=development
ENV NODE_ENV=production PORT=3001 APP_VERSION=${APP_VERSION}
WORKDIR /app
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/dist ./dist
COPY --from=build --chown=node:node /app/prisma ./prisma
COPY --from=build --chown=node:node /app/prisma.config.ts ./prisma.config.ts
COPY --from=build --chown=node:node /app/entrypoint.sh ./entrypoint.sh
USER node
EXPOSE 3001
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 CMD node -e "fetch('http://127.0.0.1:3001/api/v1/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
ENTRYPOINT ["sh", "entrypoint.sh"]
