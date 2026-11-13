import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class MovimientosInventarioRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.movimientoInventario.findMany({
      include: { insumo: true },
      orderBy: { id: 'desc' },
    });
  }

  findById(id: number) {
    return this.prisma.movimientoInventario.findUnique({
      where: { id },
      include: { insumo: true },
    });
  }

}
