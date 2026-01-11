'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const { user, logout, isAuthenticated } = useAuth();
    const pathname = usePathname();

    const navItems = [
        { name: 'INICIO', href: '/' },
        { name: 'PROYECTO TRANSVERSAL', href: '/proyecto-transversal' },
        { name: 'NOSOTROS', href: '/nosotros' },
        { name: 'COMUNIDAD EDUCATIVA', href: '/comunidad' },
        { name: 'PLAN DE ESTUDIO', href: '/plan-estudio' },
        { name: 'ORIENTACION ESCOLAR', href: '/orientacion' },
        { name: 'PASTORAL', href: '/pastoral' },
        { name: 'CONTACTANOS', href: '/contacto' },
    ];

    return (
        <header className="w-full">
            {/* Top Header Section */}
            <div className="bg-white py-6">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Logo & School Name */}
                    <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-slate-100 flex items-center justify-center rounded-sm font-bold text-xs text-slate-400">LOGO</div>
                        <h1 className="text-4xl md:text-6xl font-black text-[#f15a24] tracking-tight">
                            I.E.D América Latina
                        </h1>
                    </div>

                    {/* Tagline & Contact */}
                    <div className="flex flex-col items-center md:items-end text-center md:text-right">
                        <p className="text-[#f15a24] italic font-medium mb-1">"Beneficios más allá del salón de clases"</p>
                        <p className="text-[#29abe2] text-2xl md:text-3xl font-bold uppercase tracking-tighter">
                            LLÁMANOS: 320-451 89 38
                        </p>
                        <p className="text-[#29abe2] text-xl md:text-2xl font-bold uppercase tracking-tighter">
                            316 18 88 ext:1104
                        </p>
                    </div>

                    {/* Social / Auth Shortcut */}
                    <div className="flex flex-col items-center md:items-end gap-2">
                        <div className="w-16 h-16 bg-slate-100 flex items-center justify-center rounded-full font-bold text-[8px] text-slate-400">FE Y ALEGRÍA</div>
                        {isAuthenticated ? (
                            <div className="flex items-center gap-3">
                                <Link href="/admin" className="text-xs font-bold text-slate-500 hover:text-[#f15a24]">PANEL</Link>
                                <button onClick={logout} className="text-xs font-bold text-red-500">SALIR</button>
                            </div>
                        ) : (
                            <Link href="/login" className="flex items-center gap-1 text-[#29abe2] font-medium text-sm hover:underline">
                                <span className="w-5 h-5 bg-[#29abe2] rounded-full flex items-center justify-center text-white text-[10px]">👤</span>
                                Iniciar sesión
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Navigation Bar */}
            <nav className="bg-[#f15a24] shadow-lg sticky top-0 z-50">
                <div className="container mx-auto px-4">
                    <ul className="flex flex-wrap md:flex-nowrap divide-x divide-white/20 border-x border-white/20">
                        {navItems.map((item) => (
                            <li key={item.href} className="flex-grow md:flex-initial">
                                <Link
                                    href={item.href}
                                    className={`block px-4 py-3 text-center text-xs md:text-sm font-black text-white hover:bg-white/10 transition-colors whitespace-nowrap ${pathname === item.href ? 'bg-white/20' : ''
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </header>
    );
}
