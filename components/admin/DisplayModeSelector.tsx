'use client';
import React, { useState, useEffect } from 'react';
import { 
  Maximize2, 
  Layers, 
  Film, 
  View 
} from 'lucide-react';

export type DisplayMode = 
  | 'fullscreenslider' 
  | 'cardstack' 
  | 'filmstrip' 
  | 'coverflow';

interface DisplayModeOption {
  id: DisplayMode;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const displayModes: DisplayModeOption[] = [
  {
    id: 'fullscreenslider',
    label: 'Fullscreen Slider',
    description: 'Slider horizontal tipo Netflix',
    icon: <Maximize2 className="w-5 h-5" />
  },
  {
    id: 'cardstack',
    label: 'Card Stack',
    description: 'Pila de cartas 3D',
    icon: <Layers className="w-5 h-5" />
  },
  {
    id: 'filmstrip',
    label: 'Film Strip',
    description: 'Tira de película con 5 vistas',
    icon: <Film className="w-5 h-5" />
  },
  {
    id: 'coverflow',
    label: 'Cover Flow',
    description: 'Efecto 3D tipo iTunes',
    icon: <View className="w-5 h-5" />
  }
];

interface DisplayModeSelectorProps {
  currentMode: DisplayMode;
  onModeChange: (mode: DisplayMode) => void;
}

export default function DisplayModeSelector({ currentMode, onModeChange }: DisplayModeSelectorProps) {
  const [saving, setSaving] = useState(false);

  const handleSelect = async (mode: DisplayMode) => {
    if (mode === currentMode) return;
    
    setSaving(true);
    try {
      // Save to database
      const response = await fetch('/api/ui-preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entity_type: 'pdp_display_mode',
          selected_mode: mode
        })
      });
      
      if (response.ok) {
        onModeChange(mode);
      }
    } catch (error) {
      console.error('Error saving preference:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-bold text-lg">Modo de Visualización</h3>
        {saving && (
          <span className="text-indigo-400 text-sm animate-pulse">Guardando...</span>
        )}
      </div>
      
      <p className="text-zinc-400 text-sm mb-4">
        Selecciona cómo mostrar las páginas de producto. Solo puedes activar un modo a la vez.
      </p>

      <div className="grid grid-cols-1 gap-2 max-h-[400px] overflow-y-auto">
        {displayModes.map((mode) => (
          <label
            key={mode.id}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
              currentMode === mode.id
                ? 'bg-indigo-500/20 ring-2 ring-indigo-500'
                : 'bg-zinc-800 hover:bg-zinc-700'
            }`}
          >
            <input
              type="radio"
              name="displayMode"
              value={mode.id}
              checked={currentMode === mode.id}
              onChange={() => handleSelect(mode.id)}
              className="w-4 h-4 text-indigo-500 focus:ring-indigo-500 border-zinc-600"
            />
            <div className={`${currentMode === mode.id ? 'text-indigo-400' : 'text-zinc-400'}`}>
              {mode.icon}
            </div>
            <div className="flex-1">
              <span className={`font-semibold block ${
                currentMode === mode.id ? 'text-white' : 'text-zinc-300'
              }`}>
                {mode.label}
              </span>
              <span className="text-zinc-500 text-xs">{mode.description}</span>
            </div>
            {currentMode === mode.id && (
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
            )}
          </label>
        ))}
      </div>
    </div>
  );
}

export { displayModes };
export type { DisplayModeOption };
