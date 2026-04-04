'use client';
import React, { useState } from 'react';
import { Upload, X, Plus, Image as ImageIcon } from 'lucide-react';

interface ExternalProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  images: string[];
}

interface ExternalProductFormProps {
  onConfirm: (product: ExternalProduct) => void;
  onBack: () => void;
}

export default function ExternalProductForm({ onConfirm, onBack }: ExternalProductFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>(['']);
  const [error, setError] = useState('');

  const addImageField = () => {
    if (imageUrls.length < 10) setImageUrls(prev => [...prev, '']);
  };

  const removeImage = (idx: number) => {
    setImageUrls(prev => prev.filter((_, i) => i !== idx));
  };

  const updateImage = (idx: number, url: string) => {
    setImageUrls(prev => prev.map((u, i) => i === idx ? url : u));
  };

  const handleSubmit = () => {
    setError('');
    if (!title.trim()) { setError('El título del producto es obligatorio'); return; }
    if (!description.trim()) { setError('La descripción es obligatoria'); return; }
    if (!price || parseInt(price) <= 0) { setError('Poné un precio de venta válido'); return; }

    const validImages = imageUrls.filter(u => u.trim());
    if (validImages.length === 0) { setError('Agregá al menos una imagen del producto'); return; }

    const sellingPrice = parseInt(price);
    const product: ExternalProduct = {
      id: `ext-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      price: sellingPrice,
      imageUrl: validImages[0],
      images: validImages,
    };

    onConfirm(product);
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)' }}>
      {/* Header */}
      <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border-default)', flexShrink: 0 }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: 'var(--text-primary)' }}>
          Tu Producto
        </h2>
        <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--text-secondary)' }}>
          Subí las imágenes, escribí el título, la descripción y poné tu precio de venta.
        </p>
      </div>

      {/* Form */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }} className="custom-scrollbar">
        <div style={{ maxWidth: 600, display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Imágenes */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, display: 'block' }}>
              Imágenes del producto *
            </label>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 12 }}>
              Pegá las URLs de las imágenes de tu producto. Mínimo 1, máximo 10.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {imageUrls.map((url, idx) => (
                <div key={idx} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 8, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                    {url.trim() ? (
                      <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    ) : (
                      <ImageIcon size={16} style={{ color: 'var(--text-muted)' }} />
                    )}
                  </div>
                  <input
                    type="url"
                    value={url}
                    onChange={e => updateImage(idx, e.target.value)}
                    placeholder="https://ejemplo.com/imagen.jpg"
                    style={{ flex: 1, padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 13, outline: 'none' }}
                  />
                  {imageUrls.length > 1 && (
                    <button onClick={() => removeImage(idx)} style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(239,68,68,0.1)', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <X size={14} />
                    </button>
                  )}
                </div>
              ))}
              {imageUrls.length < 10 && (
                <button onClick={addImageField} style={{ padding: '8px 14px', borderRadius: 8, background: 'rgba(99,102,241,0.1)', border: '1px dashed rgba(99,102,241,0.3)', color: '#6366f1', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Plus size={14} /> Agregar otra imagen
                </button>
              )}
            </div>
          </div>

          {/* Título */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, display: 'block' }}>
              Título del producto *
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Ej: Auriculares Bluetooth Premium"
              style={{ width: '100%', padding: '12px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 14, outline: 'none' }}
            />
          </div>

          {/* Descripción */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, display: 'block' }}>
              Descripción del producto *
            </label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Describí tu producto: características, beneficios, materiales..."
              rows={4}
              style={{ width: '100%', padding: '12px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 14, outline: 'none', resize: 'vertical', lineHeight: 1.5 }}
            />
          </div>

          {/* Precio */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8, display: 'block' }}>
              Precio de venta (Gs.) *
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-muted)' }}>Gs.</span>
              <input
                type="number"
                min={0}
                value={price}
                onChange={e => setPrice(e.target.value)}
                placeholder="150.000"
                style={{ flex: 1, padding: '12px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 14, fontWeight: 700, outline: 'none' }}
              />
            </div>
            {parseInt(price) > 0 && (
              <p style={{ fontSize: 12, color: '#71717a', marginTop: 6 }}>
                Precio tachado (simulado): Gs. {Math.round(parseInt(price) * 1.32).toLocaleString('es-PY')}
              </p>
            )}
          </div>

          {/* Error */}
          {error && (
            <div style={{ padding: '10px 14px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 10, color: '#ef4444', fontSize: 13, fontWeight: 600 }}>
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{ padding: '14px 28px', borderTop: '1px solid var(--border-default)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <button className="btn-secondary" onClick={onBack} style={{ padding: '10px 24px' }}>← Atrás</button>
        <button className="btn-primary" onClick={handleSubmit} style={{ padding: '10px 28px', fontSize: 14 }}>
          Continuar a la Etapa 4 →
        </button>
      </div>
    </div>
  );
}
