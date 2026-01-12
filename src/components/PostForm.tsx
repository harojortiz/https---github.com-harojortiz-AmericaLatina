'use client';

import { useState, useEffect } from 'react';
import { apiFetch } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface Category {
    id: string;
    name: string;
}

interface PostFormProps {
    initialData?: any;
    isEditing?: boolean;
}

export default function PostForm({ initialData, isEditing = false }: PostFormProps) {
    const [title, setTitle] = useState(initialData?.title || '');
    const [content, setContent] = useState(initialData?.content || '');
    const [categoryId, setCategoryId] = useState(initialData?.categoryId || '');
    const [published, setPublished] = useState(initialData?.published || false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await apiFetch('/categories');
            setCategories(data);
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const payload = { title, content, categoryId, published };

        try {
            if (isEditing) {
                await apiFetch(`/posts/${initialData.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(payload),
                });
            } else {
                await apiFetch('/posts', {
                    method: 'POST',
                    body: JSON.stringify(payload),
                });
            }
            router.push('/admin/publicaciones');
            router.refresh();
        } catch (error: any) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Título de la Publicación</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition"
                    placeholder="Ej: Gran Recital de Invierno 2024"
                />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Categoría</label>
                    <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        required
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition"
                    >
                        <option value="">Selecciona una categoría</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center space-x-3 pt-8">
                    <input
                        type="checkbox"
                        id="published"
                        checked={published}
                        onChange={(e) => setPublished(e.target.checked)}
                        className="w-5 h-5 accent-red-600 rounded"
                    />
                    <label htmlFor="published" className="text-sm font-bold text-slate-700">Publicar inmediatamente</label>
                </div>
            </div>

            <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Contenido</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    rows={10}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition"
                    placeholder="Escribe el cuerpo de la publicación aquí..."
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
                    className="px-10 py-3 bg-[#dc2626] text-white rounded-xl font-bold hover:bg-[#991b1b] transition shadow-lg shadow-red-100 disabled:opacity-50"
                >
                    {loading ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Crear Publicación')}
                </button>
            </div>
        </form>
    );
}
