import Header from "@/components/layout/Header";
import TickerTape from "@/components/features/TickerTape";
import HeroSection from "@/components/features/HeroSection";
import CategoryCard from "@/components/features/CategoryCard";
import InvestmentDiagnostic from "@/components/features/InvestmentDiagnostic";
import SEO from "@/components/seo/SEO";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight, BookOpen, TrendingUp, PieChart, LineChart, Coins, Calculator, CheckCircle, ExternalLink, Trophy, ChevronDown } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { tools } from "@/data/tools";

// Import Ranking Data
import { securitiesRankingList } from "@/pages/SecuritiesComparison";
import { fxRankingList } from "@/pages/FXComparison";
import { cryptoRankingList } from "@/pages/CryptoComparison";

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

  const articles = [
    // 新規記事: デイトレ vs 中長期
    {
      id: "daytrade-vs-longterm-2026",
      title: "【2026年最新】デイトレード vs 中長期投資：スタイル別・注目銘柄10選と勝ち方",
      excerpt: "デイトレ向きの「お祭り銘柄」と、中長期向きの「テンバガー候補」。性質の異なる2つの投資スタイルにおすすめの銘柄を各5選紹介。",
      category: "投資戦略",
      date: "2026年1月25日",
      isNew: true,
      isPopular: true,
    },
    // 新規記事: 2026年注目テンバガー候補
    {
      id: "tenbagger-candidate-2026",
      title: "【2026年注目】テンバガー（株価10倍）候補・話題株 10選",
      excerpt: "市場の期待値やテーマ性（AI、データセンター、国策）の強さを踏まえた、2026年注目の話題の10銘柄を厳選紹介。",
      category: "株式投資",
      date: "2026年1月25日",
      isNew: true,
      isPopular: true,
    },
    {
      id: "nisa-beginner",
      type: "guide",
      title: "【2026年最新】NISA完全ガイド：初心者が知るべき全て",
      excerpt: "非課税枠が1,800万円に拡大！2026年現在、資産形成のスタンダードとなった「新NISA」の仕組み・メリット・失敗しない始め方を、どこよりも分かりやすく解説。",
      category: "NISA",
      date: "2026年1月22日",
      isNew: true,
      isPopular: true,
    },
    {
      id: "investment-trust",
      type: "guide",
      title: "投資信託の仕組みと選び方：プロに任せる失敗しない資産運用",
      excerpt: "100円からプロにお任せ！「インデックス」と「アクティブ」の違いは？手数料で損しないための選び方とは？初心者におすすめのファンドも紹介。",
      category: "投資信託",
      date: "2026年1月22日",
      isNew: true,
      isPopular: true,
    },
    {
      id: "trading-indicators-overview",
      title: "主要トレーディングインジケーターの使い方と活用ポイント",
      excerpt: "初心者から上級者まで使える主要なテクニカル指標を解説します。",
      category: "インジケータ",
      date: "2025年11月3日",
      isNew: false,
      isPopular: true,
    },
    {
      id: "tradingview-beginner",
      title: "トレーディングビュー入門：初心者が最初に覚えるべきチャート分析術",
      excerpt: "無料で使える人気チャート分析ツール「トレーディングビュー」の基本操作を解説します。",
      category: "トレーディングビュー",
      date: "2025年11月3日",
      isNew: false,
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

  // Recommended Card Component
  const RecommendedCard = ({ item, categoryPath }: { item: any, categoryPath: string }) => (
    <Card className="h-full hover:shadow-lg transition-shadow flex flex-col overflow-hidden border-2 border-orange-100 relative">

      <div className="w-fit bg-gradient-to-r from-orange-400 to-red-500 text-white px-4 py-1.5 flex items-center gap-2 font-bold text-sm rounded-tl-xl rounded-br-2xl shadow-sm z-10 absolute top-0 left-0">
        <Trophy className="w-4 h-4 text-white" />
        <span>{item.badgeText || "おすすめ！"}</span>
      </div>

      <CardContent className="p-4 sm:p-5 flex-grow flex flex-col pt-12 sm:pt-14 bg-white/50">

        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
          {item.name}
        </h3>

        {/* Campaign - Added based on request */}
        {item.campaignText && (
          <div className="bg-red-50 text-red-600 text-[10px] sm:text-xs font-bold px-2 py-1.5 rounded border border-red-100 mb-3 inline-block self-start">
            {item.campaignText}
          </div>
        )}

        <div className="space-y-2 mb-4 flex-grow">
          {item.points.map((point: string, i: number) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span className="text-sm text-gray-600 font-medium leading-tight">{point}</span>
            </div>
          ))}
        </div>

        {/* Specs Grid - Added based on request */}
        {item.specs && (
          <div className="grid grid-cols-2 gap-2 mb-4">
            {item.specs.slice(0, 4).map((spec: any, i: number) => (
              <div key={i} className="bg-white border border-gray-100 rounded p-1.5 text-center shadow-sm">
                <div className="text-[10px] text-gray-400 font-medium mb-0.5">{spec.label}</div>
                <div className={`text-xs font-bold ${spec.isHighlight ? "text-red-500" : "text-gray-800"}`}>
                  {spec.value}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-auto space-y-2">
          {item.customAffiliateButton ? (
            item.customAffiliateButton
          ) : (
            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-10 shadow-sm" // Color maintained
              onClick={() => window.open(item.affiliateUrl, '_blank')}
            >
              公式サイト <ExternalLink className="ml-2 w-4 h-4" />
            </Button>
          )}

          <Button
            variant="outline"
            className="w-full bg-gray-50 hover:bg-gray-100 text-gray-500 font-bold border-gray-200 h-10"
            onClick={() => navigate(`${categoryPath}#${item.id}`)}
          >
            詳細を見る <ChevronDown className="ml-1 w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="投資総合ナビ | 株式・FX・暗号資産・投資信託の比較と診断"
        description="投資総合ナビは、株式投資・FX・暗号資産・投資信託など、すべての投資商品を比較・診断する総合投資ガイドです。初心者から中級者まで、最適な投資方法を見つけましょう。2024年最新の投資情報も提供しています。"
        path="/"
      />

      <Header />

      {/* ティッカーテープ */}
      <TickerTape />

      {/* Hero Section */}
      <HeroSection />

      <main className="flex-grow">
        {/* 投資適性診断セクション */}
        <section className="pt-[42px] pb-0 bg-muted/30">
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

        {/* 投資便利ツールセクション */}
        <section className="py-16 sm:py-20 bg-muted/30">
          <div className="container mx-auto px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">投資便利ツール</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                投資判断をサポートする便利な計算ツールやシミュレータ
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
              {tools.map((tool) => (
                <Link key={tool.id} to={(tool as any).customLink || `/tools/${tool.id}`} className="block h-full">
                  <Card className="h-full group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 bg-white/50 backdrop-blur-sm hover:border-orange-200">
                    <CardHeader className="flex flex-col items-center text-center p-4 pb-2">
                      <div className="p-3 bg-orange-500 rounded-xl mb-2 group-hover:scale-110 transition-transform duration-300 shadow-md">
                        <tool.icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-base sm:text-lg font-bold leading-tight">{tool.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center p-4 pt-0">
                      <p className="text-muted-foreground mb-3 text-xs sm:text-sm leading-relaxed line-clamp-2">{tool.description}</p>
                      <div className="w-auto inline-flex px-6 bg-orange-100 text-orange-600 group-hover:bg-orange-200 font-bold text-sm h-9 rounded-lg transition-colors items-center justify-center whitespace-nowrap">
                        ツールを使う
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 証券会社 おすすめポイントセクション */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-8">
            <div className="mb-8">
              <div className="flex items-end justify-between gap-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                  <span className="bg-emerald-100 text-emerald-800 text-sm font-bold px-3 py-1 rounded-full whitespace-nowrap">ネット証券</span>
                  おすすめ口座
                </h2>
                <Link to="/securities-comparison" className="text-emerald-600 font-bold flex items-center hover:underline whitespace-nowrap shrink-0 text-sm sm:text-base">
                  全てを見る <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
              <p className="text-gray-500 mt-2">手数料の安さやポイント還元で選ぶならこの3社</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {securitiesRankingList.slice(0, 3).map((item, index) => (
                <RecommendedCard key={index} item={item} categoryPath="/securities-comparison" />
              ))}
            </div>
          </div>
        </section>

        {/* FX おすすめポイントセクション */}
        <section className="py-16 sm:py-20 bg-muted/30">
          <div className="container mx-auto px-8">
            <div className="mb-8">
              <div className="flex items-end justify-between gap-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                  <span className="bg-blue-100 text-blue-800 text-sm font-bold px-3 py-1 rounded-full whitespace-nowrap">FX</span>
                  おすすめ口座
                </h2>
                <Link to="/fx-comparison" className="text-blue-600 font-bold flex items-center hover:underline whitespace-nowrap shrink-0 text-sm sm:text-base">
                  全てを見る <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
              <p className="text-gray-500 mt-2">スプレッドの狭さとツールの使いやすさが決め手</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {fxRankingList.slice(0, 3).map((item, index) => (
                <RecommendedCard key={index} item={item} categoryPath="/fx-comparison" />
              ))}
            </div>
          </div>
        </section>

        {/* 暗号資産 おすすめポイントセクション */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-8">
            <div className="mb-8">
              <div className="flex items-end justify-between gap-4">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                  <span className="bg-purple-100 text-purple-800 text-sm font-bold px-3 py-1 rounded-full whitespace-nowrap">暗号資産</span>
                  おすすめ取引所
                </h2>
                <Link to="/crypto-comparison" className="text-purple-600 font-bold flex items-center hover:underline whitespace-nowrap shrink-0 text-sm sm:text-base">
                  全てを見る <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
              <p className="text-gray-500 mt-2">取扱通貨数とアプリの使いやすさで厳選</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {cryptoRankingList.slice(0, 3).map((item, index) => (
                <RecommendedCard key={index} item={item} categoryPath="/crypto-comparison" />
              ))}
            </div>
          </div>
        </section>

        {/* 新着記事セクション */}
        <section className="py-16 sm:py-20 bg-muted/30">
          <div className="container mx-auto px-8">
            <div className="mb-8">
              <div className="flex items-end justify-between gap-4">
                <h2 className="text-2xl sm:text-3xl font-bold">新着記事</h2>
                <Link
                  to="/articles"
                  className="text-blue-600 font-bold flex items-center hover:underline whitespace-nowrap shrink-0 text-sm sm:text-base"
                >
                  全てを見る
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
              <p className="text-muted-foreground mt-2">
                最新の投資ニュースやテクニカル分析をチェック
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {articles
                .filter(article => article.isPopular)
                .slice(0, 9)
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
                        <a
                          href={article.type === 'guide' ? `/guide/${article.id}` : `/articles/${article.id}`}
                          className="hover:text-primary transition-colors"
                        >
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

                      </div>
                      <button
                        className="w-full mt-3 px-4 py-2 bg-blue-100 text-primary rounded-md hover:bg-blue-200 transition-colors whitespace-nowrap"
                        onClick={() => {
                          if (article.type === 'guide') {
                            navigate(`/guide/${article.id}`);
                          } else {
                            navigate(`/articles/${article.id}`);
                          }
                        }}
                      >
                        記事を読む
                      </button>
                    </CardContent>
                  </Card>
                ))}
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Index;