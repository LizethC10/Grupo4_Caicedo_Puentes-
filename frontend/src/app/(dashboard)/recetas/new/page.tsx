'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { recetasService } from '@/services';

export default function NuevaRecetaPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    porciones: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre.trim()) {
      setError('El nombre es obligatorio');
      return;
    }
    if (!form.porciones || Number(form.porciones) <= 0) {
      setError('Las porciones deben ser un número positivo');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await recetasService.create({
        nombre: form.nombre,
        descripcion: form.descripcion || undefined,
        porciones: Number(form.porciones),
      });
      router.push('/recetas');
    } catch {
      setError('Error al crear la receta. Puede que el nombre ya exista.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Nueva Receta</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nombre <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.nombre}
            onChange={e => setForm({ ...form, nombre: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Ej: Pizza Margherita"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <textarea
            value={form.descripcion}
            onChange={e => setForm({ ...form, descripcion: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            rows={3}
            placeholder="Descripción opcional"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Porciones <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            min="1"
            value={form.porciones}
            onChange={e => setForm({ ...form, porciones: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Ej: 4"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-700 disabled:opacity-50"
          >
            {loading ? 'Guardando...' : 'Guardar'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/recetas')}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}