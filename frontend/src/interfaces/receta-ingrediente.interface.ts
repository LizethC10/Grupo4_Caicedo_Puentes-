export interface RecetaIngrediente {
  id: number;
  recetaId: number;
  insumoId: number;
  cantidadRequerida: number;
  createdAt: string;
  updatedAt: string;
}