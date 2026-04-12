'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ordenesCompraService } from '@/services';
import type { OrdenCompra } from '@/interfaces/orden-compra.interface';

const ESTADO_COLORS: Record<string, string> = {
  PENDIENTE: 'bg-yellow-100 text-yellow-800',
  RECIBIDA: 'bg-green-100 text-green-800',
  CANCELADA: 'bg-red-100 text-red-800',
};

export default function OrdenesCompraPage() {
  const [ordenes, setOrdenes] = useState<OrdenCompra[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    ordenesCompraService.findAll()
      .then(setOrdenes)
      .catch(() => setError('Error al cargar las órdenes de compra'))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar esta orden de compra?')) return;
    try {
      await ordenesCompraService.remove(id);
      setOrdenes(ordenes.filter(o => o.id !== id));
    } catch {
      alert('Error al eliminar la orden');
    }
  };

  const handleRecibir = async (id: number) => {
    if (!confirm('¿Marcar esta orden como RECIBIDA? Esto actualizará el stock automáticamente.')) return;
    try {
      await ordenesCompraService.update(id, { estado: 'RECIBIDA' });
      setOrdenes(ordenes.map(o => o.id === id ? { ...o, estado: 'RECIBIDA' } : o));
    } catch {
      alert('Error al recibir la orden');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Órdenes de Compra</h1>
        <Link
          href="/ordenes-compra/new"
          className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-700"
        >
          + Nueva Orden
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Proveedor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha Emisión</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {ordenes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    No hay órdenes de compra registradas
                  </td>
                </tr>
              ) : (
                ordenes.map(orden => (
                  <tr key={orden.id}>
                    <td className="px-6 py-4 text-sm text-gray-900">{orden.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{orden.proveedorId}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(orden.fechaEmision).toLocaleDateString('es-CO')}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${ESTADO_COLORS[orden.estado]}`}>
                        {orden.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">${orden.total}</td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      {orden.estado === 'PENDIENTE' && (
                        <button
                          onClick={() => handleRecibir(orden.id)}
                          className="text-green-600 hover:text-green-800 font-medium"
                        >
                          Recibir
                        </button>
                      )}
                      <Link
                        href={`/ordenes-compra/${orden.id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Ver
                      </Link>
                      {orden.estado === 'PENDIENTE' && (
                        <button
                          onClick={() => handleDelete(orden.id)}
                          className="text-red-600 hover:text-red-800 font-medium"
                        >
                          Eliminar
                        </button>
                      )}
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