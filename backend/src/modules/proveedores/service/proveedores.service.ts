import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ProveedoreRepository } from '../repository/proveedore.repository';
import { CreateProveedoreDto } from '../dto/create-proveedore.dto';
import { UpdateProveedoreDto } from '../dto/update-proveedore.dto';

@Injectable()
export class ProveedoreService {
  constructor(private readonly repository: ProveedoreRepository) {}

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number) {
    const proveedor = await this.repository.findById(id);
    if (!proveedor) throw new NotFoundException('Proveedor no encontrado');
    return proveedor;
  }

  async create(dto: CreateProveedoreDto) {
    const existe = await this.repository.findByNit(dto.nit);
    if (existe) throw new ConflictException('Ya existe un proveedor con ese NIT');
    return this.repository.create(dto);
  }

  async update(id: number, dto: UpdateProveedoreDto) {
    await this.findOne(id);

    if (dto.nit) {
      const existe = await this.repository.findByNit(dto.nit);
      if (existe && existe.id !== id) {
        throw new ConflictException('Ya existe un proveedor con ese NIT');
      }
    }

    return this.repository.update(id, dto);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.repository.remove(id);
  }
}