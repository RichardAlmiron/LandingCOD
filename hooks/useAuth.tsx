'use client';
import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    id: string;
    email: string;
    name: string;
    plan: 'free' | 'pro' | 'enterprise' | 'almidrop';
    role: 'user' | 'admin';
    source?: 'almidrop' | 'landingcod' | 'external';
    almidropId?: string;
}

interface AuthContextValue {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string, context?: 'client' | 'admin') => Promise<{ error?: string; user?: User }>;
    register: (name: string, email: string, password: string, plan?: string, role?: string, metadata?: any) => Promise<{ error?: string; user?: User }>;
    logout: () => Promise<void>;
    refresh: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const isFetching = useRef(false);
    const hasLoaded = useRef(false); // Evitar cargas múltiples

    // ── Cargar usuario al montar (solo una vez) ──────────────────────────────
    const loadUser = useCallback(async () => {
        if (isFetching.current || hasLoaded.current) return;
        isFetching.current = true;
        
        try {
            const res = await fetch('/api/auth/me', { 
                credentials: 'include',
                cache: 'no-store'
            });
            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
                hasLoaded.current = true;
            } else {
                setUser(null);
                hasLoaded.current = true;
            }
        } catch {
            setUser(null);
            hasLoaded.current = true;
        } finally {
            setLoading(false);
            isFetching.current = false;
        }
    }, []);

    // Solo cargar una vez al montar el provider
    useEffect(() => { 
        loadUser(); 
    }, []); // Sin dependencias para evitar re-cargas

    // ── Silent refresh (interno, sin dependencias externas) ─────────────────
    const silentRefreshInternal = useCallback(async (): Promise<boolean> => {
        try {
            const res = await fetch('/api/auth/refresh', { method: 'POST', credentials: 'include' });
            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
                return true;
            }
        } catch { /* ignore */ }
        return false;
    }, []);

    // ── Login: retorna user inmediatamente, la página decide la redirección ──
    const login = useCallback(async (email: string, password: string, context?: 'client' | 'admin') => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, password, context }),
            });
            const data = await res.json();

            if (!res.ok) {
                return { error: data.error || 'Login fallido' };
            }

            setUser(data.user);
            return { user: data.user as User };
        } catch {
            return { error: 'Error de conexión' };
        }
    }, []);

    // ── Register ─────────────────────────────────────────────────────────────
    const register = useCallback(async (
        name: string, email: string, password: string,
        plan = 'free', role = 'user', metadata = {}
    ) => {
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ name, email, password, plan, role, metadata }),
            });
            const data = await res.json();

            if (!res.ok) {
                return { error: data.error || 'Registro fallido' };
            }

            setUser(data.user);
            return { user: data.user as User };
        } catch {
            return { error: 'Error de conexión' };
        }
    }, []);

    // ── Logout: detecta si es admin para redirigir correctamente ─────────────
    const logout = useCallback(async () => {
        const wasAdmin = user?.role === 'admin';
        setUser(null);
        try {
            await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
        } catch { /* ignore */ }
        // Hard navigation para limpiar todo el estado del cliente
        window.location.href = wasAdmin ? '/admin/login' : '/login';
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, refresh: silentRefreshInternal }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
    return ctx;
}
