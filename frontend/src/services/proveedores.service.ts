import { apiGet, apiPost, apiPut, apiDelete } from '@/lib/api';
import type { Proveedor } from '@/interfaces/proveedor.interface';

export type CreateProveedorDto = Omit<Proveedor, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateProveedorDto = Partial<CreateProveedorDto>;

export const proveedoresService = {
  findAll: () => apiGet<Proveedor[]>('/proveedores'),
  findOne: (id: number) => apiGet<Proveedor>(`/proveedores/${id}`),
  create: (data: CreateProveedorDto) => apiPost<Proveedor>('/proveedores', data),
  update: (id: number, data: UpdateProveedorDto) => apiPut<Proveedor>(`/proveedores/${id}`, data),
  remove: (id: number) => apiDelete<void>(`/proveedores/${id}`),
};