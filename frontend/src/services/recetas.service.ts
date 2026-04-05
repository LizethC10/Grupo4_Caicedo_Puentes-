import { apiGet, apiPost, apiPut, apiDelete } from '@/lib/api';
import type { Receta } from '@/interfaces/receta.interface';

export type CreateRecetaDto = Omit<Receta, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateRecetaDto = Partial<CreateRecetaDto>;

export const recetasService = {
  findAll: () => apiGet<Receta[]>('/recetas'),
  findOne: (id: number) => apiGet<Receta>(`/recetas/${id}`),
  create: (data: CreateRecetaDto) => apiPost<Receta>('/recetas', data),
  update: (id: number, data: UpdateRecetaDto) => apiPut<Receta>(`/recetas/${id}`, data),
  remove: (id: number) => apiDelete<void>(`/recetas/${id}`),
};