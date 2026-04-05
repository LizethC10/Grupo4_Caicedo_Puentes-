import { apiGet, apiPost, apiPut, apiDelete } from '@/lib/api';
import type { RecetaIngrediente } from '@/interfaces/receta-ingrediente.interface';

export type CreateRecetaIngredienteDto = Omit<RecetaIngrediente, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateRecetaIngredienteDto = Partial<CreateRecetaIngredienteDto>;

export const recetaIngredienteService = {
  findAll: () => apiGet<RecetaIngrediente[]>('/receta-ingrediente'),
  findOne: (id: number) => apiGet<RecetaIngrediente>(`/receta-ingrediente/${id}`),
  create: (data: CreateRecetaIngredienteDto) => apiPost<RecetaIngrediente>('/receta-ingrediente', data),
  update: (id: number, data: UpdateRecetaIngredienteDto) => apiPut<RecetaIngrediente>(`/receta-ingrediente/${id}`, data),
  remove: (id: number) => apiDelete<void>(`/receta-ingrediente/${id}`),
};