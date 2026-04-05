import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { RecetaIngredienteRepository } from '../repository/receta-ingrediente.repository';
import { CreateRecetaIngredienteDto } from '../dto/create-receta-ingrediente.dto';
import { UpdateRecetaIngredienteDto } from '../dto/update-receta-ingrediente.dto';

@Injectable()
export class RecetaIngredienteService {
  constructor(private readonly repository: RecetaIngredienteRepository) {}

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number) {
    const item = await this.repository.findById(id);
    if (!item) throw new NotFoundException('Ingrediente de receta no encontrado');
    return item;
  }

  async create(dto: CreateRecetaIngredienteDto) {
    const existe = await this.repository.findUniqueCompuesto(dto.recetaId, dto.insumoId);
    if (existe) throw new ConflictException('Ese insumo ya está registrado en la receta');
    return this.repository.create(dto);
  }

  async update(id: number, dto: UpdateRecetaIngredienteDto) {
    await this.findOne(id);
    return this.repository.update(id, dto);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.repository.remove(id);
  }
}