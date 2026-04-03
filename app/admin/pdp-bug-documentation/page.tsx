'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, FileText, Bug, CheckCircle, Code, Database, Shield, Brain, AlertTriangle, Lightbulb } from 'lucide-react';

export default function PDPBugDocumentationPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0d0d12] text-white p-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <button
          onClick={() => router.push('/admin')}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={18} />
          <span>Volver al Admin</span>
        </button>

        <div className="flex items-center gap-3 mb-2">
          <Bug className="text-red-500" size={28} />
          <h1 className="text-3xl font-bold">Documentación Técnica: Bug PDP Editor</h1>
        </div>
        <p className="text-zinc-400">Problema de bloqueo en el editor visual de PDP - Marzo 2026</p>
        <div className="flex items-center gap-2 mt-3">
          <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
            ✅ RESUELTO
          </span>
          <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
            Commit: 516084f
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Resumen Ejecutivo */}
        <section className="bg-[#16161d] rounded-xl p-6 border border-zinc-800">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FileText className="text-blue-400" size={20} />
            Resumen Ejecutivo
          </h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-zinc-300 leading-relaxed">
              El <strong>21 de Marzo de 2026</strong>, el usuario Richard Almirón reportó que en el flujo de creación de 
              PDP (Product Detail Page), específicamente en la <strong>Etapa 4 (Editor Visual)</strong>, aproximadamente 
              el <strong>80% de la página estaba bloqueada para edición</strong>. Mientras que el flujo de creación de 
              Tiendas funcionaba correctamente permitiendo editar cualquier elemento, el flujo de PDP presentaba una 
              "capa protectora" que impedía hacer clic y editar textos, imágenes y otros elementos del template.
            </p>
          </div>
        </section>

        {/* QUÉ ES UNA HEURÍSTICA - Sección Principal */}
        <section className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl p-6 border-2 border-purple-500/50">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-purple-300">
            <Brain className="text-purple-400" size={28} />
            ¿Qué es una HEURÍSTICA? (Concepto Fundamental)
          </h2>

          <div className="space-y-6">
            {/* Definición */}
            <div className="bg-black/40 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-purple-200 mb-3 flex items-center gap-2">
                <Lightbulb className="text-yellow-400" size={20} />
                Definición Simple
              </h3>
              <p className="text-zinc-300 leading-relaxed text-base">
                Una <strong className="text-purple-300 text-lg">HEURÍSTICA</strong> es una <strong>regla práctica, método o atajo mental</strong> 
                que usa la experiencia o la intuición para resolver problemas, tomar decisiones o hacer juicios de valor 
                <strong> cuando no se tiene una solución perfecta o algorítmica exacta</strong>. Es una "regla de dedo" o "regla empírica" 
                que funciona la mayoría de las veces, pero <span className="text-yellow-400">no es perfecta y puede fallar</span>.
              </p>
            </div>

            {/* En Programación */}
            <div className="bg-black/40 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-purple-200 mb-3">
                Heurísticas en Programación y Diseño de Interfaces
              </h3>
              <p className="text-zinc-300 leading-relaxed">
                En desarrollo de software, una heurística es una función o algoritmo que <strong>intenta "adivinar" o 
                clasificar algo basándose en patrones o características observables</strong>, sin tener certeza absoluta. 
                Por ejemplo:
              </p>
              <ul className="list-disc list-inside text-zinc-300 mt-3 space-y-2">
                <li>
                  <strong>Detección de spam:</strong> Si un email contiene "GANASTE $1 MILLÓN" + tiene 5 links + remitente desconocido 
                  → probablemente sea spam (heurística).
                </li>
                <li>
                  <strong>Detección de caras en fotos:</strong> Busca patrones de ojos, nariz, boca en cierta disposición 
                  → probablemente sea una cara (heurística de visión por computadora).
                </li>
                <li>
                  <strong>Navegación GPS:</strong> Toma atajos por calles que "parecen" más rápidas basándose en tráfico histórico 
                  → no garantiza el camino óptimo, pero es suficientemente bueno (heurística A*).
                </li>
              </ul>
            </div>

            {/* La Heurística de LandingCOD */}
            <div className="bg-purple-500/20 border border-purple-500/40 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-purple-200 mb-3">
                La Heurística de LandingCOD: ¿Qué Hacía?
              </h3>
              <p className="text-zinc-300 leading-relaxed">
                En el editor visual de LandingCOD, necesitábamos <strong>proteger la información del producto real</strong> 
                (nombre, precio, imagen) para que el usuario no la edite accidentalmente, porque esa información viene 
                de la base de datos y se renderiza dinámicamente.
              </p>
              <p className="text-zinc-300 leading-relaxed mt-2">
                <strong>El problema:</strong> No podemos saber con certeza 100% qué elementos del DOM son "el producto" y 
                cuáles son "partes editables del template". Entonces usamos una <strong className="text-purple-300">HEURÍSTICA</strong>:
              </p>
              <div className="bg-black/60 rounded-lg p-4 mt-3 font-mono text-sm">
                <div className="text-green-400 mb-2">// HEURÍSTICA para detectar "esto es un producto":</div>
                <div className="text-zinc-300">
                  SI el elemento tiene clase "grid" o "flex"<br/>
                  Y tiene texto con "$99.99" (patrón de precio)<br/>
                  Y tiene 2 o más imágenes<br/>
                  Y tiene menos de 3000 caracteres<br/>
                  ENTONCES &rarr; marcar como "producto no editable"<br/>
                </div>
              </div>
            </div>

            {/* Tipos de Errores de Heurísticas */}
            <div className="bg-red-500/10 border-2 border-red-500/30 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-red-300 mb-3 flex items-center gap-2">
                <AlertTriangle className="text-red-400" size={20} />
                Errores Comunes en Heurísticas (CRÍTICO)
              </h3>
              <p className="text-zinc-300 mb-4">
                Las heurísticas tienen dos tipos de errores fundamentales que <strong>TODO desarrollador debe conocer</strong>:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-950/50 border border-red-500/30 rounded-lg p-4">
                  <h4 className="font-bold text-red-300 mb-2">1. FALSO POSITIVO</h4>
                  <p className="text-sm text-zinc-300 mb-2">
                    La heurística dice "SÍ, es un producto" cuando <strong>NO lo es</strong>.
                  </p>
                  <div className="bg-black/60 rounded p-3 text-xs">
                    <div className="text-red-400">❌ ERROR FALSO POSITIVO:</div>
                    <div className="text-zinc-400 mt-1">
                      Un banner de CTA con "¡Solo $49.99!" + grid layout + 2 imágenes <br/>
                      → La heurística lo marca como "producto" <br/>
                      → Se bloquea para edición <br/>
                      → El usuario no puede editar su propio banner
                    </div>
                  </div>
                  <p className="text-xs text-red-300 mt-2">
                    <strong>Consecuencia:</strong> El 80% del PDP se bloqueó por falsos positivos.
                  </p>
                </div>

                <div className="bg-yellow-950/50 border border-yellow-500/30 rounded-lg p-4">
                  <h4 className="font-bold text-yellow-300 mb-2">2. FALSO NEGATIVO</h4>
                  <p className="text-sm text-zinc-300 mb-2">
                    La heurística dice "NO es un producto" cuando <strong>SÍ lo es</strong>.
                  </p>
                  <div className="bg-black/60 rounded p-3 text-xs">
                    <div className="text-yellow-400">⚠️ ERROR FALSO NEGATIVO:</div>
                    <div className="text-zinc-400 mt-1">
                      Un producto con precio "$99" + botón comprar <br/>
                      Pero el layout usa "display: block" en lugar de "flex" <br/>
                      → La heurística NO lo detecta <br/>
                      → El usuario puede editar el precio del producto real <br/>
                      → ¡Problema de integridad de datos!
                    </div>
                  </div>
                  <p className="text-xs text-yellow-300 mt-2">
                    <strong>Consecuencia:</strong> El usuario podría romper la info del producto real.
                  </p>
                </div>
              </div>

              <div className="mt-4 bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <h4 className="font-bold text-purple-300 mb-2">💡 Dilema Fundamental de las Heurísticas</h4>
                <p className="text-zinc-300 text-sm">
                  <strong>No puedes eliminar ambos errores simultáneamente.</strong> Si haces la heurística más estricta 
                  para reducir falsos positivos, aumentarás los falsos negativos. Si la haces más permisiva para 
                  atrapar todos los productos, bloquearás cosas que no son productos.
                </p>
                <p className="text-zinc-300 text-sm mt-2">
                  <strong>La solución:</strong> Diseñar la heurística para el <span className="text-purple-300">error menos dañino</span>. 
                  En nuestro caso, preferimos un falso negativo (que el usuario pueda editar algo protegido) 
                  que podemos detectar y corregir, antes que un falso positivo (bloquear todo el PDP).
                </p>
              </div>
            </div>

            {/* Cómo Prevenir */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-5">
              <h3 className="text-lg font-semibold text-green-300 mb-3">
                Cómo Prevenir Errores de Heurísticas en el Futuro
              </h3>
              <ul className="list-disc list-inside text-zinc-300 space-y-2">
                <li>
                  <strong>Usar múltiples heurísticas combinadas:</strong> No confiar en una sola regla, 
                  sino en un conjunto de criterios que deben cumplirse TODOS (AND lógico), no algunos (OR lógico).
                </li>
                <li>
                  <strong>Hacer la heurística más restrictiva que permisiva:</strong> Mejor dejar pasar 
                  algo protegido (falso negativo) que bloquear algo que debería ser editable (falso positivo).
                </li>
                <li>
                  <strong>Testing con casos reales:</strong> Probar la heurística con al menos 10-20 
                  templates diferentes para verificar que no haya falsos positivos masivos.
                </li>
                <li>
                  <strong>Logging y métricas:</strong> Registrar cuántos elementos fueron marcados por la heurística 
                  para detectar anomalías (ej: "se marcaron 500 productos en una sola página" → algo está mal).
                </li>
                <li>
                  <strong>Override manual:</strong> Permitir a los usuarios (o developers) marcar/desmarcar 
                  manualmente elementos cuando la heurística falle.
                </li>
                <li>
                  <strong>Metadata explícita:</strong> En lugar de adivinar, usar atributos HTML explícitos 
                  como <code>data-ve-protected="true"</code> en los componentes React que renderizan productos reales.
                </li>
              </ul>
            </div>

            {/* Conclusión de la sección */}
            <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-400/30 rounded-lg p-5 text-center">
              <p className="text-lg text-zinc-200">
                <strong className="text-purple-300">En resumen:</strong> Una heurística es un "atajo inteligente" que 
                funciona bien la mayoría de veces, pero <span className="text-yellow-400">siempre tiene margen de error</span>. 
                El arte del buen desarrollo es diseñar heurísticas donde los errores sean manejables y no catastróficos.
              </p>
            </div>
          </div>
        </section>

        {/* Problema Detallado */}
        <section className="bg-[#16161d] rounded-xl p-6 border border-zinc-800">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Bug className="text-red-400" size={20} />
            Problema Técnico Detallado
          </h2>
          
          <div className="space-y-4">
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <h3 className="font-medium text-red-400 mb-2">Síntomas Observados</h3>
              <ul className="list-disc list-inside text-zinc-300 space-y-1">
                <li>Solo el 20% del PDP era editable</li>
                <li>La mitad superior del PDP (encabezados, banners) podía editarse</li>
                <li>La mitad inferior (CTAs, testimonios, detalles) estaba bloqueada</li>
                <li>Al hacer clic en elementos bloqueados, no ocurría nada</li>
                <li>Los elementos bloqueados mostraban overlay "🔒 Productos (no editable)"</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-zinc-200 mb-2">Causa Raíz Identificada</h3>
              <p className="text-zinc-300 leading-relaxed">
                El problema estaba en la función <code className="bg-zinc-800 px-2 py-1 rounded text-sm">markEditableElements</code> dentro del 
                archivo <code className="bg-zinc-800 px-2 py-1 rounded text-sm">VisualEditorOverlay.tsx</code>. Esta función utiliza 
                una <strong>heurística</strong> para detectar qué elementos son "productos" y marcarlos como no editables (para proteger 
                la información del producto real que se carga dinámicamente).
              </p>
              <p className="text-zinc-300 leading-relaxed mt-2">
                La heurística anterior era <strong>demasiado permisiva</strong> y marcaba como "producto" cualquier contenedor que tuviera:
              </p>
              <ul className="list-disc list-inside text-zinc-400 mt-2 space-y-1">
                <li>Clases CSS con "grid" o "flex"</li>
                <li>Patrones de precio (ej: $99.99)</li>
                <li>2 o más imágenes hijas</li>
                <li>Menos de 3000 caracteres de texto</li>
              </ul>
              <p className="text-zinc-300 leading-relaxed mt-2">
                Como los templates PDP contienen naturalmente precios en CTAs, banners de ofertas, y usan layouts flex/grid 
                extensivamente, esto causaba que <strong>secciones enteras del landing page</strong> fueran marcadas como 
                "producto" y bloqueadas con <code className="bg-zinc-800 px-2 py-1 rounded text-sm">pointer-events: none</code>.
              </p>
            </div>
          </div>
        </section>

        {/* Solución Implementada */}
        <section className="bg-[#16161d] rounded-xl p-6 border border-zinc-800">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="text-green-400" size={20} />
            Solución Técnica Implementada
          </h2>

          <div className="space-y-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h3 className="font-medium text-green-400 mb-2">Nueva Heurística Restrictiva</h3>
              <p className="text-zinc-300 leading-relaxed">
                Se reemplazó la heurística por una versión <strong>extremadamente restrictiva</strong> que solo marca como "producto" 
                si el elemento cumple <strong>TODOS</strong> estos criterios simultáneamente:
              </p>
              <ul className="list-disc list-inside text-zinc-300 mt-2 space-y-1">
                <li><strong>No es wrapper de página:</strong> No es main, body, html, header, footer, section, article</li>
                <li><strong>No está profundamente anidado:</strong> Menos de 50 elementos hijos en total</li>
                <li><strong>Es tarjeta compacta:</strong> Menos de 30 elementos en el DOM</li>
                <li><strong>Tiene exactamente 1 precio:</strong> Pattern regex match de exactamente 1 precio ($XX.XX)</li>
                <li><strong>Tiene título de producto:</strong> Entre 10 y 200 caracteres de texto</li>
                <li><strong>Tiene botón de compra:</strong> Contiene un elemento button o [role="button"]</li>
              </ul>
            </div>

            <div className="bg-zinc-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
              <div className="text-zinc-500 mb-2">// Código de la solución (VisualEditorOverlay.tsx:377-395)</div>
              <pre className="text-zinc-300">
{`// EXTREMELY RESTRICTIVE heuristic for product detection
const isPageWrapper = ['main', 'body', 'html', 'header', 'footer', 'section', 'article'].includes(tag);
const isDeeplyNested = htmlEl.querySelectorAll('*').length > 50;

const hasSinglePrice = (text.match(/\$[\d,.]+/g) || []).length === 1;
const hasProductTitle = text.length > 10 && text.length < 200;
const hasBuyButton = htmlEl.querySelector('button, [role="button"]') !== null;
const isCompactCard = htmlEl.querySelectorAll('*').length < 30;

// Only mark as product if it's a compact product card
if (!isPageWrapper && !isDeeplyNested && isCompactCard && 
    hasSinglePrice && hasProductTitle && hasBuyButton) {
  htmlEl.setAttribute('data-ve-product', 'true');
  return;
}`}
              </pre>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h3 className="font-medium text-blue-400 mb-2">Archivos Modificados</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Code size={16} className="text-zinc-400" />
                  <code className="bg-zinc-800 px-2 py-1 rounded text-sm">components/visual-editor/VisualEditorOverlay.tsx</code>
                  <span className="text-zinc-500">- Líneas 377-395 (heurística markEditableElements)</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Impacto */}
        <section className="bg-[#16161d] rounded-xl p-6 border border-zinc-800">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Database className="text-purple-400" size={20} />
            Impacto y Resultados
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-zinc-900 rounded-lg p-4">
              <h3 className="font-medium text-red-400 mb-2">Antes del Fix</h3>
              <ul className="text-zinc-400 space-y-1 text-sm">
                <li>• ~20% del PDP editable</li>
                <li>• Solo encabezados editables</li>
                <li>• CTAs bloqueados</li>
                <li>• Testimonios bloqueados</li>
                <li>• Secciones de detalle bloqueadas</li>
                <li>• Usuario reportaba: "no puedo editar nada"</li>
              </ul>
            </div>

            <div className="bg-zinc-900 rounded-lg p-4">
              <h3 className="font-medium text-green-400 mb-2">Después del Fix</h3>
              <ul className="text-zinc-300 space-y-1 text-sm">
                <li>• ~99% del PDP editable</li>
                <li>• Todos los textos editables</li>
                <li>• Todas las imágenes editables</li>
                <li>• Todas las secciones editables</li>
                <li>• Solo la tarjeta de producto protegida</li>
                <li>• Experiencia consistente con Store</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Seguridad y Estabilidad */}
        <section className="bg-[#16161d] rounded-xl p-6 border border-zinc-800">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Shield className="text-yellow-400" size={20} />
            Seguridad y Estabilidad
          </h2>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1" size={18} />
              <div>
                <h4 className="font-medium text-zinc-200">Sin Impacto en Base de Datos</h4>
                <p className="text-zinc-400 text-sm">Los cambios fueron puramente en el frontend (heurística de JavaScript). No se modificaron queries, schemas ni tablas de base de datos.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1" size={18} />
              <div>
                <h4 className="font-medium text-zinc-200">Sin Funciones Eliminadas</h4>
                <p className="text-zinc-400 text-sm">No se eliminó ninguna función existente. Solo se modificó la lógica de detección de productos.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1" size={18} />
              <div>
                <h4 className="font-medium text-zinc-200">Backward Compatibility</h4>
                <p className="text-zinc-400 text-sm">Las tiendas existentes y customizaciones guardadas siguen funcionando igual. El cambio solo afecta qué elementos se marcan como editables.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle className="text-green-500 mt-1" size={18} />
              <div>
                <h4 className="font-medium text-zinc-200">Sin Regresiones</h4>
                <p className="text-zinc-400 text-sm">El flujo de Store no se vio afectado. El flujo de PDP ahora funciona igual que Store (100% editable excepto producto real).</p>
              </div>
            </div>
          </div>
        </section>

        {/* Metadata */}
        <section className="bg-[#16161d] rounded-xl p-6 border border-zinc-800">
          <h2 className="text-xl font-semibold mb-4">Metadatos del Incidente</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-zinc-500">Fecha de Reporte:</span>
              <p className="text-zinc-300">21 de Marzo, 2026 - 3:12pm UTC-3</p>
            </div>
            <div>
              <span className="text-zinc-500">Fecha de Resolución:</span>
              <p className="text-zinc-300">21 de Marzo, 2026 - 4:24pm UTC-3</p>
            </div>
            <div>
              <span className="text-zinc-500">Reportado por:</span>
              <p className="text-zinc-300">Richard Almirón (DEV)</p>
            </div>
            <div>
              <span className="text-zinc-500">Solucionado por:</span>
              <p className="text-zinc-300">AI Assistant (Cascade)</p>
            </div>
            <div>
              <span className="text-zinc-500">Componentes Afectados:</span>
              <p className="text-zinc-300">BuilderFlow, VisualEditorOverlay, PDP Templates</p>
            </div>
            <div>
              <span className="text-zinc-500">Commit de Resolución:</span>
              <p className="text-zinc-300 font-mono">516084f</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center text-zinc-500 text-sm pt-8 border-t border-zinc-800">
          <p>Documentación técnica generada para el libro de incidentes de LandingCOD</p>
          <p className="mt-1">Plataforma SaaS - Sistema de Gestión de Tiendas y PDPs</p>
        </div>
      </div>
    </div>
  );
}
