import { Module } from '@nestjs/common';
import { OrdenesCompraController } from './controller/ordenes-compra.controller';
import { OrdenesCompraService } from './service/ordenes-compra.service';
import { OrdenesCompraRepository } from './repository/ordenes-compra.repository';

@Module({
  controllers: [OrdenesCompraController],
  providers: [OrdenesCompraService, OrdenesCompraRepository],
  exports: [OrdenesCompraService, OrdenesCompraRepository],
})
export class OrdenesCompraModule {}