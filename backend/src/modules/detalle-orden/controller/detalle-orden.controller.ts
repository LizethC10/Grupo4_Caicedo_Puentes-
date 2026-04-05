import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DetalleOrdenService } from '../service/detalle-orden.service';
import { CreateDetalleOrdenDto } from '../dto/create-detalle-orden.dto';
import { UpdateDetalleOrdenDto } from '../dto/update-detalle-orden.dto';

@Controller('detalle-orden')
export class DetalleOrdenController {
  constructor(private readonly service: DetalleOrdenService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Post()
  create(@Body() dto: CreateDetalleOrdenDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateDetalleOrdenDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}