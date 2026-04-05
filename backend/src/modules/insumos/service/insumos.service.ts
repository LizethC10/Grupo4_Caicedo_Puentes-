import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InsumoRepository } from '../repository/insumo.repository';
import { CreateInsumoDto } from '../dto/create-insumo.dto';
import { UpdateInsumoDto } from '../dto/update-insumo.dto';

@Injectable()
export class InsumoService {
  constructor(private readonly repository: InsumoRepository) {}

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number) {
    const insumo = await this.repository.findById(id);
    if (!insumo) throw new NotFoundException('Insumo no encontrado');
    return insumo;
  }

  async create(dto: CreateInsumoDto) {
    const existe = await this.repository.findByNombre(dto.nombre);
    if (existe) throw new ConflictException('Ya existe un insumo con ese nombre');
    return this.repository.create(dto);
  }

  async update(id: number, dto: UpdateInsumoDto) {
    await this.findOne(id);

    if (dto.nombre) {
      const existe = await this.repository.findByNombre(dto.nombre);
      if (existe && existe.id !== id) {
        throw new ConflictException('Ya existe un insumo con ese nombre');
      }
    }

    return this.repository.update(id, dto);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.repository.remove(id);
  }
}