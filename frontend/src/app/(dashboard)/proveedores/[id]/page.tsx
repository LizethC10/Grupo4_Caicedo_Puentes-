'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { proveedoresService } from '@/services';

export default function EditarProveedorPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [form, setForm] = useState({
    razonSocial: '',
    nit: '',
    telefono: '',
    email: '',
    tiempoEntregaDias: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    proveedoresService.findOne(id)
      .then(p => setForm({
        razonSocial: p.razonSocial,
        nit: p.nit,
        telefono: p.telefono || '',
        email: p.email || '',
        tiempoEntregaDias: String(p.tiempoEntregaDias),
      }))
      .catch(() => setError('Error al cargar el proveedor'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.razonSocial.trim()) {
      setError('El nombre del proveedor es obligatorio');
      return;
    }
    if (!form.telefono.trim() && !form.email.trim()) {
      setError('Debe ingresar al menos un dato de contacto (teléfono o email)');
      return;
    }
    if (!form.tiempoEntregaDias || Number(form.tiempoEntregaDias) <= 0) {
      setError('El tiempo de entrega debe ser un número entero positivo');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await proveedoresService.update(id, {
        razonSocial: form.razonSocial,
        nit: form.nit,
        telefono: form.telefono || undefined,
        email: form.email || undefined,
        tiempoEntregaDias: Number(form.tiempoEntregaDias),
      });
      router.push('/proveedores');
    } catch {
      setError('Error al actualizar el proveedor');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-gray-500">Cargando...</p>;

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Editar Proveedor</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Razón Social <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.razonSocial}
            onChange={e => setForm({ ...form, razonSocial: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">NIT</label>
          <input
            type="text"
            value={form.nit}
            onChange={e => setForm({ ...form, nit: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
          <input
            type="text"
            value={form.telefono}
            onChange={e => setForm({ ...form, telefono: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tiempo de Entrega (días) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            min="1"
            value={form.tiempoEntregaDias}
            onChange={e => setForm({ ...form, tiempoEntregaDias: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-700 disabled:opacity-50"
          >
            {saving ? 'Guardando...' : 'Actualizar'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/proveedores')}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}