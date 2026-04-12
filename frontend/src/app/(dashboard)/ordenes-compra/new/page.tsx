'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ordenesCompraService, proveedoresService } from '@/services';
import type { Proveedor } from '@/interfaces/proveedor.interface';

export default function NuevaOrdenCompraPage() {
  const router = useRouter();
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [form, setForm] = useState({
    proveedorId: '',
    fechaEmision: new Date().toISOString().split('T')[0],
    estado: 'PENDIENTE',
    total: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    proveedoresService.findAll().then(setProveedores);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.proveedorId) {
      setError('Debe seleccionar un proveedor');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await ordenesCompraService.create({
        proveedorId: Number(form.proveedorId),
        fechaEmision: form.fechaEmision,
        estado: form.estado as 'PENDIENTE' | 'RECIBIDA' | 'CANCELADA',
        total: Number(form.total),
      });
      router.push('/ordenes-compra');
    } catch {
      setError('Error al crear la orden de compra');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Nueva Orden de Compra</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Proveedor <span className="text-red-500">*</span>
          </label>
          <select
            value={form.proveedorId}
            onChange={e => setForm({ ...form, proveedorId: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Seleccionar proveedor</option>
            {proveedores.map(p => (
              <option key={p.id} value={p.id}>{p.razonSocial}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha de Emisión <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={form.fechaEmision}
            onChange={e => setForm({ ...form, fechaEmision: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
          <select
            value={form.estado}
            onChange={e => setForm({ ...form, estado: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="PENDIENTE">PENDIENTE</option>
            <option value="RECIBIDA">RECIBIDA</option>
            <option value="CANCELADA">CANCELADA</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Total</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={form.total}
            onChange={e => setForm({ ...form, total: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="0.00"
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
            onClick={() => router.push('/ordenes-compra')}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}