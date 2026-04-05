import { Injectable, NotFoundException } from '@nestjs/common';
import { MovimientosInventarioRepository } from '../repository/movimientos-inventario.repository';
import { CreateMovimientosInventarioDto } from '../dto/create-movimientos-inventario.dto';
import { UpdateMovimientosInventarioDto } from '../dto/update-movimientos-inventario.dto';

@Injectable()
export class MovimientosInventarioService {
  constructor(private readonly repository: MovimientosInventarioRepository) {}

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number) {
    const movimiento = await this.repository.findById(id);
    if (!movimiento) throw new NotFoundException('Movimiento de inventario no encontrado');
    return movimiento;
  }

  create(dto: CreateMovimientosInventarioDto) {
    return this.repository.create(dto);
  }

  async update(id: number, dto: UpdateMovimientosInventarioDto) {
    await this.findOne(id);
    return this.repository.update(id, dto);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.repository.remove(id);
  }
}