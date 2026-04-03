'use client';
import React, { useState, useEffect } from 'react';
import { X, RefreshCcw, Trash2, Eye, LayoutTemplate, Zap, Loader2, AlertCircle } from 'lucide-react';

interface RecycleBinProps {
  isOpen: boolean;
  onClose: () => void;
  onRestore: (id: string, type: 'store' | 'pdp') => Promise<void>;
  onDeletePermanent: (id: string, type: 'store' | 'pdp') => Promise<void>;
}

export default function RecycleBin({ isOpen, onClose, onRestore, onDeletePermanent }: RecycleBinProps) {
  const [deletedStores, setDeletedStores] = useState<any[]>([]);
  const [deletedPdps, setDeletedPdps] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'stores' | 'pdps'>('stores');
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const fetchDeleted = async () => {
    setIsLoading(true);
    try {
      const [storesRes, pdpsRes] = await Promise.all([
        fetch('/api/templates/stores?includeDeleted=true').then(r => r.json()),
        fetch('/api/templates/pdp?includeDeleted=true').then(r => r.json())
      ]);

      if (storesRes.stores) {
        setDeletedStores(storesRes.stores.filter((s: any) => s.deleted_at !== null));
      }
      if (pdpsRes.pdps) {
        setDeletedPdps(pdpsRes.pdps.filter((p: any) => p.deleted_at !== null));
      }
    } catch (error) {
      console.error('Error fetching deleted templates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchDeleted();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAction = async (id: string, type: 'store' | 'pdp', action: 'restore' | 'delete_permanent') => {
    setIsProcessing(id);
    try {
      if (action === 'restore') {
        await onRestore(id, type);
      } else {
        if (!confirm('¿Estás seguro de que deseas eliminar esta plantilla PERMANENTEMENTE? Esta acción no se puede deshacer.')) {
          return;
        }
        await onDeletePermanent(id, type);
      }
      await fetchDeleted();
    } catch (error) {
      alert('Error al procesar la acción');
    } finally {
      setIsProcessing(null);
    }
  };

  const items = activeTab === 'stores' ? deletedStores : deletedPdps;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Overlay background */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="relative w-full max-w-[80%] h-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-100 rounded-lg">
              <Trash2 className="w-5 h-5 text-zinc-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-zinc-900">Papelera de Reciclaje</h2>
              <p className="text-sm text-zinc-500">Restaura o elimina definitivamente tus plantillas.</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-zinc-400" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-zinc-100 px-6">
          <button 
            onClick={() => setActiveTab('stores')}
            className={`py-4 px-6 text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'stores' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-zinc-500 hover:text-zinc-700'}`}
          >
            <LayoutTemplate className="w-4 h-4" />
            Tiendas ({deletedStores.length})
          </button>
          <button 
            onClick={() => setActiveTab('pdps')}
            className={`py-4 px-6 text-sm font-semibold flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'pdps' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-zinc-500 hover:text-zinc-700'}`}
          >
            <Zap className="w-4 h-4" />
            PDPs ({deletedPdps.length})
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-zinc-50/50">
          {isLoading ? (
            <div className="h-full flex flex-col items-center justify-center gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
              <p className="text-zinc-500 font-medium">Cargando papelera...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-4 text-center">
              <div className="p-4 bg-zinc-100 rounded-full">
                <Trash2 className="w-12 h-12 text-zinc-300" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-900">La papelera está vacía</h3>
                <p className="text-zinc-500 max-w-sm">No hay plantillas eliminadas en esta categoría.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden group hover:shadow-md transition-shadow"
                >
                  <div className="aspect-[4/3] bg-zinc-100 relative">
                    <img 
                      src={`/screenshots/${item.id}.webp`}
                      alt={item.name}
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                       <a 
                        href={`/preview?template=${item.id}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-white transition-colors"
                        title="Previsualizar"
                      >
                        <Eye className="w-6 h-6" />
                      </a>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                       <div>
                        <h4 className="font-bold text-zinc-900 line-clamp-1">{item.name}</h4>
                        <p className="text-xs text-zinc-500 mb-3">{item.category}</p>
                      </div>
                      {item.premium && (
                        <span className="bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Premium</span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 pt-2 border-t border-zinc-100">
                      <button 
                        onClick={() => handleAction(item.id, activeTab === 'stores' ? 'store' : 'pdp', 'restore')}
                        disabled={isProcessing === item.id}
                        className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold transition-colors disabled:opacity-50"
                      >
                        {isProcessing === item.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <RefreshCcw className="w-3 h-3" />}
                        Restablecer
                      </button>
                      <button 
                        onClick={() => handleAction(item.id, activeTab === 'stores' ? 'store' : 'pdp', 'delete_permanent')}
                        disabled={isProcessing === item.id}
                        className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors disabled:opacity-50"
                        title="Eliminar definitivamente"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-zinc-100 bg-zinc-50 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-zinc-400" />
          <p className="text-xs text-zinc-500">
            Las plantillas en la papelera no se muestran a los usuarios en el constructor hasta que sean restablecidas.
          </p>
        </div>
      </div>
    </div>
  );
}
