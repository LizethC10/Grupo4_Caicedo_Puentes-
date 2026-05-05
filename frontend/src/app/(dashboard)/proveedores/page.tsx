'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { proveedoresService } from '@/services';
import type { Proveedor } from '@/interfaces/proveedor.interface';

export default function ProveedoresPage() {
  const router = useRouter();
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    proveedoresService.findAll()
      .then(setProveedores)
      .catch(() => setError('Error al cargar los proveedores'))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number, nombre: string) => {
    if (!confirm(`¿Eliminar el proveedor "${nombre}"?`)) return;
    try {
      await proveedoresService.remove(id);
      setProveedores(proveedores.filter(p => p.id !== id));
    } catch {
      alert('Error al eliminar el proveedor. Puede que tenga órdenes de compra asociadas.');
    }
  };

  const proveedoresFiltrados = proveedores.filter(p =>
    p.razonSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.nit?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500">Cargando proveedores...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">🚚 Proveedores</h1>
          <p className="text-sm text-gray-500 mt-1">
            {proveedoresFiltrados.length} proveedor{proveedoresFiltrados.length !== 1 ? 'es' : ''} {searchTerm && 'encontrado(s)'}
          </p>
        </div>
        <Link
          href="/proveedores/new"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <span className="text-lg">+</span>
          Nuevo Proveedor
        </Link>
      </div>

      {/* Barra de búsqueda */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-400">🔍</span>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Buscar por razón social, NIT o correo..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded mb-6 flex items-start gap-3">
          <span className="text-xl">⚠️</span>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Grid de proveedores */}
      {proveedoresFiltrados.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="text-6xl mb-4">🚚</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {searchTerm ? 'No se encontraron proveedores' : 'No hay proveedores registrados'}
          </h3>
          <p className="text-gray-500 text-sm mb-6">
            {searchTerm
              ? 'Intenta con otros términos de búsqueda'
              : 'Comienza agregando tu primer proveedor'}
          </p>
          {!searchTerm && (
            <Link
              href="/proveedores/new"
              className="inline-flex items-center gap-2 bg-orange-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-orange-700 transition-colors"
            >
              <span className="text-lg">+</span>
              Crear Primer Proveedor
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {proveedoresFiltrados.map(proveedor => (
            <div
              key={proveedor.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-3 rounded-xl">
                    <span className="text-2xl">🚚</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors mb-1">
                      {proveedor.razonSocial}
                    </h3>
                    <p className="text-xs text-gray-400">ID: #{proveedor.id}</p>
                  </div>
                </div>
              </div>

              {/* Información */}
              <div className="space-y-3 mb-4">
                {/* NIT */}
                {proveedor.nit && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">🆔</span>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">NIT</p>
                      <p className="text-sm font-medium text-gray-900">{proveedor.nit}</p>
                    </div>
                  </div>
                )}

                {/* Contacto */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Teléfono */}
                  {proveedor.telefono && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">📞</span>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">Teléfono</p>
                        <p className="text-sm font-medium text-gray-900">{proveedor.telefono}</p>
                      </div>
                    </div>
                  )}

                  {/* Tiempo de entrega */}
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">⏱️</span>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Entrega</p>
                      <p className="text-sm font-medium text-gray-900">
                        {proveedor.tiempoEntregaDias} día{proveedor.tiempoEntregaDias !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                {proveedor.email && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">📧</span>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Correo</p>
                      <p className="text-sm font-medium text-gray-900 truncate">{proveedor.email}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Acciones */}
              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <button
                  onClick={() => router.push(`/proveedores/${proveedor.id}`)}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-700 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                >
                  ✏️ Editar
                </button>
                <button
                  onClick={() => handleDelete(proveedor.id, proveedor.razonSocial)}
                  className="flex items-center justify-center gap-2 bg-red-50 text-red-700 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}