import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { OrdenesCompraRepository } from '../repository/ordenes-compra.repository';
import { CreateOrdenesCompraDto } from '../dto/create-ordenes-compra.dto';
import { UpdateOrdenesCompraDto } from '../dto/update-ordenes-compra.dto';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class OrdenesCompraService {
  constructor(
    private readonly repository: OrdenesCompraRepository,
    private readonly prisma: PrismaService,
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

      // Actualizar stock y registrar movimientos en una transacción
      await this.prisma.$transaction(async (tx) => {
        for (const detalle of orden.detalles) {
          // Actualizar stock del insumo
          await tx.insumo.update({
            where: { id: detalle.insumoId },
            data: { stockActual: { increment: detalle.cantidad } },
          });

          // Registrar movimiento de inventario
          await tx.movimientoInventario.create({
            data: {
              insumoId: detalle.insumoId,
              tipo: 'ENTRADA',
              cantidad: detalle.cantidad,
              fecha: new Date(),
              motivo: `Recepción orden de compra #${id}`,
            },
          });
        }

        // Actualizar estado de la orden
        await tx.ordenCompra.update({
          where: { id },
          data: { estado: 'RECIBIDA' },
        });
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