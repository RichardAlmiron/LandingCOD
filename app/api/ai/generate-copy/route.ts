import { NextResponse } from 'next/server';
import { generateAICopy } from '@/lib/ai-copy-engine';
import { Product } from '@/lib/types';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenRouter no está configurado. Agrega OPENROUTER_API_KEY en las variables de entorno.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { product } = body as { product: Product };

    if (!product || !product.title) {
      return NextResponse.json(
        { error: 'Producto inválido o sin título' },
        { status: 400 }
      );
    }

    const aiContent = await generateAICopy(product, apiKey);

    return NextResponse.json({ success: true, content: aiContent });
  } catch (error: any) {
    console.error('[AI Generate Copy] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Error generando copywriting con IA' },
      { status: 500 }
    );
  }
}
