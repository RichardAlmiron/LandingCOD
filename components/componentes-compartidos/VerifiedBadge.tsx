'use client';

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

/**
 * Franja verde en la esquina superior derecha de las tiendas verificadas/completadas.
 * Muestra el template ID y permite copiarlo al portapapeles con un clic.
 */

// Lista de templates que ya fueron verificados/completados
export const VERIFIED_TEMPLATES: string[] = [
  'megamarket',
  'flashdeals',
  'tradevault',
  'mercadocod',
  'trendfast',
  'minimaltech',
  'handcraft',
  'boldathlete',
  'blueretail',
  'bidzone',
  'editorialchic',
  'nordichome',
  'bullseye',
  'beautybox',
  'techretail',
  'stylepress',
  'homedecor',
  'builderzone',
  'bulkzone',
  'sportstripe',
  // Batch 5
  'futuretech',
  'yogapremium',
  'redstyle',
  'zenbasic',
  'classicwear',
  // Batch 6
  'familyfun',
  'starstore',
  'luxservice',
  'chicstore',
  'elitestore',
  // Batch 7
  'avantgarde',
  'beautyhaven',
  'blueclassic',
  'boldyouth',
  'cashflow',
  // Batch 8
  'charmboutique',
  'crystalshine',
  'designerhub',
  'ecooutdoor',
  'eurostyle',
  // Batch 9
  'extremeexplorer',
  'fitmodern',
  'freshcraft',
  'futureauto',
  'gamevault',
  // Batch 10
  'glamangel',
  'greenhealth',
  'heritagelux',
  'hypedrop',
  'iconshades',
  // Batch 11
  'influencestyle',
  'italiancraft',
  'keymarket',
  'luxedit',
  'maisonelegance',
  // Batch 12
  'milanomodern',
  'modernlens',
  'novatrend',
  'opticalretail',
  'parisianchic',
  // Batch 13
  'petfriend',
  'petworld',
  'pinkglam',
  'pricedrop',
  'primegoods',
  // Batch 14
  'progamer',
  'shadeshub',
  'sneakerzone',
  'softglow',
  'sportoptics',
  // Batch 15
  'sportzone',
  'streetboutique',
  'techparts',
  'timecraft',
  'verifymarket',
];

interface VerifiedBadgeProps {
  templateId: string;
}

export default function VerifiedBadge({ templateId }: VerifiedBadgeProps) {
  const [copied, setCopied] = useState(false);

  if (!VERIFIED_TEMPLATES.includes(templateId)) return null;

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(templateId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = templateId;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed top-[50%] right-0 z-[9998] -translate-y-1/2">
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 bg-[#00a650] hover:bg-[#008c44] text-white pl-3 pr-3 py-2.5 rounded-l-lg shadow-lg transition-all hover:pr-4 group cursor-pointer"
        title={`Copiar ID: ${templateId}`}
      >
        <div className="flex flex-col items-start leading-tight">
          <span className="text-[9px] font-bold uppercase tracking-widest opacity-80">ID</span>
          <span className="text-[13px] font-bold tracking-tight">{templateId}</span>
        </div>
        <div className="w-[1px] h-6 bg-white/30 mx-1"></div>
        {copied ? (
          <Check className="w-4 h-4 text-white" />
        ) : (
          <Copy className="w-4 h-4 text-white/80 group-hover:text-white transition-colors" />
        )}
      </button>
      {copied && (
        <div className="absolute -left-[80px] top-1/2 -translate-y-1/2 bg-[#333] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap animate-fade-in">
          Copiado ✓
        </div>
      )}
    </div>
  );
}
