import { useEffect, useState, useRef, memo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, TrendingUp, BarChart2, Activity, Globe, Zap, RefreshCw, X, ChevronDown, ChevronUp, List, FileText, LineChart, Building } from "lucide-react";
import { useNavigate } from "react-router-dom";

// TradingViewウィジェットのタイプ定義
type ScreenerType = "japan" | "crypto" | "forex" | "us";

interface WidgetConfig {
    title: string;
    icon: React.ReactNode;
    description: string;
}

// 汎用TradingView Iframeウィジェットコンポーネント
const TradingViewWidgetIframe = ({ scriptSrc, config, title, height = "100%" }: { scriptSrc: string, config: any, title: string, height?: string | number }) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const handleLoad = () => {
        const sendMessage = () => {
            if (iframeRef.current?.contentWindow) {
                iframeRef.current.contentWindow.postMessage({
                    type: 'INIT_WIDGET',
                    scriptSrc,
                    config
                }, '*');
            }
        };

        // 即時送信
        sendMessage();

        // 遅延送信（Iframeのロード待ち対策）
        setTimeout(sendMessage, 500);
        setTimeout(sendMessage, 1500);
        setTimeout(sendMessage, 3000);
    };

    return (
        <iframe
            ref={iframeRef}
            src="/tradingview-widget.html"
            title={title}
            style={{ width: "100%", height: height, border: "none", display: "block" }}
            onLoad={handleLoad}
        />
    );
};

