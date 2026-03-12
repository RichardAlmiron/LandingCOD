import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';
import { supabase } from '@/lib/supabase';
import { verifyAccessToken, ACCESS_COOKIE } from '@/lib/auth';
import { parse } from 'cookie';

const CONCURRENCY_LIMIT = 3;

// Auth helper
async function verifyAuth(request: Request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const cookies = parse(cookieHeader);
  const accessToken = cookies[ACCESS_COOKIE];

  if (!accessToken) {
    return { error: 'No autenticado', status: 401 };
  }

  const payload = verifyAccessToken(accessToken);
  if (payload.role !== 'admin') {
    return { error: 'No autorizado', status: 403 };
  }

  return { payload };
}

// Log de auditoría
async function logAudit(payload: any, action: string, details: any, success: boolean) {
  try {
    await supabase.from('audit_logs').insert({
      user_id: payload.userId || payload.sub,
      user_email: payload.email,
      action,
      details: JSON.stringify(details),
      success,
      created_at: new Date().toISOString()
    });
  } catch (err) {
    console.error('Error logging audit:', err);
  }
}

// Verificar si una imagen está en blanco (análisis simple de tamaño)
async function isImageBlank(imageUrl: string): Promise<boolean> {
  try {
    const response = await fetch(imageUrl, { method: 'HEAD' });
    if (!response.ok) return true;
    
    // Si el archivo es muy pequeño, probablemente está en blanco o es inválido
    const contentLength = parseInt(response.headers.get('content-length') || '0', 10);
    if (contentLength < 2000) return true; // Menos de 2KB es sospechoso
    
    return false;
  } catch {
    return true;
  }
}

// PASO 1: Analizar - Cuenta cuántos PDPs necesitan captura
export async function GET(request: Request) {
  try {
    const auth = await verifyAuth(request);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const { searchParams } = new URL(request.url);
    const analyze = searchParams.get('analyze') === 'true';
    const checkBlank = searchParams.get('checkBlank') === 'true';

    if (!analyze) {
      return NextResponse.json({ error: 'Use ?analyze=true' }, { status: 400 });
    }

    // Obtener todos los PDPs activos
    const { data: pdps, error: dbError } = await supabase
      .from('Paginas_de_Productos_Reutilizables')
      .select('id, name, category, image_url')
      .is('deleted_at', null);

    if (dbError) {
      await logAudit(auth.payload, 'pdp_capture_analyze', { error: dbError.message }, false);
      return NextResponse.json({ error: 'Error al obtener PDPs', details: dbError.message }, { status: 500 });
    }

    const allPdpCount = pdps?.length || 0;
    
    // Separar en con y sin imagen
    let withImage: any[] = [];
    let withoutImage: any[] = [];
    let blankImages: any[] = [];

    for (const pdp of (pdps || [])) {
      if (pdp.image_url) {
        if (checkBlank) {
          const isBlank = await isImageBlank(pdp.image_url);
          if (isBlank) {
            blankImages.push(pdp);
          } else {
            withImage.push(pdp);
          }
        } else {
          withImage.push(pdp);
        }
      } else {
        withoutImage.push(pdp);
      }
    }

    // Los que necesitan captura son: sin imagen + imágenes en blanco
    const needCapture = [...withoutImage, ...blankImages];

    await logAudit(auth.payload, 'pdp_capture_analyze', { 
      total: allPdpCount, 
      withImage: withImage.length, 
      withoutImage: withoutImage.length,
      blankImages: blankImages.length,
      needCapture: needCapture.length
    }, true);

    return NextResponse.json({
      success: true,
      total: allPdpCount,
      withImage: withImage.length,
      withoutImage: withoutImage.length,
      blankImages: blankImages.length,
      needCapture: needCapture.length,
      templates: needCapture,
      message: needCapture.length === 0 
        ? 'Todas las tarjetas tienen imágenes válidas' 
        : `Se necesitan capturar ${needCapture.length} imágenes (${withoutImage.length} sin imagen${blankImages.length > 0 ? `, ${blankImages.length} en blanco` : ''})`
    });

  } catch (err: any) {
    console.error('Error analyzing:', err);
    return NextResponse.json({ error: 'Error interno', message: err.message }, { status: 500 });
  }
}

