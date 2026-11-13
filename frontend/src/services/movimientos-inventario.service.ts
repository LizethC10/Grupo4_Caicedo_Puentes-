import { apiGet, apiPost } from '@/lib/api';
import type { MovimientoInventario } from '@/interfaces/movimiento-inventario.interface';

export type CreateMovimientoDto = Omit<MovimientoInventario, 'id' | 'createdAt' | 'updatedAt'>;
export const movimientosInventarioService = {
  findAll: () => apiGet<MovimientoInventario[]>('/movimientos-inventario'),
  findOne: (id: number) => apiGet<MovimientoInventario>(`/movimientos-inventario/${id}`),
  create: (data: CreateMovimientoDto) => apiPost<MovimientoInventario>('/movimientos-inventario', data),
};
