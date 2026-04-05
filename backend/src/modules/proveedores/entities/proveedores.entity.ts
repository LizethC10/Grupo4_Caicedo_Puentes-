export class ProveedoreEntity {
  id: number;
  razonSocial: string;
  nit: string;
  telefono?: string | null;
  email?: string | null;
  tiempoEntregaDias: number;
  createdAt: Date;
  updatedAt: Date;
}