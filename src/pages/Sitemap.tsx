import { Link } from "react-router-dom";
import { ChevronLeft, Home, BookOpen, TrendingUp, Calculator, List, FileText, PieChart, LineChart, Coins, ShieldCheck, HelpCircle } from "lucide-react";

const Sitemap = () => {
  // サイトマップの構造を定義
  const sitemapStructure = [
    {
      category: "メインページ",
      icon: Home,
      items: [
        { name: "ホーム", href: "/" },
        { name: "ホーム (Version 2)", href: "/top2" },
      ]
    },
    {
      category: "投資の基礎知識",
      icon: BookOpen,
      items: [
        { name: "投資の基礎", href: "/basics" },
        { name: "株式投資の基礎", href: "/stocks" },
        { name: "NISA・つみたてNISA", href: "/nisa" },
        { name: "投資信託の基礎", href: "/investment-trust" },
        { name: "暗号資産の基礎", href: "/crypto" },
      ]
    },
    {
      category: "比較・ランキング",
      icon: List,
      items: [
        { name: "証券会社比較", href: "/securities-comparison" },
        { name: "FX業者比較", href: "/fx-comparison" },
        { name: "暗号資産取引所比較", href: "/crypto-comparison" },
        { name: "総合比較ページ", href: "/comparison" },
      ]
    },
    {
      category: "投資ツール",
      icon: Calculator,
      items: [
        { name: "ツール一覧", href: "/tools" },
        { name: "複利計算ツール", href: "/tools/compound-interest" },
        { name: "株式リターン計算", href: "/tools/stock-return" },
        { name: "投信リターン計算", href: "/tools/fund-return" },
        { name: "暗号リターン計算", href: "/tools/crypto-return" },
        { name: "貯蓄シミュレーション", href: "/tools/saving-calculator" },
        { name: "リスク許容度診断", href: "/tools/risk-assessment" },
        { name: "FX計算/証拠金シミュレータ", href: "/tools/fx-calculator" },
        { name: "ポートフォリオ分析", href: "/tools/portfolio-analysis" },
        { name: "投資適性診断", href: "/risk-diagnostic" },
      ]
    },
    {
      category: "特集・ガイド",
      icon: ShieldCheck,
      items: [
        { name: "NISA完全ガイド", href: "/guide/nisa-beginner" },
        { name: "株式投資ロードマップ", href: "/guide/stocks-beginner" },
        { name: "投資信託の選び方", href: "/guide/investment-trust" },
        { name: "マネープラン基礎", href: "/guide/investment-basics" },
        { name: "財務分析ガイド", href: "/guide/financial-analysis" },
      ]
    },
    {
      category: "AI・最新記事",
      icon: TrendingUp,
      items: [
        { name: "AI株式予測モデル", href: "/articles/ml-stock-prediction" },
        { name: "ディープラーニング為替予測", href: "/articles/dl-forex-prediction" },
        { name: "AIポートフォリオ最適化", href: "/articles/ai-portfolio-optimization" },
        { name: "デイトレ vs 中長期投資", href: "/articles/daytrade-vs-longterm-2026" },
        { name: "テンバガー候補10選", href: "/articles/tenbagger-candidate-2026" },
        { name: "記事一覧ページ", href: "/articles" },
      ]
    },
    {
      category: "証券会社詳細",
      icon: FileText,
      items: [
        { name: "SBI証券 詳細", href: "/securities/sbi" },
        { name: "楽天証券 詳細", href: "/securities/rakuten" },
        { name: "マネックス証券 詳細", href: "/securities/monex" },
        { name: "GMOクリック証券 詳細", href: "/securities/gmo-click" },
        { name: "松井証券 詳細", href: "/securities/matsui" },
        { name: "DMM株 詳細", href: "/securities/dmm" },
      ]
    },
    {
      category: "FX業者詳細",
      icon: LineChart,
      items: [
        { name: "DMM FX 詳細", href: "/fx/dmm-fx" },
        { name: "SBI FXトレード 詳細", href: "/fx/sbi-fx" },
        { name: "外為どっとコム 詳細", href: "/fx/gaitame" },
        { name: "IG証券 FX 詳細", href: "/fx/ig" },
        { name: "楽天FX 詳細", href: "/fx/rakuten" },
        { name: "松井証券 FX 詳細", href: "/fx/matsui-fx" },
      ]
    },
    {
      category: "暗号資産詳細",
      icon: Coins,
      items: [
        { name: "GMOコイン 詳細", href: "/crypto/gmo-coin" },
        { name: "bitFlyer 詳細", href: "/crypto/bitflyer" },
        { name: "Coincheck 詳細", href: "/crypto/coincheck" },
        { name: "DMM Bitcoin 詳細", href: "/crypto/dmm-bitcoin" },
        { name: "SBI VCトレード 詳細", href: "/crypto/sbi-vc-trade" },
      ]
    },
    {
      category: "サイト情報",
      icon: HelpCircle,
      items: [
        { name: "運営会社", href: "/company" },
        { name: "お問い合わせ", href: "/contact" },
        { name: "プライバシーポリシー", href: "/privacy" },
        { name: "利用規約", href: "/terms" },
        { name: "免責事項", href: "/disclaimer" },
        { name: "特定商取引法に基づく表記", href: "/legal" },
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* ヘッダー */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary/80 transition-colors group"
          >
            <ChevronLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
            ホームに戻る
          </Link>
        </div>
      </div>

      {/* メインコンテンツ */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
                サイトマップ
              </h1>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                投資総合ナビ(Invest Navi) のすべてのコンテンツを網羅。最新の投資情報、比較ランキング、便利ツールへ素早くアクセスできます。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sitemapStructure.map((section, index) => (
                <div
                  key={index}
                  className="bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 p-8 rounded-2xl group"
                >
                  <div className="flex items-center mb-6">
                    <div className="bg-primary/10 p-3 rounded-xl mr-4 group-hover:bg-primary group-hover:text-white transition-colors">
                      <section.icon className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800">{section.category}</h2>
                  </div>

                  <ul className="space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <Link
                          to={item.href}
                          className="text-slate-600 hover:text-primary transition-colors flex items-center py-1 group/item"
                        >
                          <span className="w-1.5 h-1.5 bg-slate-300 group-hover/item:bg-primary rounded-full mr-3 shrink-0 transition-colors"></span>
                          <span className="text-[15px] font-medium leading-relaxed">{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* 更新日 */}
            <div className="pt-12 border-t border-slate-200 mt-20 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-6">
                <Link to="/privacy" className="text-sm text-slate-400 hover:text-primary">プライバシー</Link>
                <Link to="/terms" className="text-sm text-slate-400 hover:text-primary">利用規約</Link>
                <Link to="/contact" className="text-sm text-slate-400 hover:text-primary">お問い合わせ</Link>
              </div>
              <p className="text-sm text-slate-400">
                最終更新日：2026年1月26日
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Sitemap;
