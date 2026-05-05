'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { recetasService, insumosService, recetaIngredienteService } from '@/services';
import type { Insumo } from '@/interfaces/insumo.interface';

interface IngredienteSeleccionado {
  insumoId: number;
  cantidadRequerida: number;
}

export default function NuevaRecetaPage() {
  const router = useRouter();
  const [insumos, setInsumos] = useState<Insumo[]>([]);
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    porciones: '',
  });
  const [ingredientes, setIngredientes] = useState<IngredienteSeleccionado[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    insumosService.findAll().then(setInsumos);
  }, []);

  const agregarIngrediente = () => {
    setIngredientes([...ingredientes, { insumoId: 0, cantidadRequerida: 0 }]);
  };

  const actualizarIngrediente = (index: number, campo: keyof IngredienteSeleccionado, valor: number) => {
    const nuevos = [...ingredientes];
    nuevos[index][campo] = valor;
    setIngredientes(nuevos);
  };

  const eliminarIngrediente = (index: number) => {
    setIngredientes(ingredientes.filter((_, i) => i !== index));
  };

  const calcularCostoTotal = () => {
    return ingredientes.reduce((sum, ing) => {
      const insumo = insumos.find(i => i.id === ing.insumoId);
      return sum + (ing.cantidadRequerida * (insumo?.precioActual || 0));
    }, 0);
  };

  const calcularCostoPorPorcion = () => {
    const total = calcularCostoTotal();
    const porciones = Number(form.porciones) || 1;
    return total / porciones;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre) {
      setError('El nombre de la receta es obligatorio');
      return;
    }
    if (!form.porciones || Number(form.porciones) <= 0) {
      setError('Las porciones deben ser mayor a cero');
      return;
    }
    if (ingredientes.length === 0) {
      setError('Debes agregar al menos un ingrediente');
      return;
    }
    if (ingredientes.some(i => !i.insumoId || i.cantidadRequerida <= 0)) {
      setError('Todos los ingredientes deben tener cantidad válida');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // 1. Crear la receta
      const receta = await recetasService.create({
        nombre: form.nombre,
        descripcion: form.descripcion || undefined,
        porciones: Number(form.porciones),
      });

      // 2. Crear cada ingrediente
      for (const ing of ingredientes) {
        await recetaIngredienteService.create({
          recetaId: receta.id,
          insumoId: ing.insumoId,
          cantidadRequerida: ing.cantidadRequerida,
        });
      }

      router.push('/recetas');
    } catch {
      setError('Error al crear la receta. El nombre puede estar duplicado.');
    } finally {
      setLoading(false);
    }
  };

  const getInsumo = (id: number) => insumos.find(i => i.id === id);

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">🍳 Nueva Receta</h1>
        <p className="text-sm text-gray-500 mt-1">
          Crea una nueva receta con sus ingredientes
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded mb-6 flex items-start gap-3">
          <span className="text-xl">⚠️</span>
          <p className="text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Información general */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Información General</h2>
          
          <div className="space-y-4">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de la Receta <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.nombre}
                onChange={e => setForm({ ...form, nombre: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Ej: Arroz con Pollo, Pasta Carbonara..."
                autoFocus
              />
            </div>

            {/* Descripción y Porciones */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción <span className="text-gray-400 text-xs">(opcional)</span>
                </label>
                <textarea
                  value={form.descripcion}
                  onChange={e => setForm({ ...form, descripcion: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                  rows={3}
                  placeholder="Describe brevemente esta receta..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de Porciones <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400">👥</span>
                  </div>
                  <input
                    type="number"
                    min="1"
                    value={form.porciones}
                    onChange={e => setForm({ ...form, porciones: e.target.value })}
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Ej: 4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ingredientes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Ingredientes</h2>
            <button
              type="button"
              onClick={agregarIngrediente}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
            >
              <span className="text-lg">+</span>
              Agregar Ingrediente
            </button>
          </div>

          {ingredientes.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-4xl mb-2">🥗</p>
              <p className="text-sm text-gray-500">No hay ingredientes agregados</p>
              <button
                type="button"
                onClick={agregarIngrediente}
                className="mt-3 text-sm text-orange-600 hover:text-orange-800 font-medium"
              >
                Agregar el primer ingrediente
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {ingredientes.map((item, index) => {
                const insumo = getInsumo(item.insumoId);
                const subtotal = item.cantidadRequerida * (insumo?.precioActual || 0);

                return (
                  <div key={index} className="grid grid-cols-12 gap-3 items-end p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="col-span-6">
                      <label className="block text-xs font-medium text-gray-600 mb-1">Ingrediente</label>
                      <select
                        value={item.insumoId}
                        onChange={e => actualizarIngrediente(index, 'insumoId', Number(e.target.value))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="0">Seleccionar ingrediente</option>
                        {insumos.map(i => (
                          <option key={i.id} value={i.id}>
                            {i.nombre} ({i.unidadMedida}) - ${i.precioActual.toFixed(2)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1">Cantidad</label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.cantidadRequerida || ''}
                        onChange={e => actualizarIngrediente(index, 'cantidadRequerida', Number(e.target.value))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="0"
                      />
                    </div>

                    <div className="col-span-1">
                      <label className="block text-xs font-medium text-gray-600 mb-1">Unidad</label>
                      <div className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-600 text-center">
                        {insumo?.unidadMedida || '-'}
                      </div>
                    </div>

                    <div className="col-span-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1">Subtotal</label>
                      <div className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm font-semibold text-gray-900">
                        ${subtotal.toFixed(2)}
                      </div>
                    </div>

                    <div className="col-span-1">
                      <button
                        type="button"
                        onClick={() => eliminarIngrediente(index)}
                        className="w-full bg-red-50 text-red-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Resumen de costos */}
        {ingredientes.length > 0 && form.porciones && (
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200 p-6">
            <h3 className="text-sm font-semibold text-green-900 mb-3">💰 Resumen de Costos</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <p className="text-xs text-gray-600 mb-1">Costo Total</p>
                <p className="text-2xl font-bold text-gray-900">${calcularCostoTotal().toFixed(2)}</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <p className="text-xs text-gray-600 mb-1">Porciones</p>
                <p className="text-2xl font-bold text-gray-900">{form.porciones}</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-green-200">
                <p className="text-xs text-gray-600 mb-1">Costo por Porción</p>
                <p className="text-2xl font-bold text-orange-600">${calcularCostoPorPorcion().toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}

        {/* Botones */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 transition-all shadow-lg"
          >
            {loading ? 'Guardando...' : 'Guardar Receta'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/recetas')}
            className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}