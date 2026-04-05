import { Module } from '@nestjs/common';
import { RecetasController } from './controller/recetas.controller';
import { RecetaService } from './service/receta.service';
import { RecetaRepository } from './repository/receta.repository';

@Module({
  controllers: [RecetasController],
  providers: [RecetaService, RecetaRepository],
  exports: [RecetaService, RecetaRepository],
})
export class RecetasModule {}