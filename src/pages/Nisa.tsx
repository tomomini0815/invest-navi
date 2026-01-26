import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, PieChart, Calculator, Lightbulb, Users, Award, TrendingUp } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Nisa = () => {
  const location = useLocation();

  // シミュレーション用の状態管理
  const [monthlyAmount, setMonthlyAmount] = useState("5000");
  const [years, setYears] = useState("20");
  const [annualReturn, setAnnualReturn] = useState("5");

  // シミュレーション結果の計算
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [futureValue, setFutureValue] = useState(0);
  const [profit, setProfit] = useState(0);

  // シミュレーション結果を計算するエフェクト
  useEffect(() => {
    const monthly = parseFloat(monthlyAmount) || 0;
    const yearsNum = parseFloat(years) || 0;
    const rate = parseFloat(annualReturn) / 100 || 0;

    // 総投資額の計算
    const total = monthly * 12 * yearsNum;
    setTotalInvestment(total);

    // 将来価値の計算（複利計算）
    if (rate === 0) {
      setFutureValue(total);
    } else {
      const monthlyRate = rate / 12;
      const months = yearsNum * 12;
      const fv = monthly * (((1 + monthlyRate) ** months - 1) / monthlyRate);
      setFutureValue(Math.round(fv));
    }

    // 利益の計算
    setProfit(Math.round(futureValue - total));
  }, [monthlyAmount, years, annualReturn, futureValue]);

  // ページ遷移後に診断セクションやハッシュの場所までスクロールする
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300); // 描画待ちのために少し遅延
    } else if (location.state?.fromNisaLink) {
      // 少し遅延させてからスクロール
      const timer = setTimeout(() => {
        const element = document.getElementById("診断");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [location]);

  // 目次項目
  const tableOfContents = [
    { id: "nisa-basics", title: "NISA・つみたてNISAの基本と違い" },
    { id: "nisa-trends", title: "2024年〜2025年最新のNISA動向" },
    { id: "nisa-account", title: "NISA口座の開設手順" },
    { id: "nisa-campaigns", title: "2024年〜2025年最新の開設キャンペーン" },
    { id: "nisa-strategy", title: "NISAでの投資戦略とおすすめ商品" },
    { id: "nisa-products", title: "2024年〜2025年おすすめの新商品" },
    { id: "nisa-simulation", title: "NISA投資シミュレーション" },
    { id: "nisa-tax", title: "NISAの税制優遇と節税効果" },
    { id: "nisa-tax-changes", title: "2024年〜2025年最新の税制改正動向" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>NISA・つみたてNISA投資ガイド | 非課税制度を活用した資産運用</title>
        <meta name="description" content="NISA・つみたてNISAの基本から投資戦略、おすすめ商品まで徹底解説。非課税制度を活用して効率的な資産運用を始めましょう。" />
        <meta name="keywords" content="NISA,つみたてNISA,投資,資産運用,非課税制度,投資信託,積立投資" />
        <link rel="canonical" href="https://www.invest-navi.com/nisa" />

        {/* Open Graph */}
        <meta property="og:title" content="NISA・つみたてNISA投資ガイド | 非課税制度を活用した資産運用" />
        <meta property="og:description" content="NISA・つみたてNISAの基本から投資戦略、おすすめ商品まで徹底解説。非課税制度を活用して効率的な資産運用を始めましょう。" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.invest-navi.com/nisa" />
        <meta property="og:site_name" content="投資総合ガイド" />
        <meta property="og:locale" content="ja_JP" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@toushi_navi" />

        {/* 構造化マークアップ */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "NISA・つみたてNISA投資ガイド | 非課税制度を活用した資産運用",
            "description": "NISA・つみたてNISAの基本から投資戦略、おすすめ商品まで徹底解説。非課税制度を活用して効率的な資産運用を始めましょう。",
            "author": {
              "@type": "Organization",
              "name": "投資総合ガイド"
            },
            "publisher": {
              "@type": "Organization",
              "name": "投資総合ガイド",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.invest-navi.com/logo.png"
              }
            },
            "datePublished": "2024-10-30",
            "dateModified": "2024-10-30",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://www.invest-navi.com/nisa"
            }
          })}
        </script>
      </Helmet>

      <Header />

      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="bg-gradient-to-r from-muted/50 to-muted/30 py-4 border-b">
          <div className="container mx-auto px-8">
            <Link
              to="/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
              トップページに戻る
            </Link>
          </div>
        </div>

        {/* ヒーローセクション */}
        <section className="relative py-20 container mx-auto px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-accent/5 animate-fade-in" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <Badge variant="secondary" className="mb-6 px-6 py-2 text-sm font-semibold animate-fade-in hover:scale-105 transition-transform">
              投資の基礎知識
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent animate-fade-in">
              NISA・つみたてNISA投資ガイド
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
              非課税制度を活用した資産運用で、あなたの未来をしっかりサポート
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Button asChild size="lg" className="px-8 py-6 text-lg hover:scale-105 transition-transform">
                <Link
                  to="/"
                  state={{ fromNisaLink: true }}
                >
                  投資診断を始める
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg hover:scale-105 transition-transform">
                <Link to="/comparison">証券会社を比較</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* 目次セクション */}
        <section className="py-4 bg-gradient-to-b from-muted/30 to-background border-b">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="border-2 hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-primary" />
                    目次
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {tableOfContents.map((item, index) => (
                      <div key={item.id} className="flex items-start gap-2 p-1 rounded hover:bg-muted/50 transition-colors">
                        <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <a
                          href={`#${item.id}`}
                          className="text-base text-primary hover:text-secondary hover:underline transition-colors"
                        >
                          {item.title}
                        </a>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* NISA基本情報セクション */}
        <section id="nisa-basics" className="py-16 sm:py-20 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">NISA・つみたてNISAの基本と違い</h2>

              <Card className="mb-12 overflow-hidden border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/50">
                <CardHeader>
                  <CardTitle className="text-2xl">NISAとは？</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <p className="mb-4">NISA（少額投資非課税制度）とは、個人が株式や投資信託などの金融商品に投資した際の利益（配当金・分配金・売却益）が非課税となる制度です。2014年に導入され、2024年現在も継続されています。</p>

                    <h3 className="text-xl font-bold mb-3">つみたてNISAとは？</h3>
                    <p className="mb-4">つみたてNISAは、2018年に導入された長期的な資産形成に適した投資信託に特化したNISAです。毎月少額ずつ積み立てながら、インデックス型投資信託などの低コストで分散投資が可能な商品に投資できます。</p>

                    <h3 className="text-xl font-bold mb-3">NISAとつみたてNISAの違い</h3>
                    <div className="overflow-x-auto mb-4">
                      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="py-2 px-4 border-b text-left">項目</th>
                            <th className="py-2 px-4 border-b text-left">NISA</th>
                            <th className="py-2 px-4 border-b text-left">つみたてNISA</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="py-2 px-4 border-b">対象商品</td>
                            <td className="py-2 px-4 border-b">株式、投資信託、ETF、ETNなど</td>
                            <td className="py-2 px-4 border-b">特定のインデックス型投資信託など</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="py-2 px-4 border-b">非課税枠</td>
                            <td className="py-2 px-4 border-b">年間120万円（累計1,000万円）</td>
                            <td className="py-2 px-4 border-b">年間40万円（累計800万円）</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-4 border-b">非課税期間</td>
                            <td className="py-2 px-4 border-b">5年間</td>
                            <td className="py-2 px-4 border-b">20年間</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="py-2 px-4 border-b">売却ルール</td>
                            <td className="py-2 px-4 border-b">特定口座で管理（源泉分離課税）</td>
                            <td className="py-2 px-4 border-b">特定口座で管理（源泉分離課税）</td>
                          </tr>
                          <tr>
                            <td className="py-2 px-4 border-b">積立投資</td>
                            <td className="py-2 px-4 border-b">任意</td>
                            <td className="py-2 px-4 border-b">推奨（自動引き落とし）</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <h3 className="text-xl font-bold mb-3">新NISA制度</h3>
                    <p className="mb-4">2024年から新NISA制度が始まりました。年間180万円の非課税枠（うち120万円が分配金・配当金、60万円が譲渡益）が導入され、従来のNISAとつみたてNISAが統合されました。新NISAは、従来の制度のメリットを活かしつつ、より柔軟な運用が可能になっています。</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 2024年最新のNISA動向セクション */}
        <section id="nisa-trends" className="py-16 sm:py-20 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">2024年〜2025年最新のNISA動向</h2>

              <Card className="mb-12 overflow-hidden border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/50">
                <CardHeader>
                  <CardTitle className="text-2xl">新NISA制度の概要と特徴</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <h3 className="text-xl font-bold mb-3">新NISA制度の開始</h3>
                    <p className="mb-4">2024年1月から新NISA制度が始まりました。年間180万円の非課税枠（うち120万円が分配金・配当金、60万円が譲渡益）が導入され、従来のNISAとつみたてNISAが統合されました。新NISAは、従来の制度のメリットを活かしつつ、より柔軟な運用が可能になっています。</p>

                    <h3 className="text-xl font-bold mb-3">新NISAの特徴</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="border-l-4 border-blue-500 pl-4 hover:bg-blue-50/50 transition-colors duration-300 p-4 rounded-r-lg">
                        <h4 className="font-bold text-blue-700 mb-2">統一された非課税枠</h4>
                        <p>従来のNISAとつみたてNISAの枠が統合され、年間180万円の非課税枠が設定されました。これにより、投資家の選択肢が広がり、より柔軟な資産運用が可能になりました。</p>
                      </div>
                      <div className="border-l-4 border-green-500 pl-4 hover:bg-green-50/50 transition-colors duration-300 p-4 rounded-r-lg">
                        <h4 className="font-bold text-green-700 mb-2">積立投資の推奨</h4>
                        <p>つみたてNISAの特徴である積立投資が推奨され、自動引き落とし機能が充実しています。これにより、ドルコスト平均法によるリスク分散が容易になりました。</p>
                      </div>
                      <div className="border-l-4 border-purple-500 pl-4 hover:bg-purple-50/50 transition-colors duration-300 p-4 rounded-r-lg">
                        <h4 className="font-bold text-purple-700 mb-2">商品の多様化</h4>
                        <p>対象商品が拡大し、株式、投資信託、ETF、ETNだけでなく、REITや外国株式なども対象となりました。これにより、より多様な資産運用が可能になりました。</p>
                      </div>
                      <div className="border-l-4 border-yellow-500 pl-4 hover:bg-yellow-50/50 transition-colors duration-300 p-4 rounded-r-lg">
                        <h4 className="font-bold text-yellow-700 mb-2">非課税期間の延長</h4>
                        <p>非課税期間が最長20年間となり、長期的な資産形成が可能になりました。これにより、複利効果を最大限に活用できます。</p>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-3">2025年の展望</h3>
                    <p className="mb-4">2025年には、新NISA制度のさらなる拡充が予定されています。具体的には、対象商品のさらなる拡大や、運用会社の選択肢の増加が期待されています。また、デジタル化の推進により、より使いやすいUI/UXの提供も予定されています。</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* NISA口座開設手順セクション */}
        <section id="nisa-account" className="py-16 sm:py-20 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">NISA口座の開設手順</h2>

              <Card className="mb-12 overflow-hidden border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/50">
                <CardHeader>
                  <CardTitle className="text-2xl">NISA口座開設の流れ</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <ol className="list-decimal pl-5 mb-4 space-y-2">
                      <li>証券会社を選ぶ</li>
                      <li>必要な書類を準備する</li>
                      <li>口座開設申込書に記入する</li>
                      <li>本人確認と印鑑証明書の提出</li>
                      <li>口座開設の完了</li>
                    </ol>

                    <h3 className="text-xl font-bold mb-3">証券会社の選び方</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-green-50 p-4 rounded-lg hover:bg-green-100 transition-colors duration-300">
                        <h4 className="font-bold text-green-800 mb-2">チェックポイント</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>手数料の安さ</li>
                          <li>取扱商品の充実度</li>
                          <li>使いやすい取引ツール</li>
                          <li>信頼性と実績</li>
                          <li>サポート体制</li>
                        </ul>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition-colors duration-300">
                        <h4 className="font-bold text-blue-800 mb-2">注意点</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>キャンペーンの条件を確認</li>
                          <li>年会費や管理費の有無</li>
                          <li>振込手数料の設定</li>
                          <li>利用可能なNISAの種類</li>
                        </ul>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-3">必要な書類</h3>
                    <ul className="list-disc pl-5 mb-4 space-y-1">
                      <li>本人確認書類（運転免許証、パスポートなど）</li>
                      <li>印鑑（認印）</li>
                      <li>印鑑証明書（市区町村で発行、3か月以内）</li>
                      <li>源泉徴収票または確定申告書（一部の証券会社）</li>
                    </ul>

                    <h3 className="text-xl font-bold mb-3">口座開設後の注意点</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>年間非課税枠の管理</li>
                      <li>非課税期間の確認</li>
                      <li>売却時の注意（特定口座での管理）</li>
                      <li>他の口座との使い分け</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 2024年最新の開設キャンペーンセクション */}
        <section id="nisa-campaigns" className="py-16 sm:py-20 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">2024年〜2025年最新の開設キャンペーン</h2>

              <Card className="mb-12 overflow-hidden border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/50">
                <CardHeader>
                  <CardTitle className="text-2xl">主要証券会社のNISA口座開設キャンペーン</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <h3 className="text-xl font-bold mb-3">2024年上半期のキャンペーン状況</h3>
                    <p className="mb-4">新NISA制度の開始に伴い、各証券会社では新規口座開設者向けのキャンペーンを実施しています。現金プレゼントやポイント還元など、お得なキャンペーンも多数ありますので、比較検討することをおすすめします。</p>

                    <h3 className="text-xl font-bold mb-3">主要証券会社のキャンペーン</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="border border-blue-300 rounded-lg p-4 hover:bg-blue-50/50 transition-colors duration-300">
                        <h4 className="font-bold text-blue-700 mb-2">SBI証券</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          <li>新NISA口座開設で最大5,000円のキャッシュバック</li>
                          <li>取引手数料が最大10回まで無料</li>
                          <li>つみたてNISA対象ファンドの信託報酬が0.2%引き</li>
                        </ul>
                      </div>
                      <div className="border border-green-300 rounded-lg p-4 hover:bg-green-50/50 transition-colors duration-300">
                        <h4 className="font-bold text-green-700 mb-2">楽天証券</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          <li>新NISA口座開設で最大10,000円の楽天ポイント</li>
                          <li>楽天市場での利用で最大10倍のポイント還元</li>
                          <li>楽天銀行口座との連携で振込手数料が無料</li>
                        </ul>
                      </div>
                      <div className="border border-purple-300 rounded-lg p-4 hover:bg-purple-50/50 transition-colors duration-300">
                        <h4 className="font-bold text-purple-700 mb-2">マネックス証券</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          <li>新NISA口座開設で最大7,000円相当の商品券</li>
                          <li>取引手数料が最大20回まで無料</li>
                          <li>マネックス証券が選ぶ厳選ファンドが信託報酬0.3%引き</li>
                        </ul>
                      </div>
                      <div className="border border-yellow-300 rounded-lg p-4 hover:bg-yellow-50/50 transition-colors duration-300">
                        <h4 className="font-bold text-yellow-700 mb-2">auカブコム証券</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          <li>新NISA口座開設で最大3,000円のau PAYポイント</li>
                          <li>au PAYカードでの入金で最大1.0%のキャッシュバック</li>
                          <li>auじぶん銀行口座との連携で振込手数料が最大3回無料</li>
                        </ul>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-3">2025年のキャンペーン予測</h3>
                    <p className="mb-4">2025年には、新NISA制度への適応が進むに従って、キャンペーン内容もより洗練されることが予想されます。特に、デジタル資産（暗号資産など）への投資を促進するキャンペーンや、ESG投資を推進するキャンペーンが増える可能性があります。</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* NISA投資戦略とおすすめ商品セクション */}
        <section id="nisa-strategy" className="py-16 sm:py-20 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">NISAでの投資戦略とおすすめ商品</h2>

              <Card className="mb-12 overflow-hidden border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/50">
                <CardHeader>
                  <CardTitle className="text-2xl">NISA投資の基本戦略</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <p className="mb-4">NISA口座での投資では、非課税枠を最大限に活用することが重要です。長期的な資産形成を目指す場合は、分散投資とドルコスト平均法による積立投資が効果的です。</p>

                    <h3 className="text-xl font-bold mb-3">おすすめ投資商品</h3>
                    <div className="space-y-4 mb-4">
                      <div className="border-l-4 border-blue-500 pl-4 hover:bg-blue-50/50 transition-colors duration-300 p-4 rounded-r-lg">
                        <h4 className="font-bold text-blue-700 mb-2">インデックス型投資信託</h4>
                        <p>市場全体の動きに連動するため、リスク分散が図れ、信託報酬も比較的安価です。つみたてNISAの対象商品としても推奨されています。</p>
                      </div>

                      <div className="border-l-4 border-green-500 pl-4 hover:bg-green-50/50 transition-colors duration-300 p-4 rounded-r-lg">
                        <h4 className="font-bold text-green-700 mb-2">ETF（上場投資信託）</h4>
                        <p>株式のように取引所で売買できる投資信託で、手数料が安くて流動性が高いのが特徴です。日本株、米国株、先進国株など多様な商品があります。</p>
                      </div>

                      <div className="border-l-4 border-purple-500 pl-4 hover:bg-purple-50/50 transition-colors duration-300 p-4 rounded-r-lg">
                        <h4 className="font-bold text-purple-700 mb-2">個人向け国債（変動金利型）</h4>
                        <p>元本が保証され、金利が変動する国債です。リスクが低く安定した運用を求める方におすすめです。</p>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-3">ポートフォリオの組み方</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-blue-50 p-4 rounded-lg text-center hover:bg-blue-100 transition-colors duration-300">
                        <PieChart className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                        <h4 className="font-bold text-blue-800 mb-1">国内株式</h4>
                        <p className="text-sm">30-40%</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg text-center hover:bg-green-100 transition-colors duration-300">
                        <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-2" />
                        <h4 className="font-bold text-green-800 mb-1">海外株式</h4>
                        <p className="text-sm">40-50%</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg text-center hover:bg-purple-100 transition-colors duration-300">
                        <Award className="h-12 w-12 text-purple-600 mx-auto mb-2" />
                        <h4 className="font-bold text-purple-800 mb-1">債券・その他</h4>
                        <p className="text-sm">10-20%</p>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-3">リスク管理とリバランス</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>定期的にポートフォリオを見直す（年1-2回）</li>
                      <li>資産配分が目標から大きくずれた場合は調整する</li>
                      <li>市場の変動に一喜一憂せず、長期的な視点を持つ</li>
                      <li>自分のリスク許容度に合った運用を行う</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 2024年おすすめの新商品セクション */}
        <section id="nisa-products" className="py-16 sm:py-20 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">2024年〜2025年おすすめの新商品</h2>

              <Card className="mb-12 overflow-hidden border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/50">
                <CardHeader>
                  <CardTitle className="text-2xl">新NISA制度に対応した最新投資商品</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <h3 className="text-xl font-bold mb-3">2024年上半期の新商品トレンド</h3>
                    <p className="mb-4">新NISA制度の開始に伴い、各運用会社から新しい投資信託商品が多数発売されています。特に、ESG投資（環境・社会・ガバナンス）に特化した商品や、AIを活用した運用商品などが注目されています。</p>

                    <h3 className="text-xl font-bold mb-3">2024年おすすめの新商品</h3>
                    <div className="space-y-6 mb-6">
                      <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50/50 transition-colors duration-300">
                        <h4 className="font-bold text-lg mb-2">楽天・全世界ESG株式インデックスファンド</h4>
                        <p className="text-sm text-muted-foreground mb-2">ESG基準に基づいて選定された世界中の企業に投資するインデックスファンド。環境、社会、ガバナンスの観点から優れた企業に絞って投資することで、持続可能な資産形成を目指します。</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="secondary">ESG投資</Badge>
                          <Badge variant="secondary">インデックス型</Badge>
                          <Badge variant="secondary">全世界株式</Badge>
                        </div>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50/50 transition-colors duration-300">
                        <h4 className="font-bold text-lg mb-2">ニッセイ・ファンド・マネージャーズ AIグローバル株式ファンド</h4>
                        <p className="text-sm text-muted-foreground mb-2">AI技術を活用して世界の有望株式を自動選定・運用するアクティブ型ファンド。機械学習アルゴリズムにより、市場の動向を分析し、最適なポートフォリオを構築します。</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="secondary">AI運用</Badge>
                          <Badge variant="secondary">アクティブ型</Badge>
                          <Badge variant="secondary">グローバル株式</Badge>
                        </div>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50/50 transition-colors duration-300">
                        <h4 className="font-bold text-lg mb-2">eMAXIS Slim 米国ハイテク株式（NASDAQ100）</h4>
                        <p className="text-sm text-muted-foreground mb-2">NASDAQ100指数に連動するインデックスファンドで、米国のハイテク企業に集中投資できます。信託報酬が0.1145%と非常に低く、コスト効率に優れています。</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="secondary">ハイテク株式</Badge>
                          <Badge variant="secondary">インデックス型</Badge>
                          <Badge variant="secondary">米国株式</Badge>
                        </div>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50/50 transition-colors duration-300">
                        <h4 className="font-bold text-lg mb-2">三井住友・アセットマネジメント バランスESGファンド</h4>
                        <p className="text-sm text-muted-foreground mb-2">株式と債券のバランス型ファンドで、ESG基準に基づいた運用を行います。リスクとリターンのバランスを重視しつつ、持続可能な投資を実現します。</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge variant="secondary">バランス型</Badge>
                          <Badge variant="secondary">ESG投資</Badge>
                          <Badge variant="secondary">株式・債券</Badge>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-3">2025年以降の新商品予測</h3>
                    <p className="mb-4">2025年以降には、デジタル資産（暗号資産など）への投資が可能な投資信託や、ブロックチェーン技術を活用した運用商品が登場する可能性があります。また、より細分化されたテーマ投資商品（例えば、AI関連、宇宙関連、医療関連など）も増えると予想されます。</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* NISA投資シミュレーションツール */}
        <section id="nisa-simulation" className="py-16 sm:py-20 bg-gradient-to-b from-muted/30 to-background scroll-mt-28">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="overflow-hidden border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Calculator className="h-8 w-8 text-primary" />
                    NISA投資シミュレーション
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-8 text-lg">
                    月々の積立額と運用年数を入力して、将来の資産形成イメージをシミュレーションできます。
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label htmlFor="monthlyAmount" className="block text-base font-medium mb-3">
                        月々の積立額（円）
                      </label>
                      <input
                        type="number"
                        id="monthlyAmount"
                        className="w-full px-4 py-3 border border-input rounded-lg text-lg hover:border-primary/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="5,000"
                        value={monthlyAmount}
                        onChange={(e) => setMonthlyAmount(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="years" className="block text-base font-medium mb-3">
                        運用年数
                      </label>
                      <input
                        type="number"
                        id="years"
                        className="w-full px-4 py-3 border border-input rounded-lg text-lg hover:border-primary/50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="20"
                        value={years}
                        onChange={(e) => setYears(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="mt-8">
                    <label htmlFor="annualReturn" className="block text-base font-medium mb-3">
                      年間リターン（%）
                    </label>
                    <input
                      type="range"
                      id="annualReturn"
                      min="1"
                      max="15"
                      step="0.1"
                      value={annualReturn}
                      onChange={(e) => setAnnualReturn(e.target.value)}
                      className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer hover:accent-primary transition-colors"
                    />
                    <div className="flex justify-between text-base text-muted-foreground mt-2">
                      <span>1%</span>
                      <span className="font-medium text-lg">{annualReturn}%</span>
                      <span>15%</span>
                    </div>
                  </div>
                  <div className="mt-10 p-6 bg-primary/5 rounded-xl hover:bg-primary/10 transition-colors duration-300">
                    <h3 className="font-bold text-xl mb-4">シミュレーション結果</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-300">
                        <p className="text-base text-muted-foreground">総投資額</p>
                        <p className="text-2xl font-bold mt-2">¥{totalInvestment.toLocaleString()}</p>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-300">
                        <p className="text-base text-muted-foreground">評価額</p>
                        <p className="text-2xl font-bold text-primary mt-2">¥{futureValue.toLocaleString()}</p>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-300">
                        <p className="text-base text-muted-foreground">利益</p>
                        <p className="text-2xl font-bold text-green-600 mt-2">¥{profit.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* NISAの税制優遇と節税効果セクション */}
        <section id="nisa-tax" className="py-16 sm:py-20 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">NISAの税制優遇と節税効果</h2>

              <Card className="mb-12 overflow-hidden border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/50">
                <CardHeader>
                  <CardTitle className="text-2xl">NISAの税制優遇内容</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <p className="mb-4">NISAでは、投資で得た利益（配当金・分配金・売却益）が非課税になります。これは、通常の特定口座では利益に応じて約20%の税金（所得税15%、住民税5%）がかかるのに対し、NISA口座ではその税金がかからないという大きなメリットです。</p>

                    <h3 className="text-xl font-bold mb-3">節税効果の計算例</h3>
                    <div className="bg-yellow-50 p-4 rounded-lg mb-4 hover:bg-yellow-100/50 transition-colors duration-300">
                      <h4 className="font-bold text-yellow-800 mb-2">例：年間120万円の利益を得た場合</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>通常の特定口座：120万円 × 20% = 24万円の税金</li>
                        <li>NISA口座：0円の税金</li>
                        <li><strong>節税効果：24万円</strong></li>
                      </ul>
                    </div>

                    <h3 className="text-xl font-bold mb-3">新NISAの節税効果</h3>
                    <p className="mb-4">2024年から始まった新NISAでは、年間180万円の非課税枠があります。そのうち120万円が分配金・配当金、60万円が譲渡益の非課税枠です。</p>

                    <div className="bg-green-50 p-4 rounded-lg mb-4 hover:bg-green-100/50 transition-colors duration-300">
                      <h4 className="font-bold text-green-800 mb-2">新NISAの節税効果計算例</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>分配金・配当金：120万円 × 20% = 24万円の節税</li>
                        <li>譲渡益：60万円 × 20% = 12万円の節税</li>
                        <li><strong>合計節税効果：36万円</strong></li>
                      </ul>
                    </div>

                    <h3 className="text-xl font-bold mb-3">NISAと他の制度の併用</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="border border-blue-300 rounded-lg p-4 hover:bg-blue-50/50 transition-colors duration-300">
                        <h4 className="font-bold text-blue-700 mb-2">iDeCoとの併用</h4>
                        <p className="text-sm">NISAとiDeCo（個人型確定拠出年金）は併用可能です。両制度を活用することで、より大きな節税効果と資産形成が期待できます。</p>
                      </div>
                      <div className="border border-green-300 rounded-lg p-4 hover:bg-green-50/50 transition-colors duration-300">
                        <h4 className="font-bold text-green-700 mb-2">一般の特定口座との併用</h4>
                        <p className="text-sm">NISA口座と一般の特定口座を併用することも可能です。目的に応じて使い分けることで、より効率的な資産運用ができます。</p>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-3">節税効果を最大限に活用するポイント</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>年間非課税枠を最大限に活用する</li>
                      <li>長期的な運用で複利効果を活かす</li>
                      <li>適切な分散投資でリスクを管理する</li>
                      <li>他の節税制度と組み合わせる</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 2024年最新の税制改正動向セクション */}
        <section id="nisa-tax-changes" className="py-16 sm:py-20 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">2024年〜2025年最新の税制改正動向</h2>

              <Card className="mb-12 overflow-hidden border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/50">
                <CardHeader>
                  <CardTitle className="text-2xl">NISA関連の税制改正と今後の展望</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <h3 className="text-xl font-bold mb-3">2024年の税制改正内容</h3>
                    <p className="mb-4">新NISA制度の開始に伴い、関連する税制も見直されています。特に、譲渡益の申告方法や損益通算の取り扱いについて、より分かりやすくするための改正が行われています。</p>

                    <h3 className="text-xl font-bold mb-3">主な税制改正点</h3>
                    <div className="space-y-4 mb-6">
                      <div className="border-l-4 border-blue-500 pl-4 hover:bg-blue-50/50 transition-colors duration-300 p-4 rounded-r-lg">
                        <h4 className="font-bold text-blue-700 mb-2">譲渡益の申告方法の簡素化</h4>
                        <p>新NISA口座での取引は、特定口座の源泉分離課税方式により、確定申告の必要がなくなりました。これにより、手続きが大幅に簡素化されています。</p>
                      </div>

                      <div className="border-l-4 border-green-500 pl-4 hover:bg-green-50/50 transition-colors duration-300 p-4 rounded-r-lg">
                        <h4 className="font-bold text-green-700 mb-2">損益通算の取り扱い</h4>
                        <p>新NISA口座での損失は、他の口座との損益通算はできませんが、同口座内でのみ損益通算が可能です。これにより、口座内のリスク管理が容易になりました。</p>
                      </div>

                      <div className="border-l-4 border-purple-500 pl-4 hover:bg-purple-50/50 transition-colors duration-300 p-4 rounded-r-lg">
                        <h4 className="font-bold text-purple-700 mb-2">非課税期間の延長</h4>
                        <p>非課税期間が最長20年間となり、長期的な資産形成が可能になりました。これにより、複利効果を最大限に活用できます。</p>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-3">2025年の税制改正予測</h3>
                    <p className="mb-4">2025年には、新NISA制度のさらなる拡充に伴って、関連する税制改正が行われる可能性があります。特に、デジタル資産（暗号資産など）への投資に関する税制の整備や、海外投資に関する税制の見直しが予想されます。</p>

                    <h3 className="text-xl font-bold mb-3">国際的な税制動向との連携</h3>
                    <p className="mb-4">日本だけでなく、G7やOECDなどの国際的な枠組みでも税制の harmonization（調和）が進められています。特に、最低税率の導入や、デジタルサービスに対する課税ルールの整備などが注目されています。これらの国際的な動向も、日本のNISA制度に影響を与える可能性があります。</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* NISA口座開設の勧誘セクション */}
        <section className="py-16 sm:py-20 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="relative overflow-hidden bg-gradient-to-br from-secondary/20 via-accent/10 to-primary/20 border-2 border-secondary/30 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-transparent opacity-50" />
                <CardContent className="p-10 text-center relative z-10">
                  <div className="inline-block p-4 bg-background rounded-full mb-6 animate-pulse">
                    <Lightbulb className="h-12 w-12 text-secondary" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">NISA口座開設で投資を始めよう</h2>
                  <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                    NISAの基本を学んだら、次は実際に口座を開設して投資を始めてみましょう。
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" className="text-lg px-8 hover:scale-105 transition-transform">
                      <Link to="/comparison">
                        証券会社を比較する →
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="text-lg px-8 hover:scale-105 transition-transform">
                      <Link to="/#診断">
                        投資診断を始める
                      </Link>
                    </Button>
                  </div>
                  <div className="mt-8 pt-8 border-t border-blue-300">
                    <h3 className="text-lg font-semibold mb-4">関連する投資ガイド</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                      <Link to="/crypto" className="text-primary hover:underline hover:text-secondary transition-colors">暗号資産投資ガイド</Link>
                      <Link to="/investment-trust" className="text-primary hover:underline hover:text-secondary transition-colors">投資信託投資ガイド</Link>
                      <Link to="/stocks" className="text-primary hover:underline hover:text-secondary transition-colors">株式投資ガイド</Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Nisa;