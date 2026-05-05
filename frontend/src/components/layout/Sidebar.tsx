'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const navItems = [
  { href: '/dashboard',              label: 'Dashboard',           icon: '📊' },
  { href: '/categorias',             label: 'Categorías',          icon: '🏷️' },
  { href: '/insumos',                label: 'Insumos',             icon: '📦' },
  { href: '/proveedores',            label: 'Proveedores',         icon: '🚚' },
  { href: '/ordenes-compra',         label: 'Órdenes de Compra',   icon: '📋' },
  { href: '/detalle-orden',          label: 'Detalle Orden',       icon: '📝' },
  { href: '/recetas',                label: 'Recetas',             icon: '🍳' },
  { href: '/receta-ingrediente',     label: 'Ingredientes',        icon: '🥗' },
  { href: '/movimientos-inventario', label: 'Movimientos',         icon: '🔄' },
  { href: '/reportes',               label: 'Reportes',            icon: '📈' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [usuario, setUsuario] = useState<{ nombre?: string; rol?: string }>({});

  useEffect(() => {
    const u = localStorage.getItem('usuario');
    if (u) setUsuario(JSON.parse(u));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    router.replace('/login');
  };

  const getRolColor = (rol?: string) => {
    switch (rol) {
      case 'ADMINISTRADOR':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'CHEF':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'BODEGA':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-white p-2 rounded-lg shadow-lg">
            <span className="text-2xl">🍽️</span>
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Inventario Restaurante
            </h2>
          </div>
        </div>
        
        {/* Info del usuario */}
        {usuario.nombre && (
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-white/30">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-white p-1.5 rounded-full">
                <span className="text-sm">👤</span>
              </div>
              <p className="text-sm font-semibold text-white truncate">{usuario.nombre}</p>
            </div>
            <span className={`inline-block text-xs font-medium px-2 py-1 rounded-full border ${getRolColor(usuario.rol)}`}>
              {usuario.rol}
            </span>
          </div>
        )}
      </div>

      {/* Navegación */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Cerrar sesión */}
      <div className="px-3 py-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
        >
          <span className="text-lg"></span>
          <span>Cerrar Sesión</span>
        </button>
      </div>

      {/* Footer */}
      <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
        <p className="text-xs text-gray-400 text-center">
          Programación Web — CORHUILA 2026A
        </p>
      </div>
    </aside>
  );
}