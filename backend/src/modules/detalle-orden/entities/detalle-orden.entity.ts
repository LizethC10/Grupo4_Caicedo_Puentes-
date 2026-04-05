export class DetalleOrdenEntity {
  id: number;
  ordenCompraId: number;
  insumoId: number;
  cantidad: number;
  precioUnitario: number;
  createdAt: Date;
  updatedAt: Date;
}