#!/bin/sh
set -e

echo "⏳ Ejecutando migraciones de Prisma..."
npx prisma migrate deploy

echo "🚀 Compilando backend NestJS..."
npm run build

echo "✅ Iniciando backend..."
exec node dist/main