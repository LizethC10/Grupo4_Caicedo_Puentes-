'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { detalleOrdenService } from '@/services';
import type { DetalleOrden } from '@/interfaces/detalle-orden.interface';

export default function EditarDetalleOrdenPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const [detalle, setDetalle] = useState<DetalleOrden | null>(null);
  const [cantidad, setCantidad] = useState('');
  const [precioUnitario, setPrecioUnitario] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    detalleOrdenService.findOne(id).then((data) => {
      setDetalle(data);
      setCantidad(String(data.cantidad));
      setPrecioUnitario(String(data.precioUnitario));
    }).catch(() => setError('No fue posible cargar el detalle de la orden.'));
  }, [id]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await detalleOrdenService.update(id, { cantidad: Number(cantidad), precioUnitario: Number(precioUnitario) });
      router.push('/detalle-orden');
    } catch {
      setError('No fue posible guardar los cambios.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="max-w-lg rounded-xl bg-white p-6 shadow-sm">
      <h1 className="mb-2 text-2xl font-bold">Editar detalle de orden</h1>
      <p className="mb-6 text-sm text-gray-500">{detalle ? `Orden #${detalle.ordenCompraId} · Insumo #${detalle.insumoId}` : 'Cargando…'}</p>
      {error && <p role="alert" className="mb-4 rounded bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      {detalle && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium">Cantidad
            <input required min="0.001" step="0.001" type="number" value={cantidad} onChange={(event) => setCantidad(event.target.value)} className="mt-1 w-full rounded border px-3 py-2" />
          </label>
          <label className="block text-sm font-medium">Precio unitario
            <input required min="0.01" step="0.01" type="number" value={precioUnitario} onChange={(event) => setPrecioUnitario(event.target.value)} className="mt-1 w-full rounded border px-3 py-2" />
          </label>
          <div className="flex gap-3">
            <button disabled={saving} className="rounded bg-orange-600 px-4 py-2 text-white disabled:opacity-50">{saving ? 'Guardando…' : 'Guardar'}</button>
            <button type="button" onClick={() => router.push('/detalle-orden')} className="rounded bg-gray-100 px-4 py-2">Cancelar</button>
          </div>
        </form>
      )}
    </main>
  );
}
