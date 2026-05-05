'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  insumosService,
  proveedoresService,
  categoriasService,
  ordenesCompraService,
  recetasService,
  movimientosInventarioService,
} from '@/services';
import type { Insumo } from '@/interfaces/insumo.interface';
import type { OrdenCompra } from '@/interfaces/orden-compra.interface';
import type { MovimientoInventario } from '@/interfaces/movimiento-inventario.interface';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalInsumos: 0,
    totalProveedores: 0,
    totalCategorias: 0,
    totalRecetas: 0,
    ordenesPendientes: 0,
    ordenesRecibidas: 0,
    stockBajo: [] as Insumo[],
    ultimosMovimientos: [] as MovimientoInventario[],
    insumos: [] as Insumo[],
  });
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState<{ nombre?: string; rol?: string }>({});

  useEffect(() => {
    const u = localStorage.getItem('usuario');
    if (u) setUsuario(JSON.parse(u));

    Promise.all([
      insumosService.findAll(),
      proveedoresService.findAll(),
      categoriasService.findAll(),
      ordenesCompraService.findAll(),
      recetasService.findAll(),
      movimientosInventarioService.findAll(),
    ]).then(([insumos, proveedores, categorias, ordenes, recetas, movimientos]) => {
      const stockBajo = insumos.filter(i => i.stockActual <= i.stockMinimo);
      const ultimosMovimientos = [...movimientos]
        .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
        .slice(0, 5);

      setStats({
        totalInsumos: insumos.length,
        totalProveedores: proveedores.length,
        totalCategorias: categorias.length,
        totalRecetas: recetas.length,
        ordenesPendientes: ordenes.filter((o: OrdenCompra) => o.estado === 'PENDIENTE').length,
        ordenesRecibidas: ordenes.filter((o: OrdenCompra) => o.estado === 'RECIBIDA').length,
        stockBajo,
        ultimosMovimientos,
        insumos,
      });
    }).finally(() => setLoading(false));
  }, []);

  const getNombreInsumo = (id: number) =>
    stats.insumos.find(i => i.id === id)?.nombre || `#${id}`;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500">Cargando dashboard...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header de bienvenida */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 mb-6 text-white shadow-lg">
        <h1 className="text-2xl font-bold">
          ¡Hola{usuario.nombre ? `, ${usuario.nombre}` : ''}! 👋
        </h1>
        <p className="text-orange-50 text-sm mt-1">
          Bienvenido al Sistema de Inventario para Restaurante
        </p>
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Link href="/insumos" className="bg-white rounded-xl p-5 shadow hover:shadow-md transition-shadow border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase font-medium">Insumos</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalInsumos}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <span className="text-2xl">📦</span>
            </div>
          </div>
        </Link>

        <Link href="/proveedores" className="bg-white rounded-xl p-5 shadow hover:shadow-md transition-shadow border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase font-medium">Proveedores</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalProveedores}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <span className="text-2xl">🚚</span>
            </div>
          </div>
        </Link>

        <Link href="/categorias" className="bg-white rounded-xl p-5 shadow hover:shadow-md transition-shadow border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase font-medium">Categorías</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalCategorias}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <span className="text-2xl">🏷️</span>
            </div>
          </div>
        </Link>

        <Link href="/recetas" className="bg-white rounded-xl p-5 shadow hover:shadow-md transition-shadow border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase font-medium">Recetas</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalRecetas}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <span className="text-2xl">🍳</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Tarjetas de órdenes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Link href="/ordenes-compra" className="bg-white rounded-xl p-5 shadow hover:shadow-md transition-shadow border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase font-medium">Órdenes Pendientes</p>
              <p className="text-3xl font-bold text-orange-600 mt-1">{stats.ordenesPendientes}</p>
              <p className="text-xs text-gray-400 mt-1">Esperando recepción</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <span className="text-3xl">⏳</span>
            </div>
          </div>
        </Link>

        <Link href="/ordenes-compra" className="bg-white rounded-xl p-5 shadow hover:shadow-md transition-shadow border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 uppercase font-medium">Órdenes Recibidas</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{stats.ordenesRecibidas}</p>
              <p className="text-xs text-gray-400 mt-1">Completadas</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <span className="text-3xl">✅</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Grid de alertas y movimientos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Alertas de stock bajo */}
        <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">⚠️ Stock Bajo</h2>
            <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
              {stats.stockBajo.length} insumos
            </span>
          </div>

          {stats.stockBajo.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-4xl mb-2">✅</p>
              <p className="text-sm text-gray-500">Todo el inventario en niveles óptimos</p>
            </div>
          ) : (
            <div className="space-y-2">
              {stats.stockBajo.slice(0, 5).map(i => (
                <div key={i.id} className="flex items-center justify-between bg-red-50 border border-red-100 rounded-lg p-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{i.nombre}</p>
                    <p className="text-xs text-red-600">
                      Stock: {i.stockActual} / Mínimo: {i.stockMinimo} {i.unidadMedida}
                    </p>
                  </div>
                  <span className="text-red-500 text-xl">⚠️</span>
                </div>
              ))}
              {stats.stockBajo.length > 5 && (
                <Link href="/reportes" className="block text-center text-sm text-orange-600 hover:text-orange-800 font-medium pt-2">
                  Ver todos →
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Últimos movimientos */}
        <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">📊 Últimos Movimientos</h2>
            <Link href="/movimientos-inventario" className="text-sm text-orange-600 hover:text-orange-800 font-medium">
              Ver todos →
            </Link>
          </div>

          {stats.ultimosMovimientos.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-4xl mb-2">📦</p>
              <p className="text-sm text-gray-500">No hay movimientos registrados</p>
            </div>
          ) : (
            <div className="space-y-2">
              {stats.ultimosMovimientos.map(m => (
                <div key={m.id} className="flex items-center justify-between border-b border-gray-100 pb-2 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${m.tipo === 'ENTRADA' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{getNombreInsumo(m.insumoId)}</p>
                      <p className="text-xs text-gray-500">{m.motivo}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${m.tipo === 'ENTRADA' ? 'text-green-600' : 'text-red-600'}`}>
                      {m.tipo === 'ENTRADA' ? '+' : '-'}{m.cantidad}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(m.fecha).toLocaleDateString('es-CO')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}