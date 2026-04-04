import React from 'react';
import { StoreData, TemplateType } from '@/lib/types';
import MegaMarketTemplate from '@/components/tiendas/MegaMarket';
import FlashDealsTemplate from '@/components/tiendas/FlashDeals';
import TradeVaultTemplate from '@/components/tiendas/TradeVault';
import MercadoCODTemplate from '@/components/tiendas/MercadoCOD';
import TrendFastTemplate from '@/components/tiendas/TrendFast';
import MinimalTechTemplate from '@/components/tiendas/MinimalTech';
import HandCraftTemplate from '@/components/tiendas/HandCraft';
import BoldAthleteTemplate from '@/components/tiendas/BoldAthlete';
import BlueRetailTemplate from '@/components/tiendas/BlueRetail';
import BidZoneTemplate from '@/components/tiendas/BidZone';
import EditorialChicTemplate from '@/components/tiendas/EditorialChic';
import NordicHomeTemplate from '@/components/tiendas/NordicHome';
import BullseyeTemplate from '@/components/tiendas/Bullseye';
import BeautyBoxTemplate from '@/components/tiendas/BeautyBox';
import TechRetailTemplate from '@/components/tiendas/TechRetail';
import StylePressTemplate from '@/components/tiendas/StylePress';
import HomeDecorTemplate from '@/components/tiendas/HomeDecor';
import BuilderZoneTemplate from '@/components/tiendas/BuilderZone';
import BulkZoneTemplate from '@/components/tiendas/BulkZone';
import SportStripeTemplate from '@/components/tiendas/SportStripe';
import FutureTechTemplate from '@/components/tiendas/FutureTech';
import YogaPremiumTemplate from '@/components/tiendas/YogaPremium';
import RedStyleTemplate from '@/components/tiendas/RedStyle';
import ZenBasicTemplate from '@/components/tiendas/ZenBasic';
import ClassicWearTemplate from '@/components/tiendas/ClassicWear';
import FamilyFunTemplate from '@/components/tiendas/FamilyFun';
import StarStoreTemplate from '@/components/tiendas/StarStore';
import LuxServiceTemplate from '@/components/tiendas/LuxService';
import ChicStoreTemplate from '@/components/tiendas/ChicStore';
import EliteStoreTemplate from '@/components/tiendas/EliteStore';
import DesignerHubTemplate from '@/components/tiendas/DesignerHub';
import LuxEditTemplate from '@/components/tiendas/LuxEdit';
import InfluenceStyleTemplate from '@/components/tiendas/InfluenceStyle';
import BoldYouthTemplate from '@/components/tiendas/BoldYouth';
import PinkGlamTemplate from '@/components/tiendas/PinkGlam';
import NovaTrendTemplate from '@/components/tiendas/NovaTrend';
import SoftGlowTemplate from '@/components/tiendas/SoftGlow';
import BeautyHavenTemplate from '@/components/tiendas/BeautyHaven';
import FreshCraftTemplate from '@/components/tiendas/FreshCraft';
import ProGamerTemplate from '@/components/tiendas/ProGamer';
import GameVaultTemplate from '@/components/tiendas/GameVault';
import KeyMarketTemplate from '@/components/tiendas/KeyMarket';
import VerifyMarketTemplate from '@/components/tiendas/VerifyMarket';
import TechPartsTemplate from '@/components/tiendas/TechParts';
import CashFlowTemplate from '@/components/tiendas/CashFlow';
import PrimeGoodsTemplate from '@/components/tiendas/PrimeGoods';
import PriceDropTemplate from '@/components/tiendas/PriceDrop';
import EuroStyleTemplate from '@/components/tiendas/EuroStyle';
import SneakerZoneTemplate from '@/components/tiendas/SneakerZone';
import GlamAngelTemplate from '@/components/tiendas/GlamAngel';
import EcoOutdoorTemplate from '@/components/tiendas/EcoOutdoor';
import ExtremeExplorerTemplate from '@/components/tiendas/ExtremeExplorer';
import FitModernTemplate from '@/components/tiendas/FitModern';
import HypeDropTemplate from '@/components/tiendas/HypeDrop';
import StreetBoutiqueTemplate from '@/components/tiendas/StreetBoutique';
import AvantGardeTemplate from '@/components/tiendas/AvantGarde';
import PetFriendTemplate from '@/components/tiendas/PetFriend';
import PetWorldTemplate from '@/components/tiendas/PetWorld';
import SportZoneTemplate from '@/components/tiendas/SportZone';
import GreenHealthTemplate from '@/components/tiendas/GreenHealth';
import TimeCraftTemplate from '@/components/tiendas/TimeCraft';
import MaisonEleganceTemplate from '@/components/tiendas/MaisonElegance';
import BlueClassicTemplate from '@/components/tiendas/BlueClassic';
import CharmBoutiqueTemplate from '@/components/tiendas/CharmBoutique';
import CrystalShineTemplate from '@/components/tiendas/CrystalShine';
import IconShadesTemplate from '@/components/tiendas/IconShades';
import SportOpticsTemplate from '@/components/tiendas/SportOptics';
import ModernLensTemplate from '@/components/tiendas/ModernLens';
import OpticalRetailTemplate from '@/components/tiendas/OpticalRetail';
import ShadesHubTemplate from '@/components/tiendas/ShadesHub';
import ItalianCraftTemplate from '@/components/tiendas/ItalianCraft';
import HeritageLuxTemplate from '@/components/tiendas/HeritageLux';
import ParisianChicTemplate from '@/components/tiendas/ParisianChic';
import MilanoModernTemplate from '@/components/tiendas/MilanoModern';
import FutureAutoTemplate from '@/components/tiendas/FutureAuto';
import StoreAppShell from '@/components/componentes-tiendas/StoreAppShell';
import { resolverComponentePDP, extraerVariante } from '@/lib/plantilla-registry';
import { Smartphone, Monitor, Battery, Wifi, Signal, ArrowLeft, ExternalLink, Pencil } from 'lucide-react';

