import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { MovimientosInventarioService } from '../service/movimiento-inventario.service';
import { CreateMovimientosInventarioDto } from '../dto/create-movimientos-inventario.dto';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Rol } from '@prisma/client';

@Controller('movimientos-inventario')
export class MovimientosInventarioController {
  constructor(private readonly service: MovimientosInventarioService) {}

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
  create(@Body() dto: CreateMovimientosInventarioDto) {
    return this.service.create(dto);
  }
}
