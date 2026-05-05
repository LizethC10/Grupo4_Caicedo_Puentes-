'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { recetasService } from '@/services';
import type { Receta } from '@/interfaces/receta.interface';

export default function RecetasPage() {
  const router = useRouter();
  const [recetas, setRecetas] = useState<Receta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    recetasService.findAll()
      .then(setRecetas)
      .catch(() => setError('Error al cargar las recetas'))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number, nombre: string) => {
    if (!confirm(`¿Eliminar la receta "${nombre}"?`)) return;
    try {
      await recetasService.remove(id);
      setRecetas(recetas.filter(r => r.id !== id));
    } catch {
      alert('Error al eliminar la receta. Puede que tenga ingredientes asociados.');
    }
  };

  const recetasFiltradas = recetas.filter(r =>
    r.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500">Cargando recetas...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">🍳 Recetas</h1>
          <p className="text-sm text-gray-500 mt-1">
            {recetasFiltradas.length} receta{recetasFiltradas.length !== 1 ? 's' : ''} {searchTerm && 'encontrada(s)'}
          </p>
        </div>
        <Link
          href="/recetas/new"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <span className="text-lg">+</span>
          Nueva Receta
        </Link>
      </div>

      {/* Barra de búsqueda */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">🔍</span>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Buscar recetas por nombre o descripción..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded mb-6 flex items-start gap-3">
          <span className="text-xl">⚠️</span>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Grid de recetas */}
      {recetasFiltradas.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="text-6xl mb-4">🍳</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {searchTerm ? 'No se encontraron recetas' : 'No hay recetas registradas'}
          </h3>
          <p className="text-gray-500 text-sm mb-6">
            {searchTerm
              ? 'Intenta con otros términos de búsqueda'
              : 'Comienza creando tu primera receta'}
          </p>
          {!searchTerm && (
            <Link
              href="/recetas/new"
              className="inline-flex items-center gap-2 bg-orange-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-orange-700 transition-colors"
            >
              <span className="text-lg">+</span>
              Crear Primera Receta
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recetasFiltradas.map(receta => (
            <div
              key={receta.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-lg transition-all group overflow-hidden"
            >
              {/* Header con gradiente */}
              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 -mx-5 -mt-5 px-5 py-4 mb-4 border-b border-orange-200">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <span className="text-3xl">🍳</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                      {receta.nombre}
                    </h3>
                    <p className="text-xs text-gray-500">Receta #{receta.id}</p>
                  </div>
                </div>
              </div>

              {/* Descripción */}
              {receta.descripcion && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {receta.descripcion}
                </p>
              )}

              {/* Info de porciones */}
              <div className="bg-blue-50 rounded-lg p-3 mb-4 border border-blue-200">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">👥</span>
                  <div>
                    <p className="text-xs text-blue-700 font-medium">Porciones</p>
                    <p className="text-lg font-bold text-blue-900">{receta.porciones}</p>
                  </div>
                </div>
              </div>

              {/* Acciones */}
              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <button
                  onClick={() => router.push(`/recetas/${receta.id}`)}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                >
                  ✏️ Editar
                </button>
                <button
                  onClick={() => handleDelete(receta.id, receta.nombre)}
                  className="flex items-center justify-center gap-2 bg-red-50 text-red-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}