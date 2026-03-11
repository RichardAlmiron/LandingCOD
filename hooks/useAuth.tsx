'use client';
import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface User {
    id: string;
    email: string;
    name: string;
    plan: 'free' | 'pro' | 'enterprise';
    role: 'user' | 'admin';
}

interface AuthContextValue {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<{ error?: string; user?: User }>;
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

    /**
     * Optimizamos loadUser para que solo se ejecute una vez y use caché local de sesión.
     */
    const loadUser = useCallback(async () => {
        if (isFetching.current) return;
        isFetching.current = true;

        try {
            const res = await fetch('/api/auth/me', {
                credentials: 'include',
                headers: { 'Cache-Control': 'max-age=60' }
            });

            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
            } else {
                // Si el /me falla, intentamos silentRefresh solo una vez
                await silentRefresh();
            }
        } catch (err) {
            console.error('Error cargando usuario:', err);
        } finally {
            setLoading(false);
            isFetching.current = false;
        }
    }, []);

    useEffect(() => {
        loadUser();
    }, [loadUser]);

    /**
     * Silent token refresh optimizado.
     */
    const silentRefresh = useCallback(async (): Promise<boolean> => {
        try {
            const res = await fetch('/api/auth/refresh', { method: 'POST', credentials: 'include' });
            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
                return true;
            }
        } catch (e) { /* ignore */ }
        setUser(null);
        return false;
    }, []);

    // ── Login ultra-optimizado ───────────────────────────────────────────────
    const login = useCallback(async (email: string, password: string) => {
        setLoading(true);
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();

            if (!res.ok) {
                setLoading(false);
                return { error: data.error || 'Login fallido' };
            }

            setUser(data.user);
            setLoading(false);

            // Navegamos inmediatamente después del login exitoso
            const target = data.user.role === 'admin' ? '/admin/dashboard' : '/dashboard';
            router.push(target);
            return { user: data.user };
        } catch (err) {
            setLoading(false);
            return { error: 'Error de conexión' };
        }
    }, [router]);

    const register = useCallback(async (name: string, email: string, password: string, plan = 'free', role = 'user', metadata = {}) => {
        setLoading(true);
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ name, email, password, plan, role, metadata }),
            });
            const data = await res.json();
            if (!res.ok) {
                setLoading(false);
                return { error: data.error || 'Registro fallido' };
            }
            setUser(data.user);
            setLoading(false);
            router.push('/dashboard');
            return { user: data.user };
        } catch (err) {
            setLoading(false);
            return { error: 'Error de conexión' };
        }
    }, [router]);

    const logout = useCallback(async () => {
        setUser(null);
        await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
        router.push('/login');
    }, [router]);

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, refresh: silentRefresh }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
    return ctx;
}
