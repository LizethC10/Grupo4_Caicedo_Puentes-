import { Module } from '@nestjs/common';
import { DetalleOrdenController } from './controller/detalle-orden.controller';
import { DetalleOrdenService } from './service/detalle-orden.service';
import { DetalleOrdenRepository } from './repository/detalle-orden.repository';

@Module({
  controllers: [DetalleOrdenController],
  providers: [DetalleOrdenService, DetalleOrdenRepository],
  exports: [DetalleOrdenService, DetalleOrdenRepository],
})
export class DetalleOrdenModule {}