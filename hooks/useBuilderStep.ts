// ── Responsabilidad única: gestionar la navegación entre pasos del builder ──
// No sabe de templates, no sabe de productos, no sabe de publicación.

import { useState, useCallback } from 'react';

export type BuilderStep = 1 | 2 | 3 | 4;
export type FlowType = 'store' | 'pdp' | null;

interface StepTransition {
    active: boolean;
    targetStep: BuilderStep;
    title: string;
    subtitle: string;
    minDuration: number;
    accentColor: string;
}

export function useBuilderStep() {
    const [step, setStep] = useState<BuilderStep>(1);
    const [flowType, setFlowType] = useState<FlowType>(null);
    const [transition, setTransition] = useState<StepTransition | null>(null);
    const [showEntry, setShowEntry] = useState(true);

    const goTo = useCallback((
        targetStep: BuilderStep,
        title: string,
        subtitle: string,
        options?: { minDuration?: number; accentColor?: string; pendingAction?: () => void }
    ) => {
        options?.pendingAction?.();
        setStep(targetStep);
        setTransition({
            active: true,
            targetStep,
            title,
            subtitle,
            minDuration: options?.minDuration ?? 2000,
            accentColor: options?.accentColor ?? '#00f3ff',
        });
    }, []);

    const completeTransition = useCallback(() => setTransition(null), []);
    const completeEntry = useCallback(() => setShowEntry(false), []);

    return { step, setStep, flowType, setFlowType, transition, showEntry, goTo, completeTransition, completeEntry };
}
