'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { ShieldCheck, Lock, Loader2, User, Mail, Key, HelpCircle, Sparkles } from 'lucide-react';

interface SecurityQuestion {
    id: string;
    question: string;
    order_index: number;
}

export default function AdminRegisterPage() {
    const { register } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [questions, setQuestions] = useState<SecurityQuestion[]>([]);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingQuestions, setLoadingQuestions] = useState(true);

    useEffect(() => {
        fetch('/api/security-questions')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setQuestions(data.questions);
                    const initial: Record<string, string> = {};
                    data.questions.forEach((q: SecurityQuestion) => initial[q.id] = '');
                    setAnswers(initial);
                }
            })
            .catch(() => setError('Error al cargar preguntas'))
            .finally(() => setLoadingQuestions(false));
    }, []);

    const handleAnswerChange = (id: string, value: string) => {
        setAnswers(prev => ({ ...prev, [id]: value }));
    };

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');

        const allAnswered = questions.every(q => answers[q.id]?.trim());
        if (!allAnswered) {
            setError('Debes responder todas las preguntas');
            return;
        }

        setLoading(true);

        const answersArray = questions.map(q => ({ questionId: q.id, answer: answers[q.id] }));

        try {
            const verifyRes = await fetch('/api/security-questions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answers: answersArray })
            });

            const verifyData = await verifyRes.json();

            if (!verifyData.verified) {
                setError('Respuestas incorrectas. Acceso denegado.');
                setLoading(false);
                return;
            }

            const { error: err } = await register(name, email, password, 'enterprise', 'admin');
            if (err) {
                setError(err);
                return;
            }
            window.location.href = '/admin/dashboard';
        } catch {
            setError('Error al verificar respuestas');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#020205',
            overflow: 'hidden',
            position: 'relative',
            padding: '10px'
        }}>
            {/* Animated Dynamic Background */}
            <div className="dynamic-bg">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
            </div>

            <div className="main-container" style={{ width: '100%', maxWidth: '440px', display: 'flex', flexDirection: 'column', gap: '10px', zIndex: 10 }}>
                
                {/* Dynamic Header */}
                <div style={{ textAlign: 'center', animation: 'fadeInDown 0.8s ease-out' }}>
                    <div className="logo-container">
                        <ShieldCheck size={28} className="logo-icon" />
                        <Sparkles size={14} className="sparkle-icon" />
                    </div>
                    <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.03em', textShadow: '0 0 20px rgba(129,138,248,0.3)' }}>
                        Admin <span style={{ color: '#818cf8' }}>Elite</span> Registration
                    </h1>
                    <div className="status-badge">
                        <div className="pulse-dot"></div>
                        SECURE ENCRYPTED ACCESS
                    </div>
                </div>

                {/* Premium Form Card */}
                <div className="glass-card">
                    <div className="card-border-glow"></div>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative', zIndex: 2 }}>
                        
                        {error && (
                            <div className="error-alert">
                                {error}
                            </div>
                        )}

                        <div className="input-stack">
                            <div className="input-wrapper group">
                                <User size={16} className="field-icon" />
                                <input 
                                    className="premium-input" 
                                    value={name} 
                                    onChange={e => setName(e.target.value)} 
                                    placeholder="Nombre de Operador" 
                                    required 
                                />
                                <div className="input-glow"></div>
                            </div>
                            
                            <div className="input-wrapper group">
                                <Mail size={16} className="field-icon" />
                                <input 
                                    className="premium-input" 
                                    type="email" 
                                    value={email} 
                                    onChange={e => setEmail(e.target.value)} 
                                    placeholder="Email Corporativo" 
                                    required 
                                />
                                <div className="input-glow"></div>
                            </div>

                            <div className="input-wrapper group">
                                <Key size={16} className="field-icon" />
                                <input 
                                    className="premium-input" 
                                    type="password" 
                                    value={password} 
                                    onChange={e => setPassword(e.target.value)} 
                                    placeholder="Clave Maestra" 
                                    required 
                                />
                                <div className="input-glow"></div>
                            </div>
                        </div>

                        {/* Security Protocol Section */}
                        <div className="protocol-section">
                            <div className="protocol-header">
                                <HelpCircle size={14} color="#f59e0b" />
                                <span>PROTOCOLO DE SEGURIDAD</span>
                            </div>

                            {loadingQuestions ? (
                                <div className="loading-questions">
                                    <Loader2 className="spinner" />
                                </div>
                            ) : (
                                <div className="questions-grid">
                                    {questions.map((q, idx) => (
                                        <div key={q.id} className="question-item">
                                            <div className="question-text">
                                                <span className="q-num">{idx + 1}</span>
                                                <p>{q.question}</p>
                                            </div>
                                            <input 
                                                className="answer-input" 
                                                type="text" 
                                                value={answers[q.id] || ''} 
                                                onChange={e => handleAnswerChange(q.id, e.target.value)} 
                                                placeholder="Respuesta de seguridad..." 
                                                required 
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Animated Submit Button */}
                        <button 
                            type="submit" 
                            disabled={loading || loadingQuestions} 
                            className={`submit-btn ${loading ? 'loading' : ''}`}
                        >
                            <span className="btn-content">
                                {loading ? (
                                    <>
                                        <Loader2 className="spinner-sm" />
                                        AUTENTICANDO...
                                    </>
                                ) : 'ACTIVAR ACCESO ADMIN'}
                            </span>
                            <div className="btn-glow"></div>
                        </button>
                    </form>
                </div>

                {/* Elegant Footer */}
                <div style={{ textAlign: 'center', animation: 'fadeInUp 0.8s ease-out' }}>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>
                        ¿Ya formas parte del equipo? <Link href="/admin/login" className="login-link">Acceder al Terminal</Link>
                    </p>
                </div>
            </div>

            <style jsx>{`
                .dynamic-bg {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    z-index: 1;
                }
                .blob {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(80px);
                    opacity: 0.15;
                    animation: move 20s infinite alternate;
                }
                .blob-1 { width: 400px; height: 400px; background: #6366f1; top: -100px; left: -100px; }
                .blob-2 { width: 350px; height: 350px; background: #a855f7; bottom: -100px; right: -100px; animation-delay: -5s; }
                .blob-3 { width: 300px; height: 300px; background: #06b6d4; top: 50%; left: 50%; animation-delay: -10s; }

                @keyframes move {
                    from { transform: translate(0, 0) scale(1); }
                    to { transform: translate(50px, 50px) scale(1.1); }
                }

                .logo-container {
                    width: 56px;
                    height: 56px;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 12px;
                    position: relative;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                }
                .logo-icon { color: #818cf8; filter: drop-shadow(0 0 8px rgba(129,140,248,0.5)); }
                .sparkle-icon { position: absolute; top: 8px; right: 8px; color: #fbbf24; animation: pulse 2s infinite; }

                .status-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    background: rgba(16,185,129,0.1);
                    border: 1px solid rgba(16,185,129,0.2);
                    padding: 4px 10px;
                    border-radius: 20px;
                    font-size: 9px;
                    color: #10b981;
                    font-weight: 800;
                    letter-spacing: 0.1em;
                    margin-top: 8px;
                }
                .pulse-dot { width: 5px; height: 5px; background: #10b981; border-radius: 50%; animation: blink 1.5s infinite; }

                .glass-card {
                    background: rgba(255,255,255,0.01);
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 24px;
                    padding: 24px;
                    backdrop-filter: blur(25px);
                    position: relative;
                    box-shadow: 0 25px 50px -12px rgba(0,0,0,0.7);
                    animation: zoomIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
                }
                .card-border-glow {
                    position: absolute;
                    inset: -1px;
                    background: linear-gradient(135deg, rgba(99,102,241,0.2), transparent 40%, rgba(168,85,247,0.2));
                    border-radius: 24px;
                    z-index: 1;
                    pointer-events: none;
                }

                .input-wrapper { position: relative; width: 100%; }
                .field-icon {
                    position: absolute;
                    left: 14px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: rgba(255,255,255,0.2);
                    transition: color 0.3s;
                }
                .premium-input {
                    width: 100%;
                    background: rgba(0,0,0,0.3);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 12px;
                    padding: 12px 14px 12px 42px;
                    color: #fff;
                    font-size: 14px;
                    transition: all 0.3s;
                }
                .premium-input:focus {
                    border-color: rgba(129,140,248,0.5);
                    background: rgba(0,0,0,0.5);
                    outline: none;
                    box-shadow: 0 0 20px rgba(99,102,241,0.1);
                }
                .premium-input:focus + .input-glow { opacity: 1; }
                .input-glow {
                    position: absolute;
                    inset: 0;
                    border-radius: 12px;
                    box-shadow: 0 0 15px rgba(99,102,241,0.2);
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.3s;
                }

                .protocol-section {
                    background: rgba(0,0,0,0.2);
                    border-radius: 16px;
                    padding: 12px;
                    border: 1px solid rgba(255,255,255,0.03);
                }
                .protocol-header {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    margin-bottom: 10px;
                    font-size: 10px;
                    font-weight: 800;
                    color: #f59e0b;
                    letter-spacing: 0.05em;
                }
                .question-item {
                    background: rgba(255,255,255,0.02);
                    border-radius: 10px;
                    padding: 8px 10px;
                    margin-bottom: 6px;
                }
                .question-text {
                    display: flex;
                    gap: 8px;
                    margin-bottom: 6px;
                }
                .q-num {
                    font-size: 10px;
                    font-weight: 900;
                    color: #818cf8;
                    width: 18px;
                    height: 18px;
                    background: rgba(99,102,241,0.1);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justifyContent: center;
                    flex-shrink: 0;
                }
                .question-text p {
                    font-size: 11px;
                    color: rgba(255,255,255,0.7);
                    margin: 0;
                    line-height: 1.3;
                }
                .answer-input {
                    width: 100%;
                    background: rgba(0,0,0,0.3);
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 6px;
                    padding: 6px 10px;
                    color: #fff;
                    font-size: 12px;
                    outline: none;
                }
                .answer-input:focus { border-color: rgba(245,158,11,0.3); }

                .submit-btn {
                    width: 100%;
                    height: 48px;
                    position: relative;
                    border: none;
                    border-radius: 14px;
                    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
                    color: #fff;
                    cursor: pointer;
                    overflow: hidden;
                    transition: all 0.3s;
                }
                .submit-btn:hover { transform: translateY(-2px); box-shadow: 0 15px 30px rgba(79,70,229,0.4); }
                .submit-btn:active { transform: translateY(0); }
                .btn-content {
                    position: relative;
                    z-index: 2;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    font-weight: 800;
                    letter-spacing: 0.05em;
                }
                .btn-glow {
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%);
                    opacity: 0;
                    transition: opacity 0.3s;
                }
                .submit-btn:hover .btn-glow { opacity: 1; }

                .login-link {
                    color: #818cf8;
                    text-decoration: none;
                    font-weight: 700;
                    transition: color 0.3s;
                }
                .login-link:hover { color: #fff; }

                .spinner { animation: rotate 2s linear infinite; }
                .spinner-sm { width: 16px; height: 16px; animation: rotate 2s linear infinite; }
                @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
                @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.2); } }
                @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes zoomIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }

                .error-alert {
                    background: rgba(239,68,68,0.15);
                    border: 1px solid rgba(239,68,68,0.3);
                    border-radius: 10px;
                    padding: 10px 14px;
                    color: #fca5a5;
                    font-size: 12px;
                    font-weight: 600;
                    margin-bottom: 4px;
                    animation: shake 0.4s ease;
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
            `}</style>
        </div>
    );
}
