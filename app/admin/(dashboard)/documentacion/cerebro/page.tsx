'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Database, FileCode2, ScrollText, CheckCircle2, MonitorPlay, Zap, ArrowRight, ShieldCheck, Users } from 'lucide-react';

export default function CerebroPage() {
    return (
        <div className="w-full min-h-screen text-slate-200 p-8 pt-4 antialiased">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[120px]"></div>
            </div>

            <header className="mb-14">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold tracking-widest uppercase mb-4">
                    <Zap size={14} className="animate-pulse" /> Documentación
                </div>
                <h1 className="text-4xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                    El Cerebro <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                        Landing Code Studio
                    </span>
                </h1>
                <p className="max-w-2xl mt-4 text-slate-400 font-medium text-lg">
                    El mapa maestro arquitectónico. Descubre el ciclo de vida de una plantilla (PDP) desde que su código nace en el editor hasta que un cliente genera ventas millonarias con ella.
                </p>
            </header>

            {/* FLOW DIAGRAM SECTION */}
            <section className="mb-20">
                <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 w-[300px] h-full bg-gradient-to-l from-indigo-500/5 to-transparent pointer-events-none"></div>
                    
                    <h2 className="text-2xl font-bold text-white tracking-tight mb-12 flex items-center gap-3">
                        <ScrollText className="text-indigo-400" />
                        Flujo Vital (Nacimiento a Producción)
                    </h2>

                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="absolute left-[39px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-indigo-500 via-cyan-500 to-emerald-500 z-0 hidden md:block opacity-50"></div>

                        <div className="space-y-16 md:space-y-12">
                            {/* PASO 1 */}
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-10 md:items-center group">
                                <div className="w-20 h-20 rounded-2xl bg-slate-800 border-2 border-indigo-500/30 flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(99,102,241,0.15)] group-hover:border-indigo-500 transition-colors">
                                    <FileCode2 size={32} className="text-indigo-400" />
                                </div>
                                <div className="flex-1 bg-slate-800/40 p-6 rounded-2xl border border-white/5 hover:bg-slate-800/80 transition-colors">
                                    <h3 className="text-xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
                                        <span className="bg-indigo-500 text-white rounded-md w-6 h-6 flex items-center justify-center text-xs">1</span>
                                        Nacimiento (Código)
                                    </h3>
                                    <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                                        Se crea el archivo físico del componente React (Ej. <code className="text-indigo-300 bg-indigo-500/10 px-1 py-0.5 rounded">PdpEreaderZen.tsx</code>) respetando la anatomía de 15 Secciones CRO y el Modelo 7 Cifras.
                                    </p>
                                    <div className="text-xs font-mono text-slate-500 bg-slate-900/50 p-3 rounded-xl border border-white/5">
                                        Ruta: components/pdp/[cat]/[sub]/PdpNombre.tsx
                                    </div>
                                </div>
                            </motion.div>

                            {/* PASO 2 */}
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-10 md:items-center group">
                                <div className="w-20 h-20 rounded-2xl bg-slate-800 border-2 border-cyan-500/30 flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(6,182,212,0.15)] group-hover:border-cyan-500 transition-colors">
                                    <ScrollText size={32} className="text-cyan-400" />
                                </div>
                                <div className="flex-1 bg-slate-800/40 p-6 rounded-2xl border border-white/5 hover:bg-slate-800/80 transition-colors">
                                    <h3 className="text-xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
                                        <span className="bg-cyan-500 text-white rounded-md w-6 h-6 flex items-center justify-center text-xs">2</span>
                                        El Registro (Fuente de Verdad)
                                    </h3>
                                    <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                                        El componente se importa y se registra en el archivo maestro del sistema. Aquí se le asigna un código único (Ej. <code className="text-cyan-300 bg-cyan-500/10 px-1 py-0.5 rounded">PDP-EREADER-ZEN</code>). Solo lo registrado aquí tiene representación en la UI.
                                    </p>
                                    <div className="text-xs font-mono text-slate-500 bg-slate-900/50 p-3 rounded-xl border border-white/5 flex flex-col gap-1">
                                        Ruta: lib/plantilla-registry.ts<br/>
                                        <span className="text-cyan-400/70">{'const PLANTILLAS_REGISTRY = { "PDP-EREADER-ZEN": { componente: PdpEreaderZen ... } }'}</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* PASO 3 */}
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-10 md:items-center group">
                                <div className="w-20 h-20 rounded-2xl bg-slate-800 border-2 border-emerald-500/30 flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(16,185,129,0.15)] group-hover:border-emerald-500 transition-colors">
                                    <Database size={32} className="text-emerald-400" />
                                </div>
                                <div className="flex-1 bg-slate-800/40 p-6 rounded-2xl border border-white/5 hover:bg-slate-800/80 transition-colors">
                                    <h3 className="text-xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
                                        <span className="bg-emerald-500 text-white rounded-md w-6 h-6 flex items-center justify-center text-xs">3</span>
                                        Base de Datos (Supabase)
                                    </h3>
                                    <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                                        Se inyecta un registro en la base de datos PostgreSQL vinculando el ID. Por seguridad, nace inactivo para no impactar al cliente.
                                    </p>
                                    <div className="text-xs font-mono text-slate-500 bg-slate-900/50 p-3 rounded-xl border border-white/5 flex flex-col gap-1">
                                        Tabla: Plantillas_PDP<br/>
                                        <span className="text-emerald-400/70">Valores Clave: activa = <strong className="text-red-400">false</strong>, verificada = <strong className="text-red-400">false</strong></span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* PASO 4 */}
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-10 md:items-center group">
                                <div className="w-20 h-20 rounded-2xl bg-slate-800 border-2 border-purple-500/30 flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(168,85,247,0.15)] group-hover:border-purple-500 transition-colors">
                                    <ShieldCheck size={32} className="text-purple-400" />
                                </div>
                                <div className="flex-1 bg-slate-800/40 p-6 rounded-2xl border border-white/5 hover:bg-slate-800/80 transition-colors">
                                    <h3 className="text-xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
                                        <span className="bg-purple-500 text-white rounded-md w-6 h-6 flex items-center justify-center text-xs">4</span>
                                        Panel de Administrador (QA)
                                    </h3>
                                    <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                                        Tú (el administrador) la ves en el Panel de Templates como "Pendiente". Puedes visualizarla, auditar su calidad 7-Cifras. Si todo es perfecto, le das estado activo global.
                                    </p>
                                    <div className="flex gap-4">
                                        <div className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                                            verificada = true
                                        </div>
                                        <div className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                                            activa = true
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* PASO 5 */}
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-10 md:items-center group">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 border-2 border-white/20 flex items-center justify-center shrink-0 shadow-[0_0_40px_rgba(99,102,241,0.4)]">
                                    <Users size={32} className="text-white" />
                                </div>
                                <div className="flex-1 bg-gradient-to-r from-indigo-500/20 to-transparent p-6 rounded-2xl border border-indigo-500/30">
                                    <h3 className="text-xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
                                        <span className="bg-white text-indigo-900 font-black rounded-md w-6 h-6 flex items-center justify-center text-xs">5</span>
                                        Cliente Final (Generación)
                                    </h3>
                                    <p className="text-sm text-indigo-100/70 mb-4 leading-relaxed">
                                        El cliente inicia sesión en su dashboard, selecciona la nueva plantilla (ahora disponible), llena los datos de su producto, y el generador de React copia el componente inyectando la Data de la tienda. ¡Lista para facturar!
                                    </p>
                                </div>
                            </motion.div>

                        </div>
                    </div>
                </div>
            </section>

            {/* SECCIÓN "CÓDIGO OBSOLETO DETECTADO" (Auto-Limpieza mental) */}
            <section>
                <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
                    <div className="bg-slate-800/50 p-6 md:px-8 border-b border-white/5 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444]"></span>
                            Auditoría de Código y Lógica Obsleta
                        </h2>
                        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Aviso del Sistema</span>
                    </div>
                    <div className="p-6 md:p-8 text-sm text-slate-400 space-y-6">
                        <p className="leading-relaxed">
                            Al estructurar esta documentación, se detectó que el ecosistema tenía comportamientos mixtos o código antiguo que no cuadra con el nuevo estándar <strong className="text-white bg-slate-800 px-1.5 py-0.5 rounded">Millon Dollar PDP (15 Sections)</strong>. 
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-5 border border-red-500/20 bg-red-500/5 rounded-2xl">
                                <h4 className="font-bold text-red-400 mb-2">Lo Obsoleto (A Ignorar / Eliminar a futuro)</h4>
                                <ul className="list-disc pl-4 space-y-2 text-slate-300">
                                    <li>Plantillas con pocas secciones y poca capacidad de retención.</li>
                                    <li>Uso de emojis como 🚚 y ⚡ (prohibidos en el diseño Ultra-Premium por ser considerados poco profesionales para tiendas estelares).</li>
                                    <li>Las antiguas lógicas de inserción que marcaban `activa = true` por defecto (scripts viejos).</li>
                                </ul>
                            </div>
                            <div className="p-5 border border-emerald-500/20 bg-emerald-500/5 rounded-2xl">
                                <h4 className="font-bold text-emerald-400 mb-2">El Nuevo Estándar (La Ley)</h4>
                                <ul className="list-disc pl-4 space-y-2 text-slate-300">
                                    <li>Mínimo 15 secciones (Risk Reversal, Track Record, Sticky Nav, etc).</li>
                                    <li>Todo se registra exclusivamente en `plantilla-registry.ts`.</li>
                                    <li>Solo SVG in-line modernos (Lucide React) o iconos custom.</li>
                                    <li>Todo nace con `verificada = false`. Todo requiere el O.K. del administrador maestro en este panel de control.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
