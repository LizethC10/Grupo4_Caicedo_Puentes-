'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const navItems = [
  { href: '/dashboard',              label: 'Dashboard' },
  { href: '/categorias',             label: 'Categorías' },
  { href: '/insumos',                label: 'Insumos' },
  { href: '/proveedores',            label: 'Proveedores' },
  { href: '/ordenes-compra',         label: 'Órdenes de Compra' },
  { href: '/detalle-orden',          label: 'Detalle Orden' },
  { href: '/recetas',                label: 'Recetas' },
  { href: '/receta-ingrediente',     label: 'Ingredientes' },
  { href: '/movimientos-inventario', label: 'Movimientos' },
  { href: '/reportes',               label: 'Reportes' },
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

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="px-6 py-5 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
          Inventario Restaurante
        </h2>
        {usuario.nombre && (
          <div className="mt-2">
            <p className="text-xs font-medium text-gray-900">{usuario.nombre}</p>
            <span className="text-xs text-orange-600 font-medium">{usuario.rol}</span>
          </div>
        )}
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-orange-50 text-orange-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 py-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
           Cerrar Sesión
        </button>
      </div>
      <div className="px-6 py-3 border-t border-gray-200 text-xs text-gray-400">
        Programación Web — CORHUILA 2026A
      </div>
    </aside>
  );
}