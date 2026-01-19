import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    TrendingUp, BookOpen, Sparkles, CheckCircle2, ArrowRight, ArrowLeft,
    FileText, Calculator, PiggyBank, Building2, DollarSign,
    ArrowDown, Info, Lightbulb, Target, BarChart3, Activity
} from "lucide-react";
import { VisualIncomeStatement, IncomeStatementData } from "@/components/financial/VisualIncomeStatement";
import { Link } from "react-router-dom";

const FinancialGuide = () => {
    // Apple のサンプルデータ（2024年度）
    const appleIncomeData: IncomeStatementData = {
        revenue: 383285,
        costOfGoodsSold: 214117,
        grossProfit: 169168,
        sellingGeneralAdmin: 54847,
        operatingIncome: 114301,
        nonOperatingIncome: -565,
        ordinaryIncome: 113736,
        specialIncome: 0,
        preTaxIncome: 113736,
        incomeTax: 16741,
        netIncome: 96995
    };

    const profitExplanations = [
        {
            number: 1,
            title: "売上高",
            subtitle: "Revenue",
            icon: <DollarSign className="w-5 h-5" />,
            formula: "商品やサービスの販売で得た収入の合計",
            description: "会社が1年間に商品やサービスを売って得たお金の総額です。ここからすべてがスタートします。",
            example: "家計簿で言うと「給料」。毎月の手取り収入のことです",
            point: "すべての利益の出発点",
            color: "blue",
            bgGradient: "from-blue-50 to-blue-100",
            borderColor: "border-blue-500",
            iconBg: "bg-blue-500",
        },
        {
            number: 2,
            title: "売上総利益（粗利）",
            subtitle: "Gross Profit",
            icon: <PiggyBank className="w-5 h-5" />,
            formula: "売上高 − 売上原価",
            description: "売上から材料費や仕入れ値を引いた利益。商品そのものの収益力を示します。",
            example: "家計簿で言うと「給料 − 通勤費」。仕事をするための最低限の費用を引いた残り",
            point: "商品力・ブランド力の強さ",
            color: "emerald",
            bgGradient: "from-emerald-50 to-emerald-100",
            borderColor: "border-emerald-500",
            iconBg: "bg-emerald-500",
        },
        {
            number: 3,
            title: "営業利益",
            subtitle: "Operating Income",
            icon: <Building2 className="w-5 h-5" />,
            formula: "売上総利益 − 販管費",
            description: "本業で稼いだ利益。人件費・広告費・家賃などを引いた後に残る、企業の「稼ぐ力」そのもの。",
            example: "家計簿で言うと「給料 − 生活費全部」。食費・光熱費・家賃を払った後の残り",
            point: "本業の実力を示す最重要指標",
            color: "orange",
            bgGradient: "from-orange-50 to-orange-100",
            borderColor: "border-orange-500",
            iconBg: "bg-orange-500",
        },
        {
            number: 4,
            title: "経常利益",
            subtitle: "Ordinary Income",
            icon: <Calculator className="w-5 h-5" />,
            formula: "営業利益 + 営業外収益 − 営業外費用",
            description: "本業以外の活動（利息・配当・為替差益など）も含めた、毎期繰り返される通常活動での利益。",
            example: "家計簿で言うと「生活費を引いた残り + 副業収入や投資の利息 − ローン利息」",
            point: "財務活動を含めた総合力",
            color: "violet",
            bgGradient: "from-violet-50 to-violet-100",
            borderColor: "border-violet-500",
            iconBg: "bg-violet-500",
        },
        {
            number: 5,
            title: "当期純利益",
            subtitle: "Net Income",
            icon: <Target className="w-5 h-5" />,
            formula: "税引前利益 − 法人税等",
            description: "すべての費用・税金を差し引いた最終的な利益。株主への配当や将来の投資の原資となります。",
            example: "家計簿で言うと「貯金できる金額」。税金も払い終わって、本当に手元に残るお金",
            point: "株主にとっての最終成果",
            color: "amber",
            bgGradient: "from-amber-50 to-amber-100",
            borderColor: "border-amber-500",
            iconBg: "bg-amber-500",
        },
    ];

    const financialIndicators = [
        {
            name: "PER（株価収益率）",
            formula: "株価 ÷ 1株あたり純利益",
            householdAnalogy: "年収300万円の人が900万円で売られていたら「年収の3倍」→PER3倍",
            description: "例：株価1000円、1株利益100円なら1000÷100=PER10倍。「10年で元が取れる」という意味。数字が小さいほど割安。ただし成長企業（Google、Teslaなど）は将来性を見込んでPER30倍以上でも買われる。",
            benchmark: "15倍以下で割安、30倍以上で割高の目安",
            icon: <BarChart3 className="w-5 h-5" />,
        },
        {
            name: "PBR（株価純資産倍率）",
            formula: "株価 ÷ 1株あたり純資産",
            householdAnalogy: "貯金100万円の人が80万円で売られている→PBR0.8倍「お買い得！」",
            description: "例：株価500円、1株純資産1000円なら500÷1000=PBR0.5倍。理論上「会社を解散して資産を分けたら2倍になる」計算。ただしPBR1倍未満=業績不振の可能性もあるので、営業利益も必ずチェック。",
            benchmark: "1倍以下で資産価値より安い評価",
            icon: <Calculator className="w-5 h-5" />,
        },
        {
            name: "ROE（自己資本利益率）",
            formula: "純利益 ÷ 自己資本 × 100",
            householdAnalogy: "貯金100万円→1年後110万円に増えた→ROE10%「運用上手！」",
            description: "例：純利益100億円、自己資本1000億円なら100÷1000×100=ROE10%。株主が出したお金をどれだけ効率よく増やせたか。ROE15%以上なら超優秀。投資の神様バフェットが最重視する指標の一つ。",
            benchmark: "10%以上で優良企業の目安",
            icon: <Activity className="w-5 h-5" />,
        },
        {
            name: "配当利回り",
            formula: "1株あたり配当金 ÷ 株価 × 100",
            householdAnalogy: "100万円預けて年3万円もらえる→利回り3%（銀行預金の100倍以上！）",
            description: "例：株価1000円、配当30円なら30÷1000×100=3%。毎年もらえる「お小遣い」。ただし株価が下がると計算上の利回りは上がるので注意。安定企業（NTT、JTなど）の高配当株は不労所得狙いの投資家に人気。",
            benchmark: "3%以上で高配当の目安",
            icon: <PiggyBank className="w-5 h-5" />,
        },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white">
            <Helmet>
                <title>【図解】初心者でもわかる決算書の見方 | 投資総合ナビ</title>
                <meta
                    name="description"
                    content="初心者でも分かる決算書の見方を図解で解説。損益計算書のウォーターフォールチャートで、売上から純利益までの流れを視覚的に理解できます。"
                />
            </Helmet>

            <Header />

            <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
                {/* Hero Section */}
                <section className="mb-16 text-center relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-100/30 via-orange-100/30 to-yellow-100/30 blur-3xl -z-10"></div>

                    <Badge variant="outline" className="mb-6 text-amber-700 border-amber-300 bg-amber-50 px-4 py-2 text-sm font-semibold">
                        <Sparkles className="w-4 h-4 mr-2 inline" />
                        初心者でもわかるシリーズ
                    </Badge>

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-900 leading-tight">
                        <span className="block mb-2">📊 図解でわかる！</span>
                        <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
                            決算書の見方ガイド
                        </span>
                    </h1>

                    <p className="text-base md:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        「決算書」と聞くと難しそうですが、実は
                        <span className="font-bold text-amber-700 mx-1">「お金の流れを追うだけ」</span>
                        のシンプルな仕組みです。
                        <br className="hidden md:block" />
                        <span className="text-slate-500 mt-2 block">このページでは、投資判断に必要な決算書の読み方を図解でやさしく解説します。</span>
                    </p>
                </section>

                {/* 決算書とは Section */}
                <section className="mb-16 max-w-5xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                            <FileText className="w-8 h-8 inline-block mr-2 text-amber-600" />
                            決算書とは？
                        </h2>
                        <p className="text-slate-600">企業の「健康診断書」のようなもの。3つの書類で構成されています。</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <Card className="border border-slate-200 bg-white hover:shadow-lg transition-all">
                            <CardHeader className="pb-2">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-600 mb-3">
                                    <TrendingUp className="w-6 h-6" />
                                </div>
                                <CardTitle className="text-slate-800">損益計算書（P/L）</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-600 text-sm leading-relaxed mb-3">
                                    1年間でどれだけ<span className="font-bold text-slate-800">稼いだか</span>を示す書類。
                                    売上からコストを引いて、最終的にいくら利益が残ったかがわかります。
                                </p>
                                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                                    このページで詳しく解説 ↓
                                </Badge>
                            </CardContent>
                        </Card>

                        <Card className="border border-slate-200 bg-white hover:shadow-lg transition-all">
                            <CardHeader className="pb-2">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center text-emerald-600 mb-3">
                                    <Building2 className="w-6 h-6" />
                                </div>
                                <CardTitle className="text-slate-800">貸借対照表（B/S）</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    ある時点で会社が<span className="font-bold text-slate-800">何を持っているか</span>を示す書類。
                                    資産・負債・純資産の3つに分けて財務状況を表します。
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border border-slate-200 bg-white hover:shadow-lg transition-all">
                            <CardHeader className="pb-2">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-100 to-violet-200 flex items-center justify-center text-violet-600 mb-3">
                                    <Activity className="w-6 h-6" />
                                </div>
                                <CardTitle className="text-slate-800">キャッシュフロー計算書</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    1年間で<span className="font-bold text-slate-800">現金がどう動いたか</span>を示す書類。
                                    営業・投資・財務の3つの切り口で資金の流れを把握できます。
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* 損益計算書 ウォーターフォールチャート Section */}
                <section className="mb-20">
                    <div className="text-center mb-8">
                        <Badge className="mb-4 bg-amber-100 text-amber-800 border-amber-300 px-4 py-2">
                            <Lightbulb className="w-4 h-4 mr-2 inline" />
                            ビジュアル図解
                        </Badge>
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                            損益計算書を視覚的に理解する
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            売上高から各費用が引かれていく様子をウォーターフォールチャートで確認しましょう。
                            <br className="hidden md:block" />
                            <span className="text-sm text-slate-500">※各バーをホバーすると詳細が表示されます</span>
                        </p>
                    </div>

                    <div className="max-w-6xl mx-auto">
                        <VisualIncomeStatement
                            data={appleIncomeData}
                            symbol="AAPL"
                            period="直近12ヶ月 (TTM)"
                            currency="$"
                            unit="百万"
                            exchangeRate={155}
                        />
                    </div>

                </section>

                {/* 5つの利益解説 Section */}
                <section className="mb-20 max-w-6xl mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                            <ArrowDown className="w-6 h-6 inline-block mr-2 text-amber-600" />
                            利益の種類を詳しく解説
                        </h2>
                        <p className="text-slate-600 text-sm">売上高からどうやって純利益に至るのか、一つずつ見ていきましょう</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {profitExplanations.map((item, index) => (
                            <Card
                                key={item.number}
                                className={`border-l-4 ${item.borderColor} hover:shadow-lg transition-all duration-300 bg-gradient-to-br ${item.bgGradient}`}
                            >
                                <CardContent className="p-4">
                                    {/* ヘッダー */}
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className={`w-10 h-10 rounded-lg ${item.iconBg} flex items-center justify-center text-white font-bold shadow`}>
                                            {item.number}
                                        </div>
                                        <div>
                                            <h3 className={`font-bold text-base text-${item.color}-800 leading-tight`}>{item.title}</h3>
                                            <span className="text-xs text-slate-500">{item.subtitle}</span>
                                        </div>
                                    </div>

                                    {/* 計算式 */}
                                    <div className="inline-block bg-white/80 px-2 py-0.5 rounded text-xs font-mono text-slate-600 mb-2 border">
                                        {item.formula}
                                    </div>

                                    {/* 説明 */}
                                    <p className="text-slate-700 text-sm leading-relaxed mb-3">
                                        {item.description}
                                    </p>

                                    {/* ポイント */}
                                    <div className={`inline-flex items-center gap-1.5 bg-${item.color}-100 border border-${item.color}-200 text-${item.color}-800 px-2 py-1 rounded text-xs font-medium`}>
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                        {item.point}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* Comparative Analysis Section */}
                <section className="mb-20">
                    <div className="text-center mb-10">
                        <Badge className="mb-4 bg-purple-100 text-purple-800 border-purple-300 px-4 py-2">
                            <Sparkles className="w-4 h-4 mr-2 inline" />
                            実践編
                        </Badge>
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                            図解でわかる「良い会社・リスクが高い会社」のパターン
                        </h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            同じ「赤字」でも、将来性のある赤字と危険な赤字があります。
                            <br className="hidden md:block" />
                            ウォーターフォールチャートの形を見るだけで、会社の状態を直感的に診断できます。
                        </p>
                    </div>

                    {/* Global Legend */}
                    <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-8 max-w-4xl mx-auto bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-sm bg-gradient-to-b from-blue-400 to-blue-600 shadow-sm" />
                            <span className="text-xs font-bold text-slate-600">売上・利益（残高）</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-sm bg-gradient-to-b from-red-400 to-red-600 shadow-sm" />
                            <span className="text-xs font-bold text-slate-600">費用（マイナス）</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-sm bg-gradient-to-b from-teal-400 to-teal-600 shadow-sm" />
                            <span className="text-xs font-bold text-slate-600">収益（プラス）</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-sm bg-gradient-to-b from-amber-400 to-amber-600 shadow-sm ring-2 ring-amber-300" />
                            <span className="text-xs font-bold text-slate-600">最終利益</span>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 max-w-7xl mx-auto">
                        {/* 1. 優良企業型 */}
                        <Card className="flex flex-col h-full border-t-4 border-t-blue-500 hover:shadow-xl transition-all duration-300 overflow-hidden group">
                            <CardContent className="p-0 flex flex-col h-full">
                                <div className="p-5 bg-gradient-to-b from-blue-50 to-white">
                                    <div className="flex items-start justify-between mb-2">
                                        <Badge className="bg-blue-500 hover:bg-blue-600 text-white border-0 shadow-sm px-3 py-1 text-sm">理想形</Badge>
                                        <span className="text-xs font-mono text-slate-400">Ideal Case</span>
                                    </div>
                                    <h3 className="font-bold text-xl text-slate-800 mb-3 group-hover:text-blue-700 transition-colors">
                                        高収益な優良企業
                                    </h3>
                                    <p className="text-sm text-slate-600 leading-relaxed bg-white/60 p-3 rounded-lg border border-blue-100">
                                        <span className="block mb-1 font-bold text-blue-800 text-xs">👀 チェックポイント</span>
                                        階段がきれいに右下がりになりつつ、<span className="border-b-2 border-blue-200">最後のバー（純利益）がしっかり残っている</span>。
                                    </p>
                                </div>
                                <div className="flex-1 p-2 bg-gradient-to-b from-white to-slate-50">
                                    <VisualIncomeStatement
                                        data={{
                                            revenue: 1000,
                                            costOfGoodsSold: 150,
                                            grossProfit: 850,
                                            sellingGeneralAdmin: 500,
                                            operatingIncome: 350,
                                            nonOperatingIncome: 20,
                                            ordinaryIncome: 370,
                                            specialIncome: 0,
                                            preTaxIncome: 370,
                                            incomeTax: 120,
                                            netIncome: 250
                                        }}
                                        symbol="優良企業"
                                        period="2024"
                                        currency=""
                                        unit=""
                                        isCompact={true}
                                        className="h-full scale-95 origin-top"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* 2. 成熟安定型 */}
                        <Card className="flex flex-col h-full border-t-4 border-t-emerald-500 hover:shadow-xl transition-all duration-300 overflow-hidden group">
                            <CardContent className="p-0 flex flex-col h-full">
                                <div className="p-5 bg-gradient-to-b from-emerald-50 to-white">
                                    <div className="flex items-start justify-between mb-2">
                                        <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-0 shadow-sm px-3 py-1 text-sm">安定</Badge>
                                        <span className="text-xs font-mono text-slate-400">Stable Case</span>
                                    </div>
                                    <h3 className="font-bold text-xl text-slate-800 mb-3 group-hover:text-emerald-700 transition-colors">
                                        不況に強い安定企業
                                    </h3>
                                    <p className="text-sm text-slate-600 leading-relaxed bg-white/60 p-3 rounded-lg border border-emerald-100">
                                        <span className="block mb-1 font-bold text-emerald-800 text-xs">👀 チェックポイント</span>
                                        <span className="border-b-2 border-emerald-200">原価率が高く粗利は小さい</span>が、販管費を抜けて安定的に黒字。製造業・インフラ系に多い。
                                    </p>
                                </div>
                                <div className="flex-1 p-2 bg-gradient-to-b from-white to-slate-50">
                                    <VisualIncomeStatement
                                        data={{
                                            revenue: 1000,
                                            costOfGoodsSold: 700,
                                            grossProfit: 300,
                                            sellingGeneralAdmin: 200,
                                            operatingIncome: 100,
                                            nonOperatingIncome: 10,
                                            ordinaryIncome: 110,
                                            specialIncome: 0,
                                            preTaxIncome: 110,
                                            incomeTax: 30,
                                            netIncome: 80
                                        }}
                                        symbol="安定企業"
                                        period="2024"
                                        currency=""
                                        unit=""
                                        isCompact={true}
                                        className="h-full scale-95 origin-top"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* 3. 先行投資型（オレンジ） */}
                        <Card className="flex flex-col h-full border-t-4 border-t-orange-500 hover:shadow-xl transition-all duration-300 overflow-hidden group">
                            <CardContent className="p-0 flex flex-col h-full">
                                <div className="p-5 bg-gradient-to-b from-orange-50 to-white">
                                    <div className="flex items-start justify-between mb-2">
                                        <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-0 shadow-sm px-3 py-1 text-sm">要注目</Badge>
                                        <span className="text-xs font-mono text-slate-400">Growth Case</span>
                                    </div>
                                    <h3 className="font-bold text-xl text-slate-800 mb-3 group-hover:text-orange-700 transition-colors">
                                        将来有望な赤字
                                    </h3>
                                    <p className="text-sm text-slate-600 leading-relaxed bg-white/60 p-3 rounded-lg border border-orange-100">
                                        <span className="block mb-1 font-bold text-orange-800 text-xs">👀 チェックポイント</span>
                                        <span className="border-b-2 border-orange-200">粗利（緑）は非常に高い</span>が、販管費（赤）で一時的に赤字。SaaS等に多い。
                                    </p>
                                </div>
                                <div className="flex-1 p-2 bg-gradient-to-b from-white to-slate-50">
                                    <VisualIncomeStatement
                                        data={{
                                            revenue: 1000,
                                            costOfGoodsSold: 200,
                                            grossProfit: 800,
                                            sellingGeneralAdmin: 850,
                                            operatingIncome: -50,
                                            nonOperatingIncome: 0,
                                            ordinaryIncome: -50,
                                            specialIncome: 0,
                                            preTaxIncome: -50,
                                            incomeTax: 0,
                                            netIncome: -50
                                        }}
                                        symbol="成長企業"
                                        period="2024"
                                        currency=""
                                        unit=""
                                        isCompact={true}
                                        className="h-full scale-95 origin-top"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* 4. 危険型 */}
                        <Card className="flex flex-col h-full border-t-4 border-t-red-500 hover:shadow-xl transition-all duration-300 overflow-hidden group">
                            <CardContent className="p-0 flex flex-col h-full">
                                <div className="p-5 bg-gradient-to-b from-red-50 to-white">
                                    <div className="flex items-start justify-between mb-2">
                                        <Badge variant="destructive" className="shadow-sm px-3 py-1 text-sm">危険</Badge>
                                        <span className="text-xs font-mono text-slate-400">Danger Case</span>
                                    </div>
                                    <h3 className="font-bold text-xl text-slate-800 mb-3 group-hover:text-red-700 transition-colors">
                                        衰退・倒産予備軍
                                    </h3>
                                    <p className="text-sm text-slate-600 leading-relaxed bg-white/60 p-3 rounded-lg border border-red-100">
                                        <span className="block mb-1 font-bold text-red-800 text-xs">👀 チェックポイント</span>
                                        そもそも<span className="border-b-2 border-red-200">粗利が小さい</span>。資産売却（特別利益）で黒字に見せかけている場合も注意。
                                    </p>
                                </div>
                                <div className="flex-1 p-2 bg-gradient-to-b from-white to-slate-50">
                                    <VisualIncomeStatement
                                        data={{
                                            revenue: 1000,
                                            costOfGoodsSold: 850,
                                            grossProfit: 150,
                                            sellingGeneralAdmin: 250,
                                            operatingIncome: -100,
                                            nonOperatingIncome: -30,
                                            ordinaryIncome: -130,
                                            specialIncome: 50,
                                            preTaxIncome: -80,
                                            incomeTax: 0,
                                            netIncome: -80
                                        }}
                                        symbol="危険企業"
                                        period="2024"
                                        currency=""
                                        unit=""
                                        isCompact={true}
                                        className="h-full scale-95 origin-top"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* 財務指標 Section */}
                <section className="mb-16 max-w-5xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                            <Calculator className="w-6 h-6 inline-block mr-2 text-amber-600" />
                            覚えておきたい財務指標
                        </h2>
                        <p className="text-slate-600">決算書の数値を使って、投資判断に役立つ指標を計算できます</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {financialIndicators.map((indicator, index) => (
                            <Card key={index} className="border border-slate-200 hover:border-amber-300 hover:shadow-lg transition-all bg-white">
                                <CardContent className="p-5">
                                    <div className="flex items-start gap-4">
                                        <div className="p-2.5 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl text-amber-700 flex-shrink-0">
                                            {indicator.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-slate-800 mb-1">{indicator.name}</h4>
                                            <div className="inline-block bg-slate-100 px-2 py-0.5 rounded text-xs font-mono text-slate-600 mb-3">
                                                {indicator.formula}
                                            </div>

                                            {/* 家計簿に例えると */}
                                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-400 p-3 rounded-r-lg mb-3">
                                                <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                                                    <span className="text-blue-600 text-xs font-bold whitespace-nowrap">💡 家計簿で言うと</span>
                                                    <p className="text-sm text-blue-900 leading-relaxed">{indicator.householdAnalogy}</p>
                                                </div>
                                            </div>

                                            <p className="text-sm text-slate-600 mb-2 leading-relaxed">{indicator.description}</p>
                                            <div className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-lg inline-block">
                                                📊 {indicator.benchmark}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="max-w-4xl mx-auto">
                    <Card className="relative overflow-hidden bg-gradient-to-br from-secondary/20 via-accent/10 to-primary/20 border-2 border-secondary/30 shadow-xl rounded-2xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-transparent opacity-50" />
                        <CardContent className="p-8 md:p-12 text-center relative z-10">
                            <div className="inline-block p-4 bg-background rounded-full mb-6 shadow-sm">
                                <TrendingUp className="w-12 h-12 text-secondary" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground/90">
                                実際の企業データを見てみよう 🚀
                            </h2>
                            <p className="mb-8 text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                                理論を学んだら、実際の企業の決算データをスクリーナーでチェック！
                                <br />
                                Apple、NVIDIA、Teslaなど人気銘柄の財務データを確認できます。
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Button
                                    size="lg"
                                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                                    asChild
                                >
                                    <Link to="/screener">
                                        <BarChart3 className="mr-2 h-5 w-5" />
                                        銘柄スクリーナーを見る
                                    </Link>
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-input bg-background hover:bg-accent hover:text-accent-foreground font-bold"
                                    asChild
                                >
                                    <Link to="/comparison">
                                        証券会社を比較する
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
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
