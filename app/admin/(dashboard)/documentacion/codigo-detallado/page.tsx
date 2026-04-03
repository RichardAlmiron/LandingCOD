'use client';
import React, { useState } from 'react';
import { Code2, ChevronDown, Cpu, ArrowRightLeft, Database, Layers, Filter, Zap, FileText, Rocket, Package, BookmarkCheck, Globe, Brain, Clock, CheckSquare } from 'lucide-react';

// ═══════════════════════════════════════════════════════════
// CÓDIGO DETALLADO — Descomposición técnica de cada archivo
// Referencia directa a la analogía del Mapa de Arquitectura
// ═══════════════════════════════════════════════════════════

interface Funcion {
    nombre: string;
    que_hace: string;
    recibe?: string;
    devuelve?: string;
}

interface Archivo {
    id: string;
    persona: string;
    archivo: string;
    tipo: 'orquestador' | 'hook' | 'api' | 'pagina' | 'tabla';
    tipoLabel: string;
    tipoColor: string;
    icon: React.ReactNode;
    que_es: string;
    que_hace_exactamente: string;
    que_NO_hace: string;
    funciones: Funcion[];
    departamento: string;
    deptColor: string;
}

const ARCHIVOS: Archivo[] = [
    // ═══ DIRECCIÓN CREATIVA (Admin) ═══
    {
        id: 'templates-page',
        persona: 'Santiago "El Director"',
        archivo: 'app/admin/(dashboard)/templates/page.tsx',
        tipo: 'orquestador',
        tipoLabel: 'ORQUESTADOR',
        tipoColor: '#f59e0b',
        icon: <Cpu size={18} />,
        que_es: 'La página principal de gestión de templates en el panel de administración.',
        que_hace_exactamente: 'Importa todos los hooks (useTemplates, useTemplateFilters, useTemplateActions, useCategorias, useTemplateTab, useSelection, usePagination) y los conecta entre sí. Pasa los datos de un hook como entrada a otro. Renderiza los componentes de UI (TabBar, StatsBar, FilterBar, BulkActionBar, TemplateRow, Pagination) pasándoles las props correctas. Decide qué mostrar según la pestaña activa (tiendas, PDPs o playground).',
        que_NO_hace: 'No hace fetch. No filtra datos. No ejecuta acciones de verificar/eliminar. No maneja estado de filtros. No carga categorías. No pagina. Solo conecta cables.',
        funciones: [
            { nombre: 'TemplatesPage()', que_hace: 'Componente principal. Llama a todos los hooks, calcula verified/unverified, y renderiza la UI completa.', devuelve: 'JSX de la página' },
            { nombre: 'doRefresh()', que_hace: 'Limpia selección, limpia filtros, y llama a templates.refresh() para recargar datos desde la API.' },
            { nombre: 'doSelectAll()', que_hace: 'Toma todos los IDs de la lista filtrada y los pasa a selection.selectAll().' },
        ],
        departamento: 'Dirección Creativa',
        deptColor: '#6366f1',
    },
    {
        id: 'useTemplates',
        persona: 'Memo "El Archivista"',
        archivo: 'hooks/useTemplates.ts',
        tipo: 'hook',
        tipoLabel: 'HOOK',
        tipoColor: '#6366f1',
        icon: <Layers size={18} />,
        que_es: 'Hook que mantiene en memoria la lista completa de templates (tiendas y PDPs).',
        que_hace_exactamente: 'Al montarse, llama a templatesApi.fetchAll() para traer todas las tiendas y todos los PDPs desde la API. Guarda ambas listas en estado local (useState). Expone una función refresh() para recargar los datos. Expone getList(type) que devuelve stores o pdps según el tipo pedido.',
        que_NO_hace: 'No filtra. No verifica. No elimina. No sabe de categorías. No sabe de UI. Solo recuerda la lista.',
        funciones: [
            { nombre: 'useTemplates()', que_hace: 'Hook principal. Inicializa stores=[], pdps=[], loading=true. Llama refresh() al montar.', devuelve: '{ stores, pdps, loading, refresh, getList }' },
            { nombre: 'refresh()', que_hace: 'Pone loading=true, llama templatesApi.fetchAll(), guarda el resultado en stores y pdps, pone loading=false.' },
            { nombre: 'getList(type)', que_hace: 'Si type es "stores" devuelve la lista de tiendas. Si es "pdps" devuelve la lista de PDPs.', recibe: '"stores" | "pdps"', devuelve: 'TemplateRecord[]' },
        ],
        departamento: 'Dirección Creativa',
        deptColor: '#6366f1',
    },
    {
        id: 'useTemplateFilters',
        persona: 'Lupe "La Curadora"',
        archivo: 'hooks/useTemplateFilters.ts',
        tipo: 'hook',
        tipoLabel: 'HOOK',
        tipoColor: '#6366f1',
        icon: <Filter size={18} />,
        que_es: 'Hook que gestiona el estado de todos los filtros y devuelve la lista filtrada.',
        que_hace_exactamente: 'Recibe la lista original, el tab activo y las categorías. Mantiene en estado: búsqueda de texto, filtro de estado (todos/verificados/pendientes) y filtro de categoría. Calcula con useMemo la lista filtrada aplicando todos los filtros en cadena. Expone clearFilters() para resetear todo.',
        que_NO_hace: 'No sabe de dónde vienen los datos. No hace fetch. No ejecuta acciones. No sabe de selección. Solo filtra.',
        funciones: [
            { nombre: 'useTemplateFilters(list, tab, categorias)', que_hace: 'Hook principal. Recibe la lista cruda, el tab activo y las categorías disponibles.', devuelve: '{ search, setSearch, estadoFiltro, setEstadoFiltro, categoriaFiltro, setCategoriaFiltro, filtered, clearFilters }' },
            { nombre: 'filtered (useMemo)', que_hace: 'Aplica en cadena: filtro de texto → filtro de estado → filtro de categoría. Devuelve solo los items que pasan todos los filtros.' },
            { nombre: 'clearFilters()', que_hace: 'Resetea search="", estadoFiltro="todos", categoriaFiltro="".' },
        ],
        departamento: 'Dirección Creativa',
        deptColor: '#6366f1',
    },
    {
        id: 'useTemplateActions',
        persona: 'Rafa "El Ejecutor"',
        archivo: 'hooks/useTemplateActions.ts',
        tipo: 'hook',
        tipoLabel: 'HOOK',
        tipoColor: '#6366f1',
        icon: <Zap size={18} />,
        que_es: 'Hook que ejecuta todas las operaciones CRUD sobre templates.',
        que_hace_exactamente: 'Recibe el tab activo, callbacks de mutación (onMutate, onDeselect, onClearSelection), los IDs seleccionados y las categorías. Mantiene un estado "busy" para bloquear la UI durante operaciones. Cada acción llama a templatesApi, luego llama onMutate() para refrescar datos.',
        que_NO_hace: 'No decide qué verificar o eliminar. No maneja filtros. No maneja selección. Solo ejecuta lo que le piden.',
        funciones: [
            { nombre: 'doVerify(id, current)', que_hace: 'Llama templatesApi.verify() con el valor invertido (!current). Luego llama onMutate() para refrescar.', recibe: 'id: string, current: boolean' },
            { nombre: 'doDelete(id)', que_hace: 'Muestra confirm(). Si acepta, llama templatesApi.remove(). Luego onDeselect([id]) y onMutate().' },
            { nombre: 'doBulkVerify()', que_hace: 'Llama templatesApi.verify() para cada ID seleccionado con verified=true. Luego onClearSelection() y onMutate().' },
            { nombre: 'doBulkUnverify()', que_hace: 'Igual que doBulkVerify pero con verified=false.' },
            { nombre: 'doBulkDelete()', que_hace: 'Muestra confirm(). Si acepta, llama templatesApi.removeMany() con todos los IDs. Luego onClearSelection() y onMutate().' },
            { nombre: 'doAssignCategory(itemId, catId)', que_hace: 'Llama templatesApi.assignCategory(). Luego onMutate() para refrescar.' },
        ],
        departamento: 'Dirección Creativa',
        deptColor: '#6366f1',
    },
    {
        id: 'useCategorias',
        persona: 'Doña Cata "La Clasificadora"',
        archivo: 'hooks/useCategorias.ts',
        tipo: 'hook',
        tipoLabel: 'HOOK',
        tipoColor: '#6366f1',
        icon: <Package size={18} />,
        que_es: 'Hook que carga las categorías PDP desde la API.',
        que_hace_exactamente: 'Al montarse, hace fetch a /api/categorias-pdp. Guarda el resultado en estado local. Expone { categorias }. Eso es todo.',
        que_NO_hace: 'No sabe de templates. No filtra. No asigna categorías. Solo las carga y las recuerda.',
        funciones: [
            { nombre: 'useCategorias()', que_hace: 'Hook principal. Hace fetch al montar, guarda categorías en useState.', devuelve: '{ categorias: CategoriaPDP[] }' },
        ],
        departamento: 'Dirección Creativa',
        deptColor: '#6366f1',
    },
    {
        id: 'useTemplateTab',
        persona: 'Pepe "El Navegante"',
        archivo: 'hooks/useTemplateTab.ts',
        tipo: 'hook',
        tipoLabel: 'HOOK',
        tipoColor: '#6366f1',
        icon: <ArrowRightLeft size={18} />,
        que_es: 'Hook que gestiona qué pestaña está activa (stores, pdps, playground).',
        que_hace_exactamente: 'Mantiene pageTab en estado. Cuando se cambia de pestaña, llama al callback onTabChange (que limpia selección y filtros). Expone switchTab(tab) y pageTab.',
        que_NO_hace: 'No sabe qué hay en cada pestaña. No filtra. No carga datos. Solo recuerda en qué pestaña estás.',
        funciones: [
            { nombre: 'useTemplateTab(onTabChange)', que_hace: 'Hook principal. Recibe un callback que se ejecuta al cambiar de tab.', devuelve: '{ pageTab, switchTab }' },
            { nombre: 'switchTab(tab)', que_hace: 'Cambia pageTab al nuevo valor y ejecuta onTabChange().' },
        ],
        departamento: 'Dirección Creativa',
        deptColor: '#6366f1',
    },
    {
        id: 'templates-api',
        persona: 'Carlos "El Mensajero"',
        archivo: 'lib/templates-api.ts',
        tipo: 'api',
        tipoLabel: 'CAPA API',
        tipoColor: '#06b6d4',
        icon: <Globe size={18} />,
        que_es: 'Módulo que contiene todas las llamadas HTTP del admin de templates.',
        que_hace_exactamente: 'Tiene funciones puras que hacen fetch a las rutas de la API (/api/templates/stores, /api/templates/pdp, /api/categorias-pdp). Transforma los datos crudos del servidor al formato TemplateRecord que usa el frontend. Es el único archivo que conoce las URLs de la API.',
        que_NO_hace: 'No maneja estado. No maneja UI. No sabe de React. Solo HTTP y transformación de datos.',
        funciones: [
            { nombre: 'fetchAll()', que_hace: 'Hace fetch en paralelo a /api/templates/stores y /api/templates/pdp. Mapea los resultados con mapStore() y mapPdp().', devuelve: '{ stores: TemplateRecord[], pdps: TemplateRecord[] }' },
            { nombre: 'verify(type, id, verified)', que_hace: 'POST al endpoint del tipo con action="verify".', devuelve: 'boolean (éxito o fallo)' },
            { nombre: 'remove(type, id)', que_hace: 'DELETE al endpoint del tipo con el id en query string.', devuelve: 'boolean' },
            { nombre: 'removeMany(type, ids)', que_hace: 'POST al endpoint con action="delete_permanent" y array de IDs.', devuelve: 'boolean' },
            { nombre: 'assignCategory(itemId, catId)', que_hace: 'POST a /api/categorias-pdp con accion="asignar_categoria".', devuelve: 'boolean' },
            { nombre: 'mapStore(s)', que_hace: 'Transforma un registro crudo de tienda al formato TemplateRecord.' },
            { nombre: 'mapPdp(p)', que_hace: 'Transforma un registro crudo de PDP al formato TemplateRecord.' },
        ],
        departamento: 'Dirección Creativa',
        deptColor: '#6366f1',
    },
    {
        id: 'useSelection',
        persona: 'Selección (compartido)',
        archivo: 'hooks/useSelection.ts',
        tipo: 'hook',
        tipoLabel: 'HOOK',
        tipoColor: '#6366f1',
        icon: <CheckSquare size={18} />,
        que_es: 'Hook genérico que gestiona un Set de IDs seleccionados.',
        que_hace_exactamente: 'Mantiene un Set<string> en estado. Expone toggle (agregar/quitar uno), selectMany, deselectMany, selectAll, clear, has (verificar si está seleccionado), count e ids (array).',
        que_NO_hace: 'No sabe qué son los IDs. No sabe de templates ni productos. Solo maneja un conjunto de strings.',
        funciones: [
            { nombre: 'toggle(id)', que_hace: 'Si el ID está en el Set lo quita, si no está lo agrega.' },
            { nombre: 'selectAll(ids)', que_hace: 'Reemplaza todo el Set con los IDs recibidos.' },
            { nombre: 'deselectMany(ids)', que_hace: 'Quita del Set todos los IDs recibidos.' },
            { nombre: 'clear()', que_hace: 'Vacía el Set completamente.' },
            { nombre: 'has(id)', que_hace: 'Devuelve true si el ID está en el Set.', devuelve: 'boolean' },
        ],
        departamento: 'Compartido',
        deptColor: '#64748b',
    },
    {
        id: 'usePagination',
        persona: 'Paginación (compartido)',
        archivo: 'hooks/usePagination.ts',
        tipo: 'hook',
        tipoLabel: 'HOOK',
        tipoColor: '#6366f1',
        icon: <ArrowRightLeft size={18} />,
        que_es: 'Hook genérico que pagina cualquier lista.',
        que_hace_exactamente: 'Recibe un array y un número de items por página. Calcula totalPages. Corta el array para devolver solo la página actual (paginated). Auto-corrige si la página actual excede el total. Expone prev, next, goTo, reset.',
        que_NO_hace: 'No sabe qué contiene la lista. No filtra. No ordena. Solo pagina.',
        funciones: [
            { nombre: 'usePagination(items, perPage)', que_hace: 'Hook principal. Recibe la lista y el tamaño de página.', devuelve: '{ page, totalPages, paginated, total, goTo, prev, next, reset, hasPrev, hasNext }' },
            { nombre: 'paginated (useMemo)', que_hace: 'Corta items.slice((page-1)*perPage, page*perPage) para devolver solo la página actual.' },
        ],
        departamento: 'Compartido',
        deptColor: '#64748b',
    },

    // ═══ ESTUDIO DEL CLIENTE (Builder) ═══
    {
        id: 'builder-flow',
        persona: 'Don Builder "El Capitán"',
        archivo: 'components/flujo-constructor/BuilderFlow.tsx',
        tipo: 'orquestador',
        tipoLabel: 'ORQUESTADOR',
        tipoColor: '#f59e0b',
        icon: <Cpu size={18} />,
        que_es: 'El componente principal del builder donde el cliente construye su tienda o PDP.',
        que_hace_exactamente: 'Importa todos los hooks del builder (useBuilderStep, useBuilderTemplates, useBuilderProducts, useBuilderDraft, useBuilderPublish, useFavorites, useExpressStock, useAuth). Los conecta entre sí. Renderiza los 4 pasos del flujo: Tipo de Proyecto → Selección de Diseño → Catálogo de Productos → Configura y Publica. Maneja el estado local de storeData, template, device, previewMode. Pasa datos entre hooks y componentes visuales.',
        que_NO_hace: 'No hace fetch de templates (Tomás lo hace). No busca productos (Paco lo hace). No guarda borradores (Beto lo hace). No publica (Nando lo hace). No navega entre pasos (Sergio lo hace). Solo conecta.',
        funciones: [
            { nombre: 'BuilderFlow()', que_hace: 'Componente principal. Llama a todos los hooks, sincroniza previewMode con flowType, auto-fetch productos en paso 3, auto-selecciona primera categoría.', devuelve: 'JSX del builder completo (4 pasos + modales)' },
            { nombre: 'confirmProductSelection()', que_hace: 'Toma los productos seleccionados de Paco, los pone en storeData.products, y le dice a Sergio que avance al paso 4.' },
            { nombre: 'isStepDataReady()', que_hace: 'Verifica si los datos del paso destino ya cargaron. Paso 2: ¿templates cargados? Paso 3: ¿productos cargados?', devuelve: 'boolean' },
            { nombre: 'loadDraft()', que_hace: 'Toma los datos del borrador de Beto y restaura step, flowType, template, storeData.' },
        ],
        departamento: 'Estudio del Cliente',
        deptColor: '#10b981',
    },
    {
        id: 'useBuilderTemplates',
        persona: 'Tomás "El del Menú"',
        archivo: 'hooks/useBuilderTemplates.ts',
        tipo: 'hook',
        tipoLabel: 'HOOK',
        tipoColor: '#10b981',
        icon: <Layers size={18} />,
        que_es: 'Hook que carga los templates disponibles para el cliente en el builder.',
        que_hace_exactamente: 'Al montarse, llama en paralelo a builderApi.fetchStoreTemplates() y builderApi.fetchPdpTemplates(). Guarda tiendas, PDPs y categorías en estado local. Solo trae templates verificados (la API filtra por verified=true por defecto).',
        que_NO_hace: 'No filtra. No selecciona. No sabe de productos. No sabe de publicación. Solo carga el menú.',
        funciones: [
            { nombre: 'useBuilderTemplates()', que_hace: 'Hook principal. Hace fetch al montar, guarda storeTemplates, pdpTemplates, categorias.', devuelve: '{ storeTemplates, pdpTemplates, categorias, loading }' },
        ],
        departamento: 'Estudio del Cliente',
        deptColor: '#10b981',
    },
    {
        id: 'useBuilderProducts',
        persona: 'Paco "El del Catálogo"',
        archivo: 'hooks/useBuilderProducts.ts',
        tipo: 'hook',
        tipoLabel: 'HOOK',
        tipoColor: '#10b981',
        icon: <Package size={18} />,
        que_es: 'Hook que gestiona el catálogo de productos AlmiDrop en el builder.',
        que_hace_exactamente: 'Mantiene la lista de productos, búsqueda, paginación (40 por página), selección (Set de IDs), y producto en vista detalle. fetch() llama a builderApi.fetchCatalogProducts(). toggle() agrega/quita un producto — en modo PDP solo permite uno, en modo store permite múltiples.',
        que_NO_hace: 'No sabe de templates. No publica. No guarda borradores. Solo maneja productos.',
        funciones: [
            { nombre: 'fetch(searchStr)', que_hace: 'Llama builderApi.fetchCatalogProducts(). Guarda resultado en products. Resetea página a 1.' },
            { nombre: 'toggle(id)', que_hace: 'En modo PDP: selección única (clear + add). En modo store: toggle normal (add/remove).' },
            { nombre: 'toggleAll()', que_hace: 'Si todos están seleccionados, deselecciona todos. Si no, selecciona todos.' },
            { nombre: 'paginated', que_hace: 'Corta products para devolver solo la página actual (40 items).', devuelve: 'any[]' },
        ],
        departamento: 'Estudio del Cliente',
        deptColor: '#10b981',
    },
    {
        id: 'useBuilderDraft',
        persona: 'Beto "El de los Borradores"',
        archivo: 'hooks/useBuilderDraft.ts',
        tipo: 'hook',
        tipoLabel: 'HOOK',
        tipoColor: '#10b981',
        icon: <FileText size={18} />,
        que_es: 'Hook que persiste el borrador del builder en localStorage.',
        que_hace_exactamente: 'Al montarse, busca en localStorage si hay un borrador guardado para el usuario actual. Si lo encuentra, muestra showPrompt=true. save() guarda con debounce de 1.5 segundos. discard() borra el borrador. accept() cierra el prompt sin borrar. clearSaved() limpia después de publicar.',
        que_NO_hace: 'No sabe qué contiene el borrador. No restaura datos (eso lo hace BuilderFlow). Solo guarda y recupera strings de localStorage.',
        funciones: [
            { nombre: 'save(data)', que_hace: 'Espera 1.5 segundos (debounce) y guarda en localStorage con key builder_draft_{userId}.' },
            { nombre: 'discard()', que_hace: 'Borra el borrador de localStorage. Pone draftData=null y showPrompt=false.' },
            { nombre: 'accept()', que_hace: 'Cierra el prompt (showPrompt=false) sin borrar el borrador.' },
            { nombre: 'clearSaved()', que_hace: 'Borra el borrador de localStorage. Se usa después de publicar exitosamente.' },
        ],
        departamento: 'Estudio del Cliente',
        deptColor: '#10b981',
    },
    {
        id: 'useBuilderPublish',
        persona: 'Nando "El Publicador"',
        archivo: 'hooks/useBuilderPublish.ts',
        tipo: 'hook',
        tipoLabel: 'HOOK',
        tipoColor: '#10b981',
        icon: <Rocket size={18} />,
        que_es: 'Hook que gestiona todo el flujo de publicación de tiendas y PDPs.',
        que_hace_exactamente: 'Mantiene el estado del modal de publicación (showModal, slug, published, publishing, error). open() abre el modal limpio. publish() prepara los datos con metadata (fecha, usuario), filtra productos si es PDP, llama builderApi.publish(), y maneja éxito/error. close() cierra y resetea.',
        que_NO_hace: 'No sabe de templates. No sabe de productos. No guarda borradores. Solo publica.',
        funciones: [
            { nombre: 'open()', que_hace: 'Abre el modal. Resetea published=false y error="".' },
            { nombre: 'close()', que_hace: 'Cierra el modal. Resetea todo.' },
            { nombre: 'publish(payload)', que_hace: 'Prepara storeData con metadata de publicación. Si es PDP, filtra solo el producto activo. Llama builderApi.publish(). Si éxito: published=true y ejecuta onSuccess. Si fallo: muestra error.', recibe: '{ storeData, template, flowType, userId, userName, userEmail, activeProductId, onSuccess }' },
        ],
        departamento: 'Estudio del Cliente',
        deptColor: '#10b981',
    },
    {
        id: 'useBuilderStep',
        persona: 'Sergio "El de los Pasos"',
        archivo: 'hooks/useBuilderStep.ts',
        tipo: 'hook',
        tipoLabel: 'HOOK',
        tipoColor: '#10b981',
        icon: <Clock size={18} />,
        que_es: 'Hook que gestiona la navegación entre los 4 pasos del builder y las transiciones cinemáticas.',
        que_hace_exactamente: 'Mantiene step (1-4), flowType (store/pdp/null), transition (datos de la animación cinemática), showEntry (animación inicial). goTo() ejecuta una acción pendiente, cambia el paso inmediatamente, y activa la transición cinemática encima. completeTransition() limpia la transición cuando termina la animación.',
        que_NO_hace: 'No sabe qué hay en cada paso. No carga datos. No renderiza UI. Solo sabe el número del paso y la animación.',
        funciones: [
            { nombre: 'goTo(targetStep, title, subtitle, options)', que_hace: 'Ejecuta pendingAction si existe. Cambia step al destino. Activa la transición cinemática con título, subtítulo, duración y color.' },
            { nombre: 'completeTransition()', que_hace: 'Pone transition=null. Se llama cuando la animación cinemática termina.' },
            { nombre: 'completeEntry()', que_hace: 'Pone showEntry=false. Se llama cuando la animación de entrada del builder termina.' },
        ],
        departamento: 'Estudio del Cliente',
        deptColor: '#10b981',
    },
    {
        id: 'builder-api',
        persona: 'Diego "El Mensajero"',
        archivo: 'lib/builder-api.ts',
        tipo: 'api',
        tipoLabel: 'CAPA API',
        tipoColor: '#06b6d4',
        icon: <Globe size={18} />,
        que_es: 'Módulo que contiene todas las llamadas HTTP del builder del cliente.',
        que_hace_exactamente: 'Tiene funciones puras que hacen fetch a las APIs. fetchStoreTemplates() trae tiendas verificadas. fetchPdpTemplates() trae PDPs verificados + categorías. fetchCatalogProducts() trae productos de AlmiDrop. publish() envía el proyecto completo a /api/tiendas para publicar.',
        que_NO_hace: 'No maneja estado. No maneja UI. No sabe de React. Solo HTTP.',
        funciones: [
            { nombre: 'fetchStoreTemplates()', que_hace: 'GET /api/templates/stores. Mapea cada registro al formato BuilderStoreTemplate.', devuelve: 'BuilderStoreTemplate[]' },
            { nombre: 'fetchPdpTemplates()', que_hace: 'GET /api/categorias-pdp?soloPlantillas=true y GET /api/categorias-pdp en paralelo. Mapea plantillas y categorías.', devuelve: '{ templates: BuilderPdpTemplate[], categorias: BuilderCategoria[] }' },
            { nombre: 'fetchCatalogProducts(search)', que_hace: 'GET /api/almidrop/catalog?search=... Devuelve array de productos.', devuelve: 'any[]' },
            { nombre: 'publish(payload)', que_hace: 'POST /api/tiendas con identificador_url, storeData, template, flowType.', devuelve: '{ success: boolean, error?: string }' },
        ],
        departamento: 'Estudio del Cliente',
        deptColor: '#10b981',
    },
];

