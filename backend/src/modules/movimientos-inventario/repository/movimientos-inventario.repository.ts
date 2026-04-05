import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateMovimientosInventarioDto } from '../dto/create-movimientos-inventario.dto';
import { UpdateMovimientosInventarioDto } from '../dto/update-movimientos-inventario.dto';

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

  create(dto: CreateMovimientosInventarioDto) {
    return this.prisma.movimientoInventario.create({
      data: {
        insumoId: dto.insumoId,
        tipo: dto.tipo,
        cantidad: dto.cantidad,
        fecha: new Date(dto.fecha),
        motivo: dto.motivo,
      },
    });
  }

  update(id: number, dto: UpdateMovimientosInventarioDto) {
    return this.prisma.movimientoInventario.update({
      where: { id },
      data: {
        ...(dto.insumoId !== undefined && { insumoId: dto.insumoId }),
        ...(dto.tipo !== undefined && { tipo: dto.tipo }),
        ...(dto.cantidad !== undefined && { cantidad: dto.cantidad }),
        ...(dto.fecha !== undefined && { fecha: new Date(dto.fecha) }),
        ...(dto.motivo !== undefined && { motivo: dto.motivo }),
      },
    });
  }

  remove(id: number) {
    return this.prisma.movimientoInventario.delete({ where: { id } });
  }
}