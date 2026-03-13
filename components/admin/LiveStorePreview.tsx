'use client';
import React from 'react';
import MegaMarketTemplate from '@/components/templates/MegaMarket';
import ChicStore from '@/components/templates/ChicStore';
import EliteStore from '@/components/templates/EliteStore';
import StarStore from '@/components/templates/StarStore';
import AvantGarde from '@/components/templates/AvantGarde';
import BeautyBox from '@/components/templates/BeautyBox';
import BeautyHaven from '@/components/templates/BeautyHaven';
import BidZone from '@/components/templates/BidZone';
import BlueClassic from '@/components/templates/BlueClassic';
import BlueRetail from '@/components/templates/BlueRetail';
import BoldAthlete from '@/components/templates/BoldAthlete';
import BoldYouth from '@/components/templates/BoldYouth';
import BuilderZone from '@/components/templates/BuilderZone';
import BulkZone from '@/components/templates/BulkZone';
import Bullseye from '@/components/templates/Bullseye';
import CashFlow from '@/components/templates/CashFlow';
import CharmBoutique from '@/components/templates/CharmBoutique';
import ClassicWear from '@/components/templates/ClassicWear';
import CrystalShine from '@/components/templates/CrystalShine';
import DesignerHub from '@/components/templates/DesignerHub';
import EcoOutdoor from '@/components/templates/EcoOutdoor';
import EditorialChic from '@/components/templates/EditorialChic';
import EuroStyle from '@/components/templates/EuroStyle';
import ExtremeExplorer from '@/components/templates/ExtremeExplorer';
import FamilyFun from '@/components/templates/FamilyFun';
import FitModern from '@/components/templates/FitModern';
import FlashDeals from '@/components/templates/FlashDeals';
import FreshCraft from '@/components/templates/FreshCraft';
import FutureAuto from '@/components/templates/FutureAuto';
import FutureTech from '@/components/templates/FutureTech';
import GameVault from '@/components/templates/GameVault';
import GlamAngel from '@/components/templates/GlamAngel';
import GreenHealth from '@/components/templates/GreenHealth';
import HandCraft from '@/components/templates/HandCraft';
import HeritageLux from '@/components/templates/HeritageLux';
import HomeDecor from '@/components/templates/HomeDecor';
import HypeDrop from '@/components/templates/HypeDrop';
import IconShades from '@/components/templates/IconShades';
import InfluenceStyle from '@/components/templates/InfluenceStyle';
import ItalianCraft from '@/components/templates/ItalianCraft';
import KeyMarket from '@/components/templates/KeyMarket';
import LuxEdit from '@/components/templates/LuxEdit';
import LuxService from '@/components/templates/LuxService';
import MaisonElegance from '@/components/templates/MaisonElegance';
import MercadoCOD from '@/components/templates/MercadoCOD';
import MilanoModern from '@/components/templates/MilanoModern';
import MinimalTech from '@/components/templates/MinimalTech';
import ModernLens from '@/components/templates/ModernLens';
import NordicHome from '@/components/templates/NordicHome';
import NovaTrend from '@/components/templates/NovaTrend';
import OpticalRetail from '@/components/templates/OpticalRetail';
import ParisianChic from '@/components/templates/ParisianChic';
import PetFriend from '@/components/templates/PetFriend';
import PetWorld from '@/components/templates/PetWorld';
import PinkGlam from '@/components/templates/PinkGlam';
import PriceDrop from '@/components/templates/PriceDrop';
import PrimeGoods from '@/components/templates/PrimeGoods';
import ProGamer from '@/components/templates/ProGamer';
import RedStyle from '@/components/templates/RedStyle';
import ShadesHub from '@/components/templates/ShadesHub';
import SneakerZone from '@/components/templates/SneakerZone';
import SoftGlow from '@/components/templates/SoftGlow';
import SportOptics from '@/components/templates/SportOptics';
import SportStripe from '@/components/templates/SportStripe';
import SportZone from '@/components/templates/SportZone';
import StreetBoutique from '@/components/templates/StreetBoutique';
import StylePress from '@/components/templates/StylePress';
import TechParts from '@/components/templates/TechParts';
import TechRetail from '@/components/templates/TechRetail';
import TimeCraft from '@/components/templates/TimeCraft';
import TradeVault from '@/components/templates/TradeVault';
import TrendFast from '@/components/templates/TrendFast';
import VerifyMarket from '@/components/templates/VerifyMarket';
import YogaPremium from '@/components/templates/YogaPremium';
import ZenBasic from '@/components/templates/ZenBasic';

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
  maisonelagance: MaisonElegance,
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

const mockProduct = {
  id: 'preview-1',
  title: 'Producto Premium',
  description: 'Descripción del producto de alta calidad con características excepcionales.',
  price: '$99.99',
  originalPrice: '$199.99',
  imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop',
  gallery: [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop',
  ],
  category: 'Premium',
  rating: 4.9,
  reviews: 128,
  features: ['Alta calidad', 'Envío rápido', 'Garantía 30 días'],
};

const mockStore = {
  name: 'Mi Tienda',
  logoText: 'TIENDA',
  description: 'La mejor tienda online con productos de alta calidad',
  bannerImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop',
  products: [mockProduct, mockProduct, mockProduct],
  pdpFeatures: {
    liveViewers: true,
    recentSales: true,
    scarcityTimer: false,
    stickyButton: true,
  },
};

export default React.memo(function LiveStorePreview({ 
  templateId, 
  width = 400, 
  height = 500,
  className = ''
}: LiveStorePreviewProps) {
  // Normalize template ID
  const normalizedId = templateId.toLowerCase().replace(/\s+/g, '').replace(/-/g, '');
  
  // Find the component - fallback to MegaMarket if not found
  const StoreComponent = storeTemplates[normalizedId] || MegaMarketTemplate;

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
          data={mockStore}
        />
      </div>
    </div>
  );
}, (prev, next) => 
  prev.templateId === next.templateId && 
  prev.width === next.width &&
  prev.height === next.height
);
