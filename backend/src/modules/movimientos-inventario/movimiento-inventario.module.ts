import { Module } from '@nestjs/common';
import { MovimientosInventarioController } from './controller/movimientos-inventario.controller';
import { MovimientosInventarioService } from './service/movimiento-inventario.service';
import { MovimientosInventarioRepository } from './repository/movimientos-inventario.repository';
import { StockService } from '../stock/stock.service';

@Module({
  controllers: [MovimientosInventarioController],
  providers: [MovimientosInventarioService, MovimientosInventarioRepository, StockService],
  exports: [MovimientosInventarioService, MovimientosInventarioRepository],
})
export class MovimientosInventarioModule {}
