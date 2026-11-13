import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, TipoMovimiento } from '@prisma/client';

export type AplicarMovimientoInput = {
  insumoId: number;
  tipo: TipoMovimiento;
  cantidad: number;
  motivo: string;
  fecha?: Date;
};

@Injectable()
export class StockService {
  async aplicarMovimiento(tx: Prisma.TransactionClient, input: AplicarMovimientoInput) {
    const cantidad = new Prisma.Decimal(input.cantidad);
    const where = input.tipo === 'SALIDA'
      ? { id: input.insumoId, stockActual: { gte: cantidad } }
      : { id: input.insumoId };
    const data = input.tipo === 'ENTRADA'
      ? { stockActual: { increment: cantidad } }
      : { stockActual: { decrement: cantidad } };

    const updated = await tx.insumo.updateMany({ where, data });
    if (updated.count === 0) {
      const insumo = await tx.insumo.findUnique({ where: { id: input.insumoId }, select: { id: true } });
      if (!insumo) throw new NotFoundException('El insumo no existe');
      throw new BadRequestException('Stock insuficiente para registrar la salida');
    }

    return tx.movimientoInventario.create({
      data: {
        insumoId: input.insumoId,
        tipo: input.tipo,
        cantidad,
        motivo: input.motivo,
        ...(input.fecha ? { fecha: input.fecha } : {}),
      },
    });
  }
}
