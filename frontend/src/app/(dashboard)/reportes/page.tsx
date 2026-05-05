'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  insumosService,
  movimientosInventarioService,
  ordenesCompraService,
  proveedoresService,
} from '@/services';
import type { Insumo } from '@/interfaces/insumo.interface';
import type { MovimientoInventario } from '@/interfaces/movimiento-inventario.interface';
import type { OrdenCompra } from '@/interfaces/orden-compra.interface';
import type { Proveedor } from '@/interfaces/proveedor.interface';

export default function ReportesPage() {
  const [insumos, setInsumos] = useState<Insumo[]>([]);
  const [movimientos, setMovimientos] = useState<MovimientoInventario[]>([]);
  const [ordenes, setOrdenes] = useState<OrdenCompra[]>([]);
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [loading, setLoading] = useState(true);
  const [mesSeleccionado, setMesSeleccionado] = useState<string>(
    new Date().toISOString().slice(0, 7)
  );

  useEffect(() => {
    Promise.all([
      insumosService.findAll(),
      movimientosInventarioService.findAll(),
      ordenesCompraService.findAll(),
      proveedoresService.findAll(),
    ]).then(([ins, movs, ords, provs]) => {
      setInsumos(ins);
      setMovimientos(movs);
      setOrdenes(ords);
      setProveedores(provs);
    }).finally(() => setLoading(false));
  }, []);

  // Alertas de stock bajo
  const stockBajo = insumos.filter(i => i.stockActual <= i.stockMinimo);

  // Insumos de mayor rotación (salidas del mes)
  const movimientosDelMes = movimientos.filter(m => {
    const fechaMov = new Date(m.fecha).toISOString().slice(0, 7);
    return fechaMov === mesSeleccionado && m.tipo === 'SALIDA';
  });

  const rotacionPorInsumo = movimientosDelMes.reduce((acc, m) => {
    if (!acc[m.insumoId]) acc[m.insumoId] = 0;
    acc[m.insumoId] += m.cantidad;
    return acc;
  }, {} as Record<number, number>);

  const insumosMayorRotacion = Object.entries(rotacionPorInsumo)
    .map(([insumoId, cantidad]) => {
      const insumo = insumos.find(i => i.id === Number(insumoId));
      return { insumo, cantidad };
    })
    .filter(item => item.insumo)
    .sort((a, b) => b.cantidad - a.cantidad)
    .slice(0, 10);

  // Gastos por proveedor (solo órdenes recibidas)
  const ordenesRecibidas = ordenes.filter(o => o.estado === 'RECIBIDA');
  
  const gastosPorProveedor = ordenesRecibidas.reduce((acc, o) => {
    if (!acc[o.proveedorId]) {
      acc[o.proveedorId] = { total: 0, cantidad: 0 };
    }
    acc[o.proveedorId].total += o.total;
    acc[o.proveedorId].cantidad += 1;
    return acc;
  }, {} as Record<number, { total: number; cantidad: number }>);

  const proveedoresConGastos = Object.entries(gastosPorProveedor)
    .map(([proveedorId, datos]) => {
      const proveedor = proveedores.find(p => p.id === Number(proveedorId));
      return { proveedor, ...datos };
    })
    .filter(item => item.proveedor)
    .sort((a, b) => b.total - a.total);

  const totalGastado = proveedoresConGastos.reduce((sum, p) => sum + p.total, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500">Generando reportes...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">📊 Reportes e Indicadores</h1>
        <p className="text-sm text-gray-500 mt-1">
          Análisis de inventario, consumo y gastos
        </p>
      </div>

      {/* Alertas de Stock Bajo */}
      {stockBajo.length > 0 && (
        <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl border border-red-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-red-200 p-3 rounded-lg">
                <span className="text-2xl">⚠️</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-red-900">Alertas de Stock Bajo</h2>
                <p className="text-sm text-red-700">
                  {stockBajo.length} insumo{stockBajo.length !== 1 ? 's' : ''} requiere{stockBajo.length !== 1 ? 'n' : ''} atención
                </p>
              </div>
            </div>
            <Link
              href="/insumos"
              className="text-sm text-red-700 hover:text-red-900 font-medium"
            >
              Ver todos →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {stockBajo.slice(0, 6).map(insumo => (
              <div key={insumo.id} className="bg-white rounded-lg p-4 border border-red-300">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-gray-900">{insumo.nombre}</p>
                  <span className="text-red-500 text-xl">⚠️</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">Stock:</span>
                  <span className="font-bold text-red-600">
                    {insumo.stockActual} / {insumo.stockMinimo} {insumo.unidadMedida}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grid de reportes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Insumos de Mayor Rotación */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">🔄 Insumos de Mayor Rotación</h2>
              <p className="text-sm text-gray-500">Salidas del mes seleccionado</p>
            </div>
          </div>

          <div className="mb-4">
            <input
              type="month"
              value={mesSeleccionado}
              onChange={e => setMesSeleccionado(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {insumosMayorRotacion.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-4xl mb-2">📦</p>
              <p className="text-sm text-gray-500">No hay movimientos en este mes</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Insumo</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Salidas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {insumosMayorRotacion.map((item, index) => (
                    <tr key={item.insumo!.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-500">{index + 1}</td>
                      <td className="px-4 py-3">
                        <p className="text-sm font-medium text-gray-900">{item.insumo!.nombre}</p>
                        <p className="text-xs text-gray-500">{item.insumo!.unidadMedida}</p>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-sm font-bold text-orange-600">{item.cantidad}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Gastos por Proveedor */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900">💰 Gastos por Proveedor</h2>
            <p className="text-sm text-gray-500">Órdenes recibidas (total histórico)</p>
          </div>

          {proveedoresConGastos.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-4xl mb-2">🚚</p>
              <p className="text-sm text-gray-500">No hay órdenes recibidas</p>
            </div>
          ) : (
            <>
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-blue-700 font-medium">Total Invertido</p>
                    <p className="text-2xl font-bold text-blue-900">${totalGastado.toFixed(2)}</p>
                  </div>
                  <div className="bg-blue-200 p-3 rounded-lg">
                    <span className="text-2xl">💵</span>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Proveedor</th>
                      <th className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Órdenes</th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {proveedoresConGastos.map(item => (
                      <tr key={item.proveedor!.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <p className="text-sm font-medium text-gray-900">{item.proveedor!.razonSocial}</p>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center justify-center w-8 h-8 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
                            {item.cantidad}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className="text-sm font-bold text-gray-900">${item.total.toFixed(2)}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}