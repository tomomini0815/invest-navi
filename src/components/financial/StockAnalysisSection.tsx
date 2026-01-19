import { VisualIncomeStatement, IncomeStatementData } from "@/components/financial/VisualIncomeStatement";
import { TradingViewWidgetIframe } from "@/components/common/TradingViewWidgetIframe";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Building, LineChart, TrendingUp, Globe, BarChart2, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart as RechartsLine, Line } from "recharts";

interface StockAnalysisSectionProps {
    symbol: string | null;
    activeScreener: "japan" | "us";
    financialTab: "overview" | "chart";
    setFinancialTab: (tab: "overview" | "chart") => void;
    financialDataMap: Record<string, any>;
}

export const StockAnalysisSection = ({ symbol, activeScreener, financialTab, setFinancialTab, financialDataMap }: StockAnalysisSectionProps) => {
    if (!symbol) return null;

    const getFinancialData = () => {
        return financialDataMap[symbol] || financialDataMap["NASDAQ:AAPL"];
    };

    return (
        <Card className="border-2 border-blue-200 shadow-lg">

            <CardContent className="p-0">
                {/* タブナビゲーション */}
                <div className="border-b bg-blue-50">
                    <div className="flex">
                        <button
                            onClick={() => setFinancialTab("chart")}
                            className={`flex-1 px-4 py-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${financialTab === "chart"
                                ? "bg-blue-100 text-blue-700 border-b-2 border-blue-500"
                                : "text-slate-600 hover:bg-blue-100"
                                }`}
                        >
                            <LineChart className="w-4 h-4" />
                            チャート・財務データ
                        </button>
                        <button
                            onClick={() => setFinancialTab("overview")}
                            className={`flex-1 px-4 py-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${financialTab === "overview"
                                ? "bg-blue-100 text-blue-700 border-b-2 border-blue-500"
                                : "text-slate-600 hover:bg-blue-100"
                                }`}
                        >
                            <Building className="w-4 h-4" />
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
                            <div className="mb-6" style={{ height: "1000px" }}>
                                <TradingViewWidgetIframe
                                    key={`main-chart-${symbol}`}
                                    title="Advanced Chart"
                                    scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js"
                                    config={{
                                        autosize: true,
                                        symbol: symbol,
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
                            </div>

                            {/* テクニカル分析 */}
                            <div className="mb-8 border-t pt-6" style={{ height: "220px" }}>
                                <TradingViewWidgetIframe
                                    key={`ta-${symbol}`}
                                    title="Technical Analysis"
                                    scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js"
                                    config={{
                                        interval: "1D",
                                        width: "100%",
                                        height: "100%",
                                        isTransparent: false,
                                        symbol: symbol,
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
                                        <h4 className="font-semibold text-slate-700 mb-3">売上高推移（十億ドル）</h4>
                                        <ResponsiveContainer width="100%" height={250}>
                                            <BarChart data={getFinancialData().revenue}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="quarter" />
                                                <YAxis tickFormatter={(value) => `$${value}B`} />
                                                <Tooltip formatter={(value) => {
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
                                        <h4 className="font-semibold text-slate-700 mb-3">利益推移（十億ドル）</h4>
                                        <ResponsiveContainer width="100%" height={250}>
                                            <RechartsLine data={getFinancialData().profit}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="quarter" />
                                                <YAxis tickFormatter={(value) => `$${value}B`} />
                                                <Tooltip formatter={(value, name) => {
                                                    const label = name === 'operating' ? '営業利益' : '純利益';
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

                            {/* TradingView詳細リンク */}
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
                                <div className="mb-4" style={{ height: "200px" }}>
                                    <TradingViewWidgetIframe
                                        key={`info-${symbol}`}
                                        title="Symbol Info"
                                        scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js"
                                        config={{
                                            symbol: symbol,
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
                                            symbol: symbol,
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

                            {/* --- 決算書・財務データセクション --- */}
                            <div>
                                <h3 className="font-bold text-lg text-slate-800 border-b pb-2 mb-4 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-amber-600" />
                                    決算書・財務データ
                                </h3>

                                {/* 損益計算書図解 */}
                                {financialDataMap[symbol]?.incomeStatement && (
                                    <VisualIncomeStatement
                                        data={financialDataMap[symbol].incomeStatement as IncomeStatementData}
                                        symbol={symbol.replace("NASDAQ:", "")}
                                        period="直近12ヶ月 (TTM)"
                                        currency="$"
                                        unit="百万"
                                        exchangeRate={155}
                                    />
                                )}

                                {/* 損益計算書インフォグラフィック - Apple専用 */}
                                {symbol === "NASDAQ:AAPL" && (
                                    <div className="mt-6 rounded-xl overflow-hidden shadow-lg">
                                        <img
                                            src="/images/apple-pl-infographic.jpg"
                                            alt="Appleの「稼ぐ力」を解剖する：損益計算書(P/L)の仕組み"
                                            className="w-full h-auto"
                                        />
                                    </div>
                                )}

                                <div style={{ height: "900px", marginTop: "2rem" }}>
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
                                            symbol: symbol,
                                            locale: "ja"
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};
