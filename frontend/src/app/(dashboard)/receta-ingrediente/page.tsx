'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { recetaIngredienteService, recetasService, insumosService } from '@/services';
import type { RecetaIngrediente } from '@/interfaces/receta-ingrediente.interface';
import type { Receta } from '@/interfaces/receta.interface';
import type { Insumo } from '@/interfaces/insumo.interface';

export default function RecetaIngredientePage() {
  const router = useRouter();
  const [ingredientes, setIngredientes] = useState<RecetaIngrediente[]>([]);
  const [recetas, setRecetas] = useState<Receta[]>([]);
  const [insumos, setInsumos] = useState<Insumo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtroReceta, setFiltroReceta] = useState<string>('');

  useEffect(() => {
    Promise.all([
      recetaIngredienteService.findAll(),
      recetasService.findAll(),
      insumosService.findAll(),
    ]).then(([ings, recs, ins]) => {
      setIngredientes(ings);
      setRecetas(recs);
      setInsumos(ins);
    }).catch(() => setError('Error al cargar los ingredientes'))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este ingrediente de la receta?')) return;
    try {
      await recetaIngredienteService.remove(id);
      setIngredientes(ingredientes.filter(i => i.id !== id));
    } catch {
      alert('Error al eliminar el ingrediente.');
    }
  };

  const getNombreReceta = (id: number) =>
    recetas.find(r => r.id === id)?.nombre || `Receta #${id}`;

  const getNombreInsumo = (id: number) =>
    insumos.find(i => i.id === id)?.nombre || `Insumo #${id}`;

  const getUnidadInsumo = (id: number) =>
    insumos.find(i => i.id === id)?.unidadMedida || '';

  const getPrecioInsumo = (id: number) =>
    insumos.find(i => i.id === id)?.precioActual || 0;

  const ingredientesFiltrados = ingredientes.filter(i =>
    !filtroReceta || i.recetaId === Number(filtroReceta)
  );

  // Agrupar ingredientes por receta
  const ingredientesPorReceta = ingredientesFiltrados.reduce((acc, ingrediente) => {
    const recetaId = ingrediente.recetaId;
    if (!acc[recetaId]) acc[recetaId] = [];
    acc[recetaId].push(ingrediente);
    return acc;
  }, {} as Record<number, RecetaIngrediente[]>);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500">Cargando ingredientes...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">🥗 Ingredientes de Recetas</h1>
          <p className="text-sm text-gray-500 mt-1">
            {ingredientesFiltrados.length} ingrediente{ingredientesFiltrados.length !== 1 ? 's' : ''} registrado{ingredientesFiltrados.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link
          href="/receta-ingrediente/new"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <span className="text-lg">+</span>
          Nuevo Ingrediente
        </Link>
      </div>

      {/* Filtro */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <select
          value={filtroReceta}
          onChange={e => setFiltroReceta(e.target.value)}
          className="w-full md:w-1/2 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
        >
          <option value="">Todas las recetas</option>
          {recetas.map(r => (
            <option key={r.id} value={r.id}>{r.nombre}</option>
          ))}
        </select>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded mb-6 flex items-start gap-3">
          <span className="text-xl">⚠️</span>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Ingredientes agrupados por receta */}
      {Object.keys(ingredientesPorReceta).length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="text-6xl mb-4">🥗</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {filtroReceta ? 'Esta receta no tiene ingredientes' : 'No hay ingredientes registrados'}
          </h3>
          <p className="text-gray-500 text-sm mb-6">
            {filtroReceta
              ? 'Agrega insumos a esta receta'
              : 'Comienza agregando ingredientes a tus recetas'}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(ingredientesPorReceta).map(([recetaId, ingredientesReceta]) => {
            const receta = recetas.find(r => r.id === Number(recetaId));
            const costoTotal = ingredientesReceta.reduce((sum, i) => {
              const precio = getPrecioInsumo(i.insumoId);
              return sum + (i.cantidadRequerida * precio);
            }, 0);
            const costoPorPorcion = receta ? costoTotal / receta.porciones : 0;

            return (
              <div key={recetaId} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Header de la receta */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-100 border-b border-orange-200 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-white p-2 rounded-lg shadow-sm">
                        <span className="text-2xl">🍳</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {getNombreReceta(Number(recetaId))}
                        </h3>
                        {receta && (
                          <p className="text-sm text-gray-600">{receta.porciones} porciones</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 uppercase font-medium">Costo Total</p>
                      <p className="text-2xl font-bold text-orange-600">${costoTotal.toFixed(2)}</p>
                      {receta && (
                        <p className="text-xs text-gray-500 mt-1">
                          ${costoPorPorcion.toFixed(2)} por porción
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tabla de ingredientes */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ingrediente
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
                      {ingredientesReceta.map(ingrediente => {
                        const precio = getPrecioInsumo(ingrediente.insumoId);
                        const subtotal = ingrediente.cantidadRequerida * precio;
                        return (
                          <tr key={ingrediente.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">🥗</span>
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    {getNombreInsumo(ingrediente.insumoId)}
                                  </p>
                                  <p className="text-xs text-gray-500">ID: #{ingrediente.id}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <span className="text-sm font-semibold text-gray-900">
                                {ingrediente.cantidadRequerida} {getUnidadInsumo(ingrediente.insumoId)}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <span className="text-sm text-gray-900">${precio.toFixed(2)}</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <span className="text-sm font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => router.push(`/receta-ingrediente/${ingrediente.id}`)}
                                  className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors"
                                >
                                  ✏️ Editar
                                </button>
                                <button
                                  onClick={() => handleDelete(ingrediente.id)}
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