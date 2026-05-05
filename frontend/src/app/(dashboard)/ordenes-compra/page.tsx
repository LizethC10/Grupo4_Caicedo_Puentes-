'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ordenesCompraService, proveedoresService } from '@/services';
import type { OrdenCompra } from '@/interfaces/orden-compra.interface';
import type { Proveedor } from '@/interfaces/proveedor.interface';

const ESTADO_COLORS: Record<string, { bg: string; text: string; icon: string }> = {
  PENDIENTE: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: '⏳' },
  RECIBIDA: { bg: 'bg-green-100', text: 'text-green-800', icon: '✅' },
  CANCELADA: { bg: 'bg-red-100', text: 'text-red-800', icon: '❌' },
};

export default function OrdenesCompraPage() {
  const router = useRouter();
  const [ordenes, setOrdenes] = useState<OrdenCompra[]>([]);
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtroEstado, setFiltroEstado] = useState<string>('');
  const [filtroProveedor, setFiltroProveedor] = useState<string>('');

  useEffect(() => {
    Promise.all([
      ordenesCompraService.findAll(),
      proveedoresService.findAll(),
    ]).then(([ords, provs]) => {
      setOrdenes(ords);
      setProveedores(provs);
    }).catch(() => setError('Error al cargar las órdenes'))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar esta orden de compra?')) return;
    try {
      await ordenesCompraService.remove(id);
      setOrdenes(ordenes.filter(o => o.id !== id));
    } catch {
      alert('Error al eliminar la orden de compra.');
    }
  };

  const getNombreProveedor = (id: number) =>
    proveedores.find(p => p.id === id)?.razonSocial || `Proveedor #${id}`;

  const ordenesFiltradas = ordenes.filter(o => {
    const matchEstado = !filtroEstado || o.estado === filtroEstado;
    const matchProveedor = !filtroProveedor || o.proveedorId === Number(filtroProveedor);
    return matchEstado && matchProveedor;
  });

  const stats = {
    pendientes: ordenes.filter(o => o.estado === 'PENDIENTE').length,
    recibidas: ordenes.filter(o => o.estado === 'RECIBIDA').length,
    canceladas: ordenes.filter(o => o.estado === 'CANCELADA').length,
    totalInvertido: ordenes
      .filter(o => o.estado === 'RECIBIDA')
      .reduce((sum, o) => sum + o.total, 0),
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500">Cargando órdenes...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">📋 Órdenes de Compra</h1>
          <p className="text-sm text-gray-500 mt-1">
            {ordenesFiltradas.length} orden{ordenesFiltradas.length !== 1 ? 'es' : ''} {(filtroEstado || filtroProveedor) && 'encontrada(s)'}
          </p>
        </div>
        <Link
          href="/ordenes-compra/new"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <span className="text-lg">+</span>
          Nueva Orden
        </Link>
      </div>

      {/* Estadísticas rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
          <p className="text-xs text-yellow-700 uppercase font-medium mb-1">Pendientes</p>
          <p className="text-2xl font-bold text-yellow-800">{stats.pendientes}</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
          <p className="text-xs text-green-700 uppercase font-medium mb-1">Recibidas</p>
          <p className="text-2xl font-bold text-green-800">{stats.recibidas}</p>
        </div>
        <div className="bg-red-50 rounded-xl p-4 border border-red-200">
          <p className="text-xs text-red-700 uppercase font-medium mb-1">Canceladas</p>
          <p className="text-2xl font-bold text-red-800">{stats.canceladas}</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <p className="text-xs text-blue-700 uppercase font-medium mb-1">Invertido</p>
          <p className="text-2xl font-bold text-blue-800">${stats.totalInvertido.toFixed(2)}</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Filtro Estado */}
          <select
            value={filtroEstado}
            onChange={e => setFiltroEstado(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          >
            <option value="">Todos los estados</option>
            <option value="PENDIENTE">⏳ Pendientes</option>
            <option value="RECIBIDA">✅ Recibidas</option>
            <option value="CANCELADA">❌ Canceladas</option>
          </select>

          {/* Filtro Proveedor */}
          <select
            value={filtroProveedor}
            onChange={e => setFiltroProveedor(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          >
            <option value="">Todos los proveedores</option>
            {proveedores.map(p => (
              <option key={p.id} value={p.id}>{p.razonSocial}</option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded mb-6 flex items-start gap-3">
          <span className="text-xl">⚠️</span>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Lista de órdenes */}
      {ordenesFiltradas.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {filtroEstado || filtroProveedor
              ? 'No se encontraron órdenes'
              : 'No hay órdenes de compra'}
          </h3>
          <p className="text-gray-500 text-sm mb-6">
            {filtroEstado || filtroProveedor
              ? 'Intenta ajustar los filtros'
              : 'Comienza creando tu primera orden de compra'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {ordenesFiltradas.map(orden => {
            const estadoStyle = ESTADO_COLORS[orden.estado];
            return (
              <div
                key={orden.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-lg transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Info principal */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-xl">
                      <span className="text-2xl">📋</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Orden #{orden.id}
                        </h3>
                        <span className={`${estadoStyle.bg} ${estadoStyle.text} px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1`}>
                          <span>{estadoStyle.icon}</span>
                          {orden.estado}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600 flex items-center gap-2">
                          <span>🚚</span>
                          <span className="font-medium">{getNombreProveedor(orden.proveedorId)}</span>
                        </p>
                        <p className="text-sm text-gray-500 flex items-center gap-2">
                          <span>📅</span>
                          {new Date(orden.fechaEmision).toLocaleDateString('es-CO', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Total y acciones */}
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-gray-500 uppercase font-medium mb-1">Total</p>
                      <p className="text-2xl font-bold text-gray-900">${orden.total.toFixed(2)}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => router.push(`/ordenes-compra/${orden.id}`)}
                        className="flex items-center justify-center gap-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                      >
                        ✏️ Editar
                      </button>
                      <button
                        onClick={() => handleDelete(orden.id)}
                        className="flex items-center justify-center gap-2 bg-red-50 text-red-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}