'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ordenesCompraService, proveedoresService, insumosService } from '@/services';
import type { Proveedor } from '@/interfaces/proveedor.interface';
import type { Insumo } from '@/interfaces/insumo.interface';

interface InsumoSeleccionado {
  insumoId: number;
  cantidad: number;
  precioUnitario: number;
}

export default function NuevaOrdenCompraPage() {
  const router = useRouter();
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [insumos, setInsumos] = useState<Insumo[]>([]);
  const [form, setForm] = useState({
    proveedorId: '',
    fechaEmision: new Date().toISOString().split('T')[0],
    estado: 'PENDIENTE',
  });
  const [insumosSeleccionados, setInsumosSeleccionados] = useState<InsumoSeleccionado[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      proveedoresService.findAll(),
      insumosService.findAll(),
    ]).then(([provs, ins]) => {
      setProveedores(provs);
      setInsumos(ins);
    });
  }, []);

  const agregarInsumo = () => {
    setInsumosSeleccionados([
      ...insumosSeleccionados,
      { insumoId: 0, cantidad: 0, precioUnitario: 0 },
    ]);
  };

  const actualizarInsumo = (index: number, campo: keyof InsumoSeleccionado, valor: number) => {
    const nuevos = [...insumosSeleccionados];
    nuevos[index][campo] = valor;
    setInsumosSeleccionados(nuevos);
  };

  const eliminarInsumo = (index: number) => {
    setInsumosSeleccionados(insumosSeleccionados.filter((_, i) => i !== index));
  };

  const calcularTotal = () => {
    return insumosSeleccionados.reduce((sum, item) => sum + (item.cantidad * item.precioUnitario), 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.proveedorId) {
      setError('Debe seleccionar un proveedor');
      return;
    }
    if (insumosSeleccionados.length === 0) {
      setError('Debe agregar al menos un insumo');
      return;
    }
    if (insumosSeleccionados.some(i => !i.insumoId || i.cantidad <= 0 || i.precioUnitario <= 0)) {
      setError('Todos los insumos deben tener cantidad y precio válidos');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const total = calcularTotal();
      await ordenesCompraService.create({
        proveedorId: Number(form.proveedorId),
        fechaEmision: form.fechaEmision,
        estado: form.estado as 'PENDIENTE' | 'RECIBIDA' | 'CANCELADA',
        total,
      });
      router.push('/ordenes-compra');
    } catch {
      setError('Error al crear la orden de compra');
    } finally {
      setLoading(false);
    }
  };

  const getNombreInsumo = (id: number) => {
    const insumo = insumos.find(i => i.id === id);
    return insumo ? `${insumo.nombre} (${insumo.unidadMedida})` : 'Seleccionar insumo';
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">📋 Nueva Orden de Compra</h1>

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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Proveedor <span className="text-red-500">*</span>
              </label>
              <select
                value={form.proveedorId}
                onChange={e => setForm({ ...form, proveedorId: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Seleccionar proveedor</option>
                {proveedores.map(p => (
                  <option key={p.id} value={p.id}>{p.razonSocial}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de Emisión <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={form.fechaEmision}
                onChange={e => setForm({ ...form, fechaEmision: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estado</label>
              <select
                value={form.estado}
                onChange={e => setForm({ ...form, estado: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="PENDIENTE">⏳ PENDIENTE</option>
                <option value="RECIBIDA">✅ RECIBIDA</option>
                <option value="CANCELADA">❌ CANCELADA</option>
              </select>
            </div>
          </div>
        </div>

        {/* Insumos */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Insumos</h2>
            <button
              type="button"
              onClick={agregarInsumo}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
            >
              <span className="text-lg">+</span>
              Agregar Insumo
            </button>
          </div>

          {insumosSeleccionados.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-4xl mb-2">📦</p>
              <p className="text-sm text-gray-500">No hay insumos agregados</p>
              <button
                type="button"
                onClick={agregarInsumo}
                className="mt-3 text-sm text-orange-600 hover:text-orange-800 font-medium"
              >
                Agregar el primer insumo
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {insumosSeleccionados.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-3 items-end p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="col-span-5">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Insumo</label>
                    <select
                      value={item.insumoId}
                      onChange={e => actualizarInsumo(index, 'insumoId', Number(e.target.value))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="0">Seleccionar insumo</option>
                      {insumos.map(i => (
                        <option key={i.id} value={i.id}>{getNombreInsumo(i.id)}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Cantidad</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.cantidad || ''}
                      onChange={e => actualizarInsumo(index, 'cantidad', Number(e.target.value))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="0"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Precio Unit.</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.precioUnitario || ''}
                      onChange={e => actualizarInsumo(index, 'precioUnitario', Number(e.target.value))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="0.00"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Subtotal</label>
                    <div className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm font-semibold text-gray-900">
                      ${(item.cantidad * item.precioUnitario).toFixed(2)}
                    </div>
                  </div>

                  <div className="col-span-1">
                    <button
                      type="button"
                      onClick={() => eliminarInsumo(index)}
                      className="w-full bg-red-50 text-red-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Total */}
        {insumosSeleccionados.length > 0 && (
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border border-orange-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total de la Orden</p>
                <p className="text-xs text-gray-500 mt-1">{insumosSeleccionados.length} insumo{insumosSeleccionados.length !== 1 ? 's' : ''}</p>
              </div>
              <p className="text-3xl font-bold text-orange-600">
                ${calcularTotal().toFixed(2)}
              </p>
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
            {loading ? 'Guardando...' : 'Guardar Orden'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/ordenes-compra')}
            className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}