'use client';

import { useEffect, useState } from 'react';
import { Post } from '@/types';
import { apiFetch } from '@/lib/api';
import Link from 'next/link';

export default function ProyectoTransversalPage() {
    const [sessions, setSessions] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const data = await apiFetch('/posts/public');
                const filtered = data.filter((post: Post) => post.category.name === 'Proyecto Transversal');

                const sessionTitles = [
                    'Cualificar Matematicas',
                    'Cualificar Castellano',
                    'Cualificar Sociales',
                    'Cualificar Naturales',
                    'Cualificar Ingles',
                    'CCRP'
                ];

                const finalSessions = sessionTitles.map((title, i) => {
                    // Try to find a post that matches this specific title
                    const matchingPost = filtered.find((p: Post) => p.title.toLowerCase().includes(title.toLowerCase()));

                    return matchingPost || {
                        id: `placeholder-${i}`,
                        title: title,
                        content: 'Contenido pendiente de edición por el docente encargado de esta área.',
                        category: { name: 'Proyecto Transversal' },
                        author: { fullName: 'Institución' },
                        createdAt: new Date().toISOString()
                    };
                });

                setSessions(finalSessions);
            } catch (error) {
                console.error('Error fetching sessions', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSessions();
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* Header Limpio y Profesional */}
            <header className="py-20 border-b border-slate-100">
                <div className="container mx-auto px-4 text-center">
                    <span className="text-[#dc2626] font-black tracking-[0.3em] uppercase text-sm mb-4 block">Institución Educativa</span>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight uppercase">
                        Proyecto Transversal
                    </h1>
                    <div className="h-1.5 w-20 bg-[#dc2626] mx-auto mt-6"></div>
                    <p className="mt-8 text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                        A continuación se presentan las 6 líneas de acción estratégica de nuestro proyecto institucional.
                        Este contenido es gestionado directamente por los docentes.
                    </p>
                </div>
            </header>

            {/* Listado de Sesiones - Uno debajo del otro para claridad */}
            <section className="py-20 bg-slate-50/50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="space-y-12">
                        {loading ? (
                            Array(6).fill(0).map((_, i) => (
                                <div key={i} className="h-40 bg-white rounded-2xl animate-pulse border border-slate-100"></div>
                            ))
                        ) : (
                            sessions.map((session, index) => (
                                <div
                                    key={session.id}
                                    className="bg-white border border-slate-100 rounded-3xl p-8 md:p-12 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-8 items-start group"
                                >
                                    {/* Indicador de Número Moderno */}
                                    <div className="flex-shrink-0 w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-2xl font-black group-hover:bg-[#dc2626] transition-colors duration-300">
                                        0{index + 1}
                                    </div>

                                    {/* Contenido Principal */}
                                    <div className="flex-grow">
                                        <h3 className="text-2xl font-extrabold text-slate-900 mb-4 uppercase tracking-tight group-hover:text-[#dc2626] transition-colors">
                                            {session.title}
                                        </h3>
                                        <p className="text-slate-600 text-lg leading-relaxed mb-6 font-medium">
                                            {session.content}
                                        </p>

                                        {!session.id.startsWith('placeholder') && (
                                            <Link
                                                href={`/noticias/${session.id}`}
                                                className="inline-flex items-center font-bold text-[#dc2626] hover:underline gap-2"
                                            >
                                                Leer detalles completos &rarr;
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Pie de Página de Gestión */}
            <footer className="py-20 border-t border-slate-100 bg-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-black text-slate-900 mb-6 uppercase">¿Eres docente y necesitas actualizar el contenido?</h2>
                    <Link
                        href="/admin/publicaciones"
                        className="inline-block px-10 py-4 bg-[#dc2626] text-white font-black rounded-xl hover:bg-slate-900 transition-colors shadow-lg"
                    >
                        ACCEDER AL PANEL DE EDICIÓN
                    </Link>
                </div>
            </footer>
        </div>
    );
}
