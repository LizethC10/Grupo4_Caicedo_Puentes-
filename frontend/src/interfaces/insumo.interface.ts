// Registro de Insumos H-U 1
export interface Insumo {
  id: number;
  nombre: string;
  unidadMedida: string;
  precioActual: number;
  stockActual: number;
  stockMinimo: number;
  categoriaId: number;
  createdAt: string;
  updatedAt: string;
}