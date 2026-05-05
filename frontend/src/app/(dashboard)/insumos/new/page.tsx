'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { insumosService, categoriasService } from '@/services';
import type { Categoria } from '@/interfaces/categoria.interface';

export default function NuevoInsumoPage() {
  const router = useRouter();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [form, setForm] = useState({
    nombre: '',
    categoriaId: '',
    unidadMedida: '',
    precioActual: '',
    stockActual: '',
    stockMinimo: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    categoriasService.findAll().then(setCategorias);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.categoriaId || !form.unidadMedida) {
      setError('Los campos Nombre, Categoría y Unidad de Medida son obligatorios');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await insumosService.create({
        nombre: form.nombre,
        categoriaId: Number(form.categoriaId),
        unidadMedida: form.unidadMedida,
        precioActual: Number(form.precioActual) || 0,
        stockActual: Number(form.stockActual) || 0,
        stockMinimo: Number(form.stockMinimo) || 0,
      });
      router.push('/insumos');
    } catch {
      setError('Error al crear el insumo. El nombre puede estar duplicado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">📦 Nuevo Insumo</h1>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded mb-6 flex items-start gap-3">
          <span className="text-xl">⚠️</span>
          <p className="text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Nombre */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre del Insumo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.nombre}
              onChange={e => setForm({ ...form, nombre: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Ej: Carne molida, Arroz, Aceite de oliva"
            />
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoría <span className="text-red-500">*</span>
            </label>
            <select
              value={form.categoriaId}
              onChange={e => setForm({ ...form, categoriaId: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Seleccionar categoría</option>
              {categorias.map(c => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </select>
          </div>

          {/* Unidad de Medida */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Unidad de Medida <span className="text-red-500">*</span>
            </label>
            <select
              value={form.unidadMedida}
              onChange={e => setForm({ ...form, unidadMedida: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Seleccionar unidad</option>
              <option value="kg">Kilogramos (kg)</option>
              <option value="g">Gramos (g)</option>
              <option value="l">Litros (l)</option>
              <option value="ml">Mililitros (ml)</option>
              <option value="unidad">Unidades</option>
              <option value="caja">Cajas</option>
              <option value="paquete">Paquetes</option>
            </select>
          </div>

          {/* Precio Actual */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Precio Unitario ($)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.precioActual}
              onChange={e => setForm({ ...form, precioActual: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="0.00"
            />
          </div>

          {/* Stock Actual */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stock Actual
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.stockActual}
              onChange={e => setForm({ ...form, stockActual: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="0"
            />
          </div>

          {/* Stock Mínimo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stock Mínimo
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.stockMinimo}
              onChange={e => setForm({ ...form, stockMinimo: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="0"
            />
            <p className="text-xs text-gray-500 mt-1">Se activará alerta cuando el stock esté por debajo</p>
          </div>
        </div>

        {/* Botones */}
        <div className="flex gap-3 pt-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 transition-all"
          >
            {loading ? 'Guardando...' : 'Guardar Insumo'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/insumos')}
            className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}