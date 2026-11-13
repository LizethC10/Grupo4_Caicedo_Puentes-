import { Body, Controller, Delete, Get, Param, Post, Put, ParseIntPipe } from '@nestjs/common';
import { OrdenesCompraService } from '../service/ordenes-compra.service';
import { CreateOrdenesCompraDto } from '../dto/create-ordenes-compra.dto';
import { UpdateOrdenesCompraDto } from '../dto/update-ordenes-compra.dto';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Rol } from '@prisma/client';

@Controller('ordenes-compra')
export class OrdenesCompraController {
  constructor(private readonly service: OrdenesCompraService) {}

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
  create(@Body() dto: CreateOrdenesCompraDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  @Roles(Rol.ADMINISTRADOR)
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateOrdenesCompraDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles(Rol.ADMINISTRADOR)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
