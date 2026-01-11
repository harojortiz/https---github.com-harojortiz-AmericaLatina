'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Post, Event } from '@/types';
import { apiFetch } from '@/lib/api';

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsData = await apiFetch('/posts/public');
        const eventsData = await apiFetch('/events/public');
        setPosts(postsData.slice(0, 3));
        setEvents(eventsData.slice(0, 3));
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section - Wix Inspired */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1523050853064-0097f5737604?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale-[50%]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>

        <div className="relative z-10 text-center px-4">
          <h2 className="text-[#f15a24] text-5xl md:text-8xl font-black italic italic tracking-tighter mb-2 drop-shadow-lg">
            Promoción 2025
          </h2>
          <h3 className="text-white text-3xl md:text-5xl font-black uppercase tracking-[0.2em] mb-8">
            Back to School
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/noticias" className="px-10 py-4 bg-[#f15a24] text-white font-black rounded-sm hover:translate-y-[-2px] transition shadow-xl">
              VER NOTICIAS
            </Link>
            <Link href="/contacto" className="px-10 py-4 bg-white text-[#f15a24] font-black rounded-sm hover:translate-y-[-2px] transition shadow-xl">
              CONTACTAR
            </Link>
          </div>
        </div>
      </section>

      {/* Institutional Sections Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: 'PROYECTO TRANSVERSAL', color: 'bg-[#f15a24]' },
              { title: 'COMUNIDAD EDUCATIVA', color: 'bg-[#29abe2]' },
              { title: 'PLAN DE ESTUDIO', color: 'bg-[#fbb03b]' },
              { title: 'PASTORAL', color: 'bg-green-600' },
            ].map((item) => (
              <div key={item.title} className={`${item.color} p-8 aspect-square flex flex-col items-center justify-center text-center text-white hover:scale-105 transition duration-300 cursor-pointer shadow-md`}>
                <h4 className="font-black text-sm md:text-lg leading-tight">{item.title}</h4>
                <div className="h-1 w-8 bg-white/40 mt-3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured News */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-wider">Últimas Noticias</h2>
            <div className="h-1.5 w-24 bg-[#f15a24] mt-2"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {posts.length > 0 ? posts.map((post) => (
              <article key={post.id} className="bg-white group cursor-pointer border border-slate-100 shadow-sm hover:shadow-2xl transition duration-500 rounded-none overflow-hidden">
                <div className="aspect-video bg-slate-200 overflow-hidden">
                  {post.media?.[0] ? (
                    <img src={post.media[0].url} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300 text-xs italic">Imagen Institucional</div>
                  )}
                </div>
                <div className="p-8">
                  <span className="text-[#f15a24] text-[10px] font-black tracking-[0.2em] uppercase">{post.category.name}</span>
                  <h3 className="text-xl font-black mt-2 mb-4 text-slate-800 line-clamp-2">{post.title}</h3>
                  <p className="text-slate-500 text-sm line-clamp-3 mb-6 leading-relaxed">{post.content}</p>
                  <Link href={`/noticias/${post.id}`} className="text-xs font-black text-slate-900 border-b-2 border-[#f15a24] pb-1 hover:text-[#f15a24] transition">LEER MÁS</Link>
                </div>
              </article>
            )) : (
              <div className="col-span-3 py-20 text-center text-slate-400 italic">Cargando noticias institucionales...</div>
            )}
          </div>
        </div>
      </section>

      {/* Events Banner */}
      <section className="bg-[#29abe2] py-16 text-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl font-black mb-4">Próximos Eventos</h2>
            <p className="text-blue-50 font-medium">Mantente informado sobre las actividades académicas, reuniones de padres y celebraciones escolares.</p>
          </div>
          <Link href="/eventos" className="px-10 py-4 bg-white text-[#29abe2] font-black hover:bg-slate-100 transition whitespace-nowrap shadow-xl">
            VER CALENDARIO
          </Link>
        </div>
      </section>
    </div>
  );
}
