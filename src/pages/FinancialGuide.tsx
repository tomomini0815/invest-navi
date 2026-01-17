import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, BookOpen, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import PLVisualizer, { PLData } from "@/components/financial/PLVisualizer";
import StockDataVisualizer from "@/components/financial/StockDataVisualizer";

const FinancialGuide = () => {
    // Sample data for the visualizer
    const sampleData: PLData = {
        revenue: 10000,
        cogs: 6000,
        grossProfit: 4000,
        sga: 2500,
        operatingProfit: 1500,
        nonOperatingIncome: 200,
        nonOperatingExpenses: 100,
        ordinaryProfit: 1600,
        extraordinaryIncome: 0,
        extraordinaryLoss: 600,
        preTaxProfit: 1000,
        taxes: 300,
        netProfit: 700,
    };

    const profitExplanations = [
        {
            number: 2,
            title: "売上総利益（粗利）",
            formula: "売上高 - 売上原価",
            description: "会社が商品やサービスを売って、原価（仕入れ値や製造コスト）を引いた後に残る利益です。これが大きいほど、商品のブランド力や付加価値が高いと言えます。",
            point: "商品力そのものの強さを示します",
            color: "green",
            gradient: "from-green-50 to-green-100",
            borderColor: "border-green-500",
        },
        {
            number: 3,
            title: "営業利益",
            formula: "売上総利益 - 販管費",
            description: "粗利から、販売に必要な経費（人件費、広告宣伝費、家賃など）を引いた利益です。企業が本業でどれだけ稼いでいるかを示す、最も重要な指標の一つです。",
            point: "会社の本業の実力を示します",
            color: "orange",
            gradient: "from-orange-50 to-orange-100",
            borderColor: "border-orange-500",
        },
        {
            number: 4,
            title: "経常利益",
            formula: "営業利益 + 営業外収益 - 営業外費用",
            description: "本業の利益に、本業以外の活動（利息の受け取りや支払い、株の配当など）による収益・費用を加えたものです。毎期繰り返される通常の企業活動全体での利益を表します。",
            point: "会社の総合的な実力を示します",
            color: "indigo",
            gradient: "from-indigo-50 to-indigo-100",
            borderColor: "border-indigo-500",
        },
        {
            number: 6,
            title: "当期純利益",
            formula: "税引前当期純利益 - 法人税等",
            description: "臨時的な損益（特別利益・特別損失）を加え、最後に税金を支払った後に手元に残る最終的な利益です。期末の株主配当の原資となります。",
            point: "株主にとっての最終的な成果です",
            color: "rose",
            gradient: "from-rose-50 to-rose-100",
            borderColor: "border-rose-500",
        },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white">
            <Helmet>
                <title>図解でわかる！損益計算書の見方 | 投資総合ナビ</title>
                <meta
                    name="description"
                    content="初心者でも分かる損益計算書（PL）の見方。売上高から当期純利益までの流れを図解で直感的に理解できます。"
                />
            </Helmet>

            <Header />

            <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
                {/* Hero Section */}
                <section className="mb-16 text-center relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-cyan-100/20 to-indigo-100/20 blur-3xl -z-10"></div>

                    <Badge variant="outline" className="mb-6 text-primary border-primary/50 bg-primary/5 px-4 py-2 text-sm font-semibold animate-fade-in">
                        <Sparkles className="w-4 h-4 mr-2 inline" />
                        初心者向けガイド
                    </Badge>

                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 leading-tight animate-fade-in">
                        図解でわかる！
                        <span className="block mt-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                            損益計算書（P/L）の見方
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.1s' }}>
                        「損益計算書」と聞くと難しそうに感じますが、実は
                        <span className="font-bold text-primary mx-1">「入ってきたお金から、出ていったお金を引いていく」</span>
                        というシンプルな構造です。<br />
                        <span className="text-base mt-2 block text-slate-500">5つの利益の意味を理解すれば、企業の稼ぐ力が丸わかりになります。</span>
                    </p>
                </section>

                {/* Visualizer Section */}
                <section className="mb-20 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <Card className="border-none shadow-2xl bg-white overflow-hidden">
                        <CardHeader className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-8 md:p-10 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10"></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-yellow-400/20 rounded-lg">
                                        <BookOpen className="h-7 w-7 text-yellow-400" />
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold">損益計算書を図解で見る</h2>
                                </div>
                                <p className="text-slate-300 text-base md:text-lg">
                                    上から順に見ていくと、どのように利益が残っていくかが分かります。
                                    <span className="block mt-2 text-sm text-slate-400">※ホバーすると利益率が表示されます</span>
                                </p>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 md:p-10">
                            <PLVisualizer data={sampleData} />
                        </CardContent>
                    </Card>
                </section>

                {/* Key Points Section */}
                <section className="mb-16 max-w-5xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            5つの利益を詳しく解説
                        </h2>
                        <p className="text-slate-600">それぞれの利益が何を意味するのか、わかりやすく説明します</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {profitExplanations.map((item, index) => (
                            <Card
                                key={item.number}
                                className={`border-l-4 ${item.borderColor} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br ${item.gradient} animate-fade-in`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <CardHeader>
                                    <CardTitle className="flex items-start gap-3">
                                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-${item.color}-500 to-${item.color}-600 flex items-center justify-center text-white font-bold shadow-lg flex-shrink-0`}>
                                            {item.number}
                                        </div>
                                        <div>
                                            <div className={`text-${item.color}-900 text-xl font-bold mb-1`}>{item.title}</div>
                                            <div className="text-sm text-slate-600 font-mono bg-white/60 px-3 py-1 rounded-full inline-block">
                                                {item.formula}
                                            </div>
                                        </div>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-slate-700 leading-relaxed mb-4">
                                        {item.description}
                                    </p>
                                    <div className={`flex items-start gap-2 bg-${item.color}-50 border border-${item.color}-200 text-${item.color}-800 px-4 py-3 rounded-lg`}>
                                        <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm font-medium">{item.point}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Real Example Section */}
                <section className="mb-16 max-w-5xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                            実際の企業データで見てみよう
                        </h2>
                        <p className="text-slate-600">キオクシアの実際の株価と業績データを視覚化しています</p>
                    </div>
                    <StockDataVisualizer />
                </section>

                {/* CTA Section */}
                <section className="max-w-4xl mx-auto">
                    <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-none shadow-2xl overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
                        <CardContent className="p-8 md:p-12 text-center relative z-10">
                            <div className="inline-block p-3 bg-yellow-400/20 rounded-2xl mb-6">
                                <TrendingUp className="w-12 h-12 text-yellow-400" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                                実際の企業分析に挑戦しよう
                            </h2>
                            <p className="mb-8 text-slate-300 text-lg max-w-2xl mx-auto">
                                仕組みが分かったら、気になる企業の証券口座を開設して、実際の財務諸表をチェックしてみましょう。
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                                    asChild
                                >
                                    <a href="/comparison">
                                        <TrendingUp className="mr-2 h-5 w-5" />
                                        証券会社を比較する
                                    </a>
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm font-bold"
                                    asChild
                                >
                                    <a href="/stocks">
                                        株式投資の基礎へ戻る
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </a>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default FinancialGuide;
