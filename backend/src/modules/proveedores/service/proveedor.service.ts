import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ProveedorRepository } from '../repository/proveedor.repository';
import { CreateProveedorDto } from '../dto/create-proveedor.dto';
import { UpdateProveedorDto } from '../dto/update-proveedor.dto';

@Injectable()
export class ProveedorService {
  constructor(private readonly repository: ProveedorRepository) {}

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number) {
    const proveedor = await this.repository.findById(id);
    if (!proveedor) throw new NotFoundException('Proveedor no encontrado');
    return proveedor;
  }

  async create(dto: CreateProveedorDto) {
    const existe = await this.repository.findByNit(dto.nit);
    if (existe) throw new ConflictException('Ya existe un proveedor con ese NIT');
    return this.repository.create(dto);
  }

  async update(id: number, dto: UpdateProveedorDto) {
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