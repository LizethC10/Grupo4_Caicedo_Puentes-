'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { movimientosInventarioService, insumosService } from '@/services';
import type { Insumo } from '@/interfaces/insumo.interface';

export default function NuevoMovimientoPage() {
  const router = useRouter();
  const [insumos, setInsumos] = useState<Insumo[]>([]);
  const [form, setForm] = useState({
    insumoId: '',
    tipo: 'SALIDA',
    cantidad: '',
    motivo: '',
    fecha: new Date().toISOString().split('T')[0],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    insumosService.findAll().then(setInsumos);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.insumoId) {
      setError('Debes seleccionar un insumo');
      return;
    }
    if (!form.cantidad || Number(form.cantidad) <= 0) {
      setError('La cantidad debe ser mayor a cero');
      return;
    }
    if (!form.motivo) {
      setError('Debes especificar el motivo');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await movimientosInventarioService.create({
        insumoId: Number(form.insumoId),
        tipo: form.tipo as 'ENTRADA' | 'SALIDA',
        cantidad: Number(form.cantidad),
        motivo: form.motivo,
        fecha: new Date(form.fecha).toISOString(),
      });
      router.push('/movimientos-inventario');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error al registrar el movimiento');
    } finally {
      setLoading(false);
    }
  };

  const insumoSeleccionado = insumos.find(i => i.id === Number(form.insumoId));
  const nuevoStock = insumoSeleccionado
    ? form.tipo === 'ENTRADA'
      ? insumoSeleccionado.stockActual + Number(form.cantidad || 0)
      : insumoSeleccionado.stockActual - Number(form.cantidad || 0)
    : 0;

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">📊 Registrar Movimiento de Inventario</h1>
        <p className="text-sm text-gray-500 mt-1">
          Registra una salida manual (merma, ajuste, etc.)
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded mb-6 flex items-start gap-3">
          <span className="text-xl">⚠️</span>
          <p className="text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
        
        {/* Insumo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Insumo <span className="text-red-500">*</span>
          </label>
          <select
            value={form.insumoId}
            onChange={e => setForm({ ...form, insumoId: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            autoFocus
          >
            <option value="">Seleccionar insumo</option>
            {insumos.map(i => (
              <option key={i.id} value={i.id}>
                {i.nombre} - Stock: {i.stockActual} {i.unidadMedida}
              </option>
            ))}
          </select>
          {insumoSeleccionado && (
            <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-900 font-medium mb-1">Stock Disponible</p>
              <p className="text-2xl font-bold text-blue-700">
                {insumoSeleccionado.stockActual} {insumoSeleccionado.unidadMedida}
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tipo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Movimiento <span className="text-red-500">*</span>
            </label>
            <select
              value={form.tipo}
              onChange={e => setForm({ ...form, tipo: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="SALIDA">❌ SALIDA</option>
              <option value="ENTRADA">✅ ENTRADA</option>
            </select>
          </div>

          {/* Cantidad */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cantidad <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.cantidad}
                onChange={e => setForm({ ...form, cantidad: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="0"
              />
              {insumoSeleccionado && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400 text-sm">{insumoSeleccionado.unidadMedida}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Motivo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Motivo <span className="text-red-500">*</span>
          </label>
          <select
            value={form.motivo}
            onChange={e => setForm({ ...form, motivo: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Seleccionar motivo</option>
            <option value="Daño">🔨 Daño</option>
            <option value="Caducidad">📅 Caducidad</option>
            <option value="Error de preparación">⚠️ Error de preparación</option>
            <option value="Ajuste de inventario">📊 Ajuste de inventario</option>
            <option value="Uso en producción">🍳 Uso en producción</option>
            <option value="Devolución a proveedor">↩️ Devolución a proveedor</option>
            <option value="Otro">📝 Otro</option>
          </select>
        </div>

        {/* Fecha */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fecha
          </label>
          <input
            type="date"
            value={form.fecha}
            onChange={e => setForm({ ...form, fecha: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Resumen */}
        {insumoSeleccionado && form.cantidad && (
          <div className={`bg-gradient-to-r ${
            form.tipo === 'ENTRADA' ? 'from-green-50 to-green-100 border-green-200' : 'from-red-50 to-red-100 border-red-200'
          } rounded-lg border p-4`}>
            <h3 className={`text-sm font-semibold mb-3 ${
              form.tipo === 'ENTRADA' ? 'text-green-900' : 'text-red-900'
            }`}>
              📋 Resumen de la Operación
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <p className="text-xs text-gray-600 mb-1">Stock Actual</p>
                <p className="text-lg font-bold text-gray-900">
                  {insumoSeleccionado.stockActual} {insumoSeleccionado.unidadMedida}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <p className="text-xs text-gray-600 mb-1">Movimiento</p>
                <p className={`text-lg font-bold ${
                  form.tipo === 'ENTRADA' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {form.tipo === 'ENTRADA' ? '+' : '-'}{form.cantidad} {insumoSeleccionado.unidadMedida}
                </p>
              </div>
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <p className="text-xs text-gray-600 mb-1">Nuevo Stock</p>
                <p className={`text-lg font-bold ${
                  nuevoStock < 0 ? 'text-red-600' : nuevoStock <= insumoSeleccionado.stockMinimo ? 'text-orange-600' : 'text-green-600'
                }`}>
                  {nuevoStock} {insumoSeleccionado.unidadMedida}
                </p>
              </div>
            </div>
            {nuevoStock < 0 && (
              <div className="mt-3 bg-red-100 border border-red-300 rounded-lg p-3">
                <p className="text-xs text-red-800 font-medium">⚠️ Stock insuficiente</p>
              </div>
            )}
          </div>
        )}

        {/* Botones */}
        <div className="flex gap-3 pt-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:from-red-600 hover:to-red-700 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Guardando...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span>💾</span>
                Registrar {form.tipo === 'ENTRADA' ? 'Entrada' : 'Salida'}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => router.push('/movimientos-inventario')}
            className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}