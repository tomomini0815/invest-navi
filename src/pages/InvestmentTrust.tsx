import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, LineChart, Calculator, Lightbulb, Users, Award, PieChart } from "lucide-react";
import { Helmet } from "react-helmet-async";

const InvestmentTrust = () => {
  // 投資信託記事
  const articles = [
    {
      id: "investment-trust-basics",
      title: "投資信託の基本と仕組み",
      excerpt: "投資信託とは何か、基本的な仕組みと特徴について解説します。",
      content: `
        <h3 class="text-xl font-bold mb-3">投資信託とは？</h3>
        <p class="mb-4">投資信託とは、多くの投資家の小さな資金を集めて、専門の運用会社が株式や債券などに投資・運用する金融商品です。個人投資家は、プロの運用者に任せて投資を行うことができます。</p>
        
        <h3 class="text-xl font-bold mb-3">投資信託の仕組み</h3>
        <p class="mb-4">投資信託では、信託会社が投資家の資金を集め、運用会社がその資金を株式や債券などに投資します。投資家は、その運用結果に応じて利益を受け取ります。</p>
        
        <h3 class="text-xl font-bold mb-3">投資信託の特徴</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div class="bg-blue-50 p-4 rounded-lg">
            <h4 class="font-bold text-blue-800 mb-2">メリット</h4>
            <ul class="list-disc pl-5 space-y-1">
              <li>プロの運用が受けられる</li>
              <li>少額から始められる</li>
              <li>自動的に分散投資される</li>
              <li>運用報告書がもらえる</li>
              <li>手数料が比較的安い</li>
            </ul>
          </div>
          <div class="bg-orange-50 p-4 rounded-lg">
            <h4 class="font-bold text-orange-800 mb-2">デメリット</h4>
            <ul class="list-disc pl-5 space-y-1">
              <li>運用成績が悪いこともある</li>
              <li>信託報酬がかかる</li>
              <li>自分で選ぶ銘柄に比べて自由度が低い</li>
              <li>為替リスク（外貨建の場合）</li>
            </ul>
          </div>
        </div>
        
        <h3 class="text-xl font-bold mb-3">投資信託の種類</h3>
        <div class="mb-4">
          <h4 class="font-bold mb-2">目的別分類</h4>
          <ul class="list-disc pl-5 space-y-1 mb-3">
            <li>株式投資信託：株式に投資する</li>
            <li>債券投資信託：国債や社債に投資する</li>
            <li>バランス型投資信託：株式と債券のバランスをとる</li>
            <li>MMF（マネーマーケットファンド）：短期の安全な金融商品に投資</li>
          </ul>
          
          <h4 class="font-bold mb-2">地域別分類</h4>
          <ul class="list-disc pl-5 space-y-1">
            <li>国内投資信託：日本国内の銘柄に投資</li>
            <li>海外投資信託：海外の銘柄に投資</li>
          </ul>
        </div>
      `,
      readTime: "7分",
      date: "2024年10月30日",
    },
    {
      id: "index-vs-active",
      title: "インデックス型とアクティブ型の違い",
      excerpt: "インデックス型とアクティブ型投資信託の違いとそれぞれの特徴を比較します。",
      content: `
        <h3 class="text-xl font-bold mb-3">インデックス型投資信託</h3>
        <p class="mb-4">インデックス型投資信託は、日経平均株価やTOPIXなどの市場指数を追跡するように設計された投資信託です。市場全体の動きに連動する運用を目指します。</p>
        
        <div class="bg-blue-50 p-4 rounded-lg mb-4">
          <h4 class="font-bold text-blue-800 mb-2">特徴</h4>
          <ul class="list-disc pl-5 space-y-1">
            <li>運用成績が市場平均に近い</li>
            <li>信託報酬が比較的安い</li>
            <li>長期投資向き</li>
            <li>運用会社のスキルに左右されにくい</li>
          </ul>
        </div>
        
        <h3 class="text-xl font-bold mb-3">アクティブ型投資信託</h3>
        <p class="mb-4">アクティブ型投資信託は、運用会社のファンドマネージャーが市場分析を行い、上場株式の中から有望な銘柄を選んで運用する投資信託です。市場平均を超えるリターンを目指します。</p>
        
        <div class="bg-green-50 p-4 rounded-lg mb-4">
          <h4 class="font-bold text-green-800 mb-2">特徴</h4>
          <ul class="list-disc pl-5 space-y-1">
            <li>市場平均を超えるリターンを目指す</li>
            <li>信託報酬が比較的高い</li>
            <li>ファンドマネージャーのスキルが重要</li>
            <li>短期的な売買が行われることもある</li>
          </ul>
        </div>
        
        <h3 class="text-xl font-bold mb-3">どちらを選ぶべきか？</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div class="border border-blue-300 rounded-lg p-4">
            <h4 class="font-bold text-blue-700 mb-2">インデックス型が向いている人</h4>
            <ul class="list-disc pl-5 space-y-1">
              <li>手数料を抑えたい人</li>
              <li>長期投資を考えている人</li>
              <li>市場平均で十分な人</li>
              <li>運用会社の選定にこだわりがない人</li>
            </ul>
          </div>
          <div class="border border-green-300 rounded-lg p-4">
            <h4 class="font-bold text-green-700 mb-2">アクティブ型が向いている人</h4>
            <ul class="list-disc pl-5 space-y-1">
              <li>市場平均を超えるリターンを求めている人</li>
              <li>ファンドマネージャーの腕前に期待したい人</li>
              <li>積極的に運用を任せたい人</li>
              <li>信託報酬を気にしない人</li>
            </ul>
          </div>
        </div>
      `,
      readTime: "8分",
      date: "2024年10月30日",
    },
    {
      id: "how-to-choose-fund",
      title: "投資信託の選び方と評価ポイント",
      excerpt: "自分に合った投資信託を選ぶための評価ポイントと選び方を詳しく解説します。",
      content: `
        <h3 class="text-xl font-bold mb-3">投資信託を選ぶ前に</h3>
        <p class="mb-4">投資信託を選ぶ前に、自分の投資目的やリスク許容度、投資期間などを明確にすることが重要です。これらの要素に合った投資信託を選ぶことで、より良い運用結果が期待できます。</p>
        
        <h3 class="text-xl font-bold mb-3">評価ポイント</h3>
        <div class="space-y-4 mb-4">
          <div>
            <h4 class="font-bold mb-2">1. 運用実績</h4>
            <p>過去の運用実績を確認し、市場平均との比較やベンチマークとの乖離などをチェックします。</p>
          </div>
          
          <div>
            <h4 class="font-bold mb-2">2. 信託報酬</h4>
            <p>信託報酬は運用益から差し引かれるため、低いほど投資家にとって有利です。インデックス型は一般的に0.1〜0.3%、アクティブ型は0.5〜1.5%程度です。</p>
          </div>
          
          <div>
            <h4 class="font-bold mb-2">3. ファンドマネージャー</h4>
            <p>ファンドマネージャーの経験やスキル、運用方針などを確認します。特にアクティブ型では重要なポイントです。</p>
          </div>
          
          <div>
            <h4 class="font-bold mb-2">4. 分散投資の程度</h4>
            <p>銘柄数や業種、地域などの分散状況を確認し、リスクが適切に分散されているかを評価します。</p>
          </div>
        </div>
        
        <h3 class="text-xl font-bold mb-3">選び方のステップ</h3>
        <ol class="list-decimal pl-5 mb-4 space-y-2">
          <li>投資目的の明確化（資産形成、教育資金、老後資金など）</li>
          <li>リスク許容度の把握（保守的、中立的、積極的など）</li>
          <li>投資期間の設定（短期、中期、長期）</li>
          <li>目的に合った商品の検索</li>
          <li>評価ポイントに基づく比較検討</li>
          <li>信託報酬や最低投資額などの条件確認</li>
          <li>最終的な選定と購入</li>
        </ol>
      `,
      readTime: "9分",
      date: "2024年10月30日",
    },
    {
      id: "dollar-cost-averaging",
      title: "ドルコスト平均法と積立投資",
      excerpt: "ドルコスト平均法の仕組みと、積立投資によるリスク低減効果について解説します。",
      content: `
        <h3 class="text-xl font-bold mb-3">ドルコスト平均法とは？</h3>
        <p class="mb-4">ドルコスト平均法とは、一定の期間ごとに一定額を投資する手法です。価格が安い時には多く、価格が高い時には少なく投資することで、平均取得単価を抑えることができます。</p>
        
        <h3 class="text-xl font-bold mb-3">仕組みと効果</h3>
        <div class="mb-4">
          <h4 class="font-bold mb-2">仕組み</h4>
          <p class="mb-2">例えば、毎月1万円を投資信託に投資するとします。株価が1万円の時は1口、5千円の時は2口購入できます。これにより、平均取得単価は6,667円になります。</p>
          
          <h4 class="font-bold mb-2">効果</h4>
          <ul class="list-disc pl-5 space-y-1">
            <li>市場のタイミングを気にしなくてよい</li>
            <li>平均取得単価を抑えることができる</li>
            <li>心理的な負担が軽減される</li>
            <li>長期的な資産形成に適している</li>
          </ul>
        </div>
        
        <h3 class="text-xl font-bold mb-3">積立投資のポイント</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div class="bg-purple-50 p-4 rounded-lg">
            <h4 class="font-bold text-purple-800 mb-2">成功のコツ</h4>
            <ul class="list-disc pl-5 space-y-1">
              <li>無理のない範囲で継続すること</li>
              <li>長期的な視点を持つこと</li>
              <li>途中で慌てて売却しないこと</li>
              <li>定期的に運用状況を確認すること</li>
            </ul>
          </div>
          <div class="bg-yellow-50 p-4 rounded-lg">
            <h4 class="font-bold text-yellow-800 mb-2">注意点</h4>
            <ul class="list-disc pl-5 space-y-1">
              <li>下落相場では損失が拡大することもある</li>
              <li>手数料が複数回発生する</li>
              <li>短期的には大きなリターンは期待できない</li>
              <li>適切な商品選定が重要</li>
            </ul>
          </div>
        </div>
        
        <h3 class="text-xl font-bold mb-3">実践方法</h3>
        <ul class="list-disc pl-5 space-y-2">
          <li>毎月一定額を自動引き落としで設定</li>
          <li>インデックス型投資信託などが適している</li>
          <li>景気循環を意識して投資タイミングを調整</li>
          <li>NISAやiDeCoなどの制度を活用</li>
        </ul>
      `,
      readTime: "6分",
      date: "2024年10月30日",
    },
  ];

  // 関連ツール
  const tools = [
    {
      title: "投資信託リターン計算機",
      description: "投資信託の期待リターンとリスクをシミュレーション",
      href: "/tools/fund-return",
      icon: Calculator,
    },
    {
      title: "ポートフォリオ最適化ツール",
      description: "最適な投資信託の組み合わせを提案",
      href: "/tools/portfolio-optimizer",
      icon: LineChart,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>投資信託投資ガイド | プロに任せる資産運用の基本と選び方</title>
        <meta name="description" content="投資信託の基本からプロの運用者に任せる資産運用方法まで徹底解説。初心者でも安心のインデックス型・アクティブ型投資信託の選び方と活用法を学びましょう。" />
        <meta name="keywords" content="投資信託,インデックス型,アクティブ型,資産運用,プロ運用,分散投資,ドルコスト平均法,NISA,iDeCo" />
        <link rel="canonical" href="https://www.invest-navi.com/investment-trust" />
        
        {/* Open Graph */}
        <meta property="og:title" content="投資信託投資ガイド | プロに任せる資産運用の基本と選び方" />
        <meta property="og:description" content="投資信託の基本からプロの運用者に任せる資産運用方法まで徹底解説。初心者でも安心のインデックス型・アクティブ型投資信託の選び方と活用法を学びましょう。" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.invest-navi.com/investment-trust" />
        <meta property="og:site_name" content="投資総合ガイド" />
        <meta property="og:locale" content="ja_JP" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@toushi_navi" />
      </Helmet>
      
      <Header />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-gradient-to-r from-muted/50 to-muted/30 py-4 border-b">
          <div className="container mx-auto px-4">
            <Link 
              to="/" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
              トップページに戻る
            </Link>
          </div>
        </div>

        {/* Page Header */}
        <section className="relative py-20 container mx-auto px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 animate-fade-in" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <Badge variant="secondary" className="mb-6 px-6 py-2 text-sm font-semibold animate-fade-in hover:scale-105 transition-transform">
              投資信託
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-fade-in">
              投資信託で簡単・安心の資産運用
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
              プロの運用者に任せる投資信託の基本から、自分に合った商品の選び方までを詳しく解説します。
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="overflow-hidden border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/50">
                <div className="md:flex">
                  <div className="md:w-1/3 bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/10 p-8 flex flex-col items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <LineChart className="h-20 w-20 text-primary mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-xl font-bold text-center relative z-10">投資信託</h3>
                  </div>
                  <div className="md:w-2/3 p-8">
                    <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">プロに任せる安心の投資</h2>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      投資信託は、多くの投資家の資金を集めて、専門の運用会社が株式や債券などに投資・運用する金融商品です。
                      少額から始められ、自動的に分散投資が行われるため、初心者にもおすすめです。
                      このセクションでは、投資信託の基本から始めて、選び方と活用方法までを詳しく解説します。
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">投資信託</Badge>
                      <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">インデックスファンド</Badge>
                      <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">プロ運用</Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Articles */}
        <section className="py-16 container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">投資信託記事一覧</h2>
              <p className="text-muted-foreground">
                投資信託の基本から応用まで、段階的に学ぶための記事です。
              </p>
            </div>
            
            <div className="space-y-8">
              {articles.map((article, index) => (
                <Card key={article.id} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 bg-gradient-to-br from-card to-card/80 hover:border-primary/30">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="secondary" className="rounded-full w-8 h-8 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        {index + 1}
                      </Badge>
                      <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{article.title}</h3>
                    </div>
                    <div 
                      className="article-content mb-4"
                      dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">📅 {article.date}</span>
                      <span className="flex items-center gap-1">⏱️ {article.readTime}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Tools */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">関連ツール</h2>
                <p className="text-muted-foreground">
                  投資信託を最大限に活用するための便利なツールをご紹介します。
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tools.map((tool, index) => (
                  <Card key={tool.title} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 bg-gradient-to-br from-card to-card/80 hover:border-primary/30 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-br from-primary/20 to-secondary/10 rounded-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                          <tool.icon className="h-7 w-7 text-primary" />
                        </div>
                        <CardTitle className="group-hover:text-primary transition-colors">{tool.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4 leading-relaxed">{tool.description}</p>
                      <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
                        <Link to={tool.href}>
                          ツールを使う →
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 border-2 border-primary/30 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-50" />
                <CardContent className="p-10 text-center relative z-10">
                  <div className="inline-block p-4 bg-background rounded-full mb-6 animate-pulse">
                    <Lightbulb className="h-12 w-12 text-primary" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">投資信託を始めてみませんか？</h2>
                  <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                    投資信託の基本を学んだら、次は実際に投資を始めてみましょう。
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

export default InvestmentTrust;