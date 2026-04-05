import { apiGet, apiPost, apiPut, apiDelete } from '@/lib/api';
import type { DetalleOrden } from '@/interfaces/detalle-orden.interface';

export type CreateDetalleOrdenDto = Omit<DetalleOrden, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateDetalleOrdenDto = Partial<CreateDetalleOrdenDto>;

export const detalleOrdenService = {
  findAll: () => apiGet<DetalleOrden[]>('/detalle-orden'),
  findOne: (id: number) => apiGet<DetalleOrden>(`/detalle-orden/${id}`),
  create: (data: CreateDetalleOrdenDto) => apiPost<DetalleOrden>('/detalle-orden', data),
  update: (id: number, data: UpdateDetalleOrdenDto) => apiPut<DetalleOrden>(`/detalle-orden/${id}`, data),
  remove: (id: number) => apiDelete<void>(`/detalle-orden/${id}`),
};