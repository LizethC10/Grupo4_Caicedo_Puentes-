'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { movimientosInventarioService, insumosService } from '@/services';
import type { MovimientoInventario } from '@/interfaces/movimiento-inventario.interface';
import type { Insumo } from '@/interfaces/insumo.interface';

const TIPO_COLORS: Record<string, string> = {
  ENTRADA: 'bg-green-100 text-green-800',
  SALIDA: 'bg-red-100 text-red-800',
};

export default function MovimientosPage() {
  const [movimientos, setMovimientos] = useState<MovimientoInventario[]>([]);
  const [insumos, setInsumos] = useState<Insumo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtroInsumo, setFiltroInsumo] = useState('');
  const [filtroFechaInicio, setFiltroFechaInicio] = useState('');
  const [filtroFechaFin, setFiltroFechaFin] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');

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

  const movimientosFiltrados = movimientos.filter(mov => {
    const fechaMov = new Date(mov.fecha);
    if (filtroInsumo && mov.insumoId !== Number(filtroInsumo)) return false;
    if (filtroTipo && mov.tipo !== filtroTipo) return false;
    if (filtroFechaInicio && fechaMov < new Date(filtroFechaInicio)) return false;
    if (filtroFechaFin && fechaMov > new Date(filtroFechaFin + 'T23:59:59')) return false;
    return true;
  });

  const getNombreInsumo = (insumoId: number) => {
    return insumos.find(i => i.id === insumoId)?.nombre || `#${insumoId}`;
  };

  const limpiarFiltros = () => {
    setFiltroInsumo('');
    setFiltroFechaInicio('');
    setFiltroFechaFin('');
    setFiltroTipo('');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Movimientos de Inventario</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">{movimientosFiltrados.length} registros</span>
          <Link
            href="/movimientos-inventario/new"
            className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
          >
            + Registrar Merma
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">🔍 Filtros</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Insumo</label>
            <select
              value={filtroInsumo}
              onChange={e => setFiltroInsumo(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Todos</option>
              {insumos.map(i => (
                <option key={i.id} value={i.id}>{i.nombre}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Tipo</label>
            <select
              value={filtroTipo}
              onChange={e => setFiltroTipo(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Todos</option>
              <option value="ENTRADA">ENTRADA</option>
              <option value="SALIDA">SALIDA</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Fecha Inicio</label>
            <input
              type="date"
              value={filtroFechaInicio}
              onChange={e => setFiltroFechaInicio(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Fecha Fin</label>
            <input
              type="date"
              value={filtroFechaFin}
              onChange={e => setFiltroFechaFin(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
        <button
          onClick={limpiarFiltros}
          className="mt-3 text-sm text-orange-600 hover:text-orange-800 font-medium"
        >
          Limpiar filtros
        </button>
      </div>

      {loading && <p className="text-gray-500">Cargando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Insumo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cantidad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Motivo</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {movimientosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    No hay movimientos con los filtros aplicados
                  </td>
                </tr>
              ) : (
                movimientosFiltrados.map(mov => (
                  <tr key={mov.id}>
                    <td className="px-6 py-4 text-sm text-gray-900">{mov.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {getNombreInsumo(mov.insumoId)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${TIPO_COLORS[mov.tipo]}`}>
                        {mov.tipo}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{mov.cantidad}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(mov.fecha).toLocaleDateString('es-CO')}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{mov.motivo}</td>
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