import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET - Obtener preguntas de seguridad activas
export async function GET() {
    try {
        const { data, error } = await supabase
            .from('security_questions')
            .select('id, question, order_index')
            .eq('is_active', true)
            .order('order_index', { ascending: true });

        if (error) {
            console.error('Error fetching security questions:', error);
            return NextResponse.json(
                { error: 'Error al obtener preguntas de seguridad' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            questions: data || []
        });
    } catch (error) {
        console.error('Error en GET /api/security-questions:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}

// POST - Verificar respuestas de seguridad
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { answers } = body; // Array de { questionId, answer }

        if (!answers || !Array.isArray(answers) || answers.length === 0) {
            return NextResponse.json(
                { error: 'Se requieren respuestas para verificar', verified: false },
                { status: 400 }
            );
        }

        // Obtener todas las preguntas activas con sus respuestas hasheadas
        const { data: questions, error } = await supabase
            .from('security_questions')
            .select('id, answer_hash, answer_plaintext, is_active')
            .eq('is_active', true);

        if (error || !questions) {
            console.error('Error fetching questions for verification:', error);
            return NextResponse.json(
                { error: 'Error al verificar respuestas', verified: false },
                { status: 500 }
            );
        }

        // Verificar cada respuesta
        const crypto = require('crypto');
        let allCorrect = true;

        for (const userAnswer of answers) {
            const question = questions.find(q => q.id === userAnswer.questionId);
            
            if (!question) {
                allCorrect = false;
                continue;
            }

            // Hash la respuesta del usuario y comparar
            const hashedUserAnswer = crypto
                .createHash('sha256')
                .update(userAnswer.answer.trim().toLowerCase())
                .digest('hex');

            // Comparar con el hash almacenado o el plaintext (para compatibilidad)
            const isCorrect = 
                hashedUserAnswer === question.answer_hash ||
                userAnswer.answer.trim().toLowerCase() === question.answer_plaintext?.toLowerCase();

            if (!isCorrect) {
                allCorrect = false;
            }
        }

        return NextResponse.json({
            success: true,
            verified: allCorrect,
            message: allCorrect ? 'Todas las respuestas son correctas' : 'Algunas respuestas son incorrectas'
        });

    } catch (error) {
        console.error('Error en POST /api/security-questions:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor', verified: false },
            { status: 500 }
        );
    }
}
