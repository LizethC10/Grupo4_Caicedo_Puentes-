import { Injectable, NotFoundException } from '@nestjs/common';
import { OrdenesCompraRepository } from '../repository/ordenes-compra.repository';
import { CreateOrdenesCompraDto } from '../dto/create-ordenes-compra.dto';
import { UpdateOrdenesCompraDto } from '../dto/update-ordenes-compra.dto';

@Injectable()
export class OrdenesCompraService {
  constructor(private readonly repository: OrdenesCompraRepository) {}

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number) {
    const orden = await this.repository.findById(id);
    if (!orden) throw new NotFoundException('Orden de compra no encontrada');
    return orden;
  }

  create(dto: CreateOrdenesCompraDto) {
    return this.repository.create(dto);
  }

  async update(id: number, dto: UpdateOrdenesCompraDto) {
    await this.findOne(id);
    return this.repository.update(id, dto);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.repository.remove(id);
  }
}