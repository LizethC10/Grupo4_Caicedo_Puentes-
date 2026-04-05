import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { RecetaRepository } from '../repository/receta.repository';
import { CreateRecetaDto } from '../dto/create-receta.dto';
import { UpdateRecetaDto } from '../dto/update-receta.dto';

@Injectable()
export class RecetaService {
  constructor(private readonly repository: RecetaRepository) {}

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number) {
    const receta = await this.repository.findById(id);
    if (!receta) throw new NotFoundException('Receta no encontrada');
    return receta;
  }

  async create(dto: CreateRecetaDto) {
    const existe = await this.repository.findByNombre(dto.nombre);
    if (existe) throw new ConflictException('Ya existe una receta con ese nombre');
    return this.repository.create(dto);
  }

  async update(id: number, dto: UpdateRecetaDto) {
    await this.findOne(id);

    if (dto.nombre) {
      const existe = await this.repository.findByNombre(dto.nombre);
      if (existe && existe.id !== id) {
        throw new ConflictException('Ya existe una receta con ese nombre');
      }
    }

    return this.repository.update(id, dto);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.repository.remove(id);
  }
}