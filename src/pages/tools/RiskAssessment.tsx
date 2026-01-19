import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, LineChart, Lightbulb, Shield, TrendingUp, Calculator, Award } from "lucide-react";
import RiskDiagnostic from "@/components/features/RiskDiagnostic";

const RiskAssessment = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 300); // 遅延を入れて確実にスクロールさせる（ページ遷移アニメーション等の影響回避）
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-gradient-to-r from-muted/50 to-muted/30 py-4 border-b">
          <div className="container mx-auto px-4">
            <Link
              to="/tools"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" />
              計算ツール一覧に戻る
            </Link>
          </div>
        </div>

        {/* Page Header */}
        <section className="relative py-20 container mx-auto px-4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 animate-fade-in" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <Badge variant="secondary" className="mb-6 px-6 py-2 text-sm font-semibold animate-fade-in hover:scale-105 transition-transform">
              総合診断ツール
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent animate-fade-in">
              投資総合診断
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
              自分の投資適性を多角的に診断し、最適な投資戦略を見つけましょう
            </p>
          </div>
        </section>

        {/* Find Your Investment Strategy Card */}
        <section className="py-8 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <Card className="overflow-hidden border-2 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-card to-card/50">
                <div className="md:flex">
                  <div className="md:w-1/3 bg-gradient-to-br from-accent/20 via-accent/10 to-primary/10 p-8 flex flex-col items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <LineChart className="h-20 w-20 text-accent mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-xl font-bold text-center relative z-10">総合診断</h3>
                  </div>
                  <div className="md:w-2/3 p-8">
                    <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">自分に合った投資戦略を見つける</h2>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      投資総合診断では、あなたのリスク許容度、資産状況、投資目標、知識レベルなど、
                      多角的な視点から最適な投資戦略を診断します。
                      診断結果には、具体的な投資アドバイスと業界別の推奨商品も含まれます。
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="hover:bg-accent hover:text-accent-foreground transition-colors">リスク許容度</Badge>
                      <Badge variant="outline" className="hover:bg-accent hover:text-accent-foreground transition-colors">資産配分</Badge>
                      <Badge variant="outline" className="hover:bg-accent hover:text-accent-foreground transition-colors">投資戦略</Badge>
                      <Badge variant="outline" className="hover:bg-accent hover:text-accent-foreground transition-colors">業界別アドバイス</Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <Card className="overflow-hidden border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/50">
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                      <TrendingUp className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">リスク適性診断</h3>
                    <p className="text-muted-foreground">
                      あなたのリスク許容度を正確に把握し、適切な投資戦略を提案します。
                    </p>
                  </div>
                </Card>

                <Card className="overflow-hidden border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/50">
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                      <Calculator className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">資産配分診断</h3>
                    <p className="text-muted-foreground">
                      年齢、収入、目標に応じた最適な資産配分を診断します。
                    </p>
                  </div>
                </Card>

                <Card className="overflow-hidden border-2 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/50">
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                      <Award className="h-6 w-6 text-secondary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">投資商品診断</h3>
                    <p className="text-muted-foreground">
                      適した投資商品（株式、投資信託、FX等）を業界別に診断します。
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Diagnostic Tool Section */}
        <section className="py-16 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 scroll-mt-24" id="diagnostic-tool">
              <h2 className="text-3xl font-bold mb-4">投資総合診断を開始</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                簡単な質問に答えて、あなたに最適な投資戦略を見つけましょう。
                診断には約1〜3分かかります。あなたの投資適性に合った詳細なアドバイスを提供します。
              </p>
            </div>
            <div className="max-w-6xl mx-auto">
              <RiskDiagnostic />
            </div>
          </div>
        </section>

        {/* Risk Assessment Explanation */}
        <section className="py-16 container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">投資診断の重要性</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                適切な投資診断を受けることで、自分の特性に合った投資戦略を選択し、
                投資の成功確率を高めることができます。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="border-2 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-card to-card/80">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-6 w-6 text-accent" />
                    リスクとリターン
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    一般的に、高いリターンを得るには高いリスクを取る必要があります。
                    自分のリスク許容度に合った投資戦略を選ぶことが重要です。
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-card to-card/80">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-6 w-6 text-accent" />
                    情緒的判断の回避
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    リスク許容度を超えた投資を行うと、
                    市場の変動に感情的に反応し、損失を拡大させる可能性があります。
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-card to-card/80">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-6 w-6 text-accent" />
                    長期的な視点
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    適切なリスク許容度に基づく投資戦略は、
                    長期的な資産形成に貢献します。
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-2 hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-card to-card/80">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-6 w-6 text-accent" />
                  リスク許容度のタイプ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 bg-destructive/10 rounded-lg border border-destructive/20">
                    <h3 className="font-bold mb-2">保守的（低リスク）</h3>
                    <ul className="text-sm space-y-1">
                      <li>• 損失を極力避けたい</li>
                      <li>• 安定したリターンを求める</li>
                      <li>• 短期的な目標が多い</li>
                      <li>• 投資経験が浅い</li>
                    </ul>
                  </div>

                  <div className="p-6 bg-secondary/10 rounded-lg border border-secondary/20">
                    <h3 className="font-bold mb-2">中立的（中リスク）</h3>
                    <ul className="text-sm space-y-1">
                      <li>• 適度なリスクを受け入れる</li>
                      <li>• リターンとリスクのバランスを重視</li>
                      <li>• 中長期的な目標がある</li>
                      <li>• ある程度の投資経験がある</li>
                    </ul>
                  </div>

                  <div className="p-6 bg-primary/10 rounded-lg border border-primary/20">
                    <h3 className="font-bold mb-2">積極的（高リスク）</h3>
                    <ul className="text-sm space-y-1">
                      <li>• 高いリターンを目指す</li>
                      <li>• 大きな損失も受け入れる</li>
                      <li>• 長期的な目標が多い</li>
                      <li>• 豊富な投資経験がある</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Additional Info Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <Card className="relative overflow-hidden bg-gradient-to-br from-accent/20 via-primary/10 to-secondary/20 border-2 border-accent/30 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent opacity-50" />
                <CardContent className="p-10 text-center relative z-10">
                  <div className="inline-block p-4 bg-background rounded-full mb-6 animate-pulse">
                    <Lightbulb className="h-12 w-12 text-accent" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">他のツールも活用しましょう</h2>
                  <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                    投資計算ツールを使って、より詳細な資産形成プランを立てることができます。
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" className="text-lg px-8 hover:scale-105 transition-transform">
                      <Link to="/tools">
                        他のツールを見る →
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

export default RiskAssessment;