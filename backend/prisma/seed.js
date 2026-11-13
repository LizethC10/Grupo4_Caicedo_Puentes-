const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const bcrypt = require('bcryptjs');
const { config } = require('dotenv');
const path = require('node:path');

config({ path: path.join(__dirname, '..', '.env') });

const databaseUrl = process.env.DATABASE_URL;
const adminEmail = process.env.SEED_ADMIN_EMAIL;
const adminPassword = process.env.SEED_ADMIN_PASSWORD;
if (!databaseUrl) throw new Error('DATABASE_URL es obligatoria para ejecutar el seed');
if (!adminEmail || !adminPassword) throw new Error('SEED_ADMIN_EMAIL y SEED_ADMIN_PASSWORD son obligatorias');

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: databaseUrl }) });

async function main() {
  const password = await bcrypt.hash(adminPassword, 10);
  const admin = await prisma.usuario.upsert({
    where: { email: adminEmail },
    update: {},
    create: { email: adminEmail, nombre: 'Administrador', password, rol: 'ADMINISTRADOR' },
  });
  console.log(`Cuenta administradora configurada: ${admin.email}`);
}

main()
  .catch(() => {
    console.error('Error al crear el administrador inicial');
    process.exitCode = 1;
  })
  .finally(async () => prisma.$disconnect());
