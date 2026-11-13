import { Body, Controller, Delete, Get, Param, Post, Put, ParseIntPipe } from '@nestjs/common';
import { CategoriaService } from '../service/categoria.service';
import { CreateCategoriaDto } from '../dto/create-categoria.dto';
import { UpdateCategoriaDto } from '../dto/update-categoria.dto';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Rol } from '@prisma/client';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Get()
  findAll() {
    return this.categoriaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriaService.findOne(id);
  }

  @Post()
  @Roles(Rol.ADMINISTRADOR)
  create(@Body() dto: CreateCategoriaDto) {
    return this.categoriaService.create(dto);
  }

  @Put(':id')
  @Roles(Rol.ADMINISTRADOR)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCategoriaDto) {
    return this.categoriaService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Rol.ADMINISTRADOR)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriaService.remove(id);
  }
}
