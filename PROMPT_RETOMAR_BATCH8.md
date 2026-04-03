# PROMPT PARA RETOMAR TRABAJO EN TIENDAS

Pega esto al iniciar una nueva sesión:

---

## INSTRUCCIÓN

Estamos completando los 76 templates de tiendas e-commerce de este proyecto. Cada template es un archivo `.tsx` en `components/templates/`. El objetivo es que CADA tienda tenga **mínimo 10 secciones de contenido** (excluyendo header, footer y promo bars) con paginación funcional en el grid de productos, favoritos, carrito, y diseño profesional.

## CÓMO DETERMINAR DÓNDE QUEDAMOS

1. Lee el archivo `components/shared/VerifiedBadge.tsx` — contiene el array `VERIFIED_TEMPLATES` con los IDs de todas las tiendas ya completadas.
2. Lista todos los archivos `.tsx` en `components/templates/` (excluyendo la carpeta `shared/`).
3. Compara ambas listas. Los templates que NO están en `VERIFIED_TEMPLATES` son los que faltan por completar.
4. Toma los siguientes 5 en orden alfabético y trabaja sobre ellos.

## QUÉ HACER CON CADA TEMPLATE

1. Leer el archivo completo con `readFile`
2. Contar secciones exactas buscando comentarios `{/* ─── NOMBRE ─── */}` (excluir HEADER, FOOTER, PROMO BAR, UTILITY BAR, SCROLLING PROMO)
3. Verificar que tenga: `useCart` con `setIsCartOpen`, `usePagination` con `paginatedItems`, `handleAddToCart` que recibe `(product, e)`, `toggleFavorite`
4. Buscar bugs comunes:
   - Shopping bag icon que llama `handleAddToCart(product, e)` donde `product` no existe en ese scope → reemplazar por `setIsCartOpen(true)`
   - `</main>` duplicados o secciones fuera de `<main>`
   - Imports faltantes de iconos usados en secciones nuevas
5. Si tiene menos de 10 secciones, agregar las faltantes ANTES del cierre de `</main>` (o antes de la última sección si es un bloque especial como Student Discount). Tipos de secciones a agregar: Shop by Category, Trending/Bestsellers, Customer Reviews, Editorial Feature, Services/Value Props, App Download, Newsletter, Loyalty/Rewards, Brand Spotlight, etc.
6. Correr `getDiagnostics` en todos los archivos modificados
7. Agregar los 5 IDs nuevos al array `VERIFIED_TEMPLATES` en `components/shared/VerifiedBadge.tsx`
8. Marcar `verified: true` en Supabase con este comando (reemplazar los IDs):

```powershell
$ids = @('id1','id2','id3','id4','id5'); foreach ($id in $ids) { $result = curl.exe -s -X PATCH "https://grxeiinmunfjmptqtfwf.supabase.co/rest/v1/Tiendas_Reutilizables?id=eq.$id" -H "apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdyeGVpaW5tdW5mam1wdHF0ZndmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjY0NjU2NywiZXhwIjoyMDg4MjIyNTY3fQ.SAJupCxm2JKUOz-uSXMwnizdCBYRr6coATgjjgy4PlQ" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdyeGVpaW5tdW5mam1wdHF0ZndmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjY0NjU2NywiZXhwIjoyMDg4MjIyNTY3fQ.SAJupCxm2JKUOz-uSXMwnizdCBYRr6coATgjjgy4PlQ" -H "Content-Type: application/json" -H "Prefer: return=representation" -d '{\"verified\":true}'; Write-Host "$id -> $result" }
```

IMPORTANTE: La columna de filtro en Supabase es `id` (NO `identificador_url`). La tabla es `Tiendas_Reutilizables`.

9. `git add -A` + `git commit -m "Completados: [lista de 5 IDs] - 10+ secciones, verified en Supabase"` + `git push origin master`
10. Reiniciar servidor: `Remove-Item -Recurse -Force .next` + iniciar `npm run dev` como background process
11. Verificar con `curl.exe` que el total de tiendas verified en Supabase coincide con el total de entries en `VERIFIED_TEMPLATES`

## VERIFICACIÓN FINAL

Después de completar los 5, hacer auditoría:
- `getDiagnostics` en los 5 templates + VerifiedBadge.tsx + StoreFilmStrip.tsx + StoreCoverFlow.tsx + BuilderFlow.tsx
- `git status` debe mostrar solo los archivos que tocaste
- Confirmar que el servidor arranca sin errores

## REGLAS

- Trabajar de a 5 templates por sesión (un "batch")
- Cada template DEBE tener mínimo 10 secciones de contenido
- NO tocar archivos de infraestructura (API routes, contexts, types, visualization components) a menos que haya un bug
- Las secciones deben mantener el estilo visual y la paleta de colores del template original
- Usar `picsum.photos` para imágenes placeholder con random seeds únicos por template
- Los IDs de las tiendas son el nombre del archivo en lowercase sin "Template" (ej: `BoldYouth.tsx` → `boldyouth`)
