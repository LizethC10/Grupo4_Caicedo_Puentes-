'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { insumosService } from '@/services';
import type { Insumo } from '@/interfaces/insumo.interface';

export default function InsumosPage() {
  const [insumos, setInsumos] = useState<Insumo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    insumosService.findAll()
      .then(setInsumos)
      .catch(() => setError('Error al cargar los insumos'))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este insumo?')) return;
    try {
      await insumosService.remove(id);
      setInsumos(insumos.filter(i => i.id !== id));
    } catch {
      alert('Error al eliminar el insumo');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Insumos</h1>
        <Link
          href="/insumos/new"
          className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-700"
        >
          + Nuevo Insumo
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unidad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock Actual</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock Mínimo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {insumos.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    No hay insumos registrados
                  </td>
                </tr>
              ) : (
                insumos.map(insumo => (
                  <tr key={insumo.id}>
                    <td className="px-6 py-4 text-sm text-gray-900">{insumo.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{insumo.nombre}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{insumo.unidadMedida}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{insumo.stockActual}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{insumo.stockMinimo}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">${insumo.precioActual}</td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <Link
                        href={`/insumos/${insumo.id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(insumo.id)}
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