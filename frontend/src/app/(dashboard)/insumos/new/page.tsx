'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { insumosService, categoriasService } from '@/services';
import type { Categoria } from '@/interfaces/categoria.interface';

const UNIDADES = ['kg', 'gr', 'lts', 'ml', 'unidad'];

export default function NuevoInsumoPage() {
  const router = useRouter();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [form, setForm] = useState({
    nombre: '',
    unidadMedida: 'kg',
    precioActual: '',
    stockActual: '',
    stockMinimo: '',
    categoriaId: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    categoriasService.findAll().then(setCategorias);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.categoriaId || !form.unidadMedida || !form.stockMinimo) {
      setError('Nombre, Categoría, Unidad de Medida y Stock Mínimo son obligatorios');
      return;
    }
    if (Number(form.stockActual) < 0 || Number(form.stockMinimo) < 0) {
      setError('El stock no puede ser negativo');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await insumosService.create({
        nombre: form.nombre,
        unidadMedida: form.unidadMedida,
        precioActual: Number(form.precioActual),
        stockActual: Number(form.stockActual),
        stockMinimo: Number(form.stockMinimo),
        categoriaId: Number(form.categoriaId),
      });
      router.push('/insumos');
    } catch {
      setError('Error al crear el insumo. Puede que el nombre ya exista.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Nuevo Insumo</h1>

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
            placeholder="Ej: Harina de trigo"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categoría <span className="text-red-500">*</span>
          </label>
          <select
            value={form.categoriaId}
            onChange={e => setForm({ ...form, categoriaId: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Seleccionar categoría</option>
            {categorias.map(c => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Unidad de Medida <span className="text-red-500">*</span>
          </label>
          <select
            value={form.unidadMedida}
            onChange={e => setForm({ ...form, unidadMedida: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {UNIDADES.map(u => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Precio Actual
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.precioActual}
              onChange={e => setForm({ ...form, precioActual: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stock Actual
            </label>
            <input
              type="number"
              min="0"
              value={form.stockActual}
              onChange={e => setForm({ ...form, stockActual: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stock Mínimo <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              value={form.stockMinimo}
              onChange={e => setForm({ ...form, stockMinimo: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
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
            onClick={() => router.push('/insumos')}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}