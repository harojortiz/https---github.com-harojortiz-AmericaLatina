'use client';

import { useEffect, useState } from 'react';
import { User, Role } from '@/types';
import { apiFetch } from '@/lib/api';

export default function UsersAdminPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    // Form state
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<Role>('DOCENTE');
    const [creating, setCreating] = useState(false);

    const fetchUsers = async () => {
        try {
            const data = await apiFetch('/users');
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreating(true);
        try {
            await apiFetch('/users', {
                method: 'POST',
                body: JSON.stringify({ email, fullName, password, role }),
            });
            setShowForm(false);
            setEmail('');
            setFullName('');
            setPassword('');
            fetchUsers();
        } catch (error: any) {
            alert(error.message);
        } finally {
            setCreating(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Seguro que deseas eliminar este usuario?')) return;
        try {
            await apiFetch(`/users/${id}`, { method: 'DELETE' });
            setUsers(users.filter(u => u.id !== id));
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Gestionar Usuarios</h2>
                    <p className="text-slate-500">Administra los accesos y roles de la plataforma.</p>
                </div>
                <button onClick={() => setShowForm(!showForm)} className="btn-primary">
                    {showForm ? 'Cancelar' : 'Nuevo Usuario'}
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-blue-100 shadow-md grid md:grid-cols-2 gap-4">
                    <div className="col-span-2 text-sm font-bold text-blue-600 mb-2 uppercase tracking-widest">Crear Nuevo Usuario</div>
                    <input
                        type="text" placeholder="Nombre Completo" value={fullName} onChange={(e) => setFullName(e.target.value)} required
                        className="px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="email" placeholder="Correo Electrónico" value={email} onChange={(e) => setEmail(e.target.value)} required
                        className="px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required
                        className="px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                        value={role} onChange={(e) => setRole(e.target.value as Role)} required
                        className="px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="DOCENTE">Docente</option>
                        <option value="GERENCIA">Gerencia</option>
                        <option value="ADMIN">Administrador</option>
                        <option value="SUPER_ADMIN">Super Administrador</option>
                    </select>
                    <div className="col-span-2 flex justify-end">
                        <button type="submit" disabled={creating} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50">
                            {creating ? 'Creando...' : 'Guardar Usuario'}
                        </button>
                    </div>
                </form>
            )}

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Nombre / Email</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Rol</th>
                            <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            <tr><td colSpan={3} className="px-6 py-10 text-center text-slate-400">Cargando...</td></tr>
                        ) : users.map((u) => (
                            <tr key={u.id} className="hover:bg-slate-50 transition">
                                <td className="px-6 py-4">
                                    <p className="font-bold text-slate-900">{u.fullName}</p>
                                    <p className="text-xs text-slate-500">{u.email}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-xs font-bold px-2 py-1 bg-slate-100 rounded-md text-slate-600 uppercase tracking-tighter">
                                        {u.role.replace('_', ' ')}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button onClick={() => handleDelete(u.id)} className="text-red-500 hover:text-red-700 font-medium">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
