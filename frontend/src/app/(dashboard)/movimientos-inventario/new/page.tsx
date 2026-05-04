'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { movimientosInventarioService, insumosService } from '@/services';
import type { Insumo } from '@/interfaces/insumo.interface';

const MOTIVOS = [
  'Daño',
  'Caducidad',
  'Error de preparación',
  'Ajuste de inventario',
  'Uso en producción',
];

export default function NuevoMovimientoPage() {
  const router = useRouter();
  const [insumos, setInsumos] = useState<Insumo[]>([]);
  const [form, setForm] = useState({
    insumoId: '',
    cantidad: '',
    motivo: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    insumosService.findAll().then(setInsumos);
  }, []);

  const insumoSeleccionado = insumos.find(i => i.id === Number(form.insumoId));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.insumoId || !form.cantidad || !form.motivo) {
      setError('Todos los campos son obligatorios');
      return;
    }
    if (Number(form.cantidad) <= 0) {
      setError('La cantidad debe ser mayor a cero');
      return;
    }
    if (insumoSeleccionado && Number(form.cantidad) > insumoSeleccionado.stockActual) {
      setError(`Stock insuficiente. Stock actual: ${insumoSeleccionado.stockActual} ${insumoSeleccionado.unidadMedida}`);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await movimientosInventarioService.create({
        insumoId: Number(form.insumoId),
        tipo: 'SALIDA',
        cantidad: Number(form.cantidad),
        fecha: new Date().toISOString(),
        motivo: form.motivo,
      });
      router.push('/movimientos-inventario');
    } catch {
      setError('Error al registrar el movimiento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold mb-2">Registrar Merma o Ajuste</h1>
      <p className="text-gray-500 text-sm mb-6">
        Registra una salida manual de inventario por daño, caducidad o ajuste.
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-4">

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Insumo <span className="text-red-500">*</span>
          </label>
          <select
            value={form.insumoId}
            onChange={e => setForm({ ...form, insumoId: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Seleccionar insumo</option>
            {insumos.map(i => (
              <option key={i.id} value={i.id}>
                {i.nombre} — Stock: {i.stockActual} {i.unidadMedida}
              </option>
            ))}
          </select>
          {insumoSeleccionado && (
            <p className="text-xs text-gray-500 mt-1">
              Stock disponible: <span className="font-medium">{insumoSeleccionado.stockActual} {insumoSeleccionado.unidadMedida}</span>
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cantidad a descontar <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={form.cantidad}
            onChange={e => setForm({ ...form, cantidad: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Ej: 2.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Motivo <span className="text-red-500">*</span>
          </label>
          <select
            value={form.motivo}
            onChange={e => setForm({ ...form, motivo: e.target.value })}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="">Seleccionar motivo</option>
            {MOTIVOS.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        {/* Resumen */}
        {form.insumoId && form.cantidad && form.motivo && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-700 font-medium">⚠️ Resumen de la operación:</p>
            <p className="text-sm text-red-600">
              Se descontarán <strong>{form.cantidad} {insumoSeleccionado?.unidadMedida}</strong> de <strong>{insumoSeleccionado?.nombre}</strong>
            </p>
            <p className="text-sm text-red-600">Motivo: <strong>{form.motivo}</strong></p>
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? 'Registrando...' : 'Registrar Salida'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/movimientos-inventario')}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}