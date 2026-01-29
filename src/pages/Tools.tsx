import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Calculator from "@/components/features/Calculator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator as CalcIcon, PieChart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, LineChart, Coins, Lightbulb } from "lucide-react";

import { tools } from "@/data/tools";

const Tools = () => {
  // tools definitions are now imported from @/data/tools

  return (
    <div className="min-h-screen flex flex-col">
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
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-accent/5 animate-fade-in" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <Badge variant="secondary" className="mb-6 px-6 py-2 text-sm font-semibold animate-fade-in hover:scale-105 transition-transform">
              計算ツール
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent animate-fade-in">
              各種投資計算ツール
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
              投資の意思決定をサポートする様々な計算ツールとシミュレータをご紹介します。
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="overflow-hidden border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/50">
                <div className="md:flex">
                  <div className="md:w-1/3 bg-gradient-to-br from-secondary/20 via-secondary/10 to-accent/10 p-8 flex flex-col items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <CalcIcon className="h-20 w-20 text-secondary mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-xl font-bold text-center relative z-10">計算ツール</h3>
                  </div>
                  <div className="md:w-2/3 p-8">
                    <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">データに基づく投資判断</h2>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      投資は感情ではなくデータに基づいて行うべきです。
                      当サイトが提供する計算ツールとシミュレータを使えば、
                      自分の投資計画がどのようになるかを事前にシミュレーションできます。
                      これらのツールを活用して、より良い投資判断を行いましょう。
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="hover:bg-secondary hover:text-secondary-foreground transition-colors">計算ツール</Badge>
                      <Badge variant="outline" className="hover:bg-secondary hover:text-secondary-foreground transition-colors">シミュレーション</Badge>
                      <Badge variant="outline" className="hover:bg-secondary hover:text-secondary-foreground transition-colors">意思決定支援</Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-20 container mx-auto px-4">
          <div className="mb-12 text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">複利計算シミュレーター</h2>
            <p className="text-muted-foreground text-lg">
              初期投資額と毎月の積立額を入力すると、複利効果を考慮した将来の資産額を計算できます。
            </p>
          </div>
          <Calculator />
        </section>

        {/* Tips Section */}
        <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4">
            <Card className="max-w-4xl mx-auto relative overflow-hidden bg-gradient-to-br from-secondary/10 via-primary/5 to-accent/5 border-2 border-primary/20 shadow-2xl">
              <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-secondary/10 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-accent/10 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

              <CardHeader className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-secondary/10 rounded-xl">
                    <TrendingUp className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle className="text-2xl md:text-3xl">複利効果とは？</CardTitle>
                </div>
                <p className="text-muted-foreground">アインシュタインが「人類最大の発明」と呼んだ複利の力</p>
              </CardHeader>
              <CardContent className="space-y-6 relative z-10">
                <div className="p-6 bg-background/80 backdrop-blur-sm rounded-xl border border-primary/10">
                  <p className="leading-relaxed">
                    複利とは、投資で得た利益を再投資することで、
                    「元本＋利益」に対してさらに利益が生まれる仕組みです。
                  </p>
                  <p className="leading-relaxed mt-4">
                    長期投資において大きな威力を発揮し、時間を味方につけることで資産を飛躍的に増やすことができます。
                  </p>
                </div>

                <div className="p-6 bg-gradient-to-br from-secondary/5 to-primary/5 rounded-xl border-2 border-secondary/20">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">💰</span>
                    <p className="font-bold text-lg">実例シミュレーション</p>
                  </div>
                  <p className="font-semibold mb-4 text-foreground">月3万円を20年間、年利5%で運用した場合</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-background rounded-lg text-center">
                      <p className="text-sm text-muted-foreground mb-1">投資元本</p>
                      <p className="text-2xl font-bold text-primary">720万円</p>
                    </div>
                    <div className="p-4 bg-background rounded-lg text-center">
                      <p className="text-sm text-muted-foreground mb-1">複利運用後</p>
                      <p className="text-2xl font-bold text-secondary">1,233万円</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-lg text-center border-2 border-secondary/30">
                      <p className="text-sm text-muted-foreground mb-1">運用益</p>
                      <p className="text-2xl font-bold text-secondary">+513万円</p>
                      <p className="text-xs text-accent font-semibold mt-1">(+71%)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Tools */}
        <section className="py-16 container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">計算ツール一覧</h2>
              <p className="text-muted-foreground">
                投資の様々なシーンで役立つ計算ツールとシミュレータをご紹介します。
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

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="relative overflow-hidden bg-gradient-to-br from-secondary/20 via-accent/10 to-primary/20 border-2 border-secondary/30 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-transparent opacity-50" />
                <CardContent className="p-10 text-center relative z-10">
                  <div className="inline-block p-4 bg-background rounded-full mb-6 animate-pulse">
                    <Lightbulb className="h-12 w-12 text-secondary" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">ツールを使って投資計画を立てましょう</h2>
                  <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                    計算ツールを使って自分の投資計画をシミュレーションし、
                    より良い投資判断を行いましょう。
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" className="text-sm sm:text-base md:text-lg whitespace-nowrap px-8 hover:scale-105 transition-transform">
                      <Link to="/tools">
                        すべてのツールを見る →
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="text-sm sm:text-base md:text-lg whitespace-nowrap px-8 hover:scale-105 transition-transform">
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

export default Tools;