import { Module } from '@nestjs/common';
import { RecetaIngredienteController } from './controller/receta-ingrediente.controller';
import { RecetaIngredienteService } from './service/receta-ingrediente.service';
import { RecetaIngredienteRepository } from './repository/receta-ingrediente.repository';

@Module({
  controllers: [RecetaIngredienteController],
  providers: [RecetaIngredienteService, RecetaIngredienteRepository],
  exports: [RecetaIngredienteService, RecetaIngredienteRepository],
})
export class RecetaIngredienteModule {}