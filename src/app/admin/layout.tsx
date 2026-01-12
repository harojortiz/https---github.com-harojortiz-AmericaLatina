'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, loading, isAuthenticated } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/login');
        }
    }, [loading, isAuthenticated, router]);

    if (loading || !isAuthenticated) {
        return <div className="flex h-screen items-center justify-center">Cargando...</div>;
    }

    const role = user?.role;

    const menuItems = [
        { name: 'Dashboard', href: '/admin', roles: ['SUPER_ADMIN', 'ADMIN', 'DOCENTE', 'GERENCIA'] },
        { name: 'Usuarios', href: '/admin/usuarios', roles: ['SUPER_ADMIN'] },
        { name: 'Publicaciones', href: '/admin/publicaciones', roles: ['SUPER_ADMIN', 'ADMIN', 'DOCENTE', 'GERENCIA'] },
        { name: 'Eventos', href: '/admin/eventos', roles: ['SUPER_ADMIN', 'ADMIN', 'DOCENTE', 'GERENCIA'] },
        { name: 'Categorías', href: '/admin/categorias', roles: ['SUPER_ADMIN', 'ADMIN'] },
        { name: 'Multimedia', href: '/admin/multimedia', roles: ['SUPER_ADMIN', 'ADMIN'] },
    ];

    const filteredMenu = menuItems.filter(item => item.roles.includes(role || ''));

    return (
        <div className="flex min-h-screen bg-slate-100">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col">
                <div className="p-6 border-b border-slate-800">
                    <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">Panel Administrativo</p>
                    <p className="text-[#dc2626] font-bold">{user?.fullName}</p>
                    <p className="text-[10px] text-slate-400 uppercase">{user?.role.replace('_', ' ')}</p>
                </div>

                <nav className="flex-grow p-4 space-y-2 mt-4">
                    {filteredMenu.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`block px-4 py-3 rounded-lg transition-colors font-medium ${pathname === item.href
                                ? 'bg-[#dc2626] text-white'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <Link href="/" className="text-sm text-slate-500 hover:text-white transition">Volver al Sitio Público</Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow flex flex-col">
                <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center shadow-sm">
                    <h1 className="text-xl font-bold text-slate-800">
                        {menuItems.find(i => i.href === pathname)?.name || 'Admin'}
                    </h1>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-slate-500">{user?.email}</span>
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center text-red-700 font-bold text-xs uppercase">
                            {user?.fullName.charAt(0)}
                        </div>
                    </div>
                </header>

                <div className="p-8 overflow-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
