import { apiGet, apiPost, apiPut, apiDelete } from '@/lib/api';
import type { OrdenCompra } from '@/interfaces/orden-compra.interface';

export type CreateOrdenCompraDto = Omit<OrdenCompra, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateOrdenCompraDto = Partial<CreateOrdenCompraDto>;

export const ordenesCompraService = {
  findAll: () => apiGet<OrdenCompra[]>('/ordenes-compra'),
  findOne: (id: number) => apiGet<OrdenCompra>(`/ordenes-compra/${id}`),
  create: (data: CreateOrdenCompraDto) => apiPost<OrdenCompra>('/ordenes-compra', data),
  update: (id: number, data: UpdateOrdenCompraDto) => apiPut<OrdenCompra>(`/ordenes-compra/${id}`, data),
  remove: (id: number) => apiDelete<void>(`/ordenes-compra/${id}`),
};