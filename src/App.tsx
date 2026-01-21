import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Index2 from "./pages/Index2";
import Comparison from "./pages/Comparison";
import CryptoComparison from "./pages/CryptoComparison";
import FXComparison from "./pages/FXComparison";
import SecuritiesComparison from "./pages/SecuritiesComparison";
import GuideDetail from "./pages/GuideDetail";
import Tools from "./pages/Tools";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Disclaimer from "./pages/Disclaimer";
import Legal from "./pages/Legal";
import Contact from "./pages/Contact";
import Company from "./pages/Company";
import NotFound from "./pages/NotFound";
import Basics from "./pages/Basics";
import Stocks from "./pages/Stocks";
import Nisa from "./pages/Nisa";
import InvestmentTrust from "./pages/InvestmentTrust";
import Crypto from "./pages/Crypto";
import ToolsDetail from "./pages/ToolsDetail";
// 新しいツールページのインポート
import CompoundInterest from "./pages/tools/CompoundInterest";
import SavingCalculator from "./pages/tools/SavingCalculator";
import RiskAssessment from "./pages/tools/RiskAssessment";
import StockReturn from "./pages/tools/StockReturn";
import FundReturn from "./pages/tools/FundReturn";
import CryptoReturn from "./pages/tools/CryptoReturn";
import FXCalculator from "./pages/tools/FXCalculator";
import PortfolioAnalysis from "./pages/tools/PortfolioAnalysis";
import RiskToleranceDiagnosticPage from "./pages/RiskToleranceDiagnosticPage";
// 新規記事ページのインポート
import MLStockPrediction from "./pages/MLStockPrediction";
import DLForexPrediction from "./pages/DLForexPrediction";
import AIPortfolioOptimization from "./pages/AIPortfolioOptimization";
// 既存の記事ページのインポート
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
// Sitemapページのインポート
import Sitemap from "./pages/Sitemap";
import FinancialGuide from "./pages/FinancialGuide";
// DMM FX詳細ページのインポート
import DmmFxDetail from "./pages/DmmFxDetailed";
// DMM株詳細ページのインポート
import DmmStockDetail from "./pages/DmmStockDetail";
import MatsuiFxDetail from "./pages/MatsuiFxDetailed";
// 新しいFX業者詳細ページのインポート
import SbiFxDetailed from "./pages/SbiFxDetailed";
import GaitameFxDetailed from "./pages/GaitameFxDetailed";
import IgFxDetailed from "./pages/IgFxDetailed";
import RakutenFxDetailed from "./pages/RakutenFxDetailed";
import GmoClickFxDetailed from "./pages/GmoClickFxDetailed";
import MinFxDetailed from "./pages/MinFxDetailed";
import HiroseFxDetailed from "./pages/HiroseFxDetailed";
import GmoGaikaDetailed from "./pages/GmoGaikaDetailed";
import MufgESmartFxDetailed from "./pages/MufgESmartFxDetailed";
// 新しい証券会社詳細ページのインポート
import { default as SbiSecuritiesDetail } from "./pages/SbiSecuritiesDetail";
import { default as RakutenSecuritiesDetail } from "./pages/RakutenSecuritiesDetail";
import { default as MonexSecuritiesDetail } from "./pages/MonexSecuritiesDetail";
import IgSecuritiesDetail from "./pages/IgSecuritiesDetail";
import MatsuiSecuritiesDetail from "./pages/MatsuiSecuritiesDetail";
import DmmSecuritiesDetail from "./pages/DmmSecuritiesDetail";
import AuKabucomSecuritiesDetail from "./pages/AuKabucomSecuritiesDetail";
import GmoClickSecuritiesDetail from "./pages/GmoClickSecuritiesDetail";
// 新しい証券会社詳細ページ（プロフェッショナル版）のインポート
import { default as SbiSecuritiesDetailPro } from "./pages/SbiSecuritiesDetailPro";
import { default as RakutenSecuritiesDetailPro } from "./pages/RakutenSecuritiesDetailPro";
import { default as MonexSecuritiesDetailPro } from "./pages/MonexSecuritiesDetailPro";
// 暗号資産取引所詳細ページのインポート
import GmoCoinDetailed from "./pages/GmoCoinDetailed";
import DmmBitcoinDetailed from "./pages/DmmBitcoinDetailed";
import BitflyerDetailed from "./pages/BitflyerDetailed";
import CoincheckDetailed from "./pages/CoincheckDetailed";
import LiquidByQuoineDetailed from "./pages/LiquidByQuoineDetailed";
import BinanceDetailed from "./pages/BinanceDetailed";
import BybitDetailed from "./pages/BybitDetailed";
import CoinbaseDetailed from "./pages/CoinbaseDetailed";
import KrakenDetailed from "./pages/KrakenDetailed";
import KuCoinDetailed from "./pages/KuCoinDetailed";
import GeminiDetailed from "./pages/GeminiDetailed";
import BitstampDetailed from "./pages/BitstampDetailed";
import BitfinexDetailed from "./pages/BitfinexDetailed";
import HuobiDetailed from "./pages/HuobiDetailed";
import OkxDetailed from "./pages/OkxDetailed";
import FtxDetailed from "./pages/FtxDetailed";
import BitbankDetailed from "./pages/BitbankDetailed";
import SbiVcTradeDetailed from "./pages/SbiVcTradeDetailed";
import BitpointDetailed from "./pages/BitpointDetailed";
import BinanceJapanDetailed from "./pages/BinanceJapanDetailed";
import BitTradeDetailed from "./pages/BitTradeDetailed";
import RakutenWalletDetailed from "./pages/RakutenWalletDetailed";
import LineBitmaxDetailed from "./pages/LineBitmaxDetailed";
// Bitget詳細ページのインポート
import BitgetDetailed from "./pages/BitgetDetailed";
// ローツェ株式分析デモページのインポート
import RorzeStockDemo from "./pages/RorzeStockDemo";
// 銘柄スクリーナーページのインポート
import StockScreener from "./pages/StockScreener";
// チャート詳細ページのインポート
import ChartDetail from "./pages/ChartDetail";

