import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { DetalleOrdenRepository } from '../repository/detalle-orden.repository';
import { CreateDetalleOrdenDto } from '../dto/create-detalle-orden.dto';
import { UpdateDetalleOrdenDto } from '../dto/update-detalle-orden.dto';

@Injectable()
export class DetalleOrdenService {
  constructor(private readonly repository: DetalleOrdenRepository) {}

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number) {
    const detalle = await this.repository.findById(id);
    if (!detalle) throw new NotFoundException('Detalle de orden no encontrado');
    return detalle;
  }

  async create(dto: CreateDetalleOrdenDto) {
    const existe = await this.repository.findUniqueCompuesto(dto.ordenCompraId, dto.insumoId);
    if (existe) throw new ConflictException('Ese insumo ya existe en la orden');
    return this.repository.create(dto);
  }

  async update(id: number, dto: UpdateDetalleOrdenDto) {
    await this.findOne(id);
    return this.repository.update(id, dto);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.repository.remove(id);
  }
}