// Capturar un solo template
async function captureSingle(browser: any, template: any, retryCount = 0): Promise<any> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const url = `${baseUrl}/preview?template=${template.id}&type=pdp`;
  const page = await browser.newPage();
  
  try {
    await page.setViewport({ width: 400, height: 300 });
    
    // Navegar más rápido
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await new Promise(r => setTimeout(r, 800));
    
    // Verificar que hay contenido (relajado para páginas vacías también)
    const hasContent = await page.evaluate(() => {
      const text = document.body.innerText || '';
      // Solo verificar que hay ALGO de contenido, no palabras específicas
      return text.length > 50 || document.querySelectorAll('*').length > 20;
    });
    
    if (!hasContent && retryCount < 2) {
      await page.close();
      return captureSingle(browser, template, retryCount + 1);
    }
    
    // Screenshot
    const screenshotBuffer = await page.screenshot({
      type: 'webp',
      quality: 80,
      clip: { x: 0, y: 0, width: 400, height: 300 }
    });

    // Verificar que el screenshot no esté en blanco (tamaño mínimo)
    if (screenshotBuffer.length < 2000) {
      throw new Error('Screenshot parece estar en blanco');
    }

    // Upload
    const fileName = `${template.id}-auto.webp`;
    const { error: uploadError } = await supabase.storage
      .from('pdp-previews')
      .upload(fileName, screenshotBuffer, {
        contentType: 'image/webp',
        upsert: true
      });

    if (uploadError) throw new Error(`Upload: ${uploadError.message}`);

    // Get URL y actualizar BD
    const { data: { publicUrl } } = supabase.storage
      .from('pdp-previews')
      .getPublicUrl(fileName);

    const { error: updateError } = await supabase
      .from('Paginas_de_Productos_Reutilizables')
      .update({ image_url: publicUrl })
      .eq('id', template.id);

    if (updateError) throw new Error(`DB: ${updateError.message}`);

    await page.close();

    return {
      id: template.id,
      name: template.name,
      status: 'success',
      imageUrl: publicUrl
    };

  } catch (err: any) {
    await page.close();
    console.error(`[Capture Error] Template ${template.id}:`, err.message);
    return {
      id: template.id,
      name: template.name,
      status: 'error',
      error: err.message
    };
  }
}

// PASO 2: Capturar - Procesa un lote de templates
export async function POST(request: Request) {
  try {
    const auth = await verifyAuth(request);
    if (auth.error) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const body = await request.json();
    const { templateIds } = body;

    if (!templateIds || !Array.isArray(templateIds) || templateIds.length === 0) {
      return NextResponse.json({ error: 'Se requiere array de templateIds' }, { status: 400 });
    }

    // Obtener datos de los templates solicitados
    const { data: templates, error: dbError } = await supabase
      .from('Paginas_de_Productos_Reutilizables')
      .select('id, name, category, image_url')
      .in('id', templateIds)
      .is('deleted_at', null);

    if (dbError) {
      await logAudit(auth.payload, 'pdp_capture', { error: dbError.message, templateIds }, false);
      return NextResponse.json({ error: 'Error al obtener templates', details: dbError.message }, { status: 500 });
    }

    if (!templates || templates.length === 0) {
      return NextResponse.json({ error: 'No se encontraron templates' }, { status: 404 });
    }

    // Launch browser
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
    });

    // Procesar uno por uno para mantener control
    const results: any[] = [];
    
    for (const template of templates) {
      const result = await captureSingle(browser, template);
      results.push(result);
    }

    await browser.close();

    const successCount = results.filter(r => r.status === 'success').length;
    const errorCount = results.filter(r => r.status === 'error').length;

    await logAudit(auth.payload, 'pdp_capture', { 
      total: templates.length, 
      success: successCount, 
      errors: errorCount,
      templateIds 
    }, errorCount === 0);

    return NextResponse.json({
      success: true,
      summary: {
        total: templates.length,
        success: successCount,
        errors: errorCount
      },
      results
    });

  } catch (err: any) {
    console.error('Critical error:', err);
    return NextResponse.json({ error: 'Error interno', message: err.message }, { status: 500 });
  }
}
