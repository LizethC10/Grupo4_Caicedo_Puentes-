'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { recetasService, recetaIngredienteService, insumosService } from '@/services';
import type { Receta } from '@/interfaces/receta.interface';
import type { RecetaIngrediente } from '@/interfaces/receta-ingrediente.interface';
import type { Insumo } from '@/interfaces/insumo.interface';

export default function DetalleRecetaPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [receta, setReceta] = useState<Receta | null>(null);
  const [ingredientes, setIngredientes] = useState<RecetaIngrediente[]>([]);
  const [insumos, setInsumos] = useState<Insumo[]>([]);
  const [form, setForm] = useState({ nombre: '', descripcion: '', porciones: '' });
  const [nuevoIngrediente, setNuevoIngrediente] = useState({ insumoId: '', cantidadRequerida: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      recetasService.findOne(id),
      recetaIngredienteService.findAll(),
      insumosService.findAll(),
    ]).then(([rec, ings, ins]) => {
      setReceta(rec);
      setForm({ nombre: rec.nombre, descripcion: rec.descripcion || '', porciones: String(rec.porciones) });
      setIngredientes(ings.filter(i => i.recetaId === id));
      setInsumos(ins);
    }).catch(() => setError('Error al cargar la receta'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await recetasService.update(id, {
        nombre: form.nombre,
        descripcion: form.descripcion || undefined,
        porciones: Number(form.porciones),
      });
      router.push('/recetas');
    } catch {
      setError('Error al actualizar la receta');
    } finally {
      setSaving(false);
    }
  };

  const handleAgregarIngrediente = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoIngrediente.insumoId || !nuevoIngrediente.cantidadRequerida) return;
    try {
      const creado = await recetaIngredienteService.create({
        recetaId: id,
        insumoId: Number(nuevoIngrediente.insumoId),
        cantidadRequerida: Number(nuevoIngrediente.cantidadRequerida),
      });
      setIngredientes([...ingredientes, creado]);
      setNuevoIngrediente({ insumoId: '', cantidadRequerida: '' });
    } catch {
      alert('Error al agregar ingrediente. Puede que ya exista en la receta.');
    }
  };

  const handleEliminarIngrediente = async (ingId: number) => {
    if (!confirm('¿Eliminar este ingrediente?')) return;
    try {
      await recetaIngredienteService.remove(ingId);
      setIngredientes(ingredientes.filter(i => i.id !== ingId));
    } catch {
      alert('Error al eliminar el ingrediente');
    }
  };

  const calcularCosto = () => {
    return ingredientes.reduce((total, ing) => {
      const insumo = insumos.find(i => i.id === ing.insumoId);
      if (!insumo) return total;
      return total + (insumo.precioActual * ing.cantidadRequerida);
    }, 0);
  };

  if (loading) return <p className="text-gray-500">Cargando...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!receta) return <p className="text-gray-500">Receta no encontrada</p>;

  const costoTotal = calcularCosto();
  const costoPorPorcion = receta.porciones > 0 ? costoTotal / receta.porciones : 0;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Editar Receta</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleUpdate} className="bg-white rounded-lg shadow p-6 space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.nombre}
            onChange={e => setForm({ ...form, nombre: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
          <textarea
            value={form.descripcion}
            onChange={e => setForm({ ...form, descripcion: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            rows={2}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Porciones</label>
          <input
            type="number"
            min="1"
            value={form.porciones}
            onChange={e => setForm({ ...form, porciones: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-700 disabled:opacity-50"
          >
            {saving ? 'Guardando...' : 'Actualizar'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/recetas')}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200"
          >
            Volver
          </button>
        </div>
      </form>

      {/* Cálculo de costos */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold text-orange-800 mb-2">💰 Cálculo de Costos</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-orange-600">Costo Total</p>
            <p className="text-2xl font-bold text-orange-800">${costoTotal.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-orange-600">Costo por Porción</p>
            <p className="text-2xl font-bold text-orange-800">${costoPorPorcion.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Ingredientes */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Ingredientes</h2>

        <form onSubmit={handleAgregarIngrediente} className="flex gap-2 mb-4">
          <select
            value={nuevoIngrediente.insumoId}
            onChange={e => setNuevoIngrediente({ ...nuevoIngrediente, insumoId: e.target.value })}
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Seleccionar insumo</option>
            {insumos.map(i => (
              <option key={i.id} value={i.id}>{i.nombre} ({i.unidadMedida})</option>
            ))}
          </select>
          <input
            type="number"
            min="0.01"
            step="0.01"
            placeholder="Cantidad"
            value={nuevoIngrediente.cantidadRequerida}
            onChange={e => setNuevoIngrediente({ ...nuevoIngrediente, cantidadRequerida: e.target.value })}
            className="w-28 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-700"
          >
            + Agregar
          </button>
        </form>

        {ingredientes.length === 0 ? (
          <p className="text-gray-500 text-sm">No hay ingredientes agregados</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Insumo</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Cantidad</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Precio Unit.</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Subtotal</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {ingredientes.map(ing => {
                const insumo = insumos.find(i => i.id === ing.insumoId);
                const subtotal = insumo ? insumo.precioActual * ing.cantidadRequerida : 0;
                return (
                  <tr key={ing.id}>
                    <td className="px-4 py-2 text-sm">{insumo?.nombre || `#${ing.insumoId}`}</td>
                    <td className="px-4 py-2 text-sm">{ing.cantidadRequerida} {insumo?.unidadMedida}</td>
                    <td className="px-4 py-2 text-sm">${insumo?.precioActual}</td>
                    <td className="px-4 py-2 text-sm font-medium">${subtotal.toFixed(2)}</td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleEliminarIngrediente(ing.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}