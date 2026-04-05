import { apiGet, apiPost, apiPut, apiDelete } from '@/lib/api';
import type { MovimientoInventario } from '@/interfaces/movimiento-inventario.interface';

export type CreateMovimientoDto = Omit<MovimientoInventario, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateMovimientoDto = Partial<CreateMovimientoDto>;

export const movimientosInventarioService = {
  findAll: () => apiGet<MovimientoInventario[]>('/movimientos-inventario'),
  findOne: (id: number) => apiGet<MovimientoInventario>(`/movimientos-inventario/${id}`),
  create: (data: CreateMovimientoDto) => apiPost<MovimientoInventario>('/movimientos-inventario', data),
  update: (id: number, data: UpdateMovimientoDto) => apiPut<MovimientoInventario>(`/movimientos-inventario/${id}`, data),
  remove: (id: number) => apiDelete<void>(`/movimientos-inventario/${id}`),
};