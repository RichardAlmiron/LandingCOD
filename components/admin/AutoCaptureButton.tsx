'use client';
import React, { useState } from 'react';
import { Camera, Loader2, CheckCircle, AlertCircle, Trash2, Search, RotateCcw, Eye } from 'lucide-react';

interface AutoCaptureButtonProps {
  onComplete?: () => void;
}

export default function AutoCaptureButton({ onComplete }: AutoCaptureButtonProps) {
  const [captureStep, setCaptureStep] = useState<'idle' | 'analyzing' | 'capturing' | 'completed'>('idle');
  const [clearStep, setClearStep] = useState<'idle' | 'analyzing' | 'deleting' | 'completed'>('idle');
  const [captureProgress, setCaptureProgress] = useState({ current: 0, total: 0, success: 0, errors: 0 });
  const [clearProgress, setClearProgress] = useState({ current: 0, total: 0 });
  const [result, setResult] = useState<{type: 'capture' | 'clear', message: string} | null>(null);
  const [error, setError] = useState<string | null>(null);

  // ===== CAPTURA CON HTML2CANVAS (Client-side) =====
  
  const captureSingle = async (templateId: string): Promise<boolean> => {
    return new Promise(async (resolve) => {
      // Crear iframe oculto
      const iframe = document.createElement('iframe');
      iframe.style.cssText = 'position:fixed;left:-9999px;width:400px;height:300px;visibility:hidden;pointer-events:none;';
      document.body.appendChild(iframe);

      try {
        // Cargar preview
        await new Promise<void>((res, rej) => {
          const timer = setTimeout(() => rej(new Error('Timeout')), 10000);
          iframe.onload = () => {
            clearTimeout(timer);
            setTimeout(res, 1500); // Esperar renderizado
          };
          iframe.onerror = () => {
            clearTimeout(timer);
            rej(new Error('Load error'));
          };
          iframe.src = `/preview?template=${templateId}&type=pdp`;
        });

        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!doc?.body) throw new Error('No document');

        // Usar html2canvas
        const html2canvas = (await import('html2canvas')).default;
        const canvas = await html2canvas(doc.body, {
          width: 400,
          height: 300,
          scale: 1,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          logging: false,
          removeContainer: false
        });

        // Verificar no está en blanco
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const pixels = imageData.data;
          let hasColor = false;
          for (let i = 0; i < pixels.length; i += 4) {
            if (pixels[i] < 250 || pixels[i+1] < 250 || pixels[i+2] < 250) {
              hasColor = true;
              break;
            }
          }
          if (!hasColor) throw new Error('Blank image');
        }

        // Convertir a blob
        const blob = await new Promise<Blob>((res, rej) => {
          canvas.toBlob((b) => b ? res(b) : rej(new Error('No blob')), 'image/webp', 0.85);
        });

        // Subir
        const formData = new FormData();
        formData.append('file', blob, `${templateId}-auto.webp`);
        formData.append('templateId', templateId);

        const uploadRes = await fetch('/api/templates/pdp/upload', {
          method: 'POST',
          body: formData
        });

        if (!uploadRes.ok) throw new Error('Upload failed');
        
        resolve(true);
      } catch (err: any) {
        console.error(`[Capture Error] ${templateId}:`, err.message);
        resolve(false);
      } finally {
        document.body.removeChild(iframe);
      }
    });
  };

  const handleCaptureAnalyze = async () => {
    if (captureStep !== 'idle') return;
    
    setCaptureStep('analyzing');
    setError(null);
    
    try {
      const response = await fetch('/api/templates/pdp/capture?analyze=true&checkBlank=true');
      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      if (data.needCapture === 0) {
        setCaptureStep('completed');
        setResult({type: 'capture', message: 'Todas las tarjetas ya tienen imágenes'});
        return;
      }

      // Iniciar captura
      setCaptureStep('capturing');
      const templates = data.templates || [];
      setCaptureProgress({ current: 0, total: templates.length, success: 0, errors: 0 });

      let success = 0;
      let errors = 0;

      for (let i = 0; i < templates.length; i++) {
        const ok = await captureSingle(templates[i].id);
        if (ok) success++; else errors++;
        
        setCaptureProgress({
          current: i + 1,
          total: templates.length,
          success,
          errors
        });
        
        await new Promise(r => setTimeout(r, 300));
      }

      setCaptureStep('completed');
      setResult({
        type: 'capture',
        message: `${success} de ${templates.length} capturadas${errors > 0 ? `, ${errors} errores` : ''}`
      });
      
      setTimeout(() => window.location.reload(), 2000);
    } catch (err: any) {
      setError(err.message);
      setCaptureStep('idle');
    }
  };

  // ===== LIMPIEZA =====
  
  const handleClearAnalyze = async () => {
    if (clearStep !== 'idle') return;
    
    setClearStep('analyzing');
    try {
      const res = await fetch('/api/templates/pdp/clear?analyze=true');
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error);
      
      if (data.count === 0) {
        setClearStep('completed');
        setResult({type: 'clear', message: 'No hay imágenes para eliminar'});
        return;
      }

      setClearStep('deleting');
      setClearProgress({ current: 0, total: data.count });

      let deleted = 0;
      for (let i = 0; i < data.templates.length; i++) {
        try {
          await fetch('/api/templates/pdp/clear', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ templateId: data.templates[i].id })
          });
          deleted++;
        } catch {}
        setClearProgress({ current: i + 1, total: data.count });
        await new Promise(r => setTimeout(r, 150));
      }

      setClearStep('completed');
      setResult({type: 'clear', message: `${deleted} imágenes eliminadas`});
      setTimeout(() => window.location.reload(), 2000);
    } catch (err: any) {
      setError(err.message);
      setClearStep('idle');
    }
  };

  const reset = () => {
    setCaptureStep('idle');
    setClearStep('idle');
    setResult(null);
    setError(null);
  };

  // ===== RENDER =====

  if (result) return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/50 rounded-lg text-emerald-400">
        <CheckCircle size={18} />
        <span className="text-sm font-medium">✓ {result.message}</span>
      </div>
      <button onClick={reset} className="flex items-center gap-2 px-3 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg text-sm transition-colors">
        <RotateCcw size={14} /> Nuevo
      </button>
    </div>
  );

  if (error) return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400">
        <AlertCircle size={18} />
        <span className="text-sm">{error}</span>
      </div>
      <button onClick={reset} className="px-3 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg text-sm">Reintentar</button>
    </div>
  );

  if (captureStep === 'capturing') {
    const pct = Math.round((captureProgress.current / captureProgress.total) * 100);
    return (
      <div className="flex items-center gap-3 px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
        <Loader2 size={18} className="animate-spin text-indigo-400" />
        <div className="flex flex-col">
          <span className="text-sm font-medium text-indigo-300">
            Capturando... {captureProgress.current} de {captureProgress.total}
          </span>
          <div className="w-40 h-1.5 bg-zinc-700 rounded-full mt-1">
            <div className="h-full bg-indigo-500 transition-all" style={{width: `${pct}%`}} />
          </div>
        </div>
        <div className="text-xs">
          <span className="text-emerald-400 font-bold">{captureProgress.success} ✓</span>
          {captureProgress.errors > 0 && <span className="text-red-400 ml-2">{captureProgress.errors} ✗</span>}
        </div>
      </div>
    );
  }

  if (clearStep === 'deleting') {
    const pct = Math.round((clearProgress.current / clearProgress.total) * 100);
    return (
      <div className="flex items-center gap-3 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-lg">
        <Loader2 size={18} className="animate-spin text-orange-400" />
        <span className="text-sm font-medium text-orange-300">Eliminando... {clearProgress.current}/{clearProgress.total}</span>
        <div className="w-32 h-1.5 bg-zinc-700 rounded-full">
          <div className="h-full bg-orange-500 transition-all" style={{width: `${pct}%`}} />
        </div>
      </div>
    );
  }

  if (captureStep === 'analyzing') return (
    <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400">
      <Eye size={18} className="animate-pulse" />
      <span className="text-sm font-medium">Verificando imágenes...</span>
    </div>
  );

  if (clearStep === 'analyzing') return (
    <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400">
      <Search size={18} className="animate-pulse" />
      <span className="text-sm font-medium">Analizando...</span>
    </div>
  );

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleCaptureAnalyze}
        disabled={captureStep !== 'idle' || clearStep !== 'idle'}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 disabled:from-zinc-700 disabled:to-zinc-700 text-white rounded-lg font-medium transition-all shadow-lg shadow-indigo-500/20 text-sm"
      >
        <Camera size={16} />
        <span>Analizar y Capturar</span>
      </button>

      <button
        onClick={handleClearAnalyze}
        disabled={captureStep !== 'idle' || clearStep !== 'idle'}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-400 hover:to-orange-400 disabled:from-zinc-700 disabled:to-zinc-700 text-white rounded-lg font-medium transition-all shadow-lg shadow-red-500/20 text-sm"
      >
        <Trash2 size={16} />
        <span>Analizar y Vaciar</span>
      </button>
    </div>
  );
}
