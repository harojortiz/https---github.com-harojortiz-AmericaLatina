'use client';

import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { apiFetch } from '@/lib/api';
import Link from 'next/link';

export default function DashboardPage() {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        posts: 0,
        events: 0,
        users: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const posts = await apiFetch('/posts');
                const events = await apiFetch('/events');
                let users = [];
                if (user?.role === 'SUPER_ADMIN') {
                    users = await apiFetch('/users');
                }
                setStats({
                    posts: posts.length,
                    events: events.length,
                    users: users.length,
                });
            } catch (error) {
                console.error('Error fetching stats', error);
            }
        };
        fetchStats();
    }, [user]);

    const cards = [
        { name: 'Publicaciones', value: stats.posts, color: 'bg-blue-600', href: '/admin/publicaciones' },
        { name: 'Eventos', value: stats.events, color: 'bg-amber-500', href: '/admin/eventos' },
    ];

    if (user?.role === 'SUPER_ADMIN') {
        cards.push({ name: 'Usuarios', value: stats.users, color: 'bg-indigo-600', href: '/admin/usuarios' });
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">Bienvenido, {user?.fullName}</h2>
                <p className="text-slate-500 italic">Aquí tienes un resumen de la actividad reciente del sistema.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {cards.map((card) => (
                    <div key={card.name} className="card flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{card.name}</p>
                            <p className="text-4xl font-black mt-1">{card.value}</p>
                        </div>
                        <div className={`w-12 h-12 ${card.color} rounded-2xl flex items-center justify-center text-white`}>
                            <Link href={card.href} className="hover:scale-110 transition">
                                &rarr;
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                <h3 className="text-lg font-bold mb-4">Acciones Rápidas</h3>
                <div className="flex gap-4">
                    <Link href="/admin/publicaciones" className="px-6 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition">
                        Crear Publicación
                    </Link>
                    <Link href="/admin/eventos" className="px-6 py-3 border border-slate-200 rounded-xl font-medium hover:bg-slate-50 transition">
                        Programar Evento
                    </Link>
                </div>
            </div>
        </div>
    );
}
