import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateEnvironment } from './config/env.validation';
import { PrismaModule } from './prisma/prisma.module';
import { CategoriasModule } from './modules/categorias/categorias.module';
import { InsumosModule } from './modules/insumos/insumos.module';
import { ProveedoresModule } from './modules/proveedores/proveedores.module';
import { OrdenesCompraModule } from './modules/ordenes-compra/ordenes-compra.module';
import { DetalleOrdenModule } from './modules/detalle-orden/detalle-orden.module';
import { RecetasModule } from './modules/recetas/recetas.module';
import { RecetaIngredienteModule } from './modules/receta-ingrediente/receta-ingrediente.module';
import { MovimientosInventarioModule } from './modules/movimientos-inventario/movimiento-inventario.module';
import { AuthModule } from './modules/auth/auth.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['../.env', '.env'], isGlobal: true, validate: validateEnvironment }),
    PrismaModule,
    CategoriasModule,
    InsumosModule,
    ProveedoresModule,
    OrdenesCompraModule,
    DetalleOrdenModule,
    RecetasModule,
    RecetaIngredienteModule,
    MovimientosInventarioModule,
    AuthModule,
    HealthModule,
  ],
})
export class AppModule {}
