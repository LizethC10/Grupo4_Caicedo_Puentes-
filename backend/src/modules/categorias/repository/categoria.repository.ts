import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateCategoriaDto } from '../dto/create-categoria.dto';
import { UpdateCategoriaDto } from '../dto/update-categoria.dto';

@Injectable()
export class CategoriaRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.categoria.findMany({
      orderBy: { id: 'desc' },
    });
  }

  findById(id: number) {
    return this.prisma.categoria.findUnique({
      where: { id },
    });
  }

  findByNombre(nombre: string) {
    return this.prisma.categoria.findUnique({
      where: { nombre },
    });
  }

  create(dto: CreateCategoriaDto) {
    return this.prisma.categoria.create({
      data: {
        nombre: dto.nombre,
        descripcion: dto.descripcion ?? null,
      },
    });
  }

  update(id: number, dto: UpdateCategoriaDto) {
    return this.prisma.categoria.update({
      where: { id },
      data: {
        ...(dto.nombre !== undefined && { nombre: dto.nombre }),
        ...(dto.descripcion !== undefined && { descripcion: dto.descripcion }),
      },
    });
  }

  remove(id: number) {
    return this.prisma.categoria.delete({
      where: { id },
    });
  }
}