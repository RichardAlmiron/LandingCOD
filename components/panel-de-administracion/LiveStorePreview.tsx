'use client';
import React from 'react';
import MegaMarketTemplate from '@/components/tiendas/MegaMarket';
import ChicStore from '@/components/tiendas/ChicStore';
import EliteStore from '@/components/tiendas/EliteStore';
import StarStore from '@/components/tiendas/StarStore';
import AvantGarde from '@/components/tiendas/AvantGarde';
import BeautyBox from '@/components/tiendas/BeautyBox';
import BeautyHaven from '@/components/tiendas/BeautyHaven';
import BidZone from '@/components/tiendas/BidZone';
import BlueClassic from '@/components/tiendas/BlueClassic';
import BlueRetail from '@/components/tiendas/BlueRetail';
import BoldAthlete from '@/components/tiendas/BoldAthlete';
import BoldYouth from '@/components/tiendas/BoldYouth';
import BuilderZone from '@/components/tiendas/BuilderZone';
import BulkZone from '@/components/tiendas/BulkZone';
import Bullseye from '@/components/tiendas/Bullseye';
import CashFlow from '@/components/tiendas/CashFlow';
import CharmBoutique from '@/components/tiendas/CharmBoutique';
import ClassicWear from '@/components/tiendas/ClassicWear';
import CrystalShine from '@/components/tiendas/CrystalShine';
import DesignerHub from '@/components/tiendas/DesignerHub';
import EcoOutdoor from '@/components/tiendas/EcoOutdoor';
import EditorialChic from '@/components/tiendas/EditorialChic';
import EuroStyle from '@/components/tiendas/EuroStyle';
import ExtremeExplorer from '@/components/tiendas/ExtremeExplorer';
import FamilyFun from '@/components/tiendas/FamilyFun';
import FitModern from '@/components/tiendas/FitModern';
import FlashDeals from '@/components/tiendas/FlashDeals';
import FreshCraft from '@/components/tiendas/FreshCraft';
import FutureAuto from '@/components/tiendas/FutureAuto';
import FutureTech from '@/components/tiendas/FutureTech';
import GameVault from '@/components/tiendas/GameVault';
import GlamAngel from '@/components/tiendas/GlamAngel';
import GreenHealth from '@/components/tiendas/GreenHealth';
import HandCraft from '@/components/tiendas/HandCraft';
import HeritageLux from '@/components/tiendas/HeritageLux';
import HomeDecor from '@/components/tiendas/HomeDecor';
import HypeDrop from '@/components/tiendas/HypeDrop';
import IconShades from '@/components/tiendas/IconShades';
import InfluenceStyle from '@/components/tiendas/InfluenceStyle';
import ItalianCraft from '@/components/tiendas/ItalianCraft';
import KeyMarket from '@/components/tiendas/KeyMarket';
import LuxEdit from '@/components/tiendas/LuxEdit';
import LuxService from '@/components/tiendas/LuxService';
import MaisonElegance from '@/components/tiendas/MaisonElegance';
import MercadoCOD from '@/components/tiendas/MercadoCOD';
import MilanoModern from '@/components/tiendas/MilanoModern';
import MinimalTech from '@/components/tiendas/MinimalTech';
import ModernLens from '@/components/tiendas/ModernLens';
import NordicHome from '@/components/tiendas/NordicHome';
import NovaTrend from '@/components/tiendas/NovaTrend';
import OpticalRetail from '@/components/tiendas/OpticalRetail';
import ParisianChic from '@/components/tiendas/ParisianChic';
import PetFriend from '@/components/tiendas/PetFriend';
import PetWorld from '@/components/tiendas/PetWorld';
import PinkGlam from '@/components/tiendas/PinkGlam';
import PriceDrop from '@/components/tiendas/PriceDrop';
import PrimeGoods from '@/components/tiendas/PrimeGoods';
import ProGamer from '@/components/tiendas/ProGamer';
import RedStyle from '@/components/tiendas/RedStyle';
import ShadesHub from '@/components/tiendas/ShadesHub';
import SneakerZone from '@/components/tiendas/SneakerZone';
import SoftGlow from '@/components/tiendas/SoftGlow';
import SportOptics from '@/components/tiendas/SportOptics';
import SportStripe from '@/components/tiendas/SportStripe';
import SportZone from '@/components/tiendas/SportZone';
import StreetBoutique from '@/components/tiendas/StreetBoutique';
import StylePress from '@/components/tiendas/StylePress';
import TechParts from '@/components/tiendas/TechParts';
import TechRetail from '@/components/tiendas/TechRetail';
import TimeCraft from '@/components/tiendas/TimeCraft';
import TradeVault from '@/components/tiendas/TradeVault';
import TrendFast from '@/components/tiendas/TrendFast';
import VerifyMarket from '@/components/tiendas/VerifyMarket';
import YogaPremium from '@/components/tiendas/YogaPremium';
import ZenBasic from '@/components/tiendas/ZenBasic';

