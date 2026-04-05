import { apiGet, apiPost, apiPut, apiDelete } from '@/lib/api';
import type { Categoria } from '@/interfaces/categoria.interface';

export type CreateCategoriaDto = Omit<Categoria, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateCategoriaDto = Partial<CreateCategoriaDto>;

export const categoriasService = {
  findAll: () => apiGet<Categoria[]>('/categorias'),
  findOne: (id: number) => apiGet<Categoria>(`/categorias/${id}`),
  create: (data: CreateCategoriaDto) => apiPost<Categoria>('/categorias', data),
  update: (id: number, data: UpdateCategoriaDto) => apiPut<Categoria>(`/categorias/${id}`, data),
  remove: (id: number) => apiDelete<void>(`/categorias/${id}`),
};