'use client';

import { useEffect, useState } from 'react';
import { Event } from '@/types';
import { apiFetch } from '@/lib/api';
import Link from 'next/link';

export default function EventsAdminPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchEvents = async () => {
        try {
            const data = await apiFetch('/events');
            setEvents(data);
        } catch (error) {
            console.error('Error fetching events', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de que deseas eliminar este evento?')) return;
        try {
            await apiFetch(`/events/${id}`, { method: 'DELETE' });
            setEvents(events.filter(e => e.id !== id));
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Gestionar Eventos</h2>
                    <p className="text-slate-500">Calendario de actividades académicas y administrativas.</p>
                </div>
                <Link href="/admin/eventos/nuevo" className="btn-primary">
                    Nuevo Evento
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Título / Fecha</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Ubicación</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Estado</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            <tr><td colSpan={4} className="px-6 py-10 text-center text-slate-400">Cargando...</td></tr>
                        ) : events.length === 0 ? (
                            <tr><td colSpan={4} className="px-6 py-10 text-center text-slate-400 italic">No hay eventos registrados.</td></tr>
                        ) : events.map((event) => (
                            <tr key={event.id} className="hover:bg-slate-50 transition">
                                <td className="px-6 py-4">
                                    <p className="font-bold text-slate-900">{event.title}</p>
                                    <p className="text-xs text-blue-600 font-medium">
                                        {new Date(event.date).toLocaleDateString()} {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">{event.location || 'Institución'}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-[10px] font-bold rounded-full uppercase ${event.published ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
                                        }`}>
                                        {event.published ? 'Publicado' : 'Borrador'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right space-x-3">
                                    <Link href={`/admin/eventos/editar/${event.id}`} className="text-blue-600 hover:text-blue-800 font-medium">Editar</Link>
                                    <button onClick={() => handleDelete(event.id)} className="text-red-500 hover:text-red-700 font-medium">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
