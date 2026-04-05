import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MovimientosInventarioService } from '../service/movimiento-inventario.service';
import { CreateMovimientosInventarioDto } from '../dto/create-movimientos-inventario.dto';
import { UpdateMovimientosInventarioDto } from '../dto/update-movimientos-inventario.dto';

@Controller('movimientos-inventario')
export class MovimientosInventarioController {
  constructor(private readonly service: MovimientosInventarioService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Post()
  create(@Body() dto: CreateMovimientosInventarioDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMovimientosInventarioDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}