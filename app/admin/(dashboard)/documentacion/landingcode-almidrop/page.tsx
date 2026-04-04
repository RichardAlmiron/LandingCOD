'use client';
import React, { useState } from 'react';
import { Database, Users, Shield, Globe, ShoppingCart, Bell, FileText, Link2, Key, Server } from 'lucide-react';

const sections = [
  {
    id: 'resumen',
    title: 'Resumen Ejecutivo',
    icon: FileText,
    color: '#6366f1',
    content: `LANDINGCOD × ALMIDROP — SISTEMA DE INTEGRACIÓN

LandingCOD es una plataforma de creación de páginas de producto (PDP) y tiendas e-commerce para el modelo de negocio COD (Cobro Contra Entrega) en Paraguay.

Almidrop es una plataforma de dropshipping que conecta bodegas (proveedores) con dropshippers (vendedores). Los dropshippers de Almidrop utilizan LandingCOD como herramienta para crear sus páginas de venta.

OBJETIVO: Permitir que los dropshippers de Almidrop accedan a LandingCOD con sus mismas credenciales, seleccionen productos del catálogo de Almidrop, pongan su precio de venta, y publiquen páginas de producto o tiendas. Cuando un cliente compra, la venta se registra y notifica al dropshipper.

MODELO DE NEGOCIO: Cobro Contra Entrega. El cliente pide online y paga en efectivo al recibir el producto en su puerta.`
  },
  {
    id: 'usuarios',
    title: 'Sistema de Usuarios',
    icon: Users,
    color: '#10b981',
    content: `DOS TIPOS DE USUARIOS EN LANDINGCOD:

1. USUARIO ALMIDROP (dropshipper o bodega)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Accede con sus credenciales de Almidrop (email + contraseña)
- NO tiene registro previo en LandingCOD
- El sistema verifica via API contra la base de datos de Almidrop
- Solo se sincronizan usuarios con is_dropshipper = true o is_bodega = true
- is_admin e is_master de Almidrop NO acceden a LandingCOD
- Ve el catálogo completo de productos de Almidrop (Almiplace)
- Puede poner su precio de venta personalizado

2. USUARIO EXTERNO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Se registra en una página de registro exclusiva de LandingCOD
- Sus datos van a una tabla separada en la DB de LandingCOD
- NO tiene conexión con Almidrop
- NO ve el catálogo de Almidrop
- En la etapa 3, sube manualmente: imágenes, título, descripción del producto
- La IA hace el resto en la etapa 4

DETECCIÓN AUTOMÁTICA:
El middleware detecta al momento del login si el usuario viene de Almidrop o es externo. Si las credenciales coinciden con un usuario de Almidrop (is_dropshipper o is_bodega), se le da acceso como usuario Almidrop. Si no, se busca en la tabla de usuarios externos de LandingCOD.`
  },
  {
    id: 'autenticacion',
    title: 'Autenticación y Conexión',
    icon: Key,
    color: '#f59e0b',
    content: `CÓMO SE CONECTAN LOS SISTEMAS:

LANDINGCOD:
- Base de datos: Supabase (URL: grxeiinmunfjmptqtfwf.supabase.co)
- Tabla de usuarios LandingCOD: "usuarios" (campo role: 'user' | 'admin')
- Tabla de usuarios externos: "usuarios_externos" (nueva, exclusiva para externos)
- JWT: librería "jsonwebtoken" con HS256
- Cookies: access_token + refresh_token
- Secret: JWT_SECRET en .env.local

ALMIDROP:
- Base de datos: Supabase SEPARADA (URL: bakmisrdgjpnrwohjcyn.supabase.co)
- Tabla de usuarios: "users" (campos: is_dropshipper, is_bodega, is_admin, is_master)
- JWT: librería "jose" con HS256
- Cookie: token
- Conexión desde LandingCOD: via ALMIDROP_SUPABASE_URL y ALMIDROP_SUPABASE_SERVICE_ROLE_KEY

FLUJO DE LOGIN:
1. Usuario ingresa email + contraseña en LandingCOD
2. LandingCOD consulta la DB de Almidrop: ¿existe este email con is_dropshipper=true o is_bodega=true?
3. Si SÍ → verifica contraseña contra password_hash de Almidrop → acceso como usuario Almidrop
4. Si NO → busca en tabla "usuarios" de LandingCOD → acceso como usuario externo
5. Se genera JWT de LandingCOD y se setean cookies

IMPORTANTE: LandingCOD NUNCA modifica la DB de Almidrop. Solo LEE para verificar credenciales y obtener catálogo.`
  },
  {
    id: 'bases-datos',
    title: 'Bases de Datos',
    icon: Database,
    color: '#3b82f6',
    content: `TABLAS INVOLUCRADAS:

EN SUPABASE DE LANDINGCOD (grxeiinmunfjmptqtfwf):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- usuarios: usuarios admin de LandingCOD (tabla existente)
- usuarios_externos: usuarios que no son de Almidrop (tabla nueva)
- ventas_landingcod: registro de todas las ventas (tabla nueva)
- tiendas_publicadas: tiendas publicadas (tabla existente)
- pdp_publicadas: páginas de producto publicadas (tabla existente)
- Categorias_PDP: categorías de plantillas (tabla existente)
- Plantillas_PDP: plantillas de páginas de producto (tabla existente)

EN SUPABASE DE ALMIDROP (bakmisrdgjpnrwohjcyn):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- users: usuarios de Almidrop (solo LECTURA desde LandingCOD)
- catalogo_de_los_productos_del_master: productos del catálogo (solo LECTURA)
- categories: categorías de productos (solo LECTURA)

REGLA: LandingCOD SOLO LEE de Almidrop. NUNCA escribe, modifica ni elimina datos de Almidrop.`
  },
  {
    id: 'flujo-builder',
    title: 'Flujo del Builder (4 Etapas)',
    icon: Globe,
    color: '#8b5cf6',
    content: `ETAPA 1 — TIPO DE PROYECTO
El usuario elige: Crear Tienda o Crear Página de Producto (PDP).

ETAPA 2 — SELECCIÓN DE DISEÑO
- Tienda: selecciona plantilla de tienda
- PDP: selecciona plantilla de página de producto
- Preview en vivo antes de seleccionar

ETAPA 3 — SELECCIÓN DE PRODUCTOS (DOS CAMINOS)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Usuario Almidrop:
- Ve catálogo clonado de Almiplace (productos reales de Almidrop)
- Cada tarjeta muestra: producto, costo bodega, precio sugerido
- El dropshipper DEBE poner su precio de venta
- Sin precio → no puede pasar a etapa 4
- El sistema calcula precio tachado automáticamente (+30-35%)
- Precio de venta = lo que aparece en la PDP como precio real
- Precio tachado = simulación de descuento (calculado por el sistema)

Usuario Externo:
- NO ve catálogo de Almidrop
- Sube manualmente: imágenes, título, descripción
- Pone su precio de venta

ETAPA 3.5 — IA INTERMEDIA (solo PDP)
- La IA genera copywriting CRO basado en el producto seleccionado
- Si falla → error con botón WhatsApp a soporte
- Si éxito → pasa a etapa 4

ETAPA 4 — EDITOR VISUAL
- Editor visual con herramientas: Tipografía, Estilo, Imágenes
- Botón "Reescribir toda la página" con IA (una sola llamada)
- Botones de IA por sección individual
- Imágenes reales del producto inyectadas automáticamente
- Guardar → Publicar (bloqueo si hay cambios sin guardar)`
  },
  {
    id: 'ventas',
    title: 'Sistema de Ventas',
    icon: ShoppingCart,
    color: '#ef4444',
    content: `FLUJO DE UNA VENTA:

1. Un cliente visita una PDP o tienda publicada
2. Decide comprar → rellena formulario de pedido:
   - Nombre completo
   - Teléfono
   - Ciudad
   - Barrio
   - Lugares cercanos / referencias
   - Color de casa
   - Geolocalización GPS automática (precisión ~99%)
3. Click en "Pedir Ahora" → se dispara:
   - Registro en tabla ventas_landingcod
   - Notificación WhatsApp al dropshipper
   - Aparece en interfaz "Mis Ventas LandingCOD" (en LandingCOD y en Almidrop)

IMPORTANTE: Esto NO es una venta confirmada. Es un PEDIDO.
La venta se confirma cuando se entrega en la casa del cliente y se cobra en efectivo.

TABLA ventas_landingcod:
- id, user_id (dropshipper), tipo (tienda/pdp), url_pagina
- producto_titulo, producto_precio_venta, producto_precio_tachado, producto_imagen
- cliente_nombre, cliente_telefono, cliente_ciudad, cliente_barrio
- cliente_referencias, cliente_color_casa, cliente_gps_lat, cliente_gps_lng
- whatsapp_dropshipper, fecha_pedido, estado (pendiente/procesado/entregado)

WHATSAPP:
- Antes de publicar, el dropshipper inyecta su número de WhatsApp
- Cada pedido dispara mensaje automático con datos del cliente`
  },
  {
    id: 'interfaz-ventas',
    title: 'Interfaz Mis Ventas',
    icon: Bell,
    color: '#06b6d4',
    content: `INTERFAZ "MIS VENTAS LANDINGCOD"

Existe en DOS lugares con el MISMO nombre y diseño:

1. EN LANDINGCOD (dashboard del dropshipper):
   - Menú: "Mis Ventas LandingCOD"
   - Lista de todos los pedidos recibidos
   - Cada tarjeta: producto, cliente, fecha, hora, tipo (tienda/PDP), URL
   - Al expandir: datos completos del cliente, GPS, imágenes del producto
   - Estado del pedido: pendiente → procesado → entregado

2. EN ALMIDROP (dashboard del dropshipper):
   - Mismo menú: "Mis Ventas LandingCOD"
   - Misma interfaz, mismos datos
   - El dropshipper puede ver sus ventas desde cualquiera de las dos plataformas
   - Desde aquí puede ir a Almiplace a hacer el pedido manualmente

FLUJO DEL DROPSHIPPER:
1. Recibe notificación de pedido (WhatsApp + interfaz)
2. Abre "Mis Ventas LandingCOD" (en LandingCOD o Almidrop)
3. Ve los datos del cliente
4. Va a Almiplace y hace el pedido manualmente
5. El pedido sigue el flujo normal de Almidrop`
  },
  {
    id: 'seguridad',
    title: 'Seguridad y Reglas',
    icon: Shield,
    color: '#dc2626',
    content: `REGLAS DE SEGURIDAD:

1. FORCE-DYNAMIC: Toda ruta de API tiene export const dynamic = 'force-dynamic'. Sin excepción.
2. ALMIDROP ES SOLO LECTURA: LandingCOD nunca escribe en la DB de Almidrop.
3. PRODUCTOS INTOCABLES: La IA nunca modifica título, precio, descripción ni imágenes de productos.
4. SEPARACIÓN DE DATOS: Usuarios externos y usuarios Almidrop tienen tablas separadas.
5. IDENTIFICACIÓN ÚNICA: Cada página publicada está vinculada al user_id del dropshipper.
6. MODELO COD: Nunca mencionar devolución de dinero, cancelación, ni días de garantía.
7. PRECIOS: El precio de venta lo pone el dropshipper. El precio tachado lo calcula el sistema (+30-35%).
8. GEOLOCALIZACIÓN: Precisión GPS del 99%. El cliente puede dar click para captar ubicación exacta.

REGLAS DE GARANTÍA EN CONTENIDO:
- SÍ: "Garantía de Satisfacción", "Compra 100% Segura", "Calidad Garantizada"
- NO: devolución de dinero, reembolso, cancelación, "30 días", "7 días"`
  },
  {
    id: 'conexion-api',
    title: 'Conexión API',
    icon: Link2,
    color: '#22c55e',
    content: `APIS DE CONEXIÓN LANDINGCOD → ALMIDROP:

1. VERIFICACIÓN DE USUARIO:
   Endpoint: Consulta directa a Supabase de Almidrop
   Tabla: users
   Campos: email, password_hash, is_dropshipper, is_bodega, full_name, id
   Uso: Login — verificar si el usuario existe como dropshipper/bodega en Almidrop

2. CATÁLOGO DE PRODUCTOS:
   Endpoint: /api/almidrop/catalog
   Tabla: catalogo_de_los_productos_del_master
   Campos: name, description, price, images, edited_images, original_images, videos, stock, categories
   Uso: Etapa 3 — mostrar productos disponibles para el dropshipper

3. CIUDADES Y STOCK:
   Endpoint: /api/almidrop/cities
   Uso: Verificar disponibilidad de stock por ciudad

4. STOCK EXPRESS:
   Endpoint: /api/almidrop/express-stock
   Uso: Verificar stock express por producto y ciudad

VARIABLES DE ENTORNO:
- ALMIDROP_SUPABASE_URL=https://bakmisrdgjpnrwohjcyn.supabase.co
- ALMIDROP_SUPABASE_SERVICE_ROLE_KEY=[key en .env.local]`
  },
  {
    id: 'arquitectura',
    title: 'Arquitectura Técnica',
    icon: Server,
    color: '#a855f7',
    content: `STACK TÉCNICO:

LANDINGCOD:
- Framework: Next.js 15.5 con Turbopack
- Base de datos: Supabase (PostgreSQL)
- Autenticación: JWT custom (jsonwebtoken + bcryptjs)
- IA: OpenRouter API (Gemini 2.5 Flash)
- Hosting: Railway
- Lenguaje: TypeScript

ALMIDROP:
- Framework: Next.js
- Base de datos: Supabase (PostgreSQL) — instancia SEPARADA
- Autenticación: JWT custom (jose + bcryptjs)
- Hosting: Netlify

CONEXIÓN:
- LandingCOD se conecta a Almidrop via Supabase client con service_role_key
- Solo operaciones de LECTURA (SELECT)
- Nunca INSERT, UPDATE ni DELETE en Almidrop

TABLAS NUEVAS A CREAR EN LANDINGCOD:
1. usuarios_externos — registro de usuarios que no son de Almidrop
2. ventas_landingcod — registro de todos los pedidos/ventas`
  },
];

