'use client';

import { useEffect, useState } from 'react';
import { movimientosInventarioService } from '@/services';
import type { MovimientoInventario } from '@/interfaces/movimiento-inventario.interface';

const TIPO_COLORS: Record<string, string> = {
  ENTRADA: 'bg-green-100 text-green-800',
  SALIDA: 'bg-red-100 text-red-800',
};

export default function MovimientosPage() {
  const [movimientos, setMovimientos] = useState<MovimientoInventario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    movimientosInventarioService.findAll()
      .then(setMovimientos)
      .catch(() => setError('Error al cargar los movimientos'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Movimientos de Inventario</h1>
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
              {movimientos.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    No hay movimientos registrados
                  </td>
                </tr>
              ) : (
                movimientos.map(mov => (
                  <tr key={mov.id}>
                    <td className="px-6 py-4 text-sm text-gray-900">{mov.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">#{mov.insumoId}</td>
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