import PdpSaludEstandar from '@/components/pdp/salud/general/PdpSaludEstandar';
import PdpHerramientasEstandar from '@/components/pdp/herramientas/general/PdpHerramientasEstandar';
import PdpBellezaEstandar from '@/components/pdp/belleza/general/PdpBellezaEstandar';
import PdpHogarEstandar from '@/components/pdp/hogar/general/PdpHogarEstandar';
import PdpSaludPremium from '@/components/pdp/salud/general/PdpSaludPremium';

interface PreviewProps {
  data: StoreData;
  template: TemplateType;
  device: 'mobile' | 'desktop';
  setDevice: (device: 'mobile' | 'desktop') => void;
  previewMode?: 'store' | 'product';
  setPreviewMode?: (mode: 'store' | 'product') => void;
  activeProductId?: string | null;
  setActiveProductId?: (id: string | null) => void;
  isPremium?: boolean;
  editableDiscounts?: boolean;
  onUpdateProductDiscount?: (productId: string, discount: number) => void;
}

export default function Preview({ data, template, device, setDevice, previewMode = 'store', setPreviewMode, activeProductId, setActiveProductId, isPremium, editableDiscounts, onUpdateProductDiscount }: PreviewProps) {
  const [editingProduct, setEditingProduct] = React.useState<string | null>(null);
  const [tempDiscount, setTempDiscount] = React.useState<number>(0);
  const renderTemplate = () => {
    if (previewMode === 'product' && activeProductId) {
      const product = data.products.find(p => p.id === activeProductId) || data.products[0];
      if (!product) return <div>No hay productos para previsualizar.</div>;

      const currentPdpTemplate = data.pdpTemplate || '';
      const variant = extraerVariante(currentPdpTemplate);

      console.log('[Preview] Rendering PDP:', { currentPdpTemplate, variant, productId: product.id });

      const PdpComponent = resolverComponentePDP(currentPdpTemplate);
      return <PdpComponent data={data} product={product} variant={variant} />;
    }

    switch (template) {
      case 'megamarket': return <MegaMarketTemplate data={data} />;
      case 'flashdeals': return <FlashDealsTemplate data={data} />;
      case 'tradevault': return <TradeVaultTemplate data={data} />;
      case 'mercadocod': return <MercadoCODTemplate data={data} />;
      case 'trendfast': return <TrendFastTemplate data={data} />;
      case 'minimaltech': return <MinimalTechTemplate data={data} />;
      case 'handcraft': return <HandCraftTemplate data={data} />;
      case 'boldathlete': return <BoldAthleteTemplate data={data} />;
      case 'blueretail': return <BlueRetailTemplate data={data} />;
      case 'bidzone': return <BidZoneTemplate data={data} />;
      case 'editorialchic': return <EditorialChicTemplate data={data} />;
      case 'nordichome': return <NordicHomeTemplate data={data} />;
      case 'bullseye': return <BullseyeTemplate data={data} />;
      case 'beautybox': return <BeautyBoxTemplate data={data} />;
      case 'techretail': return <TechRetailTemplate data={data} />;
      case 'stylepress': return <StylePressTemplate data={data} />;
      case 'homedecor': return <HomeDecorTemplate data={data} />;
      case 'builderzone': return <BuilderZoneTemplate data={data} />;
      case 'bulkzone': return <BulkZoneTemplate data={data} />;
      case 'sportstripe': return <SportStripeTemplate data={data} />;
      case 'futuretech': return <FutureTechTemplate data={data} />;
      case 'yogapremium': return <YogaPremiumTemplate data={data} />;
      case 'redstyle': return <RedStyleTemplate data={data} />;
      case 'zenbasic': return <ZenBasicTemplate data={data} />;
      case 'classicwear': return <ClassicWearTemplate data={data} />;
      case 'familyfun': return <FamilyFunTemplate data={data} />;
      case 'starstore': return <StarStoreTemplate data={data} />;
      case 'luxservice': return <LuxServiceTemplate data={data} />;
      case 'chicstore': return <ChicStoreTemplate data={data} />;
      case 'elitestore': return <EliteStoreTemplate data={data} />;
      case 'designerhub': return <DesignerHubTemplate data={data} />;
      case 'luxedit': return <LuxEditTemplate data={data} />;
      case 'influencestyle': return <InfluenceStyleTemplate data={data} />;
      case 'boldyouth': return <BoldYouthTemplate data={data} />;
      case 'pinkglam': return <PinkGlamTemplate data={data} />;
      case 'novatrend': return <NovaTrendTemplate data={data} />;
      case 'softglow': return <SoftGlowTemplate data={data} />;
      case 'beautyhaven': return <BeautyHavenTemplate data={data} />;
      case 'freshcraft': return <FreshCraftTemplate data={data} />;
      case 'progamer': return <ProGamerTemplate data={data} />;
      case 'gamevault': return <GameVaultTemplate data={data} />;
      case 'keymarket': return <KeyMarketTemplate data={data} />;
      case 'verifymarket': return <VerifyMarketTemplate data={data} />;
      case 'techparts': return <TechPartsTemplate data={data} />;
      case 'cashflow': return <CashFlowTemplate data={data} />;
      case 'primegoods': return <PrimeGoodsTemplate data={data} />;
      case 'pricedrop': return <PriceDropTemplate data={data} />;
      case 'eurostyle': return <EuroStyleTemplate data={data} />;
      case 'sneakerzone': return <SneakerZoneTemplate data={data} />;
      case 'glamangel': return <GlamAngelTemplate data={data} />;
      case 'ecooutdoor': return <EcoOutdoorTemplate data={data} />;
      case 'extremeexplorer': return <ExtremeExplorerTemplate data={data} />;
      case 'fitmodern': return <FitModernTemplate data={data} />;
      case 'hypedrop': return <HypeDropTemplate data={data} />;
      case 'streetboutique': return <StreetBoutiqueTemplate data={data} />;
      case 'avantgarde': return <AvantGardeTemplate data={data} />;
      case 'petfriend': return <PetFriendTemplate data={data} />;
      case 'petworld': return <PetWorldTemplate data={data} />;
      case 'sportzone': return <SportZoneTemplate data={data} />;
      case 'greenhealth': return <GreenHealthTemplate data={data} />;
      case 'timecraft': return <TimeCraftTemplate data={data} />;
      case 'maisonelegance': return <MaisonEleganceTemplate data={data} />;
      case 'blueclassic': return <BlueClassicTemplate data={data} />;
      case 'charmboutique': return <CharmBoutiqueTemplate data={data} />;
      case 'crystalshine': return <CrystalShineTemplate data={data} />;
      case 'iconshades': return <IconShadesTemplate data={data} />;
      case 'sportoptics': return <SportOpticsTemplate data={data} />;
      case 'modernlens': return <ModernLensTemplate data={data} />;
      case 'opticalretail': return <OpticalRetailTemplate data={data} />;
      case 'shadeshub': return <ShadesHubTemplate data={data} />;
      case 'italiancraft': return <ItalianCraftTemplate data={data} />;
      case 'heritagelux': return <HeritageLuxTemplate data={data} />;
      case 'parisianchic': return <ParisianChicTemplate data={data} />;
      case 'milanomodern': return <MilanoModernTemplate data={data} />;
      case 'futureauto': return <FutureAutoTemplate data={data} />;
      default: return <MegaMarketTemplate data={data} />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-zinc-100/50">
      {/* Preview Toolbar */}
      <div className="h-14 border-b border-zinc-200 bg-white flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center space-x-4">
          <div className="text-sm font-medium text-zinc-500">Live Preview</div>
          {editableDiscounts && (
            <div className="flex items-center space-x-2 bg-pink-50 text-pink-700 px-3 py-1.5 rounded-md text-xs font-semibold">
              <Pencil className="w-3.5 h-3.5" />
              <span>Modo Edición de Descuentos - Haz clic en un producto para editar</span>
            </div>
          )}
          <button
            onClick={() => {
              localStorage.setItem('landing_preview_data', JSON.stringify({ store: data, template }));
              // Construir URL según el modo: PDP o Store
              const isPdpMode = previewMode === 'product' && data.pdpTemplate;
              const templateId = isPdpMode ? data.pdpTemplate : template;
              const type = isPdpMode ? 'pdp' : 'store';
              window.open(`/preview?template=${templateId}&type=${type}`, '_blank');
            }}
            className="flex items-center space-x-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-md hover:bg-indigo-100 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Página completa</span>
          </button>
        </div>
        <div className="flex items-center space-x-1 bg-zinc-100 p-1 rounded-lg">
          <button
            onClick={() => setDevice('desktop')}
            className={`p-1.5 rounded-md transition-colors ${device === 'desktop' ? 'bg-white shadow-sm text-zinc-900' : 'text-zinc-500 hover:text-zinc-900'}`}
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDevice('mobile')}
            className={`p-1.5 rounded-md transition-colors ${device === 'mobile' ? 'bg-white shadow-sm text-zinc-900' : 'text-zinc-500 hover:text-zinc-900'}`}
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-hidden flex items-center justify-center p-4 lg:p-8">
        <div
          className={`bg-white shadow-2xl overflow-hidden transition-all duration-500 ease-in-out flex flex-col relative ${device === 'mobile'
            ? 'w-[375px] h-[812px] rounded-[3rem] border-[8px] border-zinc-900'
            : 'w-full h-full rounded-xl border border-zinc-200'
            }`}
        >
          {/* Browser/Device Chrome */}
          {device === 'desktop' && (
            <div className="h-10 bg-zinc-100 border-b border-zinc-200 flex items-center px-4 space-x-2 shrink-0">
              <div className="flex space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-white text-zinc-400 text-xs px-24 py-1 rounded-md border border-zinc-200 shadow-sm flex items-center space-x-2">
                  <span>🔒</span>
                  <span>mystore.com</span>
                </div>
              </div>
            </div>
          )}
          {device === 'mobile' && (
            <div className="h-12 bg-transparent absolute top-0 inset-x-0 z-50 flex items-start justify-between px-6 pt-3 pointer-events-none">
              <div className="text-[14px] font-semibold text-zinc-900 tracking-tight">9:41</div>
              <div className="w-32 h-6 bg-zinc-900 rounded-b-3xl absolute top-0 left-1/2 -translate-x-1/2"></div>
              <div className="flex items-center space-x-1.5 text-zinc-900">
                <Signal className="w-3.5 h-3.5 fill-current" />
                <Wifi className="w-4 h-4" />
                <Battery className="w-5 h-5" />
              </div>
            </div>
          )}

          {/* Actual Template Content wrapped in Production App Shell */}
          <div 
            className={`flex-1 overflow-y-auto relative ${device === 'mobile' ? '[&::-webkit-scrollbar]:hidden pt-12' : 'custom-scrollbar'}`}
            onClick={(e) => {
              if (!editableDiscounts || !onUpdateProductDiscount) return;
              // Buscar el elemento producto más cercano al clic
              const target = e.target as HTMLElement;
              const productEl = target.closest('[data-product-id]') as HTMLElement;
              if (productEl) {
                const productId = productEl.getAttribute('data-product-id');
                const currentDiscount = parseInt(productEl.getAttribute('data-discount') || '0');
                if (productId) {
                  setEditingProduct(productId);
                  setTempDiscount(currentDiscount);
                }
              }
            }}
          >
            <StoreAppShell isPremium={isPremium}>
              {renderTemplate()}
            </StoreAppShell>
            
            {/* Modal de edición de descuento */}
            {editingProduct && editableDiscounts && (
              <div 
                className="absolute inset-0 bg-black/50 flex items-center justify-center z-50"
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    setEditingProduct(null);
                  }
                }}
              >
                <div className="bg-white rounded-xl p-6 shadow-2xl max-w-sm w-full mx-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                      <Pencil className="w-5 h-5 text-pink-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Editar Descuento</h3>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">Producto ID: {editingProduct}</p>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Porcentaje de descuento (%)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={tempDiscount === 0 ? '' : tempDiscount}
                        placeholder="0"
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === '') {
                            setTempDiscount(0);
                          } else {
                            const num = parseInt(val);
                            if (!isNaN(num)) {
                              setTempDiscount(Math.min(100, Math.max(0, num)));
                            }
                          }
                        }}
                        onFocus={(e) => e.target.select()}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        autoFocus
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setEditingProduct(null)}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => {
                          onUpdateProductDiscount?.(editingProduct, tempDiscount);
                          setEditingProduct(null);
                        }}
                        className="flex-1 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
                      >
                        Aplicar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

