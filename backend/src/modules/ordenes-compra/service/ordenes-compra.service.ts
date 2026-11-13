import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { OrdenesCompraRepository } from '../repository/ordenes-compra.repository';
import { CreateOrdenesCompraDto } from '../dto/create-ordenes-compra.dto';
import { UpdateOrdenesCompraDto } from '../dto/update-ordenes-compra.dto';
import { PrismaService } from '../../../prisma/prisma.service';
import { StockService } from '../../stock/stock.service';

@Injectable()
export class OrdenesCompraService {
  constructor(
    private readonly repository: OrdenesCompraRepository,
    private readonly prisma: PrismaService,
    private readonly stock: StockService,
  ) {}

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number) {
    const orden = await this.repository.findById(id);
    if (!orden) throw new NotFoundException('Orden de compra no encontrada');
    return orden;
  }

  create(dto: CreateOrdenesCompraDto) {
    return this.repository.create(dto);
  }

  async update(id: number, dto: UpdateOrdenesCompraDto) {
    const orden = await this.findOne(id);

    // Si el estado cambia a RECIBIDA, procesar recepción
    if (dto.estado === 'RECIBIDA' && orden.estado !== 'RECIBIDA') {
      if (!orden.detalles || orden.detalles.length === 0) {
        throw new BadRequestException('La orden no tiene detalles para recibir');
      }

      await this.prisma.$transaction(async (tx) => {
        const claimed = await tx.ordenCompra.updateMany({
          where: { id, estado: 'PENDIENTE' },
          data: { estado: 'RECIBIDA' },
        });
        if (claimed.count === 0) {
          const current = await tx.ordenCompra.findUnique({ where: { id }, select: { estado: true } });
          if (current?.estado === 'RECIBIDA') return;
          throw new BadRequestException('Solo se pueden recibir órdenes pendientes');
        }
        for (const detalle of orden.detalles) {
          await this.stock.aplicarMovimiento(tx, {
            insumoId: detalle.insumoId,
            tipo: 'ENTRADA',
            cantidad: Number(detalle.cantidad),
            motivo: `Recepción orden de compra #${id}`,
          });
        }
      });

      return this.findOne(id);
    }

    return this.repository.update(id, dto);
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.repository.remove(id);
  }
}
