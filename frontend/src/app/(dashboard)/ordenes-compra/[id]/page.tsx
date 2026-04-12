'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ordenesCompraService } from '@/services';
import type { OrdenCompra } from '@/interfaces/orden-compra.interface';

const ESTADO_COLORS: Record<string, string> = {
  PENDIENTE: 'bg-yellow-100 text-yellow-800',
  RECIBIDA: 'bg-green-100 text-green-800',
  CANCELADA: 'bg-red-100 text-red-800',
};

export default function DetalleOrdenCompraPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [orden, setOrden] = useState<OrdenCompra | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    ordenesCompraService.findOne(id)
      .then(setOrden)
      .catch(() => setError('Error al cargar la orden'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleRecibir = async () => {
    if (!confirm('¿Marcar como RECIBIDA? Esto actualizará el stock automáticamente.')) return;
    try {
      await ordenesCompraService.update(id, { estado: 'RECIBIDA' });
      setOrden(prev => prev ? { ...prev, estado: 'RECIBIDA' } : prev);
    } catch {
      alert('Error al recibir la orden');
    }
  };

  const handleCancelar = async () => {
    if (!confirm('¿Cancelar esta orden?')) return;
    try {
      await ordenesCompraService.update(id, { estado: 'CANCELADA' });
      setOrden(prev => prev ? { ...prev, estado: 'CANCELADA' } : prev);
    } catch {
      alert('Error al cancelar la orden');
    }
  };

  if (loading) return <p className="text-gray-500">Cargando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!orden) return <p className="text-gray-500">Orden no encontrada</p>;

  return (
    <div className="max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Orden de Compra #{orden.id}</h1>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${ESTADO_COLORS[orden.estado]}`}>
          {orden.estado}
        </span>
      </div>

      <div className="bg-white rounded-lg shadow p-6 space-y-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Proveedor ID</p>
            <p className="font-medium">{orden.proveedorId}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Fecha de Emisión</p>
            <p className="font-medium">
              {new Date(orden.fechaEmision).toLocaleDateString('es-CO')}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total</p>
            <p className="font-medium text-lg">${orden.total}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Estado</p>
            <p className="font-medium">{orden.estado}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        {orden.estado === 'PENDIENTE' && (
          <>
            <button
              onClick={handleRecibir}
              className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700"
            >
              ✅ Marcar como Recibida
            </button>
            <button
              onClick={handleCancelar}
              className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
            >
              ❌ Cancelar Orden
            </button>
          </>
        )}
        <button
          onClick={() => router.push('/ordenes-compra')}
          className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200"
        >
          ← Volver
        </button>
      </div>
    </div>
  );
}