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
      setOrdenes(ords.filter(o => o.estado === 'PENDIENTE'));
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
    if (!form.ordenCompraId || !form.insumoId || !form.cantidad) {
      setError('Orden, insumo y cantidad son obligatorios');
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
      setError('Error al crear el detalle. Puede que ya exista ese insumo en la orden.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Nuevo Detalle de Orden</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Orden de Compra <span className="text-red-500">*</span>
          </label>
          <select
            value={form.ordenCompraId}
            onChange={e => setForm({ ...form, ordenCompraId: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Seleccionar orden PENDIENTE</option>
            {ordenes.map(o => (
              <option key={o.id} value={o.id}>Orden #{o.id} — ${o.total}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Insumo <span className="text-red-500">*</span>
          </label>
          <select
            value={form.insumoId}
            onChange={e => handleInsumoChange(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Seleccionar insumo</option>
            {insumos.map(i => (
              <option key={i.id} value={i.id}>{i.nombre} ({i.unidadMedida})</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cantidad <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={form.cantidad}
              onChange={e => setForm({ ...form, cantidad: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Precio Unitario
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.precioUnitario}
              onChange={e => setForm({ ...form, precioUnitario: e.target.value })}
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
            onClick={() => router.push('/detalle-orden')}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}