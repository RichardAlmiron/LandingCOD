// ═══════════════════════════════════════════════════════════
// Modelos de PDP para Playground
// ═══════════════════════════════════════════════════════════

export interface PlaygroundSection {
    number: number;
    name: string;
    purpose: string;
    technique: string;
}

export interface PlaygroundModel {
    id: string;
    name: string;
    category: string;
    categoryColor: string;
    description: string;
    totalSections: number;
    sections: PlaygroundSection[];
    strategy: string;
    logic: string;
    howItSells: string;
    techStack: string;
    prompt: string;
}

export const PLAYGROUND_MODELS: PlaygroundModel[] = [];
