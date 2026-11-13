import { Body, Controller, Delete, Get, Param, Post, Put, ParseIntPipe } from '@nestjs/common';
import { RecetaService } from '../service/receta.service';
import { CreateRecetaDto } from '../dto/create-receta.dto';
import { UpdateRecetaDto } from '../dto/update-receta.dto';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Rol } from '@prisma/client';

@Controller('recetas')
export class RecetasController {
  constructor(private readonly service: RecetaService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  @Roles(Rol.ADMINISTRADOR)
  create(@Body() dto: CreateRecetaDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  @Roles(Rol.ADMINISTRADOR)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateRecetaDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles(Rol.ADMINISTRADOR)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
