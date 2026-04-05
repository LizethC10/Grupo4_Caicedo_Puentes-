export interface OrdenCompra {
  id: number;
  proveedorId: number;
  fechaEmision: string;
  estado: 'PENDIENTE' | 'RECIBIDA' | 'CANCELADA';
  total: number;
  createdAt: string;
  updatedAt: string;
}