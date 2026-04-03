import React, { useState, useEffect } from 'react';
import { StoreData, TemplateType, Product } from '@/lib/types';
import { Upload, LayoutTemplate, Store, Package, Plus, Trash2, Image as ImageIcon, Zap } from 'lucide-react';
import DisplayModeSelector, { DisplayMode } from '@/components/panel-de-administracion/DisplayModeSelector';
import StoreDynamicDisplay from '@/components/visualizacion/StoreDynamicDisplay';

interface FormProps {
  data: StoreData;
  setData: React.Dispatch<React.SetStateAction<StoreData>>;
  template: TemplateType;
  setTemplate: (t: TemplateType) => void;
  previewMode?: 'store' | 'product';
  setPreviewMode?: (mode: 'store' | 'product') => void;
  activeProductId?: string | null;
  setActiveProductId?: (id: string | null) => void;
}

export default function BuilderForm({ data, setData, template, setTemplate, previewMode, setPreviewMode, activeProductId, setActiveProductId }: FormProps) {
  const [activeTab, setActiveTab] = useState<'store' | 'products' | 'pdp'>('store');

  const [allTemplates, setAllTemplates] = useState<{ id: TemplateType; name: string; desc: string; category?: string; premium?: boolean }[]>([]);
  const [pdpTemplatesList, setPdpTemplatesList] = useState<{ id: string; name: string; desc: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayMode, setDisplayMode] = useState<DisplayMode>('filmstrip');
  const [showDisplayModeSelector, setShowDisplayModeSelector] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch('/api/templates/stores').then(r => r.json()),
      fetch('/api/templates/pdp').then(r => r.json())
    ]).then(([storesRes, pdpsRes]) => {
      if (storesRes.stores) {
        setAllTemplates(storesRes.stores.map((s: any) => ({ id: s.id, name: s.name, desc: s.description })));
      }
      if (pdpsRes.pdps) {
        setPdpTemplatesList(pdpsRes.pdps.map((p: any) => ({ id: p.id, name: p.name, desc: p.description })));
      }
    }).catch(console.error).finally(() => setIsLoading(false));
  }, []);

  // Load display mode preference from API (sincronizado con admin)
  useEffect(() => {
    const loadDisplayMode = async () => {
      try {
        const response = await fetch('/api/ui-preferences?entity_type=pdp_display_mode');
        if (response.ok) {
          const data = await response.json();
          if (data.selected_mode) {
            setDisplayMode(data.selected_mode);
          }
        }
      } catch (error) {
        console.error('Error loading display mode:', error);
      }
    };
    loadDisplayMode();
    
    // Refrescar cada 5 segundos para mantener sincronizado con admin
    const interval = setInterval(loadDisplayMode, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleStoreChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleProductChange = (index: number, field: keyof Product, value: string | number) => {
    const newProducts = [...data.products];
    newProducts[index] = { ...newProducts[index], [field]: value };
    setData(prev => ({ ...prev, products: newProducts }));
  };

  const addProduct = () => {
    const newProduct: Product = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'Nuevo Producto',
      description: 'Descripción del producto',
      price: 0,
      originalPrice: 0,
      currency: 'S/',
      imageUrl: `https://picsum.photos/400/400?random=${Math.floor(Math.random() * 1000)}`,
      category: 'General',
      rating: 5.0,
      reviews: 0
    };
    setData(prev => ({ ...prev, products: [newProduct, ...prev.products] }));
  };

  const removeProduct = (index: number) => {
    const newProducts = [...data.products];
    newProducts.splice(index, 1);
    setData(prev => ({ ...prev, products: newProducts }));
  };



  return (
    <div className="h-full flex flex-col bg-white border-r border-zinc-200">
      <div className="p-6 pb-4 border-b border-zinc-100 shrink-0">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">Generador de Landing</h2>
        <p className="text-sm text-zinc-500 mt-1">Configura tu tienda y catálogo de productos.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-100 shrink-0">
        <button 
          onClick={() => { setActiveTab('store'); setPreviewMode?.('store'); }}
          className={`flex-1 py-3 text-sm font-medium flex items-center justify-center space-x-2 ${activeTab === 'store' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-zinc-500 hover:text-zinc-700'}`}
        >
          <Store className="w-4 h-4" />
          <span className="font-medium">Tienda</span>
        </button>
        <button 
          onClick={() => { setActiveTab('pdp'); setPreviewMode?.('product'); if(!activeProductId && data.products.length > 0) setActiveProductId?.(data.products[0].id); }}
          className={`flex-1 py-3 text-sm font-medium flex items-center justify-center space-x-2 ${activeTab === 'pdp' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-zinc-500 hover:text-zinc-700'}`}
        >
          <Zap className="w-4 h-4" />
          <span className="font-medium">Producto</span>
        </button>
        <button 
          onClick={() => setActiveTab('products')}
          className={`flex-1 py-3 text-sm flex items-center justify-center space-x-2 ${activeTab === 'products' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-zinc-500 hover:text-zinc-700'}`}
        >
          <Package className="w-4 h-4" />
          <span className="font-medium">Catálogo ({data.products.length})</span>
        </button>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        {activeTab === 'store' && (
          <div className="flex-1 flex flex-col min-h-0">
            {/* Header con selector de modo */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 bg-white shrink-0">
              <div className="flex items-center gap-2">
                <LayoutTemplate className="w-5 h-5 text-indigo-500" />
                <h3 className="font-medium text-zinc-900">Generador de Landing</h3>
                <span className="text-xs text-zinc-500">({allTemplates.length} plantillas)</span>
                <span className="text-xs text-indigo-500 font-medium">Modo: {displayMode === 'filmstrip' ? 'Film Strip' : 'Cover Flow'}</span>
              </div>
              <button
                onClick={() => setShowDisplayModeSelector(!showDisplayModeSelector)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  showDisplayModeSelector
                    ? 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                }`}
              >
                <LayoutTemplate className="w-4 h-4" />
                Modo Visualización
              </button>
            </div>

            {/* Panel de selector de modo */}
            {showDisplayModeSelector && (
              <div className="absolute top-20 right-4 w-80 z-50 bg-white rounded-xl shadow-xl border border-zinc-200 p-4">
                <DisplayModeSelector
                  currentMode={displayMode}
                  onModeChange={(mode) => {
                    setDisplayMode(mode);
                  }}
                />
              </div>
            )}

            {/* Área de visualización dinámica */}
            <div className="flex-1 bg-zinc-950 relative min-h-0">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                </div>
              ) : (
                <StoreDynamicDisplay
                  mode={displayMode}
                  items={allTemplates}
                  selectedId={template}
                  onSelect={(id) => setTemplate(id as TemplateType)}
                  onConfirmSelect={(id) => setTemplate(id as TemplateType)}
                />
              )}
            </div>
          </div>
        )}

        {activeTab === 'pdp' && (
          <section className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-zinc-900 font-medium">
                <LayoutTemplate className="w-5 h-5 text-indigo-500" />
                <h3>Plantillas de Producto</h3>
              </div>
              <p className="text-sm text-zinc-500">
                Selecciona el diseño para tu página de producto.
              </p>

              <div className="flex items-center space-x-2 text-zinc-900 font-medium mb-4">
                <Zap className="w-5 h-5 text-indigo-500" />
                <h3>Variantes de Diseño</h3>
              </div>

              <div className="grid grid-cols-1 gap-3 h-96 overflow-y-auto custom-scrollbar pr-2">
                {isLoading ? (
                  <div className="text-zinc-500 text-sm text-center py-4">Cargando hojas de producto...</div>
                ) : (
                  pdpTemplatesList.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setData(prev => ({ ...prev, pdpTemplate: t.id }))}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        data.pdpTemplate === t.id 
                          ? 'border-indigo-500 bg-indigo-50/50 ring-1 ring-indigo-500' 
                          : 'border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50'
                      }`}
                    >
                      <div className="font-medium text-zinc-900">{t.name}</div>
                      <div className="text-xs text-zinc-500 mt-1">{t.desc}</div>
                    </button>
                  ))
                )}
              </div>
            </div>

            <hr className="border-zinc-100" />

            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-zinc-900 font-medium">
                <Zap className="w-5 h-5 text-indigo-500" />
                <h3>Herramientas de Conversión (Opcionales)</h3>
              </div>
              <p className="text-sm text-zinc-500">
                Activa o desactiva módulos psicológicos para aumentar la urgencia y confianza.
              </p>
              
              <div className="space-y-3 bg-zinc-50 p-4 rounded-xl border border-zinc-200">
                <label className="flex items-center justify-between cursor-pointer group">
                  <div>
                    <div className="font-medium text-sm text-zinc-900">Espectadores en Vivo</div>
                    <div className="text-xs text-zinc-500">Muestra cuántas personas están viendo el producto.</div>
                  </div>
                  <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${data.pdpFeatures?.liveViewers ? 'bg-indigo-600' : 'bg-zinc-300'}`}>
                    <input type="checkbox" className="sr-only" checked={data.pdpFeatures?.liveViewers || false} onChange={(e) => setData(prev => ({ ...prev, pdpFeatures: { ...prev.pdpFeatures, liveViewers: e.target.checked } }))} />
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${data.pdpFeatures?.liveViewers ? 'translate-x-6' : 'translate-x-1'}`} />
                  </div>
                </label>

                <label className="flex items-center justify-between cursor-pointer group">
                  <div>
                    <div className="font-medium text-sm text-zinc-900">Notificaciones de Ventas</div>
                    <div className="text-xs text-zinc-500">Popups falsos de compras recientes (Prueba Social).</div>
                  </div>
                  <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${data.pdpFeatures?.recentSales ? 'bg-indigo-600' : 'bg-zinc-300'}`}>
                    <input type="checkbox" className="sr-only" checked={data.pdpFeatures?.recentSales || false} onChange={(e) => setData(prev => ({ ...prev, pdpFeatures: { ...prev.pdpFeatures, recentSales: e.target.checked } }))} />
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${data.pdpFeatures?.recentSales ? 'translate-x-6' : 'translate-x-1'}`} />
                  </div>
                </label>

                <label className="flex items-center justify-between cursor-pointer group">
                  <div>
                    <div className="font-medium text-sm text-zinc-900">Temporizador de Escasez</div>
                    <div className="text-xs text-zinc-500">Barra de stock bajo y cuenta regresiva.</div>
                  </div>
                  <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${data.pdpFeatures?.scarcityTimer ? 'bg-indigo-600' : 'bg-zinc-300'}`}>
                    <input type="checkbox" className="sr-only" checked={data.pdpFeatures?.scarcityTimer || false} onChange={(e) => setData(prev => ({ ...prev, pdpFeatures: { ...prev.pdpFeatures, scarcityTimer: e.target.checked } }))} />
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${data.pdpFeatures?.scarcityTimer ? 'translate-x-6' : 'translate-x-1'}`} />
                  </div>
                </label>

                <label className="flex items-center justify-between cursor-pointer group">
                  <div>
                    <div className="font-medium text-sm text-zinc-900">Botón de Compra Flotante</div>
                    <div className="text-xs text-zinc-500">Botón pegajoso en móvil para checkout rápido.</div>
                  </div>
                  <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${data.pdpFeatures?.stickyButton ? 'bg-indigo-600' : 'bg-zinc-300'}`}>
                    <input type="checkbox" className="sr-only" checked={data.pdpFeatures?.stickyButton || false} onChange={(e) => setData(prev => ({ ...prev, pdpFeatures: { ...prev.pdpFeatures, stickyButton: e.target.checked } }))} />
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${data.pdpFeatures?.stickyButton ? 'translate-x-6' : 'translate-x-1'}`} />
                  </div>
                </label>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'products' && (
          <section className="space-y-6">
            <button 
              onClick={addProduct}
              className="w-full py-3 border-2 border-dashed border-zinc-300 rounded-xl text-zinc-600 font-medium hover:border-indigo-500 hover:text-indigo-600 transition-colors flex items-center justify-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Añadir Producto</span>
            </button>

            <div className="space-y-6">
              {data.products.map((product, index) => (
                <div key={product.id} className="p-4 border border-zinc-200 rounded-xl bg-zinc-50 relative group">
                  <button 
                    onClick={() => removeProduct(index)}
                    className="absolute top-2 right-2 p-1.5 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-md opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  
                  <div className="space-y-4">
                    <div className="flex space-x-4">
                      <img src={product.imageUrl} alt="" className="w-16 h-16 rounded-lg object-cover border border-zinc-200 bg-white" />
                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          value={product.title}
                          onChange={(e) => handleProductChange(index, 'title', e.target.value)}
                          className="w-full px-2 py-1 bg-white border border-zinc-300 rounded text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Título del producto"
                        />
                        <div className="flex space-x-2">
                          <div className="flex-1 flex items-center bg-white border border-zinc-300 rounded overflow-hidden">
                            <span className="px-2 text-zinc-500 text-sm bg-zinc-50 border-r border-zinc-300">{product.currency || 'S/'}</span>
                            <input
                              type="number"
                              value={product.price}
                              onChange={(e) => handleProductChange(index, 'price', parseFloat(e.target.value))}
                              className="w-full px-2 py-1 text-sm focus:outline-none"
                              placeholder="Precio"
                            />
                          </div>
                          <div className="flex-1 flex items-center bg-white border border-zinc-300 rounded overflow-hidden">
                            <span className="px-2 text-zinc-500 text-sm bg-zinc-50 border-r border-zinc-300 line-through">{product.currency || 'S/'}</span>
                            <input
                              type="number"
                              value={product.originalPrice}
                              onChange={(e) => handleProductChange(index, 'originalPrice', parseFloat(e.target.value))}
                              className="w-full px-2 py-1 text-sm focus:outline-none"
                              placeholder="Precio original"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={product.category}
                        onChange={(e) => handleProductChange(index, 'category', e.target.value)}
                        className="flex-1 px-2 py-1 bg-white border border-zinc-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Categoría"
                      />
                      <button 
                        className="px-2 py-1 bg-white text-zinc-700 rounded text-sm font-medium hover:bg-zinc-100 border border-zinc-300 flex items-center space-x-1"
                        onClick={() => handleProductChange(index, 'imageUrl', `https://picsum.photos/400/400?random=${Math.floor(Math.random() * 1000)}`)}
                      >
                        <Upload className="w-3 h-3" />
                        <span>Img</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="p-4 border-t border-zinc-200 shrink-0">
        <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-sm">
          Generar Tienda
        </button>
      </div>
    </div>
  );
}

