'use client';

import { useEffect, useState } from 'react';
import { movimientosInventarioService, ordenesCompraService, insumosService, proveedoresService } from '@/services';
import type { MovimientoInventario } from '@/interfaces/movimiento-inventario.interface';
import type { OrdenCompra } from '@/interfaces/orden-compra.interface';
import type { Insumo } from '@/interfaces/insumo.interface';
import type { Proveedor } from '@/interfaces/proveedor.interface';

export default function ReportesPage() {
  const [movimientos, setMovimientos] = useState<MovimientoInventario[]>([]);
  const [ordenes, setOrdenes] = useState<OrdenCompra[]>([]);
  const [insumos, setInsumos] = useState<Insumo[]>([]);
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mesSeleccionado, setMesSeleccionado] = useState(
    new Date().toISOString().slice(0, 7)
  );

  useEffect(() => {
    Promise.all([
      movimientosInventarioService.findAll(),
      ordenesCompraService.findAll(),
      insumosService.findAll(),
      proveedoresService.findAll(),
    ]).then(([movs, ords, ins, provs]) => {
      setMovimientos(movs);
      setOrdenes(ords);
      setInsumos(ins);
      setProveedores(provs);
    }).catch(() => setError('Error al cargar los reportes'))
      .finally(() => setLoading(false));
  }, []);

  // Reporte 1: Insumos de mayor rotación en el mes seleccionado
  const reporteRotacion = () => {
    const [anio, mes] = mesSeleccionado.split('-').map(Number);
    const salidas = movimientos.filter(m => {
      const fecha = new Date(m.fecha);
      return m.tipo === 'SALIDA' &&
        fecha.getFullYear() === anio &&
        fecha.getMonth() + 1 === mes;
    });

    const agrupado: Record<number, number> = {};
    salidas.forEach(s => {
      agrupado[s.insumoId] = (agrupado[s.insumoId] || 0) + s.cantidad;
    });

    return Object.entries(agrupado)
      .map(([insumoId, cantidad]) => ({
        insumo: insumos.find(i => i.id === Number(insumoId)),
        cantidad,
      }))
      .sort((a, b) => b.cantidad - a.cantidad);
  };

  // Reporte 2: Gastos por proveedor (órdenes RECIBIDA)
  const reporteGastos = () => {
    const recibidas = ordenes.filter(o => o.estado === 'RECIBIDA');
    const agrupado: Record<number, number> = {};
    recibidas.forEach(o => {
      agrupado[o.proveedorId] = (agrupado[o.proveedorId] || 0) + o.total;
    });

    return Object.entries(agrupado)
      .map(([proveedorId, total]) => ({
        proveedor: proveedores.find(p => p.id === Number(proveedorId)),
        total,
        ordenes: recibidas.filter(o => o.proveedorId === Number(proveedorId)).length,
      }))
      .sort((a, b) => b.total - a.total);
  };

  // Alertas de stock bajo
  const alertasStock = insumos.filter(i => i.stockActual <= i.stockMinimo);

  if (loading) return <p className="text-gray-500">Cargando reportes...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const rotacion = reporteRotacion();
  const gastos = reporteGastos();
  const totalGastado = gastos.reduce((acc, g) => acc + g.total, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Reportes</h1>

      {/* Alertas de stock bajo */}
      {alertasStock.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <h2 className="text-red-800 font-semibold mb-2">
            ⚠️ Alertas de Stock Bajo ({alertasStock.length} insumos)
          </h2>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {alertasStock.map(i => (
              <div key={i.id} className="bg-white border border-red-200 rounded p-2">
                <p className="text-sm font-medium text-red-800">{i.nombre}</p>
                <p className="text-xs text-red-600">
                  Stock: {i.stockActual} / Mínimo: {i.stockMinimo} {i.unidadMedida}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        {/* Reporte 1: Rotación de insumos */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">📦 Insumos de Mayor Rotación</h2>
            <input
              type="month"
              value={mesSeleccionado}
              onChange={e => setMesSeleccionado(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {rotacion.length === 0 ? (
            <p className="text-gray-500 text-sm">No hay salidas en este mes</p>
          ) : (
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase py-2">Insumo</th>
                  <th className="text-left text-xs font-medium text-gray-500 uppercase py-2">Unidad</th>
                  <th className="text-right text-xs font-medium text-gray-500 uppercase py-2">Total Salida</th>
                </tr>
              </thead>
              <tbody>
                {rotacion.map((r, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-2 text-sm font-medium">{r.insumo?.nombre || '—'}</td>
                    <td className="py-2 text-sm text-gray-500">{r.insumo?.unidadMedida || '—'}</td>
                    <td className="py-2 text-sm text-right font-semibold text-orange-600">{r.cantidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Reporte 2: Gastos por proveedor */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">💰 Gastos por Proveedor</h2>
            <span className="text-sm text-gray-500">Total: <strong>${totalGastado.toFixed(2)}</strong></span>
          </div>

          {gastos.length === 0 ? (
            <p className="text-gray-500 text-sm">No hay órdenes recibidas</p>
          ) : (
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left text-xs font-medium text-gray-500 uppercase py-2">Proveedor</th>
                  <th className="text-right text-xs font-medium text-gray-500 uppercase py-2">Órdenes</th>
                  <th className="text-right text-xs font-medium text-gray-500 uppercase py-2">Total</th>
                </tr>
              </thead>
              <tbody>
                {gastos.map((g, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-2 text-sm font-medium">{g.proveedor?.razonSocial || '—'}</td>
                    <td className="py-2 text-sm text-center text-gray-500">{g.ordenes}</td>
                    <td className="py-2 text-sm text-right font-semibold text-green-600">${g.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
}