const queryClient = new QueryClient();

// ScrollToTopコンポーネントを追加
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/top2" element={<Index2 />} />
          <Route path="/basics" element={<Basics />} />
          <Route path="/stocks" element={<Stocks />} />
          <Route path="/nisa" element={<Nisa />} />
          <Route path="/investment-trust" element={<InvestmentTrust />} />
          <Route path="/crypto" element={<Crypto />} />
          <Route path="/tools-detail" element={<ToolsDetail />} />
          <Route path="/comparison" element={<Comparison />} />
          <Route path="/crypto-comparison" element={<CryptoComparison />} />
          <Route path="/fx-comparison" element={<FXComparison />} />
          <Route path="/securities-comparison" element={<SecuritiesComparison />} />
          <Route path="/fx/dmm-fx" element={<DmmFxDetail />} />
          <Route path="/stocks/dmm-stock" element={<DmmStockDetail />} />
          <Route path="/fx/matsui-fx" element={<MatsuiFxDetail />} />
          {/* FX業者詳細ページのルート */}
          <Route path="/fx/sbi-fx" element={<SbiFxDetailed />} />
          <Route path="/fx/gaitame" element={<GaitameFxDetailed />} />
          <Route path="/fx/ig" element={<IgFxDetailed />} />
          <Route path="/fx/rakuten" element={<RakutenFxDetailed />} />
          <Route path="/fx/gmo-click" element={<GmoClickFxDetailed />} />
          <Route path="/fx/min-fx" element={<MinFxDetailed />} />
          <Route path="/fx/hirose" element={<HiroseFxDetailed />} />
          <Route path="/fx/gmo-gaika" element={<GmoGaikaDetailed />} />
          <Route path="/fx/mufg-e-smart" element={<MufgESmartFxDetailed />} />
          {/* 証券会社詳細ページのルート */}
          <Route path="/securities/sbi" element={<SbiSecuritiesDetail />} />
          <Route path="/securities/rakuten" element={<RakutenSecuritiesDetail />} />
          <Route path="/securities/monex" element={<MonexSecuritiesDetail />} />
          <Route path="/securities/ig" element={<IgSecuritiesDetail />} />
          <Route path="/securities/matsui" element={<MatsuiSecuritiesDetail />} />
          <Route path="/securities/dmm" element={<DmmSecuritiesDetail />} />
          <Route path="/securities/au-kabucom" element={<AuKabucomSecuritiesDetail />} />
          <Route path="/securities/gmo-click" element={<GmoClickSecuritiesDetail />} />
          {/* 新しい証券会社詳細ページ（プロフェッショナル版）のルート */}
          <Route path="/securities/sbi-pro" element={<SbiSecuritiesDetailPro />} />
          <Route path="/securities/rakuten-pro" element={<RakutenSecuritiesDetailPro />} />
          <Route path="/securities/monex-pro" element={<MonexSecuritiesDetailPro />} />
          {/* 暗号資産取引所詳細ページのルート */}
          <Route path="/crypto/gmo-coin" element={<GmoCoinDetailed />} />
          <Route path="/crypto/dmm-bitcoin" element={<DmmBitcoinDetailed />} />
          <Route path="/crypto/bitflyer" element={<BitflyerDetailed />} />
          <Route path="/crypto/coincheck" element={<CoincheckDetailed />} />
          <Route path="/crypto/liquid-by-quoine" element={<LiquidByQuoineDetailed />} />
          <Route path="/crypto/binance" element={<BinanceDetailed />} />
          <Route path="/crypto/bybit" element={<BybitDetailed />} />
          <Route path="/crypto/coinbase" element={<CoinbaseDetailed />} />
          <Route path="/crypto/kraken" element={<KrakenDetailed />} />
          <Route path="/crypto/kucoin" element={<KuCoinDetailed />} />
          <Route path="/crypto/gemini" element={<GeminiDetailed />} />
          <Route path="/crypto/bitstamp" element={<BitstampDetailed />} />
          <Route path="/crypto/bitfinex" element={<BitfinexDetailed />} />
          <Route path="/crypto/huobi" element={<HuobiDetailed />} />
          <Route path="/crypto/okx" element={<OkxDetailed />} />
          <Route path="/crypto/ftx" element={<FtxDetailed />} />
          <Route path="/crypto/bitbank" element={<BitbankDetailed />} />
          <Route path="/crypto/sbi-vc-trade" element={<SbiVcTradeDetailed />} />
          <Route path="/crypto/bitpoint" element={<BitpointDetailed />} />
          <Route path="/crypto/binance-japan" element={<BinanceJapanDetailed />} />
          <Route path="/crypto/bittrade" element={<BitTradeDetailed />} />
          <Route path="/crypto/rakuten-wallet" element={<RakutenWalletDetailed />} />
          <Route path="/crypto/line-bitmax" element={<LineBitmaxDetailed />} />
          {/* Bitget詳細ページのルート */}
          <Route path="/crypto/bitget" element={<BitgetDetailed />} />
          {/* Guide Routes */}
          <Route path="/guide/financial-analysis" element={<FinancialGuide />} />
          <Route path="/guide/:id" element={<GuideDetail />} />
          <Route path="/tools" element={<Tools />} />
          {/* 新しいツールページのルート */}
          <Route path="/tools/compound-interest" element={<CompoundInterest />} />
          <Route path="/tools/saving-calculator" element={<SavingCalculator />} />
          <Route path="/tools/risk-assessment" element={<RiskAssessment />} />
          <Route path="/tools/stock-return" element={<StockReturn />} />
          <Route path="/tools/fund-return" element={<FundReturn />} />
          <Route path="/tools/crypto-return" element={<CryptoReturn />} />
          <Route path="/tools/fx-calculator" element={<FXCalculator />} />
          <Route path="/tools/portfolio-analysis" element={<PortfolioAnalysis />} />
          <Route path="/risk-diagnostic" element={<RiskToleranceDiagnosticPage />} />
          {/* 新規記事ページのルート */}
          <Route path="/articles/ml-stock-prediction" element={<MLStockPrediction />} />
          <Route path="/articles/dl-forex-prediction" element={<DLForexPrediction />} />
          <Route path="/articles/ai-portfolio-optimization" element={<AIPortfolioOptimization />} />
          {/* 既存の記事ページのルート */}
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:id" element={<ArticleDetail />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/company" element={<Company />} />
          <Route path="/sitemap" element={<Sitemap />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          {/* ローツェ株式分析デモ */}
          <Route path="/demo/rorze-stock" element={<RorzeStockDemo />} />
          {/* 銘柄スクリーナー */}
          <Route path="/screener" element={<StockScreener />} />
          {/* チャート詳細ページ */}
          <Route path="/chart" element={<ChartDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;