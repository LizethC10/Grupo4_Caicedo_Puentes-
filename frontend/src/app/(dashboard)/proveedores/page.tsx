'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { proveedoresService } from '@/services';
import type { Proveedor } from '@/interfaces/proveedor.interface';

export default function ProveedoresPage() {
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    proveedoresService.findAll()
      .then(setProveedores)
      .catch(() => setError('Error al cargar los proveedores'))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este proveedor?')) return;
    try {
      await proveedoresService.remove(id);
      setProveedores(proveedores.filter(p => p.id !== id));
    } catch {
      alert('Error al eliminar el proveedor');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Proveedores</h1>
        <Link
          href="/proveedores/new"
          className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-700"
        >
          + Nuevo Proveedor
        </Link>
      </div>

      {loading && <p className="text-gray-500">Cargando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Razón Social</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">NIT</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teléfono</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Entrega (días)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {proveedores.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    No hay proveedores registrados
                  </td>
                </tr>
              ) : (
                proveedores.map(proveedor => (
                  <tr key={proveedor.id}>
                    <td className="px-6 py-4 text-sm text-gray-900">{proveedor.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{proveedor.razonSocial}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{proveedor.nit}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{proveedor.telefono || '—'}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{proveedor.email || '—'}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{proveedor.tiempoEntregaDias}</td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <Link
                        href={`/proveedores/${proveedor.id}`}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDelete(proveedor.id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}