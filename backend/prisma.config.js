import { join } from 'node:path';
import { defineConfig } from 'prisma/config';
import { config } from 'dotenv';

config({ path: join(__dirname, '..', '.env') });

export default defineConfig({
  schema: join('prisma', 'schema.prisma'),
  datasource: {
    url: process.env.DATABASE_URL,
  },
  migrate: {
    async adapter() {
      const { PrismaPg } = await import('@prisma/adapter-pg');
      return new PrismaPg({
        connectionString: process.env.DATABASE_URL,
      });
    },
  },
  migrations: {
    seed: 'ts-node prisma/seed.ts',
  },
});