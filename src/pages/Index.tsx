import Header from "@/components/layout/Header";
import HeroSection from "@/components/features/HeroSection";
import CategoryCard from "@/components/features/CategoryCard";
import RankingCard from "@/components/features/RankingCard";
import InvestmentDiagnostic from "@/components/features/InvestmentDiagnostic";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight, BookOpen, TrendingUp, PieChart, LineChart, Coins, Calculator } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/layout/Footer";

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const categories = [
    {
      icon: BookOpen,
      title: "投資の基礎知識",
      description: "投資を始める前に知っておくべき基本を解説",
      href: "/basics",
      color: "primary" as const,
    },
    {
      icon: TrendingUp,
      title: "株式投資",
      description: "個別株の選び方から取引方法まで",
      href: "/stocks",
      color: "secondary" as const,
    },
    {
      icon: PieChart,
      title: "NISA・つみたてNISA",
      description: "非課税制度を活用した投資術",
      href: "/nisa",
      color: "accent" as const,
    },
    {
      icon: LineChart,
      title: "投資信託",
      description: "プロに運用を任せる投資方法",
      href: "/investment-trust",
      color: "primary" as const,
    },
    {
      icon: Coins,
      title: "暗号資産",
      description: "暗号資産の基礎から取引まで",
      href: "/crypto",
      color: "secondary" as const,
    },
    {
      icon: Calculator,
      title: "投資計算ツール",
      description: "複利計算やシミュレーション",
      href: "/tools",
      color: "accent" as const,
    },
  ];

  const rankings = [
    {
      rank: 1,
      name: "SBI証券",
      features: [
        "国内株式・米国株式手数料が業界最安水準（0円）",
        "取扱商品が豊富で初心者にも最適",
        "Tポイント・Vポイントで投資が可能",
      ],
      commission: "スタンダードプラン: 55円〜(現物取引 5万円以下)\nアクティブプラン: 約定代金合計100万円まで0円",
      minInvestment: "原則100株 単元未満株(「S株」)1株〜可",
      nisaSupport: true,
      ipoCount: 80,
      foreignStocks: true,
      points: "Tポイント・Vポイントなどを連携可能",
      rating: 5,
      highlight: "総合1位",
      affiliateUrl: "https://www.sbisec.co.jp/",
      detailUrl: "/securities/sbi-pro",
    },
    {
      rank: 2,
      name: "楽天証券",
      features: [
        "楽天ポイントが貯まる・使える",
        "取引ツールが使いやすい",
        "楽天銀行との連携でお得",
      ],
      commission: "超割コース: 55円〜(現物取引 5万円以下)\nいちにち定額コース: 0円〜",
      minInvestment: "原則100株 単元未満株(「いちかぶ」)1株〜可",
      nisaSupport: true,
      ipoCount: 70,
      foreignStocks: true,
      points: "楽天ポイントの獲得・利用可",
      rating: 5,
      highlight: "ポイント還元No.1",
      affiliateUrl: "https://www.rakuten-sec.co.jp/",
      detailUrl: "/securities/rakuten-pro",
    },
    {
      rank: 3,
      name: "マネックス証券",
      features: [
        "米国株の取扱銘柄数が豊富",
        "投資情報・レポートが充実",
        "dポイントで1.1%ポイント還元",
      ],
      commission: "取引毎手数料: 99円〜(現物取引 10万円以下)\n一日定額手数料コース: 0円〜",
      minInvestment: "原則100株 単元未満株(「ワン株」)1株〜可",
      nisaSupport: true,
      ipoCount: 50,
      foreignStocks: true,
      points: "独自のマネックスポイント",
      rating: 4,
      highlight: "米国株取引におすすめ",
      affiliateUrl: "https://www.monex.co.jp/",
      detailUrl: "/securities/monex-pro",
    },
  ];

  // 国内暗号資産取引所ランキング
  const domesticCryptoExchanges = [
    {
      rank: 1,
      name: "GMOコイン",
      features: [
        "入出金・送金の無料範囲が広い",
        "板の流動性が高め",
        "APIが安定",
      ],
      tradingFee: "Maker -0.01% / Taker 0.05% 程度",
      withdrawalFee: "入金: 無料（即時入金対応）/ 出金: 無料",
      supportedCoins: 30,
      security: "コールド保管、二段階認証、分別管理、システム冗長化",
      rating: 5,
      highlight: "手数料最安",
      affiliateUrl: "https://coin.z.com/jp/",
    },
    {
      rank: 2,
      name: "bitFlyer",
      features: [
        "老舗・口座数多い",
        "板の厚み",
        "Lightning（高機能板）",
      ],
      tradingFee: "0.01%～0.15% 程度（Lightning現物、出来高連動）",
      withdrawalFee: "入金: 無料～330円、出金: 220円～770円",
      supportedCoins: 45,
      security: "コールド保管、2FA、出金ホワイトリスト、ISMS",
      rating: 5,
      highlight: "実績No.1",
      affiliateUrl: "https://bitflyer.com/ja-jp/",
    },
    {
      rank: 3,
      name: "Coincheck",
      features: [
        "アプリ利用者数が多い",
        "NFTマーケット連携",
        "UIが分かりやすい",
      ],
      tradingFee: "取引所（BTC等）0% 例あり / 販売所は—（スプレッド）",
      withdrawalFee: "入金: 無料～1,018円、出金: 407円",
      supportedCoins: 30,
      security: "コールド保管、2FA、分別管理",
      rating: 4,
      highlight: "初心者向け",
      affiliateUrl: "https://coincheck.com/ja/",
    },
  ];

  // 国外暗号資産取引所ランキング
  const internationalCryptoExchanges = [
    {
      rank: 1,
      name: "Binance",
      features: [
        "流動性最大級",
        "先物/オプション",
        "Earn/Launchpad",
      ],
      tradingFee: "現物: 約0.10%/0.10%、先物: 約0.02%/0.04%",
      withdrawalFee: "暗号資産入金: 無料 / 出金: ネットワーク手数料",
      supportedCoins: 350,
      security: "PoR公表、コールド保管、2FA、出金ホワイトリスト、バグバウンティ",
      rating: 5,
      highlight: "世界最大",
      affiliateUrl: "https://www.binance.com/",
    },
    {
      rank: 2,
      name: "OKX",
      features: [
        "先物・オプション強い",
        "OKX Wallet/DeFi連携",
        "Earn/Jumpstart",
      ],
      tradingFee: "現物: 約0.08%/0.10%、先物: 約0.02%/0.05%",
      withdrawalFee: "暗号資産入金: 無料 / 出金: ネットワーク手数料",
      supportedCoins: 350,
      security: "PoR公表、MPCウォレット、コールド保管、2FA",
      rating: 4,
      highlight: "先物取引",
      affiliateUrl: "https://www.okx.com/",
    },
    {
      rank: 3,
      name: "Bybit",
      features: [
        "デリバティブの板厚",
        "コピー取引",
        "Earn",
      ],
      tradingFee: "現物: 約0.10%/0.10%、先物: 約0.02%/0.055（目安）",
      withdrawalFee: "暗号資産入金: 無料 / 出金: ネットワーク手数料",
      supportedCoins: 400,
      security: "PoR公表、コールド保管、2FA、出金ホワイトリスト",
      rating: 4,
      highlight: "copy trading",
      affiliateUrl: "https://www.bybit.com/",
    },
  ];

  // 国内FX業者ランキング
  const domesticFxBrokers = [
    {
      rank: 1,
      name: "GMOクリック証券（FXネオ）",
      features: [
        "FX取引高世界第1位",
        "高機能取引ツール",
        "低スプレッド",
      ],
      spread: "米ドル/円 0.2銭原則固定",
      minTradeUnit: "1,000通貨",
      currencyPairs: 20,
      swapPoints: "ドル円: -230円/+230円\nポンド円: -280円/+280円\nユーロ円: -210円/+210円",
      scalping: "非推奨（明記なし）",
      rating: 5,
      highlight: "総合1位",
      affiliateUrl: "https://www.click-sec.com/corp/guide/fxneo/",
    },
    {
      rank: 2,
      name: "DMM FX",
      features: [
        "LINEサポート対応",
        "最短当日取引開始",
        "スワップポイントが高い",
      ],
      spread: "米ドル/円 0.2銭原則固定",
      minTradeUnit: "10,000通貨",
      currencyPairs: 21,
      swapPoints: "ドル円: -225円/+225円\nポンド円: -270円/+270円\nユーロ円: -205円/+205円",
      scalping: "非推奨",
      rating: 5,
      highlight: "初心者向け",
      affiliateUrl: "https://fx.dmm.com/",
    },
    {
      rank: 3,
      name: "SBI FXトレード",
      features: [
        "業界最狭水準スプレッド",
        "1通貨から取引可能",
        "スワップポイントが高い",
      ],
      spread: "米ドル/円 0.18銭～",
      minTradeUnit: "1通貨",
      currencyPairs: 34,
      swapPoints: "ドル円: -240円/+240円\nポンド円: -290円/+290円\nユーロ円: -215円/+215円",
      scalping: "可能",
      rating: 5,
      highlight: "スプレッド最安",
      affiliateUrl: "https://www.sbifxt.co.jp/",
    },
  ];

  // 国外FX業者ランキング
  const internationalFxBrokers = [
    {
      rank: 1,
      name: "XMTrading（エックスエム）",
      features: [
        "最大1000倍レバレッジ",
        "豪華ボーナス",
        "日本語サポート完備",
      ],
      spread: "米ドル/円 1.6pips（スタンダード口座）",
      minTradeUnit: "0.01ロット（1,000通貨）",
      currencyPairs: 57,
      swapPoints: "ドル円: -8.5/+2.5USD\nポンド円: -12.3/+3.8USD\nユーロ円: -10.2/+3.1USD",
      scalping: "可能",
      rating: 5,
      highlight: "世界最大",
      affiliateUrl: "https://www.xmtrading.com/",
    },
    {
      rank: 2,
      name: "FXGT（エフエックスジーティー）",
      features: [
        "最大1000倍レバレッジ",
        "仮想通貨FXに強い",
        "充実のボーナス",
      ],
      spread: "米ドル/円 1.5pips（スタンダード+口座）",
      minTradeUnit: "0.01ロット（1,000通貨）",
      currencyPairs: 53,
      swapPoints: "ドル円: -7.8/+2.2USD\nポンド円: -11.5/+3.5USD\nユーロ円: -9.8/+2.9USD",
      scalping: "可能",
      rating: 5,
      highlight: "仮想通貨FX",
      affiliateUrl: "https://fxgt.com/",
    },
    {
      rank: 3,
      name: "Exness（エクスネス）",
      features: [
        "無制限レバレッジ",
        "低スプレッド",
        "高速約定",
      ],
      spread: "米ドル/円 1.1pips（スタンダード口座）",
      minTradeUnit: "0.01ロット（1,000通貨）",
      currencyPairs: 95,
      swapPoints: "ドル円: -6.9/+1.8USD\nポンド円: -10.2/+2.9USD\nユーロ円: -8.5/+2.3USD",
      scalping: "可能",
      rating: 5,
      highlight: "低スプレッド",
      affiliateUrl: "https://www.exness.com/",
    },
  ];

  const articles = [
    {
      id: "ai-investment-fundamentals",
      title: "AI投資の基礎知識：アルゴリズム取引からロボアドバイザーまで完全解説",
      excerpt: "AIがどのように投資に活用されているのか、基礎から実践的な活用法まで詳しく解説します。初心者から上級者まで使えるAI投資手法を徹底紹介。",
      category: "投資AI",
      date: "2025年11月3日",
      isNew: true,
      isPopular: true,
    },
    {
      id: "trading-indicators-overview",
      title: "主要トレーディングインジケーターの使い方と活用ポイント",
      excerpt: "初心者から上級者まで使える主要なテクニカル指標を解説します。",
      category: "インジケータ",
      date: "2025年11月3日",
      isNew: true,
      isPopular: true,
    },
    {
      id: "tradingview-beginner",
      title: "トレーディングビュー入門：初心者が最初に覚えるべきチャート分析術",
      excerpt: "無料で使える人気チャート分析ツール「トレーディングビュー」の基本操作を解説します。",
      category: "トレーディングビュー",
      date: "2025年11月3日",
      isNew: true,
      isPopular: true,
    },
    {
      id: "crypto-exchange-comparison",
      title: "暗号資産取引所比較：国内と海外の違いと選び方",
      excerpt: "国内と海外の暗号資産取引所の特徴と違いを比較し、自分に合った取引所の選び方を解説します。",
      category: "暗号資産",
      date: "2024年6月15日",
      isPopular: true,
    },
    {
      id: "fx-broker-comparison",
      title: "FX業者比較：国内と海外の違いと選び方のポイント",
      excerpt: "国内と海外のFX業者の特徴と違いを比較し、自分に合ったFX業者の選び方を解説します。",
      category: "FX",
      date: "2024年6月20日",
      isPopular: true,
    },
    {
      id: "crypto-trends-2024",
      title: "【2024年最新】暗号資産投資トレンド：AIコインからDeFiまで",
      excerpt: "2024年の暗号資産市場の最新動向を徹底解説。AI関連トークン、DeFi、NFTの今後を予測します。",
      category: "暗号資産",
      date: "2024年5月20日",
    },
    {
      id: "interest-rate-impact",
      title: "金利変動が投資に与える影響と対策：2024年版",
      excerpt: "日本銀行の金融政策が個人投資家に与える影響と、各資産クラスへの対応策を詳しく解説します。",
      category: "投資戦略",
      date: "2024年5月15日",
    },
    {
      id: "ai-investment-strategy",
      title: "AIを活用した投資戦略の実際：機械学習からファンダメンタル分析まで",
      excerpt: "人工知能を活用した投資手法を実例とともに解説。初心者から上級者まで使えるテクニックを紹介します。",
      category: "投資戦略",
      date: "2024年5月10日",
    },
    {
      id: "nisa-beginner",
      title: "【2024年最新版】NISA完全ガイド：初心者が知るべき全て",
      excerpt: "新NISAが始まり、より使いやすくなった非課税制度。制度の概要から活用方法まで徹底解説します。",
      category: "NISA",
      date: "2024年1月15日",
    },
    {
      id: "stocks-beginner",
      title: "株式投資の始め方：証券口座開設から銘柄選びまで",
      excerpt: "株式投資を始めたい方へ。口座開設の手順から最初の銘柄選びまで、わかりやすく解説します。",
      category: "株式投資",
      date: "2024年1月12日",
    },
    {
      id: "investment-trust",
      title: "投資信託とは？メリット・デメリットと選び方のポイント",
      excerpt: "投資信託の基本から、自分に合った商品の選び方まで詳しく説明します。",
      category: "投資信託",
      date: "2024年1月10日",
    },
    // 新規記事: 機械学習を活用した株式予測モデルの構築方法
    {
      id: "ml-stock-prediction",
      title: "機械学習を活用した株式予測モデルの構築方法",
      excerpt: "Pythonと機械学習アルゴリズムを使用して、株式の価格予測モデルを構築する実践的な方法を解説します。",
      category: "投資AI",
      date: "2024年6月25日",
    },
    // 新規記事: ディープラーニングを用いた為替予測の実際
    {
      id: "dl-forex-prediction",
      title: "ディープラーニングを用いた為替予測の実際",
      excerpt: "LSTMやTransformerなどの深層学習モデルを使用して、為替相場の動向を予測する実践的なアプローチを解説します。",
      category: "投資AI",
      date: "2024年6月26日",
    },
    // 新規記事: AIによるポートフォリオ最適化の実践
    {
      id: "ai-portfolio-optimization",
      title: "AIによるポートフォリオ最適化の実践",
      excerpt: "機械学習と最適化アルゴリズムを使用して、リスクとリターンのバランスを取った最適な資産配分を実現する方法を解説します。",
      category: "投資AI",
      date: "2024年6月27日",
    },
  ];

  const [activeTab, setActiveTab] = useState<"domestic" | "international">("domestic");
  const [activeFxTab, setActiveFxTab] = useState<"domestic" | "international">("domestic");
  const [activeCryptoTab, setActiveCryptoTab] = useState<'domestic' | 'international'>('domestic');

  // ページ遷移後に投資診断セクションにスクロールする
  useEffect(() => {
    // NISAページからの遷移の場合
    if (location.state?.fromNisaLink) {
      // ページが完全にロードされるのを待つため、遅延を設定
      const timer = setTimeout(() => {
        const element = document.getElementById("診断");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);

      return () => clearTimeout(timer);
    }
    // ハッシュが#診断の場合
    else if (location.hash === '#診断') {
      // ページが完全にロードされるのを待つため、遅延を設定
      const timer = setTimeout(() => {
        const element = document.getElementById("診断");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [location.state, location.hash]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>投資総合ナビ | 株式・FX・暗号資産・投資信託の比較と診断</title>
        <meta name="description" content="投資総合ナビは、株式投資・FX・暗号資産・投資信託など、すべての投資商品を比較・診断する総合投資ガイドです。初心者から中級者まで、最適な投資方法を見つけましょう。2024年最新の投資情報も提供しています。" />
        <meta name="keywords" content="投資,資産運用,株式投資,NISA,つみたてNISA,iDeCo,証券会社,比較,ランキング,初心者,暗号資産,FX,REIT,投資信託,投資総合ナビ,2024年最新情報" />
        <link rel="canonical" href="https://www.toushi-navi.com" />

        {/* Open Graph */}
        <meta property="og:title" content="投資総合ナビ | 株式・FX・暗号資産・投資信託の比較と診断" />
        <meta property="og:description" content="投資総合ナビは、株式投資・FX・暗号資産・投資信託など、すべての投資商品を比較・診断する総合投資ガイドです。初心者から中級者まで、最適な投資方法を見つけましょう。2024年最新の投資情報も提供しています。" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.toushi-navi.com" />
        <meta property="og:site_name" content="投資総合ナビ" />
        <meta property="og:locale" content="ja_JP" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@toushi_navi" />
      </Helmet>

      <Header />

      {/* Hero Section */}
      <HeroSection />

      <main className="flex-grow">
        {/* 投資適性診断セクション */}
        <section className="py-16 sm:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center mb-8 sm:mb-12">
              <h2 id="診断" className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">あなたに最適な投資方法を診断</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
                簡単な質問に答えて、あなたに合った投資スタイルを見つけましょう
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <InvestmentDiagnostic />
            </div>
          </div>
        </section>

        {/* 投資カテゴリセクション */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">投資カテゴリ</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                あなたの投資目標に合わせて、最適な投資方法を見つけましょう
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {categories.map((category, index) => (
                <CategoryCard key={index} {...category} />
              ))}
            </div>
          </div>
        </section>

        {/* 証券会社ランキングセクション */}
        <section className="py-16 sm:py-20 bg-muted/30">
          <div className="container mx-auto px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">証券会社比較ランキング</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                手数料やサービス内容を比較して、あなたに最適な証券会社を選びましょう
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {rankings.map((ranking) => (
                <RankingCard key={ranking.rank} {...ranking} />
              ))}
            </div>
            <div className="text-center mt-10">
              <a
                href="/comparison"
                className="inline-flex items-center justify-center px-8 py-4 text-white rounded-xl hover:opacity-90 transition-all duration-300 text-lg font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 whitespace-nowrap"
                style={{ backgroundColor: '#10B77F' }}
              >
                詳細比較を見る
                <svg
                  className="ml-3 h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* FX業者ランキングセクション */}
        <section className="py-16 sm:py-20 bg-muted/30">
          <div className="container mx-auto px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">FX業者ランキング</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                スプレッド・スワップポイント・使いやすさを比較して、最適なFX業者を選びましょう
              </p>
            </div>

            {/* 国内外の切替ボタン */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                  type="button"
                  className={`px-6 py-3 text-base font-medium rounded-l-lg border ${activeTab === 'domestic'
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  onClick={() => setActiveTab('domestic')}
                >
                  国内業者
                </button>
                <button
                  type="button"
                  className={`px-6 py-3 text-base font-medium rounded-r-lg border ${activeTab === 'international'
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  onClick={() => setActiveTab('international')}
                >
                  海外業者
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {(activeTab === 'domestic' ? domesticFxBrokers : internationalFxBrokers).map((broker) => (
                <RankingCard key={broker.rank} {...broker} />
              ))}
            </div>
            <div className="text-center mt-10">
              <a
                href="/fx-comparison"
                className="inline-flex items-center justify-center px-8 py-4 text-white rounded-xl hover:opacity-90 transition-all duration-300 text-lg font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 whitespace-nowrap"
                style={{ backgroundColor: '#10B77F' }}
              >
                詳細比較を見る
                <svg
                  className="ml-3 h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* 暗号資産取引所ランキング */}
        <section className="py-16 sm:py-20 bg-muted/30">
          <div className="container mx-auto px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">暗号資産取引所ランキング</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                海外の人気暗号資産取引所を比較ランキング形式でご紹介
              </p>
            </div>

            {/* 海外の切替ボタン */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                  type="button"
                  className={`px-6 py-3 text-base font-medium rounded-l-lg border ${activeCryptoTab === 'domestic'
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  onClick={() => setActiveCryptoTab('domestic')}
                >
                  国内取引所
                </button>
                <button
                  type="button"
                  className={`px-6 py-3 text-base font-medium rounded-r-lg border ${activeCryptoTab === 'international'
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  onClick={() => setActiveCryptoTab('international')}
                >
                  海外取引所
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {(activeCryptoTab === 'domestic' ? domesticCryptoExchanges : internationalCryptoExchanges).map((exchange) => (
                <RankingCard key={exchange.rank} {...exchange} />
              ))}
            </div>
            <div className="text-center mt-10">
              <a
                href="/crypto-comparison"
                className="inline-flex items-center justify-center px-8 py-4 text-white rounded-xl hover:opacity-90 transition-all duration-300 text-lg font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 whitespace-nowrap"
                style={{ backgroundColor: '#10B77F' }}
              >
                詳細比較を見る
                <svg
                  className="ml-3 h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* 新着記事セクション */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">新着記事</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                最新の投資ニュースやテクニカル分析をチェック
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {articles
                .filter(article => article.isPopular)
                .slice(0, 6)
                .map((article) => (
                  <Card key={article.id} className="overflow-hidden border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/50">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="secondary">{article.category}</Badge>
                        {article.isNew && (
                          <Badge className="ml-2" style={{ backgroundColor: '#FFA500' }}>
                            New
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl line-clamp-2">
                        <a href={`/articles/${article.id}`} className="hover:text-primary transition-colors">
                          {article.title}
                        </a>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground line-clamp-3 mb-4">{article.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{article.date}</span>
                        </div>
                        {article.isPopular && (
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-4 w-4" />
                            <span>人気記事</span>
                          </div>
                        )}
                      </div>
                      <button
                        className="w-full mt-6 px-4 py-2 bg-blue-100 text-primary rounded-md hover:bg-blue-200 transition-colors whitespace-nowrap"
                        onClick={() => navigate(`/articles/${article.id}`)}
                      >
                        記事を読む
                      </button>
                    </CardContent>
                  </Card>
                ))}
            </div>
            <div className="text-center mt-10">
              <a
                href="/articles"
                className="inline-flex items-center justify-center px-6 py-3 text-white rounded-lg hover:opacity-90 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 whitespace-nowrap"
                style={{ backgroundColor: '#10B77F' }}
              >
                すべての記事を見る
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Index;