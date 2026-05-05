'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { detalleOrdenService, ordenesCompraService, insumosService } from '@/services';
import type { DetalleOrden } from '@/interfaces/detalle-orden.interface';
import type { OrdenCompra } from '@/interfaces/orden-compra.interface';
import type { Insumo } from '@/interfaces/insumo.interface';

export default function DetalleOrdenPage() {
  const router = useRouter();
  const [detalles, setDetalles] = useState<DetalleOrden[]>([]);
  const [ordenes, setOrdenes] = useState<OrdenCompra[]>([]);
  const [insumos, setInsumos] = useState<Insumo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtroOrden, setFiltroOrden] = useState<string>('');

  useEffect(() => {
    Promise.all([
      detalleOrdenService.findAll(),
      ordenesCompraService.findAll(),
      insumosService.findAll(),
    ]).then(([dets, ords, ins]) => {
      setDetalles(dets);
      setOrdenes(ords);
      setInsumos(ins);
    }).catch(() => setError('Error al cargar los detalles'))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este detalle de orden?')) return;
    try {
      await detalleOrdenService.remove(id);
      setDetalles(detalles.filter(d => d.id !== id));
    } catch {
      alert('Error al eliminar el detalle de orden.');
    }
  };

  const getNombreInsumo = (id: number) =>
    insumos.find(i => i.id === id)?.nombre || `Insumo #${id}`;

  const getOrden = (id: number) =>
    ordenes.find(o => o.id === id);

  const detallesFiltrados = detalles.filter(d =>
    !filtroOrden || d.ordenCompraId === Number(filtroOrden)
  );

  // Agrupar detalles por orden
  const detallesPorOrden = detallesFiltrados.reduce((acc, detalle) => {
    const ordenId = detalle.ordenCompraId;
    if (!acc[ordenId]) acc[ordenId] = [];
    acc[ordenId].push(detalle);
    return acc;
  }, {} as Record<number, DetalleOrden[]>);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500">Cargando detalles...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">📝 Detalles de Órdenes</h1>
          <p className="text-sm text-gray-500 mt-1">
            {detallesFiltrados.length} detalle{detallesFiltrados.length !== 1 ? 's' : ''} registrado{detallesFiltrados.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link
          href="/detalle-orden/new"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <span className="text-lg">+</span>
          Nuevo Detalle
        </Link>
      </div>

      {/* Filtro */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <select
          value={filtroOrden}
          onChange={e => setFiltroOrden(e.target.value)}
          className="w-full md:w-1/2 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
        >
          <option value="">Todas las órdenes de compra</option>
          {ordenes.map(o => (
            <option key={o.id} value={o.id}>
              Orden #{o.id} - {new Date(o.fechaEmision).toLocaleDateString('es-CO')}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded mb-6 flex items-start gap-3">
          <span className="text-xl">⚠️</span>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Detalles agrupados por orden */}
      {Object.keys(detallesPorOrden).length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {filtroOrden ? 'No hay detalles para esta orden' : 'No hay detalles registrados'}
          </h3>
          <p className="text-gray-500 text-sm mb-6">
            {filtroOrden
              ? 'Esta orden no tiene insumos asociados'
              : 'Comienza agregando detalles a tus órdenes de compra'}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(detallesPorOrden).map(([ordenId, detallesOrden]) => {
            const orden = getOrden(Number(ordenId));
            const totalOrden = detallesOrden.reduce((sum, d) => sum + (d.cantidad * d.precioUnitario), 0);

            return (
              <div key={ordenId} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Header de la orden */}
                <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-b border-orange-200 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                        📋 Orden #{ordenId}
                      </h3>
                      {orden && (
                        <p className="text-sm text-gray-600 mt-1">
                          {new Date(orden.fechaEmision).toLocaleDateString('es-CO', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 uppercase font-medium">Total</p>
                      <p className="text-2xl font-bold text-orange-600">${totalOrden.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* Tabla de detalles */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Insumo
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Cantidad
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Precio Unit.
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Subtotal
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {detallesOrden.map(detalle => {
                        const subtotal = detalle.cantidad * detalle.precioUnitario;
                        return (
                          <tr key={detalle.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">📦</span>
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    {getNombreInsumo(detalle.insumoId)}
                                  </p>
                                  <p className="text-xs text-gray-500">ID: #{detalle.id}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <span className="text-sm font-semibold text-gray-900">{detalle.cantidad}</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <span className="text-sm text-gray-900">${detalle.precioUnitario.toFixed(2)}</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <span className="text-sm font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => router.push(`/detalle-orden/${detalle.id}`)}
                                  className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors"
                                >
                                  ✏️ Editar
                                </button>
                                <button
                                  onClick={() => handleDelete(detalle.id)}
                                  className="bg-red-50 text-red-700 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors"
                                >
                                  🗑️
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}