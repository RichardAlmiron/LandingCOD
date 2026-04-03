'use client';
import React, { useState, useEffect, useRef } from 'react';

// ═══════════════════════════════════════════════════════════
// PG-001: AIDA CLÁSICO EXTREMO — 15 secciones CRO
// Producto placeholder: Smartphone NexaPhone Ultra Pro
// ═══════════════════════════════════════════════════════════

const PRODUCT = {
    name: 'NexaPhone Ultra Pro',
    price: 199900,
    originalPrice: 459900,
    currency: 'COP',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80',
    images: [
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80',
        'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&q=80',
        'https://images.unsplash.com/photo-1580910051074-3eb694886571?w=600&q=80',
        'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80',
    ],
    description: 'El smartphone que redefine lo posible. Pantalla AMOLED 120Hz, cámara 108MP con IA, batería 5500mAh y carga rápida 67W.',
};

const fmt = (n: number) => new Intl.NumberFormat('es-CO').format(n);

// ── Hooks ──
function useCountdown(minutes: number) {
    const [t, setT] = useState(minutes * 60);
    useEffect(() => { const id = setInterval(() => setT(v => Math.max(0, v - 1)), 1000); return () => clearInterval(id); }, []);
    return { h: Math.floor(t / 3600), m: Math.floor((t % 3600) / 60), s: t % 60 };
}
function useViewers() {
    const [v, setV] = useState(67);
    useEffect(() => { const id = setInterval(() => setV(Math.floor(Math.random() * 30 + 55)), 5000); return () => clearInterval(id); }, []);
    return v;
}
function useStock() {
    const [s, setS] = useState(14);
    useEffect(() => { const id = setInterval(() => setS(v => Math.max(2, v - (Math.random() > 0.65 ? 1 : 0))), 18000); return () => clearInterval(id); }, []);
    return s;
}
function usePurchases() {
    const names = ['Carlos M.', 'María L.', 'Andrés R.', 'Laura G.', 'Juan P.', 'Diana C.', 'Santiago V.', 'Valentina H.'];
    const cities = ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Bucaramanga', 'Pereira', 'Santa Marta'];
    const [p, setP] = useState({ name: '', city: '', ago: 0 });
    const [show, setShow] = useState(false);
    useEffect(() => {
        const id = setInterval(() => {
            setP({ name: names[Math.floor(Math.random() * names.length)], city: cities[Math.floor(Math.random() * cities.length)], ago: Math.floor(Math.random() * 10) + 1 });
            setShow(true);
            setTimeout(() => setShow(false), 4500);
        }, 9000);
        return () => clearInterval(id);
    }, []);
    return { p, show };
}
function useInView(ref: React.RefObject<HTMLElement | null>) {
    const [v, setV] = useState(false);
    useEffect(() => {
        if (!ref.current) return;
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.15 });
        obs.observe(ref.current);
        return () => obs.disconnect();
    }, [ref]);
    return v;
}
function scrollToCOD() { document.getElementById('cod-form')?.scrollIntoView({ behavior: 'smooth' }); }
