import { Module } from '@nestjs/common';
import { InsumosController } from './controller/insumos.controller';
import { InsumoService } from './service/insumo.service';
import { InsumoRepository } from './repository/insumo.repository';

@Module({
  controllers: [InsumosController],
  providers: [InsumoService, InsumoRepository],
  exports: [InsumoService, InsumoRepository],
})
export class InsumosModule {}