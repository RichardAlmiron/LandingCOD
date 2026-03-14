import React from 'react';
import { StoreData, TemplateType } from '@/lib/types';
import { LanguageProvider } from './LanguageContext';
import MegaMarketTemplate from '@/components/templates/MegaMarket';
import FlashDealsTemplate from '@/components/templates/FlashDeals';
import TradeVaultTemplate from '@/components/templates/TradeVault';
import MercadoCODTemplate from '@/components/templates/MercadoCOD';
import TrendFastTemplate from '@/components/templates/TrendFast';
import MinimalTechTemplate from '@/components/templates/MinimalTech';
import HandCraftTemplate from '@/components/templates/HandCraft';
import BoldAthleteTemplate from '@/components/templates/BoldAthlete';
import BlueRetailTemplate from '@/components/templates/BlueRetail';
import BidZoneTemplate from '@/components/templates/BidZone';
import EditorialChicTemplate from '@/components/templates/EditorialChic';
import NordicHomeTemplate from '@/components/templates/NordicHome';
import BullseyeTemplate from '@/components/templates/Bullseye';
import BeautyBoxTemplate from '@/components/templates/BeautyBox';
import TechRetailTemplate from '@/components/templates/TechRetail';
import StylePressTemplate from '@/components/templates/StylePress';
import HomeDecorTemplate from '@/components/templates/HomeDecor';
import BuilderZoneTemplate from '@/components/templates/BuilderZone';
import BulkZoneTemplate from '@/components/templates/BulkZone';
import SportStripeTemplate from '@/components/templates/SportStripe';
import FutureTechTemplate from '@/components/templates/FutureTech';
import YogaPremiumTemplate from '@/components/templates/YogaPremium';
import RedStyleTemplate from '@/components/templates/RedStyle';
import ZenBasicTemplate from '@/components/templates/ZenBasic';
import ClassicWearTemplate from '@/components/templates/ClassicWear';
import FamilyFunTemplate from '@/components/templates/FamilyFun';
import StarStoreTemplate from '@/components/templates/StarStore';
import LuxServiceTemplate from '@/components/templates/LuxService';
import ChicStoreTemplate from '@/components/templates/ChicStore';
import EliteStoreTemplate from '@/components/templates/EliteStore';
import DesignerHubTemplate from '@/components/templates/DesignerHub';
import LuxEditTemplate from '@/components/templates/LuxEdit';
import InfluenceStyleTemplate from '@/components/templates/InfluenceStyle';
import BoldYouthTemplate from '@/components/templates/BoldYouth';
import PinkGlamTemplate from '@/components/templates/PinkGlam';
import NovaTrendTemplate from '@/components/templates/NovaTrend';
import SoftGlowTemplate from '@/components/templates/SoftGlow';
import BeautyHavenTemplate from '@/components/templates/BeautyHaven';
import FreshCraftTemplate from '@/components/templates/FreshCraft';
import ProGamerTemplate from '@/components/templates/ProGamer';
import GameVaultTemplate from '@/components/templates/GameVault';
import KeyMarketTemplate from '@/components/templates/KeyMarket';
import VerifyMarketTemplate from '@/components/templates/VerifyMarket';
import TechPartsTemplate from '@/components/templates/TechParts';
import CashFlowTemplate from '@/components/templates/CashFlow';
import PrimeGoodsTemplate from '@/components/templates/PrimeGoods';
import PriceDropTemplate from '@/components/templates/PriceDrop';
import EuroStyleTemplate from '@/components/templates/EuroStyle';
import SneakerZoneTemplate from '@/components/templates/SneakerZone';
import GlamAngelTemplate from '@/components/templates/GlamAngel';
import EcoOutdoorTemplate from '@/components/templates/EcoOutdoor';
import ExtremeExplorerTemplate from '@/components/templates/ExtremeExplorer';
import FitModernTemplate from '@/components/templates/FitModern';
import HypeDropTemplate from '@/components/templates/HypeDrop';
import StreetBoutiqueTemplate from '@/components/templates/StreetBoutique';
import AvantGardeTemplate from '@/components/templates/AvantGarde';
import PetFriendTemplate from '@/components/templates/PetFriend';
import PetWorldTemplate from '@/components/templates/PetWorld';
import SportZoneTemplate from '@/components/templates/SportZone';
import GreenHealthTemplate from '@/components/templates/GreenHealth';
import TimeCraftTemplate from '@/components/templates/TimeCraft';
import MaisonEleganceTemplate from '@/components/templates/MaisonElegance';
import BlueClassicTemplate from '@/components/templates/BlueClassic';
import CharmBoutiqueTemplate from '@/components/templates/CharmBoutique';
import CrystalShineTemplate from '@/components/templates/CrystalShine';
import IconShadesTemplate from '@/components/templates/IconShades';
import SportOpticsTemplate from '@/components/templates/SportOptics';
import ModernLensTemplate from '@/components/templates/ModernLens';
import OpticalRetailTemplate from '@/components/templates/OpticalRetail';
import ShadesHubTemplate from '@/components/templates/ShadesHub';
import ItalianCraftTemplate from '@/components/templates/ItalianCraft';
import HeritageLuxTemplate from '@/components/templates/HeritageLux';
import ParisianChicTemplate from '@/components/templates/ParisianChic';
import MilanoModernTemplate from '@/components/templates/MilanoModern';
import FutureAutoTemplate from '@/components/templates/FutureAuto';
import StoreAppShell from '@/components/store/StoreAppShell';
import { Smartphone, Monitor, Battery, Wifi, Signal, ArrowLeft, ExternalLink } from 'lucide-react';

