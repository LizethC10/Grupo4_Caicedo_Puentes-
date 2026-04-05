import { Module } from '@nestjs/common';
import { ProveedoresController } from './controller/proveedores.controller';
import { ProveedoreService } from './service/proveedore.service';
import { ProveedoreRepository } from './repository/proveedore.repository';

@Module({
  controllers: [ProveedoresController],
  providers: [ProveedoreService, ProveedoreRepository],
  exports: [ProveedoreService, ProveedoreRepository],
})
export class ProveedoresModule {}