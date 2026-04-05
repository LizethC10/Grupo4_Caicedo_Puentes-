import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateRecetaIngredienteDto } from '../dto/create-receta-ingrediente.dto';
import { UpdateRecetaIngredienteDto } from '../dto/update-receta-ingrediente.dto';

@Injectable()
export class RecetaIngredienteRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.recetaIngrediente.findMany({
      include: { receta: true, insumo: true },
      orderBy: { id: 'desc' },
    });
  }

  findById(id: number) {
    return this.prisma.recetaIngrediente.findUnique({
      where: { id },
      include: { receta: true, insumo: true },
    });
  }

  findUniqueCompuesto(recetaId: number, insumoId: number) {
    return this.prisma.recetaIngrediente.findFirst({
      where: { recetaId, insumoId },
    });
  }

  create(dto: CreateRecetaIngredienteDto) {
    return this.prisma.recetaIngrediente.create({ data: dto });
  }

  update(id: number, dto: UpdateRecetaIngredienteDto) {
    return this.prisma.recetaIngrediente.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: number) {
    return this.prisma.recetaIngrediente.delete({ where: { id } });
  }
}