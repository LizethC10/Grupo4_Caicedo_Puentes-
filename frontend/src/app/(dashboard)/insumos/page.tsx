'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { insumosService, categoriasService } from '@/services';
import type { Insumo } from '@/interfaces/insumo.interface';
import type { Categoria } from '@/interfaces/categoria.interface';

export default function InsumosPage() {
  const router = useRouter();
  const [insumos, setInsumos] = useState<Insumo[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [filtroStock, setFiltroStock] = useState<'todos' | 'bajo' | 'normal'>('todos');

  useEffect(() => {
    Promise.all([
      insumosService.findAll(),
      categoriasService.findAll(),
    ]).then(([ins, cats]) => {
      setInsumos(ins);
      setCategorias(cats);
    }).catch(() => setError('Error al cargar los insumos'))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number, nombre: string) => {
    if (!confirm(`¿Eliminar el insumo "${nombre}"?`)) return;
    try {
      await insumosService.remove(id);
      setInsumos(insumos.filter(i => i.id !== id));
    } catch {
      alert('Error al eliminar el insumo. Puede que tenga registros asociados.');
    }
  };

  const getNombreCategoria = (id: number) =>
    categorias.find(c => c.id === id)?.nombre || 'Sin categoría';

  const insumosFiltrados = insumos.filter(i => {
    const matchSearch = i.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategoria = !filtroCategoria || i.categoriaId === Number(filtroCategoria);
    const matchStock = filtroStock === 'todos' ||
      (filtroStock === 'bajo' && i.stockActual <= i.stockMinimo) ||
      (filtroStock === 'normal' && i.stockActual > i.stockMinimo);
    return matchSearch && matchCategoria && matchStock;
  });

  const stockBajoCount = insumos.filter(i => i.stockActual <= i.stockMinimo).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500">Cargando insumos...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">📦 Insumos</h1>
          <p className="text-sm text-gray-500 mt-1">
            {insumosFiltrados.length} insumo{insumosFiltrados.length !== 1 ? 's' : ''} 
            {stockBajoCount > 0 && (
              <span className="ml-2 text-red-600 font-medium">
                · {stockBajoCount} con stock bajo
              </span>
            )}
          </p>
        </div>
        <Link
          href="/insumos/new"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <span className="text-lg">+</span>
          Nuevo Insumo
        </Link>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Búsqueda */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400">🔍</span>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Buscar insumos..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Filtro Categoría */}
          <select
            value={filtroCategoria}
            onChange={e => setFiltroCategoria(e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          >
            <option value="">Todas las categorías</option>
            {categorias.map(c => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>

          {/* Filtro Stock */}
          <select
            value={filtroStock}
            onChange={e => setFiltroStock(e.target.value as any)}
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          >
            <option value="todos">Todos los stocks</option>
            <option value="bajo">Stock bajo ⚠️</option>
            <option value="normal">Stock normal ✅</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded mb-6 flex items-start gap-3">
          <span className="text-xl">⚠️</span>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Grid de insumos */}
      {insumosFiltrados.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {searchTerm || filtroCategoria || filtroStock !== 'todos'
              ? 'No se encontraron insumos'
              : 'No hay insumos registrados'}
          </h3>
          <p className="text-gray-500 text-sm mb-6">
            {searchTerm || filtroCategoria || filtroStock !== 'todos'
              ? 'Intenta ajustar los filtros de búsqueda'
              : 'Comienza creando tu primer insumo'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {insumosFiltrados.map(insumo => {
            const stockBajo = insumo.stockActual <= insumo.stockMinimo;
            const porcentajeStock = (insumo.stockActual / (insumo.stockMinimo * 2)) * 100;

            return (
              <div
                key={insumo.id}
                className={`bg-white rounded-xl shadow-sm border ${
                  stockBajo ? 'border-red-200 bg-red-50/30' : 'border-gray-100'
                } p-5 hover:shadow-lg transition-all group`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">📦</span>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                        {insumo.nombre}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">
                        {getNombreCategoria(insumo.categoriaId)}
                      </span>
                    </div>
                  </div>
                  {stockBajo && (
                    <span className="text-red-500 text-xl">⚠️</span>
                  )}
                </div>

                {/* Info stock */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Stock actual:</span>
                    <span className={`font-semibold ${stockBajo ? 'text-red-600' : 'text-green-600'}`}>
                      {insumo.stockActual} {insumo.unidadMedida}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Stock mínimo:</span>
                    <span className="font-medium text-gray-900">
                      {insumo.stockMinimo} {insumo.unidadMedida}
                    </span>
                  </div>
                  
                  {/* Barra de progreso */}
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        stockBajo ? 'bg-red-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(porcentajeStock, 100)}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Precio:</span>
                    <span className="font-semibold text-gray-900">
                      ${insumo.precioActual.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => router.push(`/insumos/${insumo.id}`)}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                  >
                    ✏️ Editar
                  </button>
                  <button
                    onClick={() => handleDelete(insumo.id, insumo.nombre)}
                    className="flex items-center justify-center gap-2 bg-red-50 text-red-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}