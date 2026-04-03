// ═══════════════════════════════════════════════════════════
// 15 Slides de la Presentación "Landing Prompt"
// Cada slide corresponde a una imagen del documento maestro
// ═══════════════════════════════════════════════════════════

export interface SlidePoint {
    label: string;
    description: string;
}

export interface SlideData {
    number: number;
    title: string;
    subtitle: string;
    color: string;
    points: SlidePoint[];
    note?: string;
}

export const PRESENTATION_SLIDES: SlideData[] = [
    {
        number: 1,
        title: 'La Anatomía Visual de una Página de 1M$',
        subtitle: 'La fórmula exacta de estructura, diseño y conversión que utilizan las marcas líderes en e-commerce.',
        color: '#6366f1',
        points: [
            { label: 'Estructura Blueprint', description: 'Cada página de producto de alta conversión sigue un plano técnico preciso, como un blueprint arquitectónico.' },
            { label: 'Dimensiones Exactas', description: 'Nada es al azar. Cada sección tiene proporciones calculadas para guiar el ojo del usuario.' },
            { label: 'Vista Superior + Corte', description: 'Se analiza la página desde arriba (layout) y en corte transversal (profundidad de contenido).' },
        ],
    },
    {
        number: 2,
        title: 'Las Reglas Anti-Infoproducto',
        subtitle: 'Claridad sobre Persuasión. Fricción Cero. Confianza Visual Basada en Datos.',
        color: '#ef4444',
        points: [
            { label: 'Claridad sobre Persuasión', description: 'Elimina temporizadores falsos y textos rojos agresivos. El diseño debe guiar al usuario, no presionarlo.' },
            { label: 'Fricción Cero', description: 'Muestra la información crítica de forma inmediata. La navegación debe ser silenciosa y predictiva.' },
            { label: 'Confianza Visual Basada en Datos', description: 'Las marcas que escalan no adivinan; estructuran su página para eliminar objeciones. Cada píxel justifica su existencia.' },
        ],
        note: 'Balance: CLARIDAD pesa más que RUIDO. Cada elemento decorativo sin propósito es ruido que degrada la percepción de marca.',
    },
    {
        number: 3,
        title: 'El Ecosistema de Alta Conversión',
        subtitle: 'La estructura completa de una PDP dividida en 4 zonas estratégicas.',
        color: '#10b981',
        points: [
            { label: '1. Primer Vistazo (Above the Fold)', description: 'Captura inmediata y anclaje visual. Header, galería, título, precio, ATC.' },
            { label: '2. Zona de Conversión', description: 'Título, Precio y Acción (ATC). El bloque que cierra la venta.' },
            { label: '3. Construcción de Confianza', description: 'Beneficios modulares y credibilidad (Badges). Elimina dudas.' },
            { label: '4. Prueba Social y Lógica', description: 'Reseñas, UGC y Resolución de dudas (FAQs). El cierre de confianza.' },
        ],
    },
    {
        number: 4,
        title: 'La Regla de Oro del Primer Vistazo',
        subtitle: 'Todo lo esencial debe estar visible sin hacer scroll. El usuario decide en 3 segundos.',
        color: '#8b5cf6',
        points: [
            { label: 'Imágenes', description: 'Galería HD a la izquierda del viewport. Domina el espacio visual.' },
            { label: 'Título', description: 'SEO-optimizado, descriptivo y sin relleno.' },
            { label: 'Precio', description: 'Bold y grande. Captura atención inmediata.' },
            { label: 'Botón ATC', description: 'Añadir al Carrito con color de alto contraste. Punto focal de la acción.' },
            { label: 'THE FOLD (Línea de corte)', description: 'Todo lo de arriba se ve sin scroll. Lo de abajo requiere interés.' },
        ],
        note: 'Rigurosidad del Testing Cruzado: Lo que encaja en 1080p en Chrome a menudo se rompe en un portátil de 13 pulgadas en Safari.',
    },
    {
        number: 5,
        title: 'Navegación Silenciosa pero Efectiva',
        subtitle: 'La navegación no debe competir con el producto. Debe informar, no distraer.',
        color: '#f59e0b',
        points: [
            { label: 'Eje Izquierdo/Central', description: 'Logo minimalista y enlaces de valor. No compite con el producto, informa.' },
            { label: 'Eje Derecho (Utilidad)', description: 'Cuenta de usuario, Búsqueda y Cesta. Ubicación estricta basada en la memoria muscular del usuario.' },
            { label: 'Migas de Pan (Breadcrumbs)', description: 'Evita la frustración. Permite al usuario retroceder sin perderse en el ecosistema.' },
        ],
    },
    {
        number: 6,
        title: 'El Sustituto del Tacto',
        subtitle: 'En e-commerce no podés tocar el producto. Las imágenes deben compensar esa carencia.',
        color: '#06b6d4',
        points: [
            { label: 'Anclaje Izquierdo', description: 'La imagen principal en alta definición domina el lado izquierdo del viewport.' },
            { label: 'Soporte Dimensional', description: 'Miniaturas clicables que muestran múltiples ángulos y el producto en su contexto real de uso.' },
            { label: 'El Factor Multiplicador', description: 'Un vídeo corto demostrativo eleva exponencialmente la tangibilidad y la intención de compra.' },
        ],
    },
    {
        number: 7,
        title: 'Copywriting de Precisión y Prueba Social Temprana',
        subtitle: 'Título SEO, descripción punchy y validación inmediata con estrellas y badges.',
        color: '#ec4899',
        points: [
            { label: 'Título Optimizado SEO', description: 'Descriptivo y sin relleno. Cada palabra cuenta para posicionamiento y claridad.' },
            { label: '1 o 2 frases contundentes', description: 'Si el usuario no lee más, esto debe bastar para entender el producto.' },
            { label: 'Badge de Autoridad', description: 'Validación inmediata (ej. ecológico, premiado). Insignia monocromática de líneas finas.' },
            { label: 'Rating 4.9 ★', description: 'Estrellas clicables con número de reseñas. Prueba social desde el primer segundo.' },
        ],
    },
    {
        number: 8,
        title: 'El Eje Central de la Acción',
        subtitle: 'Precio, selectores y botón ATC. El bloque que cierra la venta.',
        color: '#6366f1',
        points: [
            { label: 'Anclaje de Precio', description: 'Oferta destacada; precio original sutilmente tachado. El cerebro compara automáticamente.' },
            { label: 'Selectores sin Fricción', description: 'Botones circulares visibles, cero menús desplegables ocultos. El usuario ve todas las opciones.' },
            { label: 'El Toque Maestro', description: 'Integrar el precio directamente dentro del botón consolida la mirada en el punto exacto de fricción y acción.' },
        ],
    },
    {
        number: 9,
        title: 'Credibilidad Inmediata (Trust Badges Minimalistas)',
        subtitle: 'Justo debajo del botón ATC. Elimina la última duda antes de la compra.',
        color: '#14b8a6',
        points: [
            { label: 'Micro-logística', description: 'Tiempo de entrega exacto para reducir ansiedad. "Recíbelo el Jueves 14".' },
            { label: 'Envío 24/48h', description: 'Icono minimalista monocromático. Información clara y directa.' },
            { label: 'Misión Medioambiental', description: 'Valores de marca que conectan emocionalmente sin ser invasivos.' },
            { label: 'Devoluciones Fáciles', description: 'Política clara que elimina el riesgo percibido.' },
        ],
        note: 'Advertencia de Diseño: Prohibido el uso de logotipos pixelados o coloridos de Visa/Mastercard. Destruyen la estética premium. Máximo 3 sellos vectoriales monocromáticos.',
    },
    {
        number: 10,
        title: 'Sustituyendo el Muro de Texto',
        subtitle: 'La Solución Modular: bloques asimétricos de lectura rápida que intercalan narrativa e imágenes.',
        color: '#a855f7',
        points: [
            { label: 'Por qué usarlo', description: 'Texto descriptivo corto que explica el propósito del producto. Acompañado de imagen.' },
            { label: 'Cómo se usa (1-2-3)', description: 'Proceso paso a paso con puntos numerados. Tutorial visual rápido.' },
            { label: 'Misión de la Marca', description: 'Texto corto que comunica los valores y la misión. Conexión emocional.' },
        ],
        note: 'Problema: El muro de texto causa rebote inmediato en móvil. La solución modular mantiene el flujo cognitivo.',
    },
    {
        number: 11,
        title: 'Facilitando la Decisión Lógica',
        subtitle: 'Matriz comparativa y secciones expandibles para el comprador analítico.',
        color: '#f97316',
        points: [
            { label: 'La Matriz Comparativa (Nosotros vs. Ellos)', description: 'Tabla elegante: Reutilizable ✓/✗, Libre de tóxicos ✓/✗, Económico a largo plazo ✓/✗. Sintetiza ventajas en un escaneo de 3 segundos.' },
            { label: 'Secciones Expandibles (Drawers)', description: 'Ingredientes y Materiales, Especificaciones Técnicas, Política de Envíos y Devoluciones. Acordeones limpios con "+".' },
        ],
        note: 'Oculta estratégicamente la información secundaria para mantener la página inmaculada sin sacrificar transparencia.',
    },
    {
        number: 12,
        title: 'El Poder de la Comunidad (Prueba Social y UGC)',
        subtitle: 'Carruseles UGC y sistema de ratings que construyen confianza real.',
        color: '#10b981',
        points: [
            { label: 'Carruseles UGC', description: 'La autenticidad visual valida las promesas de marketing. Fotos reales de clientes usando el producto.' },
            { label: 'Rating 4.8 ★★★★☆', description: 'Distribución de estrellas visible: 5★ (491), 4★ (17), 3★ (7), 2★ (2), 1★ (0).' },
        ],
        note: 'Principio Clave: La honestidad visual y la presencia de algunas críticas menores construyen mucha más confianza que un muro impenetrable de valoraciones perfectas manipuladas.',
    },
    {
        number: 13,
        title: 'Resolviendo Objeciones en Automático',
        subtitle: 'FAQs como última línea de defensa en el embudo de conversión.',
        color: '#8b5cf6',
        points: [
            { label: 'Estrategia de FAQs', description: 'Anticípate exclusivamente a las barreras transaccionales con respuestas de no más de dos líneas.' },
            { label: '¿Cuánto tarda en llegar mi pedido?', description: 'Los envíos estándar tardan entre 24 y 48 horas laborables desde la confirmación.' },
            { label: '¿Es realmente 100% ecológico?', description: 'Respuesta directa que elimina la duda ambiental.' },
            { label: '¿Cómo funciona la garantía?', description: '30 días, sin preguntas, proceso simple.' },
        ],
        note: 'Blueprint: FAQ Interface — Line weight: 1px, Padding: 24px, Typography: Inter.',
    },
    {
        number: 14,
        title: 'Dominando la Pantalla Pequeña (Móvil)',
        subtitle: 'Viewport Inicial vs Mid-Scroll con Sticky ATC.',
        color: '#f59e0b',
        points: [
            { label: 'Viewport Inicial', description: 'Solo Imagen, Título y Precio. El usuario móvil espera hacer scroll. No lo satures.' },
            { label: 'Mid-Scroll & Sticky ATC', description: 'El botón Sticky ATC acompaña la lectura y permite la conversión instantánea en cualquier punto.' },
            { label: 'Dots en Carrusel', description: 'Puntos de navegación + la siguiente imagen se asoma para incentivar el deslizamiento.' },
        ],
    },
    {
        number: 15,
        title: 'Matriz de Diagnóstico y Alta Conversión',
        subtitle: 'El Checklist Definitivo: Diseño Tradicional (Fricción) vs Blueprint de 1M$ (Solución).',
        color: '#ef4444',
        points: [
            { label: 'Above the fold saturado → Solo Imagen, Título, Precio y ATC', description: 'En el primer vistazo, menos es más.' },
            { label: 'Muros de texto → Copy punchy + Secciones modulares en Z', description: 'Intercalar narrativa e imágenes.' },
            { label: 'Botón perdido al scroll → Sticky ATC de alto contraste', description: 'Siempre visible, siempre accesible.' },
            { label: 'Señales genéricas coloridas → Iconos minimalistas monocromáticos', description: 'Y métricas de envío exactas.' },
            { label: 'Diseño para 1 monitor → Testing cruzado implacable', description: 'Móvil, Desktop, Chrome, Safari.' },
        ],
    },
];
