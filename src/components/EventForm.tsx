'use client';

import { useState } from 'react';
import { apiFetch } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface EventFormProps {
    initialData?: any;
    isEditing?: boolean;
}

export default function EventForm({ initialData, isEditing = false }: EventFormProps) {
    const [title, setTitle] = useState(initialData?.title || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [date, setDate] = useState(initialData?.date ? new Date(initialData.date).toISOString().slice(0, 16) : '');
    const [location, setLocation] = useState(initialData?.location || '');
    const [published, setPublished] = useState(initialData?.published || false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = { title, description, date, location, published };

        try {
            if (isEditing) {
                await apiFetch(`/events/${initialData.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(payload),
                });
            } else {
                await apiFetch('/events', {
                    method: 'POST',
                    body: JSON.stringify(payload),
                });
            }
            router.push('/admin/eventos');
            router.refresh();
        } catch (error: any) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Título del Evento</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                        placeholder="Ej: Reunión de Padres de Familia"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Fecha y Hora</label>
                    <input
                        type="datetime-local"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Ubicación</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                        placeholder="Ej: Auditorio Principal"
                    />
                </div>
                <div className="flex items-center space-x-3 pt-8">
                    <input
                        type="checkbox"
                        id="published"
                        checked={published}
                        onChange={(e) => setPublished(e.target.checked)}
                        className="w-5 h-5 accent-blue-600 rounded"
                    />
                    <label htmlFor="published" className="text-sm font-bold text-slate-700">Publicar en el sitio</label>
                </div>
            </div>

            <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Descripción</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                    placeholder="Detalles sobre el evento..."
                ></textarea>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-3 border border-slate-200 rounded-xl font-medium hover:bg-slate-50 transition"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-10 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100 disabled:opacity-50"
                >
                    {loading ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Crear Evento')}
                </button>
            </div>
        </form>
    );
}
