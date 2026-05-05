'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { proveedoresService } from '@/services';

export default function NuevoProveedorPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    razonSocial: '',
    nit: '',
    telefono: '',
    email: '',
    tiempoEntregaDias: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.razonSocial) {
      setError('La razón social es obligatoria');
      return;
    }
    if (!form.tiempoEntregaDias) {
      setError('El tiempo de entrega es obligatorio');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await proveedoresService.create({
        razonSocial: form.razonSocial,
        nit: form.nit || undefined,
        telefono: form.telefono || undefined,
        email: form.email || undefined,
        tiempoEntregaDias: Number(form.tiempoEntregaDias),
      });
      router.push('/proveedores');
    } catch {
      setError('Error al crear el proveedor. El NIT puede estar duplicado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">🚚 Nuevo Proveedor</h1>
        <p className="text-sm text-gray-500 mt-1">
          Registra un nuevo proveedor para tus órdenes de compra
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded mb-6 flex items-start gap-3">
          <span className="text-xl">⚠️</span>
          <p className="text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
        
        {/* Información básica */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200 pb-2">
            Información Básica
          </h3>

          {/* Razón Social */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Razón Social <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.razonSocial}
              onChange={e => setForm({ ...form, razonSocial: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              placeholder="Ej: Distribuidora ABC S.A.S."
              autoFocus
            />
          </div>

          {/* NIT */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              NIT <span className="text-gray-400 text-xs">(opcional)</span>
            </label>
            <input
              type="text"
              value={form.nit}
              onChange={e => setForm({ ...form, nit: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              placeholder="Ej: 900123456-7"
            />
          </div>
        </div>

        {/* Información de contacto */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200 pb-2">
            Información de Contacto
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Teléfono */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono <span className="text-gray-400 text-xs">(opcional)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">📞</span>
                </div>
                <input
                  type="tel"
                  value={form.telefono}
                  onChange={e => setForm({ ...form, telefono: e.target.value })}
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="Ej: 3001234567"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico <span className="text-gray-400 text-xs">(opcional)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-400">📧</span>
                </div>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="Ej: ventas@proveedor.com"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Información logística */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200 pb-2">
            Información Logística
          </h3>

          {/* Tiempo de entrega */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tiempo de Entrega (días) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400">⏱️</span>
              </div>
              <input
                type="number"
                min="1"
                value={form.tiempoEntregaDias}
                onChange={e => setForm({ ...form, tiempoEntregaDias: e.target.value })}
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                placeholder="Ej: 3"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Días hábiles estimados para la entrega
            </p>
          </div>
        </div>

        {/* Preview */}
        {form.razonSocial && (
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200 p-4">
            <p className="text-xs text-purple-700 uppercase font-medium mb-3">Vista Previa</p>
            <div className="bg-white rounded-lg p-5 border border-purple-200">
              <div className="flex items-start gap-3">
                <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-3 rounded-xl">
                  <span className="text-2xl">🚚</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {form.razonSocial}
                  </h3>
                  <div className="space-y-2">
                    {form.nit && (
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <span>🆔</span>
                        NIT: {form.nit}
                      </p>
                    )}
                    {form.telefono && (
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <span>📞</span>
                        {form.telefono}
                      </p>
                    )}
                    {form.email && (
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <span>📧</span>
                        {form.email}
                      </p>
                    )}
                    {form.tiempoEntregaDias && (
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <span>⏱️</span>
                        Entrega en {form.tiempoEntregaDias} día{Number(form.tiempoEntregaDias) !== 1 ? 's' : ''}
                      </p>
                    )}
                  </div>
                </div>
              </div>
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
                Guardar Proveedor
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => router.push('/proveedores')}
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
            <p className="text-sm font-medium text-blue-900 mb-1">Consejos</p>
            <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
              <li>Verifica que la información de contacto sea correcta</li>
              <li>El tiempo de entrega te ayudará a planificar mejor tus compras</li>
              <li>Puedes actualizar esta información más adelante si es necesario</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}