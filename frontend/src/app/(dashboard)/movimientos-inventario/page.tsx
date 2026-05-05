'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { movimientosInventarioService, insumosService } from '@/services';
import type { MovimientoInventario } from '@/interfaces/movimiento-inventario.interface';
import type { Insumo } from '@/interfaces/insumo.interface';

export default function MovimientosInventarioPage() {
  const router = useRouter();
  const [movimientos, setMovimientos] = useState<MovimientoInventario[]>([]);
  const [insumos, setInsumos] = useState<Insumo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [filtroInsumo, setFiltroInsumo] = useState<string>('');
  const [filtroTipo, setFiltroTipo] = useState<string>('');
  const [filtroFechaInicio, setFiltroFechaInicio] = useState<string>('');
  const [filtroFechaFin, setFiltroFechaFin] = useState<string>('');

  useEffect(() => {
    Promise.all([
      movimientosInventarioService.findAll(),
      insumosService.findAll(),
    ]).then(([movs, ins]) => {
      setMovimientos(movs);
      setInsumos(ins);
    }).catch(() => setError('Error al cargar los movimientos'))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este movimiento?')) return;
    try {
      await movimientosInventarioService.remove(id);
      setMovimientos(movimientos.filter(m => m.id !== id));
    } catch {
      alert('Error al eliminar el movimiento.');
    }
  };

  const getNombreInsumo = (id: number) =>
    insumos.find(i => i.id === id)?.nombre || `Insumo #${id}`;

  const limpiarFiltros = () => {
    setFiltroInsumo('');
    setFiltroTipo('');
    setFiltroFechaInicio('');
    setFiltroFechaFin('');
  };

  const movimientosFiltrados = movimientos.filter(m => {
    const matchInsumo = !filtroInsumo || m.insumoId === Number(filtroInsumo);
    const matchTipo = !filtroTipo || m.tipo === filtroTipo;
    const matchFechaInicio = !filtroFechaInicio || new Date(m.fecha) >= new Date(filtroFechaInicio);
    const matchFechaFin = !filtroFechaFin || new Date(m.fecha) <= new Date(filtroFechaFin);
    return matchInsumo && matchTipo && matchFechaInicio && matchFechaFin;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500">Cargando movimientos...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">📊 Movimientos de Inventario</h1>
          <p className="text-sm text-gray-500 mt-1">
            {movimientosFiltrados.length} movimiento{movimientosFiltrados.length !== 1 ? 's' : ''} registrado{movimientosFiltrados.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link
          href="/movimientos-inventario/new"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <span className="text-lg">+</span>
          Registrar Merma
        </Link>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
          {/* Filtro Insumo */}
          <select
            value={filtroInsumo}
            onChange={e => setFiltroInsumo(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Todos los insumos</option>
            {insumos.map(i => (
              <option key={i.id} value={i.id}>{i.nombre}</option>
            ))}
          </select>

          {/* Filtro Tipo */}
          <select
            value={filtroTipo}
            onChange={e => setFiltroTipo(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Todos los tipos</option>
            <option value="ENTRADA">✅ Entradas</option>
            <option value="SALIDA">❌ Salidas</option>
          </select>

          {/* Filtro Fecha Inicio */}
          <input
            type="date"
            value={filtroFechaInicio}
            onChange={e => setFiltroFechaInicio(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Fecha inicio"
          />

          {/* Filtro Fecha Fin */}
          <input
            type="date"
            value={filtroFechaFin}
            onChange={e => setFiltroFechaFin(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Fecha fin"
          />
        </div>

        {(filtroInsumo || filtroTipo || filtroFechaInicio || filtroFechaFin) && (
          <button
            onClick={limpiarFiltros}
            className="text-sm text-orange-600 hover:text-orange-800 font-medium"
          >
            🔄 Limpiar filtros
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded mb-6 flex items-start gap-3">
          <span className="text-xl">⚠️</span>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Tabla de movimientos */}
      {movimientosFiltrados.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No hay movimientos
          </h3>
          <p className="text-gray-500 text-sm">
            {filtroInsumo || filtroTipo || filtroFechaInicio || filtroFechaFin
              ? 'Intenta ajustar los filtros'
              : 'Los movimientos se registran automáticamente'}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Insumo
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cantidad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Motivo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {movimientosFiltrados.map(movimiento => (
                  <tr key={movimiento.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">📦</span>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {getNombreInsumo(movimiento.insumoId)}
                          </p>
                          <p className="text-xs text-gray-500">ID: #{movimiento.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                        movimiento.tipo === 'ENTRADA'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {movimiento.tipo === 'ENTRADA' ? '✅' : '❌'}
                        {movimiento.tipo}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`text-sm font-semibold ${
                        movimiento.tipo === 'ENTRADA' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {movimiento.tipo === 'ENTRADA' ? '+' : '-'}{movimiento.cantidad}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900">{movimiento.motivo}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900">
                        {new Date(movimiento.fecha).toLocaleDateString('es-CO', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(movimiento.fecha).toLocaleTimeString('es-CO', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => router.push(`/movimientos-inventario/${movimiento.id}`)}
                          className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors"
                        >
                          ✏️ Editar
                        </button>
                        <button
                          onClick={() => handleDelete(movimiento.id)}
                          className="bg-red-50 text-red-700 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}