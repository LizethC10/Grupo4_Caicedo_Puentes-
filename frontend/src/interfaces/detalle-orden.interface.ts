export interface DetalleOrden {
  id: number;
  ordenCompraId: number;
  insumoId: number;
  cantidad: number;
  precioUnitario: number;
  createdAt: string;
  updatedAt: string;
}