import PdpAggressiveUrgency from '@/components/templates/pdp/PdpAggressiveUrgency';
import PdpSocialTrust from '@/components/templates/pdp/PdpSocialTrust';
import PdpBundleMaximizer from '@/components/templates/pdp/PdpBundleMaximizer';
import PdpStorytelling from '@/components/templates/pdp/PdpStorytelling';
import PdpDirectCheckout from '@/components/templates/pdp/PdpDirectCheckout';
import PdpHealth from '@/components/templates/pdp/PdpHealth';
import PdpElectronics from '@/components/templates/pdp/PdpElectronics';
import PdpTools from '@/components/templates/pdp/PdpTools';
import PdpBeauty from '@/components/templates/pdp/PdpBeauty';
import PdpHome from '@/components/templates/pdp/PdpHome';

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
}

export default function Preview({ data, template, device, setDevice, previewMode = 'store', setPreviewMode, activeProductId, setActiveProductId, isPremium }: PreviewProps) {
  const renderTemplate = () => {
    if (previewMode === 'product' && activeProductId) {
      const product = data.products.find(p => p.id === activeProductId) || data.products[0];
      if (!product) return <div>No hay productos para previsualizar.</div>;

      const variant = parseInt(data.pdpTemplate.split('-')[1] || '1', 10);

      switch (data.pdpCategory) {
        case 'urgency': return <PdpAggressiveUrgency data={data} product={product} variant={variant} />;
        case 'trust': return <PdpSocialTrust data={data} product={product} variant={variant} />;
        case 'bundle': return <PdpBundleMaximizer data={data} product={product} variant={variant} />;
        case 'story': return <PdpStorytelling data={data} product={product} variant={variant} />;
        case 'direct': return <PdpDirectCheckout data={data} product={product} variant={variant} />;
        case 'health': return <PdpHealth data={data} product={product} variant={variant} />;
        case 'electronics': return <PdpElectronics data={data} product={product} variant={variant} />;
        case 'tools': return <PdpTools data={data} product={product} variant={variant} />;
        case 'beauty': return <PdpBeauty data={data} product={product} variant={variant} />;
        case 'home': return <PdpHome data={data} product={product} variant={variant} />;
        default: return <PdpAggressiveUrgency data={data} product={product} variant={variant} />;
      }
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
          <button
            onClick={() => {
              localStorage.setItem('landing_preview_data', JSON.stringify({ store: data, template }));
              window.open('/preview', '_blank');
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
          <div className={`flex-1 overflow-y-auto relative ${device === 'mobile' ? '[&::-webkit-scrollbar]:hidden pt-12' : 'custom-scrollbar'}`}>
            <StoreAppShell isPremium={isPremium}>
              <LanguageProvider language={data.language || 'es'}>
                {renderTemplate()}
              </LanguageProvider>
            </StoreAppShell>
          </div>
        </div>
      </div>
    </div>
  );
}
