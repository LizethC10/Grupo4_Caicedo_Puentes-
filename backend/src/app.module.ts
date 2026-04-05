import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CategoriasModule } from './modules/categorias/categorias.module';
import { InsumosModule } from './modules/insumos/insumos.module';
import { ProveedoresModule } from './modules/proveedores/proveedores.module';
import { OrdenesCompraModule } from './modules/ordenes-compra/ordenes-compra.module';
import { DetalleOrdenModule } from './modules/detalle-orden/detalle-orden.module';
import { RecetasModule } from './modules/recetas/recetas.module';
import { RecetaIngredienteModule } from './modules/receta-ingrediente/receta-ingrediente.module';
import { MovimientosInventarioModule } from './modules/movimientos-inventario/movimiento-inventario.module';

@Module({
  imports: [
    PrismaModule,
    CategoriasModule,
    InsumosModule,
    ProveedoresModule,
    OrdenesCompraModule,
    DetalleOrdenModule,
    RecetasModule,
    RecetaIngredienteModule,
    MovimientosInventarioModule,
  ],
})
export class AppModule {}