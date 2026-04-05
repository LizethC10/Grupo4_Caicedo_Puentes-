import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateInsumoDto } from '../dto/create-insumo.dto';
import { UpdateInsumoDto } from '../dto/update-insumo.dto';

@Injectable()
export class InsumoRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.insumo.findMany({
      include: { categoria: true },
      orderBy: { id: 'desc' },
    });
  }

  findById(id: number) {
    return this.prisma.insumo.findUnique({
      where: { id },
      include: { categoria: true },
    });
  }

  findByNombre(nombre: string) {
    return this.prisma.insumo.findUnique({ where: { nombre } });
  }

  create(dto: CreateInsumoDto) {
    return this.prisma.insumo.create({ data: dto });
  }

  update(id: number, dto: UpdateInsumoDto) {
    return this.prisma.insumo.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: number) {
    return this.prisma.insumo.delete({ where: { id } });
  }
}