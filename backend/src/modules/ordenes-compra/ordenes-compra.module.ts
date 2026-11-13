import { Module } from '@nestjs/common';
import { OrdenesCompraController } from './controller/ordenes-compra.controller';
import { OrdenesCompraService } from './service/ordenes-compra.service';
import { OrdenesCompraRepository } from './repository/ordenes-compra.repository';
import { StockService } from '../stock/stock.service';

@Module({
  controllers: [OrdenesCompraController],
  providers: [OrdenesCompraService, OrdenesCompraRepository, StockService],
  exports: [OrdenesCompraService, OrdenesCompraRepository],
})
export class OrdenesCompraModule {}
