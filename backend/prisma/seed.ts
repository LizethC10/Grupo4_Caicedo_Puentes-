import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcryptjs';
import { config } from 'dotenv';
import { join } from 'path';

// Cargar variables de entorno
config({ path: join(__dirname, '..', '.env') });

// Crear adaptador de PostgreSQL
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

// Crear cliente de Prisma con el adaptador
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');
  console.log('🔗 Database URL:', process.env.DATABASE_URL);

  // Hashear la contraseña
  const hashedPassword = await bcrypt.hash('admin123', 10);

  // Crear usuario administrador
  const admin = await prisma.usuario.upsert({
    where: { email: 'admin@restaurante.com' },
    update: {},
    create: {
      email: 'admin@restaurante.com',
      nombre: 'Administrador',
      password: hashedPassword,
      rol: 'ADMIN',
    },
  });

  console.log('✅ Usuario administrador creado');
  console.log('📧 Email:', admin.email);
  console.log('🔑 Contraseña: admin123');
  console.log('👤 Rol:', admin.rol);
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });