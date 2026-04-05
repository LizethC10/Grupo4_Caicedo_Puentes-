export class InsumoEntity {
  id: number;
  nombre: string;
  unidadMedida: string;
  precioActual: number;
  stockActual: number;
  stockMinimo: number;
  categoriaId: number;
  createdAt: Date;
  updatedAt: Date;
}