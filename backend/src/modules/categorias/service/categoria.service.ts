import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoriaRepository } from '../repository/categoria.repository';
import { CreateCategoriaDto } from '../dto/create-categoria.dto';
import { UpdateCategoriaDto } from '../dto/update-categoria.dto';

@Injectable()
export class CategoriaService {
  constructor(private readonly categoriaRepository: CategoriaRepository) {}

  findAll() {
    return this.categoriaRepository.findAll();
  }

  async findOne(id: number) {
    const categoria = await this.categoriaRepository.findById(id);

    if (!categoria) {
      throw new NotFoundException(`La categoría con id ${id} no existe`);
    }

    return categoria;
  }

  async create(dto: CreateCategoriaDto) {
    const existe = await this.categoriaRepository.findByNombre(dto.nombre);

    if (existe) {
      throw new ConflictException(
        `Ya existe una categoría con el nombre "${dto.nombre}"`,
      );
    }

    return this.categoriaRepository.create(dto);
  }

  async update(id: number, dto: UpdateCategoriaDto) {
    await this.findOne(id);

    if (dto.nombre) {
      const existe = await this.categoriaRepository.findByNombre(dto.nombre);

      if (existe && existe.id !== id) {
        throw new ConflictException(
          `Ya existe una categoría con el nombre "${dto.nombre}"`,
        );
      }
    }

    return this.categoriaRepository.update(id, dto);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.categoriaRepository.remove(id);
  }
}