export default function LandingCodeAlmidropDoc() {
  const [activeSection, setActiveSection] = useState('resumen');

  const active = sections.find(s => s.id === activeSection) || sections[0];

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 20px' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', marginBottom: 8 }}>
          LandingCOD × AlmiDrop
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
          Documentación completa de la integración entre LandingCOD y AlmiDrop.
          Sistema de autenticación dual, catálogo de productos, ventas y notificaciones.
        </p>
      </div>

      <div style={{ display: 'flex', gap: 20 }}>
        {/* Sidebar */}
        <div style={{ width: 260, flexShrink: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, position: 'sticky', top: 80 }}>
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 14px', borderRadius: 10, border: 'none',
                  background: activeSection === s.id ? `${s.color}15` : 'transparent',
                  borderLeft: activeSection === s.id ? `3px solid ${s.color}` : '3px solid transparent',
                  color: activeSection === s.id ? '#fff' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
                  fontSize: 13, fontWeight: activeSection === s.id ? 700 : 500,
                }}
              >
                <s.icon size={16} style={{ color: s.color, flexShrink: 0 }} />
                {s.title}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1 }}>
          <div style={{
            background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 16, padding: 32,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: `${active.color}15`, border: `1px solid ${active.color}25`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <active.icon size={20} style={{ color: active.color }} />
              </div>
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: '#fff', margin: 0 }}>{active.title}</h2>
              </div>
            </div>
            <pre style={{
              fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8,
              whiteSpace: 'pre-wrap', wordBreak: 'break-word',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              margin: 0,
            }}>
              {active.content}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
