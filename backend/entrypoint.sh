#!/bin/sh
set -e

echo "⏳ Ejecutando migraciones de Prisma..."
npx prisma migrate deploy

echo "🌱 Configurando el administrador inicial..."
node prisma/seed.js

echo "✅ Iniciando backend..."
exec node dist/main
