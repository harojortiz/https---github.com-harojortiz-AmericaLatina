'use client';

import React from 'react';

export default function ContactoPage() {
    const socialLinks = [
        {
            name: 'Facebook',
            url: 'https://facebook.com',
            color: 'hover:bg-blue-600',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
            )
        },
        {
            name: 'Instagram',
            url: 'https://instagram.com',
            color: 'hover:bg-pink-600',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
            )
        },
        {
            name: 'TikTok',
            url: 'https://tiktok.com',
            color: 'hover:bg-black',
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92 0 5.84 0 8.75 0 2.03-.67 4.07-2.1 5.54-1.5 1.56-3.7 2.44-5.9 2.35-2.16-.1-4.25-1.07-5.58-2.73-1.39-1.74-1.85-4.08-1.24-6.23.58-2.11 2.19-3.9 4.31-4.7 1-.37 2.06-.52 3.12-.49v4.1c-.67-.07-1.35.03-1.97.3-.85.38-1.49 1.13-1.73 2-.24.84-.13 1.78.33 2.52.46.74 1.25 1.23 2.11 1.35 1.05.15 2.17-.16 2.94-.9.84-.81 1.27-1.98 1.23-3.14V.02z" />
                </svg>
            )
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 py-16 px-4">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-black text-[#f15a24] mb-4 tracking-tight uppercase">Contáctanos</h1>
                    <div className="h-2 w-32 bg-[#29abe2] mx-auto rounded-full"></div>
                    <p className="mt-6 text-slate-500 text-lg max-w-2xl mx-auto font-medium">
                        Estamos aquí para escucharte. Ponte en contacto con nosotros a través de cualquiera de nuestros canales oficiales.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-stretch">
                    {/* Contact Info Cards */}
                    <div className="space-y-6">
                        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200 border border-slate-100 group hover:translate-y-[-5px] transition duration-300">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-[#f15a24]/10 rounded-2xl flex items-center justify-center text-[#f15a24]">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">Correo Electrónico</h3>
                                    <p className="text-xl font-bold text-slate-800">contacto@americalatina.edu.co</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200 border border-slate-100 group hover:translate-y-[-5px] transition duration-300">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-[#29abe2]/10 rounded-2xl flex items-center justify-center text-[#29abe2]">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">Teléfonos</h3>
                                    <p className="text-xl font-bold text-slate-800">320-451 89 38</p>
                                    <p className="text-lg font-bold text-[#29abe2]">316 18 88 ext:1104</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200 border border-slate-100 group hover:translate-y-[-5px] transition duration-300">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-[#fbb03b]/10 rounded-2xl flex items-center justify-center text-[#fbb03b]">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">Dirección</h3>
                                    <p className="text-xl font-bold text-slate-800">Av. Principal No. 123, Bogotá</p>
                                    <p className="text-sm text-slate-500 font-medium">Sede Principal - Barrio El Recreo</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Social Media & Interaction */}
                    <div className="bg-[#f15a24] rounded-[40px] p-12 text-white flex flex-col justify-center relative overflow-hidden shadow-2xl shadow-[#f15a24]/30">
                        {/* Decorative circles */}
                        <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-[-50px] left-[-50px] w-48 h-48 bg-black/10 rounded-full blur-2xl"></div>

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-black mb-8 leading-tight">Síguenos en nuestras redes sociales</h2>
                            <p className="text-orange-100 mb-12 text-lg font-medium opacity-90">
                                Únete a nuestra comunidad digital para enterarte de eventos en tiempo real, fotos de actividades y comunicados rápidos.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex items-center justify-center gap-3 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 transition-all duration-300 ${social.color} hover:text-white group`}
                                    >
                                        {social.icon}
                                        <span className="font-bold uppercase tracking-wider text-xs">{social.name}</span>
                                    </a>
                                ))}
                            </div>

                            <div className="mt-16 pt-12 border-t border-white/20 text-center">
                                <p className="text-2xl font-black italic tracking-tighter opacity-80">I.E.D América Latina</p>
                                <p className="text-sm font-medium mt-2 opacity-60 uppercase tracking-[0.3em]">Fe y Alegría Colombia</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
