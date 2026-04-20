'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { recetasService } from '@/services';
import type { Receta } from '@/interfaces/receta.interface';

export default function RecetasPage() {
  const [recetas, setRecetas] = useState<Receta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    recetasService.findAll()
      .then(setRecetas)
      .catch(() => setError('Error al cargar las recetas'))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar esta receta?')) return;
    try {
      await recetasService.remove(id);
      setRecetas(recetas.filter(r => r.id !== id));
    } catch {
      alert('Error al eliminar la receta');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Recetas</h1>
        <Link
          href="/recetas/new"
          className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-700"
        >
          + Nueva Receta
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descripción</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Porciones</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recetas.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    No hay recetas registradas
                  </td>
                </tr>
              ) : (
                recetas.map(receta => (
                  <tr key={receta.id}>
                    <td className="px-6 py-4 text-sm text-gray-900">{receta.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{receta.nombre}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{receta.descripcion || '—'}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{receta.porciones}</td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <Link
                        href={`/recetas/${receta.id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Ver/Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(receta.id)}
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