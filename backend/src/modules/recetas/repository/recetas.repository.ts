import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateRecetaDto } from '../dto/create-receta.dto';
import { UpdateRecetaDto } from '../dto/update-receta.dto';

@Injectable()
export class RecetaRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.receta.findMany({
      include: { ingredientes: true },
      orderBy: { id: 'desc' },
    });
  }

  findById(id: number) {
    return this.prisma.receta.findUnique({
      where: { id },
      include: { ingredientes: true },
    });
  }

  findByNombre(nombre: string) {
    return this.prisma.receta.findUnique({ where: { nombre } });
  }

  create(dto: CreateRecetaDto) {
    return this.prisma.receta.create({
      data: {
        nombre: dto.nombre,
        descripcion: dto.descripcion ?? null,
        porciones: dto.porciones,
      },
    });
  }

  update(id: number, dto: UpdateRecetaDto) {
    return this.prisma.receta.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: number) {
    return this.prisma.receta.delete({ where: { id } });
  }
}