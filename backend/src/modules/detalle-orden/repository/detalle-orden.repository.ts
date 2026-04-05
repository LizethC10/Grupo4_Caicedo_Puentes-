import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateDetalleOrdenDto } from '../dto/create-detalle-orden.dto';
import { UpdateDetalleOrdenDto } from '../dto/update-detalle-orden.dto';

@Injectable()
export class DetalleOrdenRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.detalleOrden.findMany({
      include: { ordenCompra: true, insumo: true },
      orderBy: { id: 'desc' },
    });
  }

  findById(id: number) {
    return this.prisma.detalleOrden.findUnique({
      where: { id },
      include: { ordenCompra: true, insumo: true },
    });
  }

  findUniqueCompuesto(ordenCompraId: number, insumoId: number) {
    return this.prisma.detalleOrden.findFirst({
      where: { ordenCompraId, insumoId },
    });
  }

  create(dto: CreateDetalleOrdenDto) {
    return this.prisma.detalleOrden.create({ data: dto });
  }

  update(id: number, dto: UpdateDetalleOrdenDto) {
    return this.prisma.detalleOrden.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: number) {
    return this.prisma.detalleOrden.delete({ where: { id } });
  }
}