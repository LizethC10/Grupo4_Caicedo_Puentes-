export interface MovimientoInventario {
  id: number;
  insumoId: number;
  tipo: 'ENTRADA' | 'SALIDA';
  cantidad: number;
  fecha: string;
  motivo: string;
  createdAt: string;
  updatedAt: string;
}