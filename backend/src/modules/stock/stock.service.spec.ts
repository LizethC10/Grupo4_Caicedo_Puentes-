import { BadRequestException, NotFoundException } from '@nestjs/common';
import { StockService } from './stock.service';

describe('StockService', () => {
  let service: StockService;
  let tx: any;

  beforeEach(() => {
    service = new StockService();
    tx = {
      insumo: { updateMany: jest.fn().mockResolvedValue({ count: 1 }), findUnique: jest.fn() },
      movimientoInventario: { create: jest.fn().mockResolvedValue({ id: 1 }) },
    };
  });

  it('aplica una entrada y registra el movimiento en la misma transacción', async () => {
    await service.aplicarMovimiento(tx, { insumoId: 4, tipo: 'ENTRADA', cantidad: 2.5, motivo: 'Recepción' });
    expect(tx.insumo.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      where: { id: 4 },
      data: { stockActual: { increment: expect.anything() } },
    }));
    expect(tx.movimientoInventario.create).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ tipo: 'ENTRADA' }) }));
  });

  it('rechaza una salida que no alcanza el stock disponible', async () => {
    tx.insumo.updateMany.mockResolvedValue({ count: 0 });
    tx.insumo.findUnique.mockResolvedValue({ id: 4 });
    await expect(service.aplicarMovimiento(tx, { insumoId: 4, tipo: 'SALIDA', cantidad: 1, motivo: 'Consumo' })).rejects.toBeInstanceOf(BadRequestException);
    expect(tx.movimientoInventario.create).not.toHaveBeenCalled();
  });

  it('serializa salidas simultáneas para no dejar el stock en negativo', async () => {
    let stock = 1.5;
    tx.insumo.updateMany.mockImplementation(async ({ where, data }: any) => {
      const minimum = where.stockActual?.gte?.toNumber?.() ?? 0;
      if (where.stockActual?.gte && stock < minimum) return { count: 0 };
      if (data.stockActual?.decrement) stock -= data.stockActual.decrement.toNumber();
      return { count: 1 };
    });
    tx.insumo.findUnique.mockResolvedValue({ id: 4 });

    const results = await Promise.allSettled([
      service.aplicarMovimiento(tx, { insumoId: 4, tipo: 'SALIDA', cantidad: 1, motivo: 'Consumo A' }),
      service.aplicarMovimiento(tx, { insumoId: 4, tipo: 'SALIDA', cantidad: 1, motivo: 'Consumo B' }),
    ]);

    expect(results.filter((result) => result.status === 'fulfilled')).toHaveLength(1);
    expect(results.filter((result) => result.status === 'rejected')).toHaveLength(1);
    expect(stock).toBe(0.5);
  });

  it('responde 404 si el insumo no existe', async () => {
    tx.insumo.updateMany.mockResolvedValue({ count: 0 });
    tx.insumo.findUnique.mockResolvedValue(null);
    await expect(service.aplicarMovimiento(tx, { insumoId: 99, tipo: 'SALIDA', cantidad: 1, motivo: 'Consumo' })).rejects.toBeInstanceOf(NotFoundException);
  });
});
