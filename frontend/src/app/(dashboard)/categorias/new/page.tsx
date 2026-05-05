'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { categoriasService } from '@/services';

export default function NuevaCategoriaPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre) {
      setError('El nombre de la categoría es obligatorio');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await categoriasService.create(form);
      router.push('/categorias');
    } catch {
      setError('Error al crear la categoría. El nombre puede estar duplicado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">🏷️ Nueva Categoría</h1>
        <p className="text-sm text-gray-500 mt-1">
          Crea una nueva categoría para organizar tus insumos
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded mb-6 flex items-start gap-3">
          <span className="text-xl">⚠️</span>
          <p className="text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
        
        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre de la Categoría <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.nombre}
            onChange={e => setForm({ ...form, nombre: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            placeholder="Ej: Carnes, Lácteos, Verduras, Bebidas..."
            autoFocus
          />
          <p className="text-xs text-gray-500 mt-1">
            El nombre debe ser único y descriptivo
          </p>
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descripción <span className="text-gray-400 text-xs">(opcional)</span>
          </label>
          <textarea
            value={form.descripcion}
            onChange={e => setForm({ ...form, descripcion: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
            rows={4}
            placeholder="Describe brevemente qué tipo de insumos pertenecen a esta categoría..."
          />
          <p className="text-xs text-gray-500 mt-1">
            Máximo 200 caracteres
          </p>
        </div>

        {/* Preview */}
        {form.nombre && (
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200 p-4">
            <p className="text-xs text-orange-700 uppercase font-medium mb-2">Vista Previa</p>
            <div className="bg-white rounded-lg p-4 border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🏷️</span>
                <h3 className="text-lg font-semibold text-gray-900">{form.nombre}</h3>
              </div>
              {form.descripcion && (
                <p className="text-sm text-gray-600">{form.descripcion}</p>
              )}
            </div>
          </div>
        )}

        {/* Botones */}
        <div className="flex gap-3 pt-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Guardando...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span>💾</span>
                Guardar Categoría
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => router.push('/categorias')}
            className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>

      {/* Consejos */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-xl">💡</span>
          <div>
            <p className="text-sm font-medium text-blue-900 mb-1">Consejos para crear categorías</p>
            <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
              <li>Usa nombres cortos y descriptivos</li>
              <li>Evita crear categorías muy similares</li>
              <li>Piensa en cómo organizarás tus insumos a largo plazo</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}