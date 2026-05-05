'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { detalleOrdenService, ordenesCompraService, insumosService } from '@/services';
import type { OrdenCompra } from '@/interfaces/orden-compra.interface';
import type { Insumo } from '@/interfaces/insumo.interface';

export default function NuevoDetalleOrdenPage() {
  const router = useRouter();
  const [ordenes, setOrdenes] = useState<OrdenCompra[]>([]);
  const [insumos, setInsumos] = useState<Insumo[]>([]);
  const [form, setForm] = useState({
    ordenCompraId: '',
    insumoId: '',
    cantidad: '',
    precioUnitario: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      ordenesCompraService.findAll(),
      insumosService.findAll(),
    ]).then(([ords, ins]) => {
      setOrdenes(ords);
      setInsumos(ins);
    });
  }, []);

  const handleInsumoChange = (insumoId: string) => {
    const insumo = insumos.find(i => i.id === Number(insumoId));
    setForm({
      ...form,
      insumoId,
      precioUnitario: insumo ? String(insumo.precioActual) : '',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.ordenCompraId || !form.insumoId) {
      setError('La orden de compra y el insumo son obligatorios');
      return;
    }
    if (!form.cantidad || Number(form.cantidad) <= 0) {
      setError('La cantidad debe ser mayor a cero');
      return;
    }
    if (!form.precioUnitario || Number(form.precioUnitario) <= 0) {
      setError('El precio unitario debe ser mayor a cero');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await detalleOrdenService.create({
        ordenCompraId: Number(form.ordenCompraId),
        insumoId: Number(form.insumoId),
        cantidad: Number(form.cantidad),
        precioUnitario: Number(form.precioUnitario),
      });
      router.push('/detalle-orden');
    } catch {
      setError('Error al crear el detalle. Puede que este insumo ya esté en la orden.');
    } finally {
      setLoading(false);
    }
  };

  const insumoSeleccionado = insumos.find(i => i.id === Number(form.insumoId));
  const ordenSeleccionada = ordenes.find(o => o.id === Number(form.ordenCompraId));
  const subtotal = Number(form.cantidad || 0) * Number(form.precioUnitario || 0);

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">📝 Nuevo Detalle de Orden</h1>
        <p className="text-sm text-gray-500 mt-1">
          Agrega un insumo a una orden de compra existente
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded mb-6 flex items-start gap-3">
          <span className="text-xl">⚠️</span>
          <p className="text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
        
        {/* Orden de Compra */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Orden de Compra <span className="text-red-500">*</span>
          </label>
          <select
            value={form.ordenCompraId}
            onChange={e => setForm({ ...form, ordenCompraId: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            autoFocus
          >
            <option value="">Seleccionar orden de compra</option>
            {ordenes.map(o => (
              <option key={o.id} value={o.id}>
                Orden #{o.id} - {new Date(o.fechaEmision).toLocaleDateString('es-CO')} - {o.estado}
              </option>
            ))}
          </select>
          {ordenSeleccionada && (
            <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
              <span>📋</span>
              Total actual de la orden: <span className="font-semibold">${ordenSeleccionada.total.toFixed(2)}</span>
            </p>
          )}
        </div>

        {/* Insumo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Insumo <span className="text-red-500">*</span>
          </label>
          <select
            value={form.insumoId}
            onChange={e => handleInsumoChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          >
            <option value="">Seleccionar insumo</option>
            {insumos.map(i => (
              <option key={i.id} value={i.id}>
                {i.nombre} - {i.unidadMedida} - Precio: ${i.precioActual.toFixed(2)}
              </option>
            ))}
          </select>
          {insumoSeleccionado && (
            <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-xs text-blue-900 font-medium mb-1">Información del Insumo</p>
              <div className="grid grid-cols-2 gap-2 text-xs text-blue-700">
                <div>
                  <span className="font-medium">Stock actual:</span> {insumoSeleccionado.stockActual} {insumoSeleccionado.unidadMedida}
                </div>
                <div>
                  <span className="font-medium">Precio:</span> ${insumoSeleccionado.precioActual.toFixed(2)}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="0"
              />
              {insumoSeleccionado && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-400 text-sm">{insumoSeleccionado.unidadMedida}</span>
                </div>
              )}
            </div>
          </div>

          {/* Precio Unitario */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Precio Unitario ($) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400 text-sm">$</span>
              </div>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.precioUnitario}
                onChange={e => setForm({ ...form, precioUnitario: e.target.value })}
                className="w-full pl-8 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="0.00"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Se precargó el precio actual del insumo
            </p>
          </div>
        </div>

        {/* Subtotal */}
        {form.cantidad && form.precioUnitario && (
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-900">Subtotal del Detalle</p>
                <p className="text-xs text-green-700 mt-1">
                  {form.cantidad} {insumoSeleccionado?.unidadMedida || 'unidades'} × ${Number(form.precioUnitario).toFixed(2)}
                </p>
              </div>
              <p className="text-2xl font-bold text-green-700">
                ${subtotal.toFixed(2)}
              </p>
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
                Guardar Detalle
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => router.push('/detalle-orden')}
            className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>

      {/* Información adicional */}
      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <span className="text-xl">ℹ️</span>
          <div>
            <p className="text-sm font-medium text-yellow-900 mb-1">Importante</p>
            <ul className="text-xs text-yellow-700 space-y-1 list-disc list-inside">
              <li>No puedes agregar el mismo insumo dos veces a la misma orden</li>
              <li>El precio se precarga pero puedes modificarlo si es necesario</li>
              <li>Asegúrate de que la orden de compra esté en estado correcto</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}