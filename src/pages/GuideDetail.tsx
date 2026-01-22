import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Clock, Calendar, ArrowLeft, ExternalLink, Menu, X,
  TrendingUp, BookOpen, Users, Award, Lightbulb, ChevronRight, Rocket,
  CheckCircle, AlertTriangle, PieChart, Target, ShieldCheck, Coins, Building2, Globe2, Wallet
} from "lucide-react";
import { useState, useEffect } from "react";
import { InvestmentBasics } from "@/components/guides/InvestmentBasics";
import { StocksBeginner } from "@/components/guides/StocksBeginner";
import { InvestmentTrust } from "@/components/guides/InvestmentTrust";
import { NisaBeginner } from "@/components/guides/NisaBeginner";
import SEO from "@/components/seo/SEO";

const GuideDetail = () => {
  const { id } = useParams();
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);

  // サンプルデータ（実際はAPIやデータベースから取得）
  const articles: Record<string, {
    title: string;
    category: string;
    date: string;
    content: string | React.ReactNode;
    headings?: { id: string; text: string; level: number }[];
  }> = {
    "nisa-beginner": {
      title: "【2026年最新】NISA完全ガイド",
      category: "NISA",
      date: "2026年1月22日",
      content: <NisaBeginner />,
      headings: [
        { id: "features", text: "1. 新NISAのすごいところ 3選", level: 2 },
        { id: "system", text: "2. 「つみたて投資枠」と「成長投資枠」", level: 2 },
        { id: "start", text: "3. NISAの始め方", level: 2 },
      ]
    },
    "stocks-beginner": {
      title: "株式投資の始め方",
      category: "株式投資",
      date: "2025年10月30日",
      content: <StocksBeginner />,
      headings: [
        { id: "merits", text: "1. 株式投資の3つのメリット", level: 2 },
        { id: "risks", text: "2. 知っておくべきリスク", level: 2 },
        { id: "steps", text: "3. 株式投資の始め方 3STEP", level: 2 },
        { id: "terms", text: "4. 最低限知っておきたい用語", level: 2 },
      ]
    },
    "investment-trust": {
      title: "投資信託の仕組みと選び方",
      category: "投資信託",
      date: "2025年10月30日",
      content: <InvestmentTrust />,
      headings: [
        { id: "merits", text: "1. 投資信託の3つのメリット", level: 2 },
        { id: "demerits", text: "2. デメリットと注意点", level: 2 },
        { id: "types", text: "3. インデックス？アクティブ？種類の違い", level: 2 },
        { id: "selection", text: "4. 失敗しない投資信託の選び方", level: 2 },
      ]
    },
    "investment-basics": {
      title: "投資の基礎知識",
      category: "投資基礎",
      date: "2025年10月30日",
      content: <InvestmentBasics />,
      headings: [
        { id: "what-is-investment", text: "1. 投資とは", level: 2 },
        { id: "investment-types", text: "2. 代表的な投資の種類と特徴", level: 2 },
        { id: "how-to-start", text: "3. 投資の始め方", level: 2 },
        { id: "risk-management", text: "4. リスク管理と分散投資", level: 2 },
        { id: "summary", text: "まとめ", level: 2 },
      ]
    },
  };

  const article = articles[id || "nisa-beginner"] || articles["nisa-beginner"];

  // 見出しを抽出して目次を作成
  useEffect(() => {
    if (article.headings) {
      setHeadings(article.headings);
    } else if (typeof article.content === 'string') {
      const parser = new DOMParser();
      const doc = parser.parseFromString(article.content, 'text/html');
      const extractedHeadings = Array.from(doc.querySelectorAll('h2, h3'))
        .map(heading => ({
          id: heading.getAttribute('id') || '',
          text: heading.textContent || '',
          level: parseInt(heading.tagName.charAt(1))
        }))
        .filter(heading => heading.id);

      setHeadings(extractedHeadings);
    }
  }, [article]);

  // 目次から特定のセクションにスクロール
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight - 20;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      setIsTocOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background/90 to-muted/30">
      <SEO
        title={article.title}
        description={`${article.title}について解説した完全ガイドです。${article.category}に関する基礎知識から実践的な内容まで網羅しています。`}
        path={`/guide/${id}`}
        type="article"
      />
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 py-4 border-b border-primary/10">
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

        {/* Article Header */}
        <section className="py-8 container mx-auto px-4 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-secondary/10 rounded-full blur-3xl"></div>
          </div>
          <div className="max-w-4xl mx-auto relative z-10 text-center">
            <Badge
              variant="secondary"
              className="mb-6 px-4 py-2 text-sm font-semibold bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30"
            >
              {article.category}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-8 leading-tight bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent">
              {article.title}
            </h1>
          </div>
        </section>

        {/* Table of Contents (Desktop - Above Content) */}
        {/* Two Column Layout */}
        {/* Two Column Layout */}
        <div className="container mx-auto px-4 pb-8">
          {/* Mobile Floating TOC Button (Top Accordion) */}
          <div className="lg:hidden mb-6">
            <details className="group border border-primary/20 rounded-lg bg-white shadow-sm open:ring-2 open:ring-primary/10 transition-all">
              <summary className="flex items-center justify-between p-4 cursor-pointer font-bold text-slate-700 list-none">
                <div className="flex items-center gap-2">
                  <Menu className="h-4 w-4" /> 目次を見る
                </div>
                <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
              </summary>
              <div className="p-4 pt-0 border-t border-slate-100 mt-2">
                <nav className="flex flex-col space-y-2 mt-2">
                  {headings.map((heading) => (
                    <button
                      key={heading.id}
                      className={`text-left text-sm py-1 border-b border-dashed border-slate-100 last:border-0 ${heading.level === 3 ? 'pl-4 text-slate-500' : 'font-medium text-slate-700'
                        }`}
                      onClick={() => scrollToSection(heading.id)}
                    >
                      {heading.text}
                    </button>
                  ))}
                </nav>
              </div>
            </details>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 max-w-6xl mx-auto">

            {/* Main Content Column */}
            <div className="min-w-0">
              <article className="prose prose-slate max-w-none bg-background/80 backdrop-blur-sm rounded-xl p-6 border border-primary/10 shadow-lg mb-8">
                {typeof article.content === 'string' ? (
                  <div
                    className="article-content"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />
                ) : (
                  <div className="article-content-jsx">
                    {article.content}
                  </div>
                )}
              </article>


            </div>

            {/* Sidebar Column (TOC & CTA) */}
            <aside className="hidden lg:block space-y-6">
              <div className="sticky top-24 space-y-6">
                {/* Slim TOC */}
                <Card className="border border-primary/10 shadow-sm bg-white/80 backdrop-blur">
                  <CardHeader className="py-4 px-5">
                    <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-700">
                      <Menu className="h-4 w-4" />
                      目次
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 px-5 pb-5">
                    <nav className="flex flex-col space-y-1">
                      {headings.map((heading) => (
                        <button
                          key={heading.id}
                          className={`text-left text-xs py-1.5 px-2 rounded hover:bg-slate-100 transition-colors ${heading.level === 3 ? 'pl-6 text-slate-500' : 'font-medium text-slate-700'
                            }`}
                          onClick={() => scrollToSection(heading.id)}
                        >
                          {heading.text}
                        </button>
                      ))}
                    </nav>
                  </CardContent>
                </Card>

                {/* Sidebar CTA */}
                <Card className="border-none shadow-md bg-gradient-to-br from-emerald-500 to-teal-600 text-white overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                  <CardContent className="p-5 flex flex-col gap-3 relative z-10">
                    <div className="text-sm font-bold flex items-center gap-2">
                      <Rocket className="h-4 w-4" /> 今すぐ始める
                    </div>
                    <p className="text-xs text-emerald-50 opacity-90">
                      最適な証券会社を見つけて、投資ライフをスタートさせましょう！
                    </p>
                    <Button size="sm" variant="secondary" className="w-full text-xs font-bold shadow-sm" asChild>
                      <Link to="/comparison">
                        口座開設して始める
                        <ChevronRight className="h-3 w-3 ml-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Related Articles (Sidebar) */}
                <Card className="border border-primary/10 shadow-sm bg-white/80 backdrop-blur">
                  <CardHeader className="py-4 px-5">
                    <CardTitle className="text-sm font-bold flex items-center gap-2 text-slate-700">
                      <BookOpen className="h-4 w-4" />
                      関連記事
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="py-2 px-5 pb-5">
                    <div className="space-y-3">
                      {Object.entries(articles)
                        .filter(([key]) => key !== id)
                        .slice(0, 3)
                        .map(([key, relatedArticle]) => (
                          <Link
                            key={key}
                            to={`/guide/${key}`}
                            className="block text-xs py-2 px-3 rounded hover:bg-slate-100 transition-colors text-slate-600 hover:text-primary leading-relaxed border-b border-slate-50 last:border-0"
                          >
                            {relatedArticle.title}
                          </Link>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </aside>

          </div>
        </div>


      </main>

      <Footer />
    </div>
  );
};

export default GuideDetail;