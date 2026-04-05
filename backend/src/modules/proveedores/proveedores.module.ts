import { Module } from '@nestjs/common';
import { ProveedoresController } from './controller/proveedores.controller';
import { ProveedorService } from './service/proveedor.service';
import { ProveedorRepository } from './repository/proveedor.repository';

@Module({
  controllers: [ProveedoresController],
  providers: [ProveedorService, ProveedorRepository],
  exports: [ProveedorService, ProveedorRepository],
})
export class ProveedoresModule {}