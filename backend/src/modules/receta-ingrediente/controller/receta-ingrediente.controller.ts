import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RecetaIngredienteService } from '../service/receta-ingrediente.service';
import { CreateRecetaIngredienteDto } from '../dto/create-receta-ingrediente.dto';
import { UpdateRecetaIngredienteDto } from '../dto/update-receta-ingrediente.dto';

@Controller('receta-ingrediente')
export class RecetaIngredienteController {
  constructor(private readonly service: RecetaIngredienteService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Post()
  create(@Body() dto: CreateRecetaIngredienteDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateRecetaIngredienteDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}