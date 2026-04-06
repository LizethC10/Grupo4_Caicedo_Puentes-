'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { categoriasService } from '@/services';
import type { Categoria } from '@/interfaces/categoria.interface';

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    categoriasService.findAll()
      .then(setCategorias)
      .catch(() => setError('Error al cargar las categorías'))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar esta categoría?')) return;
    try {
      await categoriasService.remove(id);
      setCategorias(categorias.filter(c => c.id !== id));
    } catch {
      alert('Error al eliminar la categoría');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categorías</h1>
        <Link
          href="/categorias/new"
          className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-700"
        >
          + Nueva Categoría
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categorias.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                    No hay categorías registradas
                  </td>
                </tr>
              ) : (
                categorias.map(categoria => (
                  <tr key={categoria.id}>
                    <td className="px-6 py-4 text-sm text-gray-900">{categoria.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{categoria.nombre}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{categoria.descripcion || '—'}</td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <Link
                        href={`/categorias/${categoria.id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(categoria.id)}
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