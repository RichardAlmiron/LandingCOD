// ═══════════════════════════════════════════════════════════════
// Visual Editor Types - Sistema de edición visual inline
// ═══════════════════════════════════════════════════════════════

export interface VisualCustomization {
  id: string;
  selector: string;           // CSS selector or data-ve-id
  type: 'text' | 'image' | 'style' | 'visibility' | 'component';
  property?: string;          // CSS property for style changes
  originalValue?: string;
  newValue: string;
  timestamp: number;
}

export interface VisualSection {
  id: string;
  name: string;
  icon: string;
  description: string;
  editable: boolean;
}

export interface EditorToolbarAction {
  id: string;
  label: string;
  icon: string;
  category: 'text' | 'style' | 'layout' | 'media' | 'component';
  action: () => void;
}

export interface VisualEditorState {
  isActive: boolean;
  selectedElement: HTMLElement | null;
  hoveredElement: HTMLElement | null;
  customizations: VisualCustomization[];
  undoStack: VisualCustomization[][];
  redoStack: VisualCustomization[][];
  isDirty: boolean;
  isSaving: boolean;
  activePanel: 'none' | 'text' | 'style' | 'image' | 'sections' | 'components';
  zoom: number;
}

export interface TextEditorOptions {
  fontSize: number;
  fontWeight: string;
  fontFamily: string;
  color: string;
  textAlign: string;
  lineHeight: number;
  letterSpacing: number;
  textTransform: string;
  textDecoration: string;
}

export interface StyleEditorOptions {
  backgroundColor: string;
  backgroundImage: string;
  backgroundGradient: string;
  borderRadius: number;
  borderColor: string;
  borderWidth: number;
  padding: string;
  margin: string;
  boxShadow: string;
  opacity: number;
}

export interface ComponentBlock {
  id: string;
  type: string;
  name: string;
  icon: string;
  description: string;
  category: 'banner' | 'text' | 'media' | 'social' | 'divider' | 'badge' | 'cta';
  defaultHtml: string;
  defaultStyles: Record<string, string>;
}

export const EDITOR_FONTS = [
  'Inter', 'Roboto', 'Open Sans', 'Montserrat', 'Poppins', 'Lato',
  'Playfair Display', 'Oswald', 'Raleway', 'Nunito', 'Source Sans Pro',
  'Merriweather', 'Ubuntu', 'Rubik', 'Work Sans', 'DM Sans',
  'Space Grotesk', 'Outfit', 'Sora', 'Manrope'
];

export const EDITOR_COLORS = [
  '#000000', '#FFFFFF', '#F8F9FA', '#E9ECEF', '#DEE2E6', '#CED4DA',
  '#6C757D', '#495057', '#343A40', '#212529',
  '#EF4444', '#F97316', '#F59E0B', '#EAB308', '#84CC16', '#22C55E',
  '#14B8A6', '#06B6D4', '#0EA5E9', '#3B82F6', '#6366F1', '#8B5CF6',
  '#A855F7', '#D946EF', '#EC4899', '#F43F5E',
  '#FEE2E2', '#FEF3C7', '#DCFCE7', '#DBEAFE', '#EDE9FE', '#FCE7F3',
];

