import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProveedoreService } from '../service/proveedore.service';
import { CreateProveedoreDto } from '../dto/create-proveedore.dto';
import { UpdateProveedoreDto } from '../dto/update-proveedore.dto';

@Controller('proveedores')
export class ProveedoresController {
  constructor(private readonly service: ProveedoreService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Post()
  create(@Body() dto: CreateProveedoreDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProveedoreDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}