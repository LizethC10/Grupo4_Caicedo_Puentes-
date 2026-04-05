import { apiGet, apiPost, apiPut, apiDelete } from '@/lib/api';
import type { Insumo } from '@/interfaces/insumo.interface';

export type CreateInsumoDto = Omit<Insumo, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateInsumoDto = Partial<CreateInsumoDto>;

export const insumosService = {
  findAll: () => apiGet<Insumo[]>('/insumos'),
  findOne: (id: number) => apiGet<Insumo>(`/insumos/${id}`),
  create: (data: CreateInsumoDto) => apiPost<Insumo>('/insumos', data),
  update: (id: number, data: UpdateInsumoDto) => apiPut<Insumo>(`/insumos/${id}`, data),
  remove: (id: number) => apiDelete<void>(`/insumos/${id}`),
};