'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { detalleOrdenService } from '@/services';
import type { DetalleOrden } from '@/interfaces/detalle-orden.interface';

export default function DetalleOrdenPage() {
  const [detalles, setDetalles] = useState<DetalleOrden[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    detalleOrdenService.findAll()
      .then(setDetalles)
      .catch(() => setError('Error al cargar los detalles'))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este detalle?')) return;
    try {
      await detalleOrdenService.remove(id);
      setDetalles(detalles.filter(d => d.id !== id));
    } catch {
      alert('Error al eliminar el detalle');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Detalle de Órdenes</h1>
        <Link
          href="/detalle-orden/new"
          className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-700"
        >
          + Nuevo Detalle
        </Link>
      </div>

      {loading && <p className="text-gray-500">Cargando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orden #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Insumo #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cantidad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio Unit.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subtotal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {detalles.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    No hay detalles registrados
                  </td>
                </tr>
              ) : (
                detalles.map(detalle => (
                  <tr key={detalle.id}>
                    <td className="px-6 py-4 text-sm text-gray-900">{detalle.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">#{detalle.ordenCompraId}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">#{detalle.insumoId}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{detalle.cantidad}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">${detalle.precioUnitario}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">${detalle.cantidad * detalle.precioUnitario}</td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <button
                        onClick={() => handleDelete(detalle.id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}