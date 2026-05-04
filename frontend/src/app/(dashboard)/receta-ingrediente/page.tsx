'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { recetaIngredienteService, recetasService, insumosService } from '@/services';
import type { RecetaIngrediente } from '@/interfaces/receta-ingrediente.interface';
import type { Receta } from '@/interfaces/receta.interface';
import type { Insumo } from '@/interfaces/insumo.interface';

export default function IngredientesPage() {
  const [ingredientes, setIngredientes] = useState<RecetaIngrediente[]>([]);
  const [recetas, setRecetas] = useState<Receta[]>([]);
  const [insumos, setInsumos] = useState<Insumo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    if (!confirm('¿Eliminar este ingrediente?')) return;
    try {
      await recetaIngredienteService.remove(id);
      setIngredientes(ingredientes.filter(i => i.id !== id));
    } catch {
      alert('Error al eliminar el ingrediente');
    }
  };

  const getNombreReceta = (recetaId: number) => {
    return recetas.find(r => r.id === recetaId)?.nombre || `#${recetaId}`;
  };

  const getNombreInsumo = (insumoId: number) => {
    return insumos.find(i => i.id === insumoId)?.nombre || `#${insumoId}`;
  };

  const getUnidadInsumo = (insumoId: number) => {
    return insumos.find(i => i.id === insumoId)?.unidadMedida || '';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Ingredientes de Recetas</h1>
        <Link
          href="/recetas"
          className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-700"
        >
          Gestionar desde Recetas
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Receta</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Insumo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cantidad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {ingredientes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    No hay ingredientes registrados
                  </td>
                </tr>
              ) : (
                ingredientes.map(ing => (
                  <tr key={ing.id}>
                    <td className="px-6 py-4 text-sm text-gray-900">{ing.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {getNombreReceta(ing.recetaId)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {getNombreInsumo(ing.insumoId)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {ing.cantidadRequerida} {getUnidadInsumo(ing.insumoId)}
                    </td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <button
                        onClick={() => handleDelete(ing.id)}
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