const StockScreener = () => {
    const navigate = useNavigate();
    const [activeScreener, setActiveScreener] = useState<ScreenerType>("japan");
    const [selectedChart, setSelectedChart] = useState<string | null>("FOREXCOM:SPXUSD");
    const [showList, setShowList] = useState(false);
    const [financialTab, setFinancialTab] = useState<"financials" | "chart" | "profile">("financials");
    const chartContainerRef = useRef<HTMLDivElement>(null);

    const screenerConfigs: Record<ScreenerType, WidgetConfig> = {
        japan: {
            title: "総合",
            icon: <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />,
            description: "世界の主要指数・先物・債券・為替のリアルタイム情報"
        },
        us: {
            title: "米国株",
            icon: <BarChart2 className="w-4 h-4 md:w-5 md:h-5" />,
            description: "NYSE/NASDAQ上場銘柄"
        },
        forex: {
            title: "為替(FX)",
            icon: <Globe className="w-4 h-4 md:w-5 md:h-5" />,
            description: "主要通貨ペアのリアルタイムレート"
        },
        crypto: {
            title: "暗号資産",
            icon: <Zap className="w-4 h-4 md:w-5 md:h-5" />,
            description: "主要暗号資産のリアルタイム価格"
        }
    };

    // 日本株リスト
    const japanStocks = [
        { symbol: "TSE:7203", name: "トヨタ自動車" },
        { symbol: "TSE:6758", name: "ソニーG" },
        { symbol: "TSE:9984", name: "ソフトバンクG" },
        { symbol: "TSE:8306", name: "三菱UFJ" },
        { symbol: "TSE:6861", name: "キーエンス" },
        { symbol: "TSE:7974", name: "任天堂" },
        { symbol: "TSE:9983", name: "ファストリ" },
        { symbol: "TSE:8035", name: "東京エレク" },
        { symbol: "TSE:9432", name: "NTT" },
        { symbol: "TSE:8316", name: "三井住友FG" },
        { symbol: "TSE:6501", name: "日立製作所" },
        { symbol: "TSE:8001", name: "伊藤忠商事" },
        { symbol: "TSE:6902", name: "デンソー" },
        { symbol: "TSE:4063", name: "信越化学" },
        { symbol: "TSE:8411", name: "みずほFG" },
        { symbol: "TSE:4568", name: "第一三共" },
        { symbol: "TSE:6954", name: "ファナック" },
        { symbol: "TSE:9433", name: "KDDI" },
        { symbol: "TSE:6098", name: "リクルート" },
        { symbol: "TSE:7267", name: "ホンダ" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
            {/* ティッカーテープ */}
            <div className="sticky top-0 z-50 shadow-md bg-white h-[78px] md:h-[46px] overflow-hidden">
                <TradingViewWidgetIframe
                    title="Ticker Tape"
                    height={78}
                    scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"
                    config={{
                        symbols: [
                            { proName: "FOREXCOM:SPXUSD", title: "S&P 500" },
                            { proName: "FOREXCOM:NSXUSD", title: "NASDAQ" },
                            { proName: "FOREXCOM:DJI", title: "Dow Jones" },
                            { proName: "INDEX:NKY", title: "日経225" },
                            { proName: "FX:USDJPY", title: "USD/JPY" },
                            { proName: "FX:EURUSD", title: "EUR/USD" },
                            { proName: "CMCMARKETS:GOLD", title: "Gold" },
                            { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
                            { proName: "BITSTAMP:ETHUSD", title: "Ethereum" }
                        ],
                        showSymbolLogo: true,
                        colorTheme: "light",
                        isTransparent: false,
                        displayMode: "adaptive",
                        locale: "ja"
                    }}
                />
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* ヘッダー */}
                <div className="mb-6">
                    <Button
                        variant="ghost"
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        戻る
                    </Button>
                </div>

                <div className="mb-8 text-center">
                    <h1 className="text-xl md:text-3xl font-bold text-slate-800 mb-2 flex items-center justify-center gap-2 md:gap-3">
                        <Activity className="w-5 h-5 md:w-8 md:h-8 text-blue-600" />
                        リアルタイム銘柄スクリーナー
                    </h1>
                    <p className="text-sm md:text-base text-slate-600">
                        TradingViewのリアルタイムデータで投資銘柄を探す
                    </p>
                </div>

                {/* スクリーナー選択タブ */}
                <div className="flex justify-center gap-1 md:gap-3 mb-8">
                    {(Object.entries(screenerConfigs) as [ScreenerType, WidgetConfig][]).map(([key, config]) => (
                        <Button
                            key={key}
                            variant={activeScreener === key ? "default" : "outline"}
                            onClick={() => setActiveScreener(key)}
                            className={`flex items-center gap-1 md:gap-2 px-2 md:px-6 py-1 md:py-2 text-xs md:text-sm transition-all ${activeScreener === key
                                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105"
                                : "hover:bg-blue-50"
                                }`}
                        >
                            {config.icon}
                            {config.title}
                        </Button>
                    ))}
                </div>

                {/* 現在のスクリーナー情報 */}
                <Card className="mb-6 border-2 border-blue-200 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
                        <CardTitle className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                {screenerConfigs[activeScreener].icon}
                                <span>{screenerConfigs[activeScreener].title}</span>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="w-full" style={{ minHeight: "600px" }}>
                            {activeScreener === "japan" ? (
                                <div key="market-quotes">
                                    {/* クイックチャートアクセス - 最初に表示 */}
                                    <div ref={chartContainerRef} className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
                                        <div className="flex flex-wrap gap-2">
                                            {[
                                                { symbol: "FOREXCOM:SPXUSD", name: "S&P 500" },
                                                { symbol: "INDEX:NKY", name: "日経225" },
                                                { symbol: "NASDAQ:NVDA", name: "NVIDIA" },
                                                { symbol: "NASDAQ:AAPL", name: "Apple" },
                                                { symbol: "NASDAQ:TSLA", name: "Tesla" },
                                                { symbol: "NASDAQ:MSFT", name: "Microsoft" },
                                                { symbol: "NASDAQ:AMZN", name: "Amazon" },
                                                { symbol: "NASDAQ:GOOGL", name: "Google" },
                                                { symbol: "NASDAQ:META", name: "Meta" },
                                                { symbol: "FX:EURUSD", name: "EUR/USD" },
                                                { symbol: "FX:USDJPY", name: "USD/JPY" },
                                                { symbol: "FX:GBPUSD", name: "GBP/USD" },
                                                { symbol: "FX:AUDUSD", name: "AUD/USD" },
                                                { symbol: "CMCMARKETS:GOLD", name: "Gold" },
                                                { symbol: "BITSTAMP:BTCUSD", name: "Bitcoin" },
                                                { symbol: "BITSTAMP:ETHUSD", name: "Ethereum" }
                                            ].map(item => (
                                                <Button
                                                    key={item.symbol}
                                                    variant={selectedChart === item.symbol ? "default" : "outline"}
                                                    size="sm"
                                                    onClick={() => {
                                                        setSelectedChart(item.symbol);
                                                        setTimeout(() => {
                                                            if (chartContainerRef.current) {
                                                                const yOffset = -100; // ティッカーテープの高さ分の余白
                                                                const y = chartContainerRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                                                window.scrollTo({ top: y, behavior: 'smooth' });
                                                            }
                                                        }, 100);
                                                    }}
                                                    className={selectedChart === item.symbol
                                                        ? "bg-blue-600 text-white"
                                                        : "bg-white hover:bg-blue-50 border-blue-200 text-blue-700"}
                                                >
                                                    {item.name}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* インラインチャート表示 */}
                                    {selectedChart && (
                                        <div className="border-t">
                                            <div className="bg-white p-3 flex items-center justify-between border-b">
                                                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                                                    <TrendingUp className="w-5 h-5 text-blue-600" />
                                                    {selectedChart}
                                                </h4>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setSelectedChart(null)}
                                                    className="text-slate-500 hover:text-slate-700"
                                                >
                                                    <X className="w-4 h-4" />
                                                    閉じる
                                                </Button>
                                            </div>
                                            {/* チャート */}
                                            <div style={{ height: "600px" }}>
                                                <TradingViewWidgetIframe
                                                    key={`chart-${selectedChart}`}
                                                    title="Advanced Chart"
                                                    scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js"
                                                    config={{
                                                        autosize: true,
                                                        symbol: selectedChart,
                                                        interval: "D",
                                                        timezone: "Asia/Tokyo",
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
                                                        save_chart_properties_to_local_storage: true,
                                                        studies: ["RSI@tv-basicstudies", "MASimple@tv-basicstudies"],
                                                        withdateranges: true,
                                                        details: true,
                                                        hotlist: false,
                                                        width: "100%",
                                                        height: "100%"
                                                    }}
                                                />
                                            </div>
                                            {/* テクニカル分析（買い/売りシグナル） */}
                                            <div className="border-t" style={{ height: "250px" }}>
                                                <TradingViewWidgetIframe
                                                    key={`ta-${selectedChart}`}
                                                    title="Technical Analysis"
                                                    scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js"
                                                    config={{
                                                        interval: "1D",
                                                        width: "100%",
                                                        height: "100%",
                                                        isTransparent: false,
                                                        symbol: selectedChart,
                                                        showIntervalTabs: true,
                                                        displayMode: "single",
                                                        locale: "ja",
                                                        colorTheme: "light"
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* 一覧を見る - アコーディオン */}
                                    <div className="border-t">
                                        <button
                                            onClick={() => setShowList(!showList)}
                                            className="w-full bg-slate-50 hover:bg-slate-100 p-3 flex items-center justify-between transition-colors"
                                        >
                                            <span className="font-bold text-slate-700 flex items-center gap-2">
                                                <List className="w-4 h-4" />
                                                一覧を見る
                                            </span>
                                            {showList ? (
                                                <ChevronUp className="w-5 h-5 text-slate-500" />
                                            ) : (
                                                <ChevronDown className="w-5 h-5 text-slate-500" />
                                            )}
                                        </button>
                                        {showList && (
                                            <div style={{ height: "500px" }}>
                                                <TradingViewWidgetIframe
                                                    key="market-quotes-widget"
                                                    title="Market Summary"
                                                    scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js"
                                                    config={{
                                                        colorTheme: "light",
                                                        locale: "ja",
                                                        largeChartUrl: "",
                                                        isTransparent: false,
                                                        showSymbolLogo: true,
                                                        backgroundColor: "#ffffff",
                                                        width: "100%",
                                                        height: "100%",
                                                        symbolsGroups: [
                                                            {
                                                                name: "Indices",
                                                                symbols: [
                                                                    { name: "FOREXCOM:SPXUSD", displayName: "S&P 500 Index" },
                                                                    { name: "FOREXCOM:NSXUSD", displayName: "US 100 Cash CFD" },
                                                                    { name: "FOREXCOM:DJI", displayName: "Dow Jones Industrial Average Index" },
                                                                    { name: "INDEX:NKY", displayName: "Japan 225" },
                                                                    { name: "INDEX:DEU40", displayName: "DAX Index" },
                                                                    { name: "FOREXCOM:UKXGBP", displayName: "FTSE 100 Index" }
                                                                ]
                                                            },
                                                            {
                                                                name: "Futures",
                                                                symbols: [
                                                                    { name: "BMFBOVESPA:ISP1!", displayName: "S&P 500" },
                                                                    { name: "BMFBOVESPA:EUR1!", displayName: "Euro" },
                                                                    { name: "CMCMARKETS:GOLD", displayName: "Gold" },
                                                                    { name: "PYTH:WTI3!", displayName: "WTI Crude Oil" },
                                                                    { name: "BMFBOVESPA:CCM1!", displayName: "Corn" }
                                                                ]
                                                            },
                                                            {
                                                                name: "Bonds",
                                                                symbols: [
                                                                    { name: "EUREX:FGBL1!", displayName: "Euro Bund" },
                                                                    { name: "EUREX:FBTP1!", displayName: "Euro BTP" },
                                                                    { name: "EUREX:FGBM1!", displayName: "Euro BOBL" }
                                                                ]
                                                            },
                                                            {
                                                                name: "Forex",
                                                                symbols: [
                                                                    { name: "FX:EURUSD", displayName: "EUR to USD" },
                                                                    { name: "FX:GBPUSD", displayName: "GBP to USD" },
                                                                    { name: "FX:USDJPY", displayName: "USD to JPY" },
                                                                    { name: "FX:USDCHF", displayName: "USD to CHF" },
                                                                    { name: "FX:AUDUSD", displayName: "AUD to USD" },
                                                                    { name: "FX:USDCAD", displayName: "USD to CAD" }
                                                                ]
                                                            }
                                                        ]
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : activeScreener === "us" ? (
                                <div key="us-screener">
                                    {/* クイックチャートアクセス - 米国株 */}
                                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4">
                                        <div className="flex flex-wrap gap-2">
                                            {[
                                                // テック株
                                                { symbol: "NASDAQ:AAPL", name: "Apple" },
                                                { symbol: "NASDAQ:MSFT", name: "Microsoft" },
                                                { symbol: "NASDAQ:GOOGL", name: "Google" },
                                                { symbol: "NASDAQ:AMZN", name: "Amazon" },
                                                { symbol: "NASDAQ:META", name: "Meta" },
                                                { symbol: "NASDAQ:NVDA", name: "NVIDIA" },
                                                { symbol: "NASDAQ:TSLA", name: "Tesla" },
                                                // 半導体
                                                { symbol: "NASDAQ:AMD", name: "AMD" },
                                                { symbol: "NASDAQ:INTC", name: "Intel" },
                                                { symbol: "NASDAQ:AVGO", name: "Broadcom" },
                                                { symbol: "NASDAQ:QCOM", name: "Qualcomm" },
                                                { symbol: "NYSE:TSM", name: "TSMC" }
                                            ].map(item => (
                                                <Button
                                                    key={item.symbol}
                                                    variant={selectedChart === item.symbol ? "default" : "outline"}
                                                    size="sm"
                                                    onClick={() => {
                                                        setSelectedChart(item.symbol);
                                                        setTimeout(() => {
                                                            if (chartContainerRef.current) {
                                                                const yOffset = -100;
                                                                const y = chartContainerRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                                                window.scrollTo({ top: y, behavior: 'smooth' });
                                                            }
                                                        }, 100);
                                                    }}
                                                    className={selectedChart === item.symbol
                                                        ? "bg-green-600 text-white"
                                                        : "bg-white hover:bg-green-50 border-green-200 text-green-700"}
                                                >
                                                    {item.name}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* インラインチャート表示 - 米国株 */}
                                    {selectedChart && selectedChart.includes("NASDAQ") || selectedChart?.includes("NYSE") ? (
                                        <div className="border-t">
                                            <div className="bg-white p-3 flex items-center justify-between border-b">
                                                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                                                    <TrendingUp className="w-5 h-5 text-green-600" />
                                                    {selectedChart}
                                                </h4>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setSelectedChart(null)}
                                                    className="text-slate-500 hover:text-slate-700"
                                                >
                                                    <X className="w-4 h-4" />
                                                    閉じる
                                                </Button>
                                            </div>
                                            {/* チャート */}
                                            <div style={{ height: "600px" }}>
                                                <TradingViewWidgetIframe
                                                    key={`chart-us-${selectedChart}`}
                                                    title="Advanced Chart"
                                                    scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js"
                                                    config={{
                                                        autosize: true,
                                                        symbol: selectedChart,
                                                        interval: "D",
                                                        timezone: "America/New_York",
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
                                                        studies: ["RSI@tv-basicstudies", "MASimple@tv-basicstudies"],
                                                        withdateranges: true,
                                                        details: true,
                                                        hotlist: false,
                                                        width: "100%",
                                                        height: "100%"
                                                    }}
                                                />
                                            </div>
                                            {/* テクニカル分析 */}
                                            <div className="border-t" style={{ height: "250px" }}>
                                                <TradingViewWidgetIframe
                                                    key={`ta-us-${selectedChart}`}
                                                    title="Technical Analysis"
                                                    scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js"
                                                    config={{
                                                        interval: "1D",
                                                        width: "100%",
                                                        height: "100%",
                                                        isTransparent: false,
                                                        symbol: selectedChart,
                                                        showIntervalTabs: true,
                                                        displayMode: "single",
                                                        locale: "ja",
                                                        colorTheme: "light"
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ) : null}

                                    {/* 一覧 */}
                                    <div className="border-t" style={{ height: "500px" }}>
                                        <TradingViewWidgetIframe
                                            key="us-widget"
                                            title="US Stock List"
                                            scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js"
                                            config={{
                                                colorTheme: "light",
                                                locale: "ja",
                                                largeChartUrl: "",
                                                isTransparent: false,
                                                showSymbolLogo: true,
                                                backgroundColor: "#ffffff",
                                                width: "100%",
                                                height: "100%",
                                                symbolsGroups: [
                                                    {
                                                        name: "テック株",
                                                        symbols: [
                                                            { name: "NASDAQ:AAPL", displayName: "Apple" },
                                                            { name: "NASDAQ:MSFT", displayName: "Microsoft" },
                                                            { name: "NASDAQ:GOOGL", displayName: "Google" },
                                                            { name: "NASDAQ:AMZN", displayName: "Amazon" },
                                                            { name: "NASDAQ:META", displayName: "Meta" },
                                                            { name: "NASDAQ:NVDA", displayName: "NVIDIA" },
                                                            { name: "NASDAQ:TSLA", displayName: "Tesla" }
                                                        ]
                                                    },
                                                    {
                                                        name: "半導体",
                                                        symbols: [
                                                            { name: "NASDAQ:AMD", displayName: "AMD" },
                                                            { name: "NASDAQ:INTC", displayName: "Intel" },
                                                            { name: "NASDAQ:AVGO", displayName: "Broadcom" },
                                                            { name: "NASDAQ:QCOM", displayName: "Qualcomm" },
                                                            { name: "NYSE:TSM", displayName: "TSMC" }
                                                        ]
                                                    },
                                                    {
                                                        name: "金融",
                                                        symbols: [
                                                            { name: "NYSE:JPM", displayName: "JPMorgan" },
                                                            { name: "NYSE:BAC", displayName: "Bank of America" },
                                                            { name: "NYSE:GS", displayName: "Goldman Sachs" },
                                                            { name: "NYSE:V", displayName: "Visa" },
                                                            { name: "NYSE:MA", displayName: "Mastercard" }
                                                        ]
                                                    },
                                                    {
                                                        name: "ヘルスケア",
                                                        symbols: [
                                                            { name: "NYSE:JNJ", displayName: "Johnson & Johnson" },
                                                            { name: "NYSE:UNH", displayName: "UnitedHealth" },
                                                            { name: "NYSE:PFE", displayName: "Pfizer" },
                                                            { name: "NYSE:LLY", displayName: "Eli Lilly" },
                                                            { name: "NYSE:MRK", displayName: "Merck" }
                                                        ]
                                                    }
                                                ]
                                            }}
                                        />
                                    </div>
                                </div>
                            ) : activeScreener === "crypto" ? (
                                <div key="crypto-screener" style={{ height: "800px" }}>
                                    <TradingViewWidgetIframe
                                        key="crypto-widget"
                                        title="Crypto Screener"
                                        scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-screener.js"
                                        config={{
                                            width: "100%",
                                            height: "100%",
                                            defaultColumn: "overview",
                                            screener_type: "crypto_mkt",
                                            displayCurrency: "USD",
                                            showToolbar: true,
                                            colorTheme: "light",
                                            locale: "ja"
                                        }}
                                    />
                                </div>
                            ) : (
                                <div key="forex-screener" style={{ height: "800px" }}>
                                    <TradingViewWidgetIframe
                                        key="forex-widget"
                                        title="Forex Screener"
                                        scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-screener.js"
                                        config={{
                                            width: "100%",
                                            height: "100%",
                                            defaultColumn: "overview",
                                            defaultScreen: "general",
                                            market: "forex",
                                            showToolbar: true,
                                            colorTheme: "light",
                                            locale: "ja"
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* ヒートマップセクション */}
                <Card className="mb-6 border-2 border-emerald-200 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                        <CardTitle className="flex items-center gap-3">
                            <BarChart2 className="w-5 h-5" />
                            マーケットヒートマップ
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="bg-slate-100 p-3 text-sm text-slate-600 border-b">
                            セクター別の値動きを視覚化 - サイズは時価総額、色は変化率を表示
                        </div>
                        <div style={{ height: "600px" }}>
                            <TradingViewWidgetIframe
                                title="Heatmap"
                                scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js"
                                config={{
                                    exchanges: [],
                                    dataSource: "SPX500",
                                    grouping: "sector",
                                    blockSize: "market_cap_basic",
                                    blockColor: "change",
                                    locale: "ja",
                                    symbolUrl: "",
                                    colorTheme: "light",
                                    hasTopBar: true,
                                    isDataSetEnabled: true,
                                    isZoomEnabled: true,
                                    hasSymbolTooltip: true,
                                    width: "100%",
                                    height: "100%"
                                }}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* 決算書セクション */}
                <Card className="border-2 border-amber-200 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                        <CardTitle className="flex items-center gap-3">
                            <FileText className="w-5 h-5" />
                            銘柄分析・財務データ
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        {/* 銘柄選択 */}
                        <div className="bg-slate-100 p-3 border-b">
                            <div className="flex flex-wrap gap-2">
                                {[
                                    { symbol: "NASDAQ:AAPL", name: "Apple" },
                                    { symbol: "NASDAQ:MSFT", name: "Microsoft" },
                                    { symbol: "NASDAQ:GOOGL", name: "Google" },
                                    { symbol: "NASDAQ:AMZN", name: "Amazon" },
                                    { symbol: "NASDAQ:META", name: "Meta" },
                                    { symbol: "NASDAQ:NVDA", name: "NVIDIA" },
                                    { symbol: "NASDAQ:TSLA", name: "Tesla" },
                                    { symbol: "NASDAQ:AMD", name: "AMD" }
                                ].map(item => (
                                    <Button
                                        key={`fin-${item.symbol}`}
                                        variant={selectedChart === item.symbol ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => setSelectedChart(item.symbol)}
                                        className={selectedChart === item.symbol
                                            ? "bg-amber-500 text-white"
                                            : "bg-white hover:bg-amber-50 border-amber-200 text-amber-700"}
                                    >
                                        {item.name}
                                    </Button>
                                ))}
                            </div>
                        </div>

                        {/* タブナビゲーション */}
                        {selectedChart && (
                            <div className="border-b bg-white">
                                <div className="flex">
                                    <button
                                        onClick={() => setFinancialTab("financials")}
                                        className={`flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${financialTab === "financials"
                                            ? "bg-amber-100 text-amber-700 border-b-2 border-amber-500"
                                            : "text-slate-600 hover:bg-slate-50"
                                            }`}
                                    >
                                        <FileText className="w-4 h-4" />
                                        決算書・財務データ
                                    </button>
                                    <button
                                        onClick={() => setFinancialTab("chart")}
                                        className={`flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${financialTab === "chart"
                                            ? "bg-amber-100 text-amber-700 border-b-2 border-amber-500"
                                            : "text-slate-600 hover:bg-slate-50"
                                            }`}
                                    >
                                        <LineChart className="w-4 h-4" />
                                        チャート・グラフ
                                    </button>
                                    <button
                                        onClick={() => setFinancialTab("profile")}
                                        className={`flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${financialTab === "profile"
                                            ? "bg-amber-100 text-amber-700 border-b-2 border-amber-500"
                                            : "text-slate-600 hover:bg-slate-50"
                                            }`}
                                    >
                                        <Building className="w-4 h-4" />
                                        会社概要
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* タブコンテンツ */}
                        {selectedChart ? (
                            <div className="p-4">
                                {/* 決算書・財務データ */}
                                {financialTab === "financials" && (
                                    <div style={{ height: "900px" }}>
                                        <TradingViewWidgetIframe
                                            key={`fin-${selectedChart}`}
                                            title="Financials"
                                            scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-financials.js"
                                            config={{
                                                isTransparent: false,
                                                largeChartUrl: "",
                                                displayMode: "regular",
                                                width: "100%",
                                                height: "100%",
                                                colorTheme: "light",
                                                symbol: selectedChart,
                                                locale: "ja"
                                            }}
                                        />
                                    </div>
                                )}

                                {/* チャート・グラフ */}
                                {financialTab === "chart" && (
                                    <div>
                                        {/* Mini Chart */}
                                        <div className="mb-4" style={{ height: "400px" }}>
                                            <TradingViewWidgetIframe
                                                key={`mini-${selectedChart}`}
                                                title="Mini Chart"
                                                scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js"
                                                config={{
                                                    symbol: selectedChart,
                                                    width: "100%",
                                                    height: "100%",
                                                    locale: "ja",
                                                    dateRange: "12M",
                                                    colorTheme: "light",
                                                    isTransparent: false,
                                                    autosize: true,
                                                    largeChartUrl: ""
                                                }}
                                            />
                                        </div>
                                        {/* Advanced Chart */}
                                        <div style={{ height: "500px" }}>
                                            <TradingViewWidgetIframe
                                                key={`chart-fin-${selectedChart}`}
                                                title="Advanced Chart"
                                                scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js"
                                                config={{
                                                    autosize: true,
                                                    symbol: selectedChart,
                                                    interval: "W",
                                                    timezone: "America/New_York",
                                                    theme: "light",
                                                    style: "1",
                                                    locale: "ja",
                                                    enable_publishing: false,
                                                    allow_symbol_change: false,
                                                    calendar: false,
                                                    hide_top_toolbar: false,
                                                    hide_legend: false,
                                                    hide_side_toolbar: true,
                                                    save_image: true,
                                                    studies: ["Volume@tv-basicstudies", "MASimple@tv-basicstudies"],
                                                    withdateranges: true,
                                                    width: "100%",
                                                    height: "100%"
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* 会社概要 */}
                                {financialTab === "profile" && (
                                    <div>
                                        {/* Symbol Info */}
                                        <div className="mb-4" style={{ height: "200px" }}>
                                            <TradingViewWidgetIframe
                                                key={`info-${selectedChart}`}
                                                title="Symbol Info"
                                                scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js"
                                                config={{
                                                    symbol: selectedChart,
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
                                                key={`profile-${selectedChart}`}
                                                title="Symbol Profile"
                                                scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js"
                                                config={{
                                                    symbol: selectedChart,
                                                    width: "100%",
                                                    height: "100%",
                                                    colorTheme: "light",
                                                    isTransparent: false,
                                                    locale: "ja"
                                                }}
                                            />
                                        </div>
                                        {/* Apple分析画像 - Apple専用 */}
                                        {selectedChart === "NASDAQ:AAPL" && (
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
                                        {selectedChart === "NASDAQ:MSFT" && (
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
                                        {selectedChart === "NASDAQ:AMZN" && (
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
                                        {selectedChart === "NASDAQ:META" && (
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
                                        {selectedChart === "NASDAQ:GOOGL" && (
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
                                        {selectedChart === "NASDAQ:NVDA" && (
                                            <div className="mt-4">
                                                <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                                                    <BarChart2 className="w-5 h-5 text-green-600" />
                                                    NVIDIA (NVDA) ファンダメンタル分析
                                                </h4>
                                                <img
                                                    src="/nvidia-analysis.jpg"
                                                    alt="NVIDIA (NVDA) ファンダメンタル分析：驚異的な収益性と財務健全性"
                                                    className="w-full rounded-lg shadow-lg border border-slate-200"
                                                />
                                            </div>
                                        )}
                                        {/* Tesla分析画像 - Tesla専用 */}
                                        {selectedChart === "NASDAQ:TSLA" && (
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
                                        {selectedChart === "NASDAQ:AMD" && (
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
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-slate-500">
                                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                <p>銘柄を選択すると決算書・財務データが表示されます</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* 注意書き */}
                <div className="mt-8 text-center text-sm text-slate-500">
                    <p>※ データはTradingViewより提供されています</p>
                    <p>※ 投資判断は自己責任でお願いします</p>
                </div>
            </div>
        </div>
    );
};

export default StockScreener;