export const COMPONENT_BLOCKS: ComponentBlock[] = [
  {
    id: 'announcement-bar',
    type: 'announcement',
    name: 'Barra de Anuncio',
    icon: '📢',
    description: 'Barra superior con mensaje promocional',
    category: 'banner',
    defaultHtml: '<div style="background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white;text-align:center;padding:12px 20px;font-size:14px;font-weight:600">🔥 Envío GRATIS en pedidos +$50 · Código: ENVIOGRATIS</div>',
    defaultStyles: {}
  },
  {
    id: 'trust-badges',
    type: 'trust',
    name: 'Insignias de Confianza',
    icon: '🛡️',
    description: 'Iconos de seguridad y garantía',
    category: 'badge',
    defaultHtml: '<div style="display:flex;justify-content:center;gap:32px;padding:24px;background:#f8fafc;flex-wrap:wrap"><div style="text-align:center"><div style="font-size:28px">🔒</div><div style="font-size:12px;color:#64748b;margin-top:4px">Pago Seguro</div></div><div style="text-align:center"><div style="font-size:28px">🚚</div><div style="font-size:12px;color:#64748b;margin-top:4px">Envío Rápido</div></div><div style="text-align:center"><div style="font-size:28px">↩️</div><div style="font-size:12px;color:#64748b;margin-top:4px">Devolución Fácil</div></div><div style="text-align:center"><div style="font-size:28px">⭐</div><div style="font-size:12px;color:#64748b;margin-top:4px">Calidad Premium</div></div></div>',
    defaultStyles: {}
  },
  {
    id: 'hero-banner',
    type: 'hero',
    name: 'Banner Hero',
    icon: '🖼️',
    description: 'Banner grande con imagen de fondo',
    category: 'banner',
    defaultHtml: '<div style="background:linear-gradient(135deg,#1e293b 0%,#334155 100%);color:white;padding:60px 40px;text-align:center"><h2 style="font-size:32px;font-weight:800;margin:0 0 12px">Ofertas Especiales</h2><p style="font-size:16px;opacity:0.8;margin:0 0 24px">Descubre los mejores productos con descuentos increíbles</p><button style="background:white;color:#1e293b;border:none;padding:12px 32px;border-radius:8px;font-weight:700;font-size:14px;cursor:pointer">Ver Ofertas →</button></div>',
    defaultStyles: {}
  },
  {
    id: 'text-block',
    type: 'text',
    name: 'Bloque de Texto',
    icon: '📝',
    description: 'Texto personalizable con formato',
    category: 'text',
    defaultHtml: '<div style="padding:24px 40px;text-align:center"><h3 style="font-size:24px;font-weight:700;color:#1e293b;margin:0 0 8px">Tu Título Aquí</h3><p style="font-size:15px;color:#64748b;margin:0;max-width:600px;margin:0 auto">Escribe aquí tu descripción o mensaje personalizado para tus clientes.</p></div>',
    defaultStyles: {}
  },
  {
    id: 'divider',
    type: 'divider',
    name: 'Separador',
    icon: '➖',
    description: 'Línea divisoria decorativa',
    category: 'divider',
    defaultHtml: '<div style="padding:8px 40px"><hr style="border:none;height:1px;background:linear-gradient(90deg,transparent,#e2e8f0,transparent)"/></div>',
    defaultStyles: {}
  },
  {
    id: 'cta-button',
    type: 'cta',
    name: 'Botón CTA',
    icon: '🔘',
    description: 'Botón de llamada a la acción',
    category: 'cta',
    defaultHtml: '<div style="text-align:center;padding:24px"><a href="#" style="display:inline-block;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white;padding:14px 40px;border-radius:12px;font-weight:700;font-size:15px;text-decoration:none;box-shadow:0 4px 15px rgba(99,102,241,0.4);transition:transform 0.2s">Comprar Ahora →</a></div>',
    defaultStyles: {}
  },
  {
    id: 'social-proof',
    type: 'social',
    name: 'Prueba Social',
    icon: '⭐',
    description: 'Reseñas y testimonios',
    category: 'social',
    defaultHtml: '<div style="background:#fefce8;padding:24px 40px;text-align:center"><div style="font-size:14px;color:#854d0e;font-weight:600">⭐⭐⭐⭐⭐ Más de 10,000 clientes satisfechos</div><div style="font-size:13px;color:#a16207;margin-top:4px">"La mejor tienda online que he encontrado" — Cliente Verificado</div></div>',
    defaultStyles: {}
  },
  {
    id: 'countdown-timer',
    type: 'countdown',
    name: 'Temporizador',
    icon: '⏰',
    description: 'Cuenta regresiva para urgencia',
    category: 'banner',
    defaultHtml: '<div style="background:linear-gradient(135deg,#dc2626,#ef4444);color:white;padding:16px;text-align:center"><div style="font-size:13px;font-weight:600;margin-bottom:8px">⚡ OFERTA TERMINA EN</div><div style="display:flex;justify-content:center;gap:12px"><div style="background:rgba(0,0,0,0.3);padding:8px 14px;border-radius:8px;min-width:50px"><div style="font-size:24px;font-weight:800">23</div><div style="font-size:10px;opacity:0.8">HORAS</div></div><div style="background:rgba(0,0,0,0.3);padding:8px 14px;border-radius:8px;min-width:50px"><div style="font-size:24px;font-weight:800">59</div><div style="font-size:10px;opacity:0.8">MIN</div></div><div style="background:rgba(0,0,0,0.3);padding:8px 14px;border-radius:8px;min-width:50px"><div style="font-size:24px;font-weight:800">47</div><div style="font-size:10px;opacity:0.8">SEG</div></div></div></div>',
    defaultStyles: {}
  },
  {
    id: 'newsletter',
    type: 'newsletter',
    name: 'Newsletter',
    icon: '✉️',
    description: 'Formulario de suscripción',
    category: 'cta',
    defaultHtml: '<div style="background:#f1f5f9;padding:32px 40px;text-align:center"><h3 style="font-size:20px;font-weight:700;color:#1e293b;margin:0 0 8px">Suscríbete y Ahorra 10%</h3><p style="font-size:14px;color:#64748b;margin:0 0 16px">Recibe ofertas exclusivas directo en tu correo</p><div style="display:flex;gap:8px;max-width:400px;margin:0 auto"><input type="email" placeholder="tu@email.com" style="flex:1;padding:12px 16px;border:1px solid #e2e8f0;border-radius:8px;font-size:14px;outline:none"/><button style="background:#6366f1;color:white;border:none;padding:12px 24px;border-radius:8px;font-weight:600;cursor:pointer">Suscribir</button></div></div>',
    defaultStyles: {}
  },
  {
    id: 'image-banner',
    type: 'image',
    name: 'Imagen / Banner',
    icon: '🌄',
    description: 'Imagen con enlace opcional',
    category: 'media',
    defaultHtml: '<div style="padding:0"><img src="https://picsum.photos/1200/300?random=1" alt="Banner" style="width:100%;height:auto;display:block"/></div>',
    defaultStyles: {}
  },
  {
    id: 'whatsapp-cta',
    type: 'whatsapp',
    name: 'Botón WhatsApp',
    icon: '💬',
    description: 'Botón de contacto por WhatsApp',
    category: 'cta',
    defaultHtml: '<div style="text-align:center;padding:24px"><a href="#" style="display:inline-flex;align-items:center;gap:10px;background:#25D366;color:white;padding:14px 32px;border-radius:50px;font-weight:700;font-size:15px;text-decoration:none;box-shadow:0 4px 15px rgba(37,211,102,0.4)"><span style="font-size:20px">💬</span> Escríbenos por WhatsApp</a></div>',
    defaultStyles: {}
  },
  {
    id: 'features-grid',
    type: 'features',
    name: 'Grid de Características',
    icon: '📊',
    description: 'Cuadrícula de beneficios',
    category: 'badge',
    defaultHtml: '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding:32px 40px"><div style="text-align:center;padding:20px;background:white;border-radius:12px;border:1px solid #e2e8f0"><div style="font-size:32px;margin-bottom:8px">🚀</div><div style="font-weight:700;font-size:14px;color:#1e293b">Envío Express</div><div style="font-size:12px;color:#64748b;margin-top:4px">24-48 horas</div></div><div style="text-align:center;padding:20px;background:white;border-radius:12px;border:1px solid #e2e8f0"><div style="font-size:32px;margin-bottom:8px">💎</div><div style="font-weight:700;font-size:14px;color:#1e293b">Calidad Premium</div><div style="font-size:12px;color:#64748b;margin-top:4px">Garantía total</div></div><div style="text-align:center;padding:20px;background:white;border-radius:12px;border:1px solid #e2e8f0"><div style="font-size:32px;margin-bottom:8px">🎁</div><div style="font-weight:700;font-size:14px;color:#1e293b">Ofertas Diarias</div><div style="font-size:12px;color:#64748b;margin-top:4px">Hasta 70% OFF</div></div></div>',
    defaultStyles: {}
  }
];
