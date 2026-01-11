'use client';

import { useEffect, useState } from 'react';
import { Post } from '@/types';
import { apiFetch } from '@/lib/api';
import Link from 'next/link';

export default function PostsAdminPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            const data = await apiFetch('/posts');
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de que deseas eliminar esta publicación?')) return;
        try {
            await apiFetch(`/posts/${id}`, { method: 'DELETE' });
            setPosts(posts.filter(p => p.id !== id));
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Gestionar Publicaciones</h2>
                    <p className="text-slate-500">Crea, edita y organiza el contenido del sitio.</p>
                </div>
                <Link href="/admin/publicaciones/nueva" className="btn-primary">
                    Nueva Publicación
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Título</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Estado</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Autor</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            <tr><td colSpan={4} className="px-6 py-10 text-center text-slate-400">Cargando...</td></tr>
                        ) : posts.length === 0 ? (
                            <tr><td colSpan={4} className="px-6 py-10 text-center text-slate-400 italic">No hay publicaciones encontradas.</td></tr>
                        ) : posts.map((post) => (
                            <tr key={post.id} className="hover:bg-slate-50 transition">
                                <td className="px-6 py-4">
                                    <p className="font-bold text-slate-900">{post.title}</p>
                                    <p className="text-xs text-slate-400">{post.category.name}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-[10px] font-bold rounded-full uppercase ${post.published ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
                                        }`}>
                                        {post.published ? 'Publicado' : 'Borrador'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600">{post.author.fullName}</td>
                                <td className="px-6 py-4 text-right space-x-3">
                                    <Link href={`/admin/publicaciones/editar/${post.id}`} className="text-blue-600 hover:text-blue-800 font-medium">Editar</Link>
                                    <button onClick={() => handleDelete(post.id)} className="text-red-500 hover:text-red-700 font-medium">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