import { defaultPreviewStoreData } from '@/lib/demoData';

const storeTemplates: Record<string, React.ComponentType<any>> = {
  megamarket: MegaMarketTemplate,
  chicstore: ChicStore,
  elitestore: EliteStore,
  starstore: StarStore,
  avantgarde: AvantGarde,
  beautybox: BeautyBox,
  beautyhaven: BeautyHaven,
  bidzone: BidZone,
  blueclassic: BlueClassic,
  blueretail: BlueRetail,
  boldathlete: BoldAthlete,
  boldyouth: BoldYouth,
  builderzone: BuilderZone,
  bulkzone: BulkZone,
  bullseye: Bullseye,
  cashflow: CashFlow,
  charmboutique: CharmBoutique,
  classicwear: ClassicWear,
  crystalshine: CrystalShine,
  designerhub: DesignerHub,
  ecooutdoor: EcoOutdoor,
  editorialchic: EditorialChic,
  eurostyle: EuroStyle,
  extremeexplorer: ExtremeExplorer,
  familyfun: FamilyFun,
  fitmodern: FitModern,
  flashdeals: FlashDeals,
  freshcraft: FreshCraft,
  futureauto: FutureAuto,
  futuretech: FutureTech,
  gamevault: GameVault,
  glamangel: GlamAngel,
  greenhealth: GreenHealth,
  handcraft: HandCraft,
  heritagelux: HeritageLux,
  homedecor: HomeDecor,
  hypedrop: HypeDrop,
  iconshades: IconShades,
  influencestyle: InfluenceStyle,
  italiancraft: ItalianCraft,
  keymarket: KeyMarket,
  luxedit: LuxEdit,
  luxservice: LuxService,
  maisonelegance: MaisonElegance,
  mercadocod: MercadoCOD,
  milanomodern: MilanoModern,
  minimaltech: MinimalTech,
  modernlens: ModernLens,
  nordichome: NordicHome,
  novatrend: NovaTrend,
  opticalretail: OpticalRetail,
  parisianchic: ParisianChic,
  petfriend: PetFriend,
  petworld: PetWorld,
  pinkglam: PinkGlam,
  pricedrop: PriceDrop,
  primegoods: PrimeGoods,
  progamer: ProGamer,
  redstyle: RedStyle,
  shadeshub: ShadesHub,
  sneakerzone: SneakerZone,
  softglow: SoftGlow,
  sportoptics: SportOptics,
  sportstripe: SportStripe,
  sportzone: SportZone,
  streetboutique: StreetBoutique,
  stylepress: StylePress,
  techparts: TechParts,
  techretail: TechRetail,
  timecraft: TimeCraft,
  tradevault: TradeVault,
  trendfast: TrendFast,
  verifymarket: VerifyMarket,
  yogapremium: YogaPremium,
  zenbasic: ZenBasic,
};

interface LiveStorePreviewProps {
  templateId: string;
  width?: number;
  height?: number;
  className?: string;
}

// Rich demo store data for preview - uses centralized demo data system
const previewStoreData = defaultPreviewStoreData;

export default React.memo(function LiveStorePreview({ 
  templateId, 
  width = 400, 
  height = 500,
  className = ''
}: LiveStorePreviewProps) {
  // Normalize template ID
  const normalizedId = templateId.toLowerCase().replace(/\s+/g, '').replace(/-/g, '');
  
  // Find the component — no silent fallback
  const StoreComponent = storeTemplates[normalizedId];
  if (!StoreComponent) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-900 text-center p-4">
        <div>
          <p className="text-red-400 text-xs font-mono mb-1">TEMPLATE_NOT_FOUND</p>
          <p className="text-gray-500 text-xs font-mono">id: {templateId}</p>
          <p className="text-gray-500 text-xs font-mono">normalized: {normalizedId}</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`relative overflow-hidden bg-white ${className}`}
      style={{ 
        width, 
        height,
        contain: 'strict',
        contentVisibility: 'auto',
      }}
    >
      <div style={{
        transform: 'scale(0.20)',
        transformOrigin: 'top left',
        width: '500%',
        height: '500%',
        overflow: 'hidden',
        willChange: 'transform',
      }}>
        <StoreComponent 
          data={previewStoreData}
        />
      </div>
    </div>
  );
}, (prev, next) => 
  prev.templateId === next.templateId && 
  prev.width === next.width &&
  prev.height === next.height
);
