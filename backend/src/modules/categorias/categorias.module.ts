
import { Module } from '@nestjs/common';
import { CategoriasController } from './controller/categorias.controller';
import { CategoriaService } from './service/categoria.service';
import { CategoriaRepository } from './repository/categoria.repository';

@Module({
  controllers: [CategoriasController],
  providers: [CategoriaService, CategoriaRepository],
  exports: [CategoriaService, CategoriaRepository],
})
export class CategoriasModule {}