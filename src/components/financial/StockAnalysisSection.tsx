import { VisualIncomeStatement, IncomeStatementData } from "@/components/financial/VisualIncomeStatement";
import { sp500Stocks, nikkei225Stocks } from "@/data/stockLists";
import { TradingViewWidgetIframe } from "@/components/common/TradingViewWidgetIframe";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Building, LineChart, TrendingUp, Globe, BarChart2, Activity, BookOpen } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart as RechartsLine, Line } from "recharts";
import { VisualBalanceSheet } from "./VisualBalanceSheet";
import { VisualCashFlow } from "./VisualCashFlow";
import { StockPriceChart } from "./StockPriceChart";

interface StockAnalysisSectionProps {
    symbol: string | null;
    activeScreener: "total" | "japan" | "us" | "crypto" | "forex" | "promising";
    financialTab: "overview" | "chart";
    setFinancialTab: (tab: "overview" | "chart") => void;
    financialDataMap: Record<string, any>;
}

export const StockAnalysisSection = ({ symbol, activeScreener, financialTab, setFinancialTab, financialDataMap }: StockAnalysisSectionProps) => {

    if (!symbol) return null;

    const getFinancialData = () => {
        return financialDataMap[symbol] || financialDataMap["NASDAQ:AAPL"];
    };

    const isSp500 = symbol === "FOREXCOM:SPXUSD";
    const isNikkei225 = symbol === "INDEX:NKY";
    const isAeroEdge = symbol === "7409";
    const isIndex = isSp500 || isNikkei225;

    // チャート用：日本株はADR×ドル円の計算式を返す
    const getChartSymbol = (s: string) => {
        const code = s.replace("TSE:", "");
        if (!/^[0-9]{4}$/.test(code)) return s;

        // 特定銘柄の例外処理 (ADR * USDJPY)
        const usdJpy = "FX_IDC:USDJPY";
        const exceptions: Record<string, string> = {
            // Main NYSE ADRs
            "7203": `NYSE:TM*${usdJpy}/10`,      // トヨタ
            "6758": `NYSE:SONY*${usdJpy}`,       // ソニーG
            "8306": `NYSE:MUFG*${usdJpy}`,       // 三菱UFJ
            "8316": `NYSE:SMFG*${usdJpy}/0.2`,   // 三井住友FG
            "7267": `NYSE:HMC*${usdJpy}/3`,      // ホンダ
            "8411": `NYSE:MFG*${usdJpy}/0.1`,    // みずほ

            // OTC / Other
            "9984": `OTC:SFTBY*${usdJpy}*2`,     // ソフトバンクG
            "7974": `OTC:NTDOY*${usdJpy}*4`,     // 任天堂
            "6861": `OTC:KYCCF*${usdJpy}`,       // キーエンス
            "9983": `OTC:FRCOY*${usdJpy}*10`,    // ファストリ

            // Default 1:1 assumptions
            "8035": `OTC:TOELF*${usdJpy}`,       // 東京エレク
            "9432": `OTC:NTTYY*${usdJpy}`,       // NTT
            "4568": `OTC:DSNKY*${usdJpy}`,       // 第一三共
            "6954": `OTC:FANUY*${usdJpy}`,       // ファナック
            "9433": `OTC:KDDIY*${usdJpy}`,       // KDDI
            "6098": `OTC:RCRUY*${usdJpy}`,       // リクルート
            "6501": `OTC:HTHIY*${usdJpy}`,       // 日立
            "8001": `OTC:ITOCY*${usdJpy}`,       // 伊藤忠
            "6902": `OTC:DNZOY*${usdJpy}`,       // デンソー
            "4063": `OTC:SHECY*${usdJpy}`,       // 信越化学
            "7409": "TSE:7409",                  // AeroEdge

            // 注目銘柄 (2026 Promising Stocks) - Display Fixes
            "5805": `OTC:SWCPF*${usdJpy}`,       // SWCC (Pink)
            "3778": `OTC:SKURF*${usdJpy}`,       // さくらインターネット (Pink)
            "5595": "TSE:464A",                  // QPS研究所 (Ticker Change)
            "1942": "TSE:1942",                  // 関電工 (Data Center / Electrical)
            "6506": `OTC:YASKY*${usdJpy}`,       // 安川電機 (ADR)
            "6965": `OTC:HPHTY*${usdJpy}`,       // 浜松ホトニクス (ADR)
            "5253": `OTC:COVCF*${usdJpy}`,       // カバー (Pink)
            "6315": `OTC:TOWCF*${usdJpy}`,       // TOWA (Pink)
            "6269": `OTC:MDIKY*${usdJpy}`,       // 三井海洋開発 (ADR)
            // Note: 6228 (JET) has no liquid OTC/ADR. Defaulting to TSE.
        };

        if (code in exceptions) {
            return exceptions[code];
        }

        return `TSE:${s.replace("TSE:", "")}`;
    };

    // 企業情報・決算用：日本株はTSE（東京証券取引所）のシンボルを返す
    // ※ADRの計算式を入れるとウィジェットが表示されないため、正規のTSEコードを使用
    const getCorporateSymbol = (s: string) => {
        const code = s.replace("TSE:", "");
        if (code === "5595") return "TSE:464A"; // QPS研究所 (Ticker Change)
        if (/^[0-9]{4}$/.test(code)) {
            return `TSE:${code}`;
        }
        return s;
    };

    // テクニカル分析用のシンボル変換（TSEデータが表示されないためADR/OTCを使用）
    const getTechnicalSymbol = (s: string) => {
        const code = s.replace("TSE:", "");
        if (!/^[0-9]{4}$/.test(code)) return s;

        const adrMap: Record<string, string> = {
            "7203": "NYSE:TM",    // トヨタ
            "6758": "NYSE:SONY",  // ソニーG
            "9984": "OTC:SFTBY",  // ソフトバンクG
            "8306": "NYSE:MUFG",  // 三菱UFJ
            "6861": "OTC:KYCCF",  // キーエンス
            "7974": "OTC:NTDOY",  // 任天堂
            "9983": "OTC:FRCOY",  // ファストリ
            "8035": "OTC:TOELF",  // 東京エレク
            "9432": "OTC:NTTYY",  // NTT
            "8316": "NYSE:SMFG",  // 三井住友FG
            "6501": "OTC:HTHIY",  // 日立製作所
            "8001": "OTC:ITOCY",  // 伊藤忠商事
            "6902": "OTC:DNZOY",  // デンソー
            "4063": "OTC:SHECY",  // 信越化学
            "8411": "NYSE:MFG",   // みずほFG
            "4568": "OTC:DSNKY",  // 第一三共
            "6954": "OTC:FANUY",  // ファナック
            "9433": "OTC:KDDIY",  // KDDI
            "6098": "OTC:RCRUY",  // リクルート
            "7267": "NYSE:HMC",   // ホンダ

            // 注目銘柄 (Promising Stocks) - Tech Analysis Fixes
            "5805": "OTC:SWCPF",  // SWCC
            "3778": "OTC:SKURF",  // さくらインターネット
            "5595": "TSE:464A",   // QPS研究所 (Ticker Change)
            "1942": "TSE:1942",                  // 関電工
            "6506": "OTC:YASKY",  // 安川電機
            "6965": "OTC:HPHTY",  // 浜松ホトニクス
            "5253": "OTC:COVCF",  // カバー
            "6315": "OTC:TOWCF",  // TOWA
        };

        return adrMap[code] || s; // マップになければそのまま（表示されない可能性あり）
    };

    return (
        <Card className="border-2 border-blue-200 shadow-lg">

            <CardContent className="p-0">
                {/* タブナビゲーション */}
                <div className="border-b bg-blue-50">
                    <div className="flex">
                        <button
                            onClick={() => setFinancialTab("chart")}
                            className={`flex-1 px-4 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors whitespace-nowrap ${financialTab === "chart"
                                ? "bg-blue-100 text-blue-700 border-b-2 border-blue-500"
                                : "text-slate-600 hover:bg-blue-100"
                                }`}
                        >
                            チャート・財務データ
                        </button>
                        <button
                            onClick={() => setFinancialTab("overview")}
                            className={`flex-1 px-4 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors whitespace-nowrap ${financialTab === "overview"
                                ? "bg-blue-100 text-blue-700 border-b-2 border-blue-500"
                                : "text-slate-600 hover:bg-blue-100"
                                }`}
                        >
                            企業情報・決算
                        </button>
                    </div>
                </div>

                {/* タブコンテンツ */}
                <div className="p-4">
                    {/* チャート・トレンド（統合ビュー） */}
                    {financialTab === "chart" && (
                        <div>
                            {/* メインチャート (Daily) */}
                            <div className="mb-6" style={{ height: getFinancialData().priceHistory ? "450px" : (isAeroEdge ? "400px" : "850px") }}>
                                {getFinancialData().priceHistory ? (
                                    <div className="h-full p-4 bg-white rounded-lg border border-slate-200">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="font-bold text-lg text-slate-800">株価推移 (直近1年)</h3>
                                            <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                                                Based on closing price (JPY)
                                            </span>
                                        </div>
                                        <StockPriceChart
                                            data={getFinancialData().priceHistory || []}
                                            symbol={symbol}
                                            currency="JPY"
                                        />
                                    </div>
                                ) : isAeroEdge ? (
                                    <TradingViewWidgetIframe
                                        key={`main-chart-info-${symbol}`}
                                        title="Symbol Info"
                                        scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js"
                                        config={{
                                            symbol: "TSE:7409",
                                            width: "100%",
                                            locale: "ja",
                                            colorTheme: "light",
                                            isTransparent: false
                                        }}
                                    />
                                ) : (
                                    <TradingViewWidgetIframe
                                        key={`main-chart-${symbol}`}
                                        title="Advanced Chart"
                                        scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js"
                                        config={{
                                            autosize: true,
                                            symbol: getChartSymbol(symbol),
                                            interval: "D",
                                            timezone: activeScreener === "japan" ? "Asia/Tokyo" : "America/New_York",
                                            theme: "light",
                                            style: "1",
                                            locale: "ja",
                                            enable_publishing: false,
                                            allow_symbol_change: true,
                                            calendar: false,
                                            hide_top_toolbar: false,
                                            hide_legend: false,
                                            hide_side_toolbar: false,
                                            save_image: true,
                                            studies: [
                                                {
                                                    id: "MASimple@tv-basicstudies",
                                                    inputs: { length: 20 }
                                                },
                                                {
                                                    id: "RSI@tv-basicstudies",
                                                    inputs: { length: 20 }
                                                }
                                            ],
                                            withdateranges: true,
                                            details: true,
                                            hotlist: false,
                                            width: "100%",
                                            height: "100%"
                                        }}
                                    />
                                )}
                            </div>

                            {/* テクニカル分析 */}
                            <div className="mb-8 border-t pt-6" style={{ height: "250px" }}>
                                <TradingViewWidgetIframe
                                    key={`ta-${symbol}`}
                                    title="Technical Analysis"
                                    scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js"
                                    config={{
                                        interval: "1D",
                                        width: "100%",
                                        height: "100%",
                                        isTransparent: false,
                                        symbol: getTechnicalSymbol(symbol),
                                        showIntervalTabs: true,
                                        displayMode: "single",
                                        locale: "ja",
                                        colorTheme: "light"
                                    }}
                                />
                            </div>

                            {/* 財務データチャート（recharts） */}
                            {financialDataMap[symbol || ""] && (
                                <div className="mt-6 space-y-6 border-t pt-6">
                                    <h3 className="font-bold text-lg text-slate-800 border-b pb-2">
                                        📊 財務データ概要
                                    </h3>

                                    {/* 売上高推移 */}
                                    <div className="bg-white p-4 rounded-lg border border-slate-200">
                                        <h4 className="font-semibold text-slate-700 mb-3">
                                            売上高推移（{
                                                financialDataMap[symbol || ""]?.currency === "JPY" ? "兆円" :
                                                    financialDataMap[symbol || ""]?.currency === "JPY_Oku" ? "億円" :
                                                        "十億ドル"
                                            }）
                                        </h4>
                                        <ResponsiveContainer width="100%" height={250}>
                                            <BarChart data={getFinancialData().revenue}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="quarter" />
                                                <YAxis tickFormatter={(value) => {
                                                    const currency = financialDataMap[symbol || ""]?.currency;
                                                    if (currency === "JPY") return `¥${value}兆`;
                                                    if (currency === "JPY_Oku") return `¥${value.toLocaleString()}`;
                                                    return `$${value}B`;
                                                }} />
                                                <Tooltip formatter={(value: number) => {
                                                    const currency = financialDataMap[symbol || ""]?.currency;
                                                    if (currency === "JPY") {
                                                        return [`¥${value}兆円`, "売上高"];
                                                    }
                                                    if (currency === "JPY_Oku") {
                                                        return [`¥${value.toLocaleString()}億円`, "売上高"];
                                                    }
                                                    const jpyBillion = Number(value) * 155;
                                                    const trillion = Math.floor(jpyBillion / 1000);
                                                    const billion = Math.round(jpyBillion % 1000);
                                                    const jpyText = trillion > 0
                                                        ? `¥${trillion}兆${billion.toLocaleString()}億円`
                                                        : `¥${billion.toLocaleString()}億円`;
                                                    return [`$${value}十億ドル (${jpyText})`, "売上高"];
                                                }} />
                                                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>

                                    {/* 利益推移 */}
                                    <div className="bg-white p-4 rounded-lg border border-slate-200">
                                        <h4 className="font-semibold text-slate-700 mb-3">
                                            利益推移（{
                                                financialDataMap[symbol || ""]?.currency === "JPY" ? "兆円" :
                                                    financialDataMap[symbol || ""]?.currency === "JPY_Oku" ? "億円" :
                                                        "十億ドル"
                                            }）
                                        </h4>
                                        <ResponsiveContainer width="100%" height={250}>
                                            <RechartsLine data={getFinancialData().profit}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="quarter" />
                                                <YAxis tickFormatter={(value) => {
                                                    const currency = financialDataMap[symbol || ""]?.currency;
                                                    if (currency === "JPY") return `¥${value}兆`;
                                                    if (currency === "JPY_Oku") return `¥${value.toLocaleString()}`;
                                                    return `$${value}B`;
                                                }} />
                                                <Tooltip formatter={(value: number, name) => {
                                                    const label = name;
                                                    const currency = financialDataMap[symbol || ""]?.currency;

                                                    const formatJpy = (val: number, isOku: boolean) => {
                                                        const isNegative = val < 0;
                                                        const absVal = Math.abs(val);

                                                        if (absVal === 0) return "¥0";

                                                        let totalYen = absVal * (isOku ? 100000000 : 1000000000000);
                                                        const trillions = Math.floor(totalYen / 1000000000000);
                                                        const billions = Math.floor((totalYen % 1000000000000) / 100000000);
                                                        const manYen = Math.floor((totalYen % 100000000) / 10000);

                                                        let parts = [];
                                                        if (trillions > 0) parts.push(`${trillions}兆`);
                                                        if (billions > 0) parts.push(`${billions.toLocaleString()}億`);
                                                        if (manYen > 0) parts.push(`${manYen.toLocaleString()}万`);

                                                        return `${isNegative ? "-" : ""}¥${parts.join("")}`;
                                                    };

                                                    if (currency === "JPY") {
                                                        return [`${formatJpy(value, false)}円`, label];
                                                    }
                                                    if (currency === "JPY_Oku") {
                                                        return [`${formatJpy(value, true)}円`, label];
                                                    }

                                                    const jpyBillion = Number(value) * 155;
                                                    const trillion = Math.floor(jpyBillion / 1000);
                                                    const billion = Math.round(jpyBillion % 1000);
                                                    const jpyText = trillion > 0
                                                        ? `¥${trillion}兆${billion.toLocaleString()}億円`
                                                        : `¥${billion.toLocaleString()}億円`;
                                                    return [`$${value}十億ドル (${jpyText})`, label];
                                                }} />
                                                <Legend />
                                                <Line type="monotone" dataKey="operating" stroke="#10b981" strokeWidth={2} name="営業利益" />
                                                <Line type="monotone" dataKey="net" stroke="#3b82f6" strokeWidth={2} name="純利益" />
                                            </RechartsLine>
                                        </ResponsiveContainer>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        {/* セグメント別売上 */}
                                        <div className="bg-white p-4 rounded-lg border border-slate-200">
                                            <h4 className="font-semibold text-slate-700 mb-3">セグメント別売上構成</h4>
                                            <ResponsiveContainer width="100%" height={250}>
                                                <PieChart>
                                                    <Pie
                                                        data={getFinancialData().segments}
                                                        cx="50%"
                                                        cy="50%"
                                                        outerRadius={80}
                                                        dataKey="value"
                                                        label={({ name, value }) => `${name}: ${value}%`}
                                                    >
                                                        {getFinancialData().segments.map((entry: any, index: number) => (
                                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip formatter={(value) => [`${value}%`, "シェア"]} />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>

                                        {/* 主要指標 */}
                                        <div className="bg-white p-4 rounded-lg border border-slate-200">
                                            <h4 className="font-semibold text-slate-700 mb-3">主要指標</h4>
                                            <div className="grid grid-cols-2 gap-4">
                                                {getFinancialData().metrics.map((metric: any, idx: number) => (
                                                    <div key={idx} className="bg-slate-50 p-3 rounded-lg text-center">
                                                        <div className="text-sm text-slate-500">{metric.name}</div>
                                                        <div className="text-xl font-bold text-slate-800">{metric.value}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* TradingView詳細リンク - 指数の場合は表示しない */}
                            {!isIndex && (
                                <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                                    <div className="flex items-center justify-between flex-wrap gap-4">
                                        <div>
                                            <h4 className="font-bold text-blue-800 flex items-center gap-2">
                                                <TrendingUp className="w-5 h-5" />
                                                TradingViewで詳細な財務分析を見る
                                            </h4>
                                            <p className="text-sm text-slate-600 mt-1">
                                                評価、成長性、収益性、配当、財務健全性などの詳細グラフ
                                            </p>
                                        </div>
                                        <a
                                            href={`https://jp.tradingview.com/symbols/${symbol?.replace(":", "-")}/financials-overview/`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                        >
                                            <Globe className="w-4 h-4" />
                                            TradingViewで開く
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* 企業情報・決算（統合ビュー） */}
                    {financialTab === "overview" && (
                        <div className="space-y-8">
                            {/* --- 会社概要セクション --- */}
                            <div>
                                <h3 className="font-bold text-lg text-slate-800 border-b pb-2 mb-4 flex items-center gap-2">
                                    <Building className="w-5 h-5 text-amber-600" />
                                    会社概要
                                </h3>
                                {/* Symbol Info */}
                                {/* Symbol Info */}
                                <div className="mb-4 h-[280px] md:h-[200px]">
                                    <TradingViewWidgetIframe
                                        key={`info-${symbol}`}
                                        title="Symbol Info"
                                        scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js"
                                        config={{
                                            symbol: getCorporateSymbol(symbol),
                                            width: "100%",
                                            locale: "ja",
                                            colorTheme: "light",
                                            isTransparent: false
                                        }}
                                    />
                                </div>
                                {/* Symbol Profile */}
                                <div style={{ height: "400px" }}>
                                    <TradingViewWidgetIframe
                                        key={`profile-${symbol}`}
                                        title="Symbol Profile"
                                        scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js"
                                        config={{
                                            symbol: getCorporateSymbol(symbol),
                                            width: "100%",
                                            height: "100%",
                                            colorTheme: "light",
                                            isTransparent: false,
                                            locale: "ja"
                                        }}
                                    />
                                </div>

                                {/* Apple分析画像 - Apple専用 */}
                                {symbol === "NASDAQ:AAPL" && (
                                    <div className="mt-4">
                                        <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                                            <BarChart2 className="w-5 h-5 text-blue-600" />
                                            Apple (AAPL) 財務ハイライト
                                        </h4>
                                        <img
                                            src="/apple-analysis.jpg"
                                            alt="Apple (AAPL) 財務ハイライト：圧倒的な市場価値と収益効率"
                                            className="w-full rounded-lg shadow-lg border border-slate-200"
                                        />
                                    </div>
                                )}
                                {/* Microsoft分析画像 - Microsoft専用 */}
                                {symbol === "NASDAQ:MSFT" && (
                                    <div className="mt-4">
                                        <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                                            <BarChart2 className="w-5 h-5 text-blue-600" />
                                            MSFT (マイクロソフト) ファンダメンタル分析
                                        </h4>
                                        <img
                                            src="/microsoft-analysis.jpg"
                                            alt="MSFT (マイクロソフト) ファンダメンタル分析：圧倒的な収益力と強固な財務基盤"
                                            className="w-full rounded-lg shadow-lg border border-slate-200"
                                        />
                                    </div>
                                )}
                                {/* Amazon分析画像 - Amazon専用 */}
                                {symbol === "NASDAQ:AMZN" && (
                                    <div className="mt-4">
                                        <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                                            <BarChart2 className="w-5 h-5 text-orange-600" />
                                            AMZN (アマゾン) 財務パフォーマンスと市場評価の分析
                                        </h4>
                                        <img
                                            src="/amazon-analysis.jpg"
                                            alt="AMZN (アマゾン) 財務パフォーマンスと市場評価の分析"
                                            className="w-full rounded-lg shadow-lg border border-slate-200"
                                        />
                                    </div>
                                )}
                                {/* Meta分析画像 - Meta専用 */}
                                {symbol === "NASDAQ:META" && (
                                    <div className="mt-4">
                                        <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                                            <BarChart2 className="w-5 h-5 text-blue-600" />
                                            Meta (META) ファンダメンタルズ分析
                                        </h4>
                                        <img
                                            src="/meta-analysis.jpg"
                                            alt="Meta (META) ファンダメンタルズ分析：圧倒的な収益性と財務健全性"
                                            className="w-full rounded-lg shadow-lg border border-slate-200"
                                        />
                                    </div>
                                )}
                                {/* Google分析画像 - Google専用 */}
                                {symbol === "NASDAQ:GOOGL" && (
                                    <div className="mt-4">
                                        <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                                            <BarChart2 className="w-5 h-5 text-blue-600" />
                                            アルファベット (GOOGL) ファンダメンタル分析
                                        </h4>
                                        <img
                                            src="/google-analysis.jpg"
                                            alt="Google (GOOGL) ファンダメンタル分析：圧倒的な収益力と財務の健全性"
                                            className="w-full rounded-lg shadow-lg border border-slate-200"
                                        />
                                    </div>
                                )}
                                {/* NVIDIA分析画像 - NVIDIA専用 */}
                                {symbol === "NASDAQ:NVDA" && (
                                    <div className="mt-4">
                                        <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                                            <BarChart2 className="w-5 h-5 text-green-600" />
                                            NVIDIA (NVDA) ファンダメンタル分析：AI時代の財務的覇権
                                        </h4>
                                        <img
                                            src="/nvidia-analysis.png"
                                            alt="NVIDIA (NVDA) ファンダメンタル分析：AI時代の財務的覇権"
                                            className="w-full rounded-lg shadow-lg border border-slate-200"
                                        />
                                    </div>
                                )}
                                {/* Tesla分析画像 - Tesla専用 */}
                                {symbol === "NASDAQ:TSLA" && (
                                    <div className="mt-4">
                                        <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                                            <BarChart2 className="w-5 h-5 text-red-600" />
                                            TSLA (テスラ) ファンダメンタル分析
                                        </h4>
                                        <img
                                            src="/tesla-analysis.png"
                                            alt="TSLA (テスラ) ファンダメンタル分析：市場評価と財務健全性の現状"
                                            className="w-full rounded-lg shadow-lg border border-slate-200"
                                        />
                                    </div>
                                )}
                                {/* AMD分析画像 - AMD専用 */}
                                {symbol === "NASDAQ:AMD" && (
                                    <div className="mt-4">
                                        <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                                            <BarChart2 className="w-5 h-5 text-red-600" />
                                            AMD ファンダメンタル分析
                                        </h4>
                                        <img
                                            src="/amd-analysis.png"
                                            alt="AMD ファンダメンタル分析：2025年最新財務サマリー"
                                            className="w-full rounded-lg shadow-lg border border-slate-200"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* --- 採用銘柄一覧セクション (指数のみ) --- */}
                            {isIndex && (
                                <div className="mt-8">
                                    <h3 className="font-bold text-lg text-slate-800 border-b pb-2 mb-4 flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-amber-600" />
                                        {isSp500 ? "S&P 500 採用銘柄一覧" : "日経225 採用銘柄一覧"}
                                    </h3>
                                    <div className="border rounded-lg overflow-hidden shadow-sm">
                                        <div className="bg-slate-100 p-3 grid grid-cols-12 gap-4 font-bold text-slate-700 border-b text-sm">
                                            <div className="col-span-3">シンボル</div>
                                            <div className="col-span-9">企業名</div>
                                        </div>
                                        <div className="max-h-[600px] overflow-y-auto bg-white">
                                            {(isSp500 ? sp500Stocks : nikkei225Stocks).map((stock, idx) => (
                                                <div
                                                    key={stock.symbol}
                                                    className={`grid grid-cols-12 gap-4 p-3 border-b text-sm hover:bg-slate-50 transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
                                                >
                                                    <div className="col-span-3 font-medium text-blue-600">{stock.symbol}</div>
                                                    <div className="col-span-9 text-slate-800">{stock.name}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-right text-xs text-slate-500 mt-2">
                                        ※ 各構成銘柄は定期的に見直されます。最新情報は公式発表をご確認ください。
                                    </p>
                                </div>
                            )}

                            {/* 決算書・財務データ（日本株・米国株） */}
                            {!isIndex && (financialDataMap[symbol] || financialDataMap[symbol.replace("TSE:", "")]) && (
                                <div>
                                    <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                                        <BookOpen className="w-6 h-6 text-emerald-600" />
                                        決算書・財務データ
                                    </h3>

                                    {/* 損益計算書セクション */}
                                    {(() => {
                                        const finData = financialDataMap[symbol] || financialDataMap[symbol.replace("TSE:", "")];
                                        const isJpy = finData?.currency === "JPY" || finData?.currency === "JPY_Oku";
                                        return (
                                            <div className="space-y-8">
                                                {finData.incomeStatement && (
                                                    <VisualIncomeStatement
                                                        data={finData.incomeStatement}
                                                        symbol={symbol}
                                                        period="直近12ヶ月 (TTM)"
                                                        currency={isJpy ? "¥" : "$"}
                                                        unit={isJpy ? "億円" : "百万"}
                                                        exchangeRate={isJpy ? undefined : 155}
                                                    />
                                                )}

                                                {finData.balanceSheet && (
                                                    <VisualBalanceSheet
                                                        data={finData.balanceSheet}
                                                        symbol={symbol}
                                                        period="四半期 (Q2)"
                                                        currency={isJpy ? "¥" : "$"}
                                                        unit={isJpy ? "億円" : "百万"}
                                                        exchangeRate={isJpy ? undefined : 155}
                                                    />
                                                )}

                                                {finData.cashFlow && (
                                                    <VisualCashFlow
                                                        data={finData.cashFlow}
                                                        symbol={symbol}
                                                        period="直近12ヶ月 (TTM)"
                                                        currency={isJpy ? "¥" : "$"}
                                                        unit={isJpy ? "億円" : "百万"}
                                                        exchangeRate={isJpy ? undefined : 155}
                                                    />
                                                )}
                                            </div>
                                        );
                                    })()}

                                    {/* Appleの財務諸表イメージ（米国株の場合のみ） */}
                                    {activeScreener === "us" && symbol === "NASDAQ:AAPL" && (
                                        <div className="mt-8 rounded-xl overflow-hidden shadow-lg border border-slate-200">
                                            <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 font-bold text-slate-700">
                                                Visualized Income Statement (Reference)
                                            </div>
                                            <img
                                                src="/apple-income-statement-infographic.jpg"
                                                alt="Apple Income Statement Visualized"
                                                className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-500"
                                            />
                                        </div>
                                    )}

                                    {/* TradingView 財務データウィジェット */}
                                    <div className="mt-8 h-[600px]">
                                        <TradingViewWidgetIframe
                                            key={`fin-${symbol}`}
                                            title="Financials"
                                            scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-financials.js"
                                            config={{
                                                isTransparent: false,
                                                largeChartUrl: "",
                                                displayMode: "regular",
                                                width: "100%",
                                                height: "100%",
                                                colorTheme: "light",
                                                symbol: getCorporateSymbol(symbol),
                                                locale: "ja"
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};