const DEPARTAMENTOS_UNICOS = [...new Set(ARCHIVOS.map(a => a.departamento))];

export default function CodigoDetalladoPage() {
    const [expanded, setExpanded] = useState<string | null>(null);
    const [filtro, setFiltro] = useState<string>('todos');

    const filtrados = filtro === 'todos' ? ARCHIVOS : ARCHIVOS.filter(a => a.departamento === filtro);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 1200 }}>
            {/* Header */}
            <div>
                <h1 className="shimmer-text" style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.03em', margin: 0, lineHeight: 1 }}>
                    CÓDIGO DETALLADO
                </h1>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', fontWeight: 600, marginTop: 10 }}>
                    Descomposición exacta de cada archivo — Qué es, qué hace, qué NO hace, y cada función explicada
                </p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', marginTop: 4 }}>
                    Referencia directa a la analogía del <span style={{ color: '#a78bfa' }}>Mapa de Arquitectura</span> — cada archivo tiene su nombre de persona
                </p>
            </div>

            {/* Filtros por departamento */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button onClick={() => setFiltro('todos')} style={{
                    padding: '6px 16px', borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: 'pointer',
                    background: filtro === 'todos' ? 'rgba(255,255,255,0.1)' : 'transparent',
                    border: `1px solid ${filtro === 'todos' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)'}`,
                    color: filtro === 'todos' ? '#fff' : 'rgba(255,255,255,0.4)',
                }}>Todos ({ARCHIVOS.length})</button>
                {DEPARTAMENTOS_UNICOS.map(dept => {
                    const count = ARCHIVOS.filter(a => a.departamento === dept).length;
                    const color = ARCHIVOS.find(a => a.departamento === dept)?.deptColor || '#fff';
                    return (
                        <button key={dept} onClick={() => setFiltro(dept)} style={{
                            padding: '6px 16px', borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: 'pointer',
                            background: filtro === dept ? `${color}20` : 'transparent',
                            border: `1px solid ${filtro === dept ? `${color}50` : 'rgba(255,255,255,0.08)'}`,
                            color: filtro === dept ? color : 'rgba(255,255,255,0.4)',
                        }}>{dept} ({count})</button>
                    );
                })}
            </div>

            {/* Archivos */}
            {filtrados.map(archivo => {
                const isOpen = expanded === archivo.id;
                return (
                    <div key={archivo.id} className="ultra-glass" style={{ overflow: 'hidden', position: 'relative' }}>
                        <div className="hyper-ring" style={{ opacity: 0.06 }} />
                        <button onClick={() => setExpanded(isOpen ? null : archivo.id)} style={{
                            width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '20px 24px',
                            background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', position: 'relative', zIndex: 1,
                        }}>
                            <div style={{
                                width: 42, height: 42, borderRadius: 12, flexShrink: 0,
                                background: `${archivo.deptColor}15`, border: `1px solid ${archivo.deptColor}35`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', color: archivo.deptColor,
                            }}>
                                {archivo.icon}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                                    <span style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>{archivo.persona}</span>
                                    <span style={{ fontSize: 9, fontWeight: 800, padding: '2px 8px', borderRadius: 6, background: `${archivo.tipoColor}20`, color: archivo.tipoColor, letterSpacing: '0.06em' }}>{archivo.tipoLabel}</span>
                                </div>
                                <div style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.3)', marginTop: 3 }}>{archivo.archivo}</div>
                            </div>
                            <div style={{ color: 'rgba(255,255,255,0.25)', transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0)' }}>
                                <ChevronDown size={18} />
                            </div>
                        </button>

                        {isOpen && (
                            <div style={{ padding: '0 24px 24px', position: 'relative', zIndex: 1 }}>
                                {/* Qué es */}
                                <div style={{ padding: '14px 16px', borderRadius: 12, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', marginBottom: 12 }}>
                                    <div style={{ fontSize: 10, fontWeight: 800, color: '#67e8f9', letterSpacing: '0.06em', marginBottom: 6 }}>QUÉ ES</div>
                                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{archivo.que_es}</div>
                                </div>

                                {/* Qué hace exactamente */}
                                <div style={{ padding: '14px 16px', borderRadius: 12, background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.12)', marginBottom: 12 }}>
                                    <div style={{ fontSize: 10, fontWeight: 800, color: '#34d399', letterSpacing: '0.06em', marginBottom: 6 }}>QUÉ HACE EXACTAMENTE</div>
                                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{archivo.que_hace_exactamente}</div>
                                </div>

                                {/* Qué NO hace */}
                                <div style={{ padding: '14px 16px', borderRadius: 12, background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.12)', marginBottom: 16 }}>
                                    <div style={{ fontSize: 10, fontWeight: 800, color: '#f87171', letterSpacing: '0.06em', marginBottom: 6 }}>QUÉ NO HACE (SRP)</div>
                                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>{archivo.que_NO_hace}</div>
                                </div>

                                {/* Funciones */}
                                <div style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em', marginBottom: 10 }}>
                                    FUNCIONES ({archivo.funciones.length})
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {archivo.funciones.map(fn => (
                                        <div key={fn.nombre} style={{
                                            padding: '12px 14px', borderRadius: 10,
                                            background: 'rgba(0,0,0,0.15)', border: '1px solid rgba(255,255,255,0.04)',
                                        }}>
                                            <div style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 700, color: '#a78bfa', marginBottom: 4 }}>{fn.nombre}</div>
                                            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{fn.que_hace}</div>
                                            {fn.recibe && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>Recibe: <span style={{ fontFamily: 'monospace', color: '#67e8f9' }}>{fn.recibe}</span></div>}
                                            {fn.devuelve && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>Devuelve: <span style={{ fontFamily: 'monospace', color: '#34d399' }}>{fn.devuelve}</span></div>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
