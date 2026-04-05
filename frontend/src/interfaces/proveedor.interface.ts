export interface Proveedor {
  id: number;
  razonSocial: string;
  nit: string;
  telefono?: string;
  email?: string;
  tiempoEntregaDias: number;
  createdAt: string;
  updatedAt: string;
}