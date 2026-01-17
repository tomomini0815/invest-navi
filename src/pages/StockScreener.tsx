import { useEffect, useState, useRef, memo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, TrendingUp, BarChart2, Activity, Globe, Zap, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

// TradingViewウィジェットのタイプ定義
type ScreenerType = "japan" | "crypto" | "forex" | "us";

interface WidgetConfig {
    title: string;
    icon: React.ReactNode;
    description: string;
}

// 汎用TradingView Iframeウィジェットコンポーネント
const TradingViewWidgetIframe = memo(({ scriptSrc, config, title, height = "100%" }: { scriptSrc: string, config: any, title: string, height?: string | number }) => {
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
});

const StockScreener = () => {
    const navigate = useNavigate();
    const [activeScreener, setActiveScreener] = useState<ScreenerType>("japan");

    const screenerConfigs: Record<ScreenerType, WidgetConfig> = {
        japan: {
            title: "日本株スクリーナー",
            icon: <TrendingUp className="w-5 h-5" />,
            description: "東証上場銘柄のリアルタイムランキング"
        },
        crypto: {
            title: "暗号資産スクリーナー",
            icon: <Zap className="w-5 h-5" />,
            description: "主要暗号資産のリアルタイム価格"
        },
        forex: {
            title: "FXスクリーナー",
            icon: <Globe className="w-5 h-5" />,
            description: "主要通貨ペアのリアルタイムレート"
        },
        us: {
            title: "米国株スクリーナー",
            icon: <BarChart2 className="w-5 h-5" />,
            description: "NYSE/NASDAQ上場銘柄"
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
            <div className="sticky top-0 z-50 shadow-md bg-white h-[46px]">
                <TradingViewWidgetIframe
                    title="Ticker Tape"
                    height={46}
                    scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"
                    config={{
                        symbols: [
                            { proName: "TSE:7203", title: "トヨタ自動車" },
                            { proName: "TSE:6758", title: "ソニーG" },
                            { proName: "TSE:9984", title: "ソフトバンクG" },
                            { proName: "TSE:6861", title: "キーエンス" },
                            { proName: "TSE:8306", title: "三菱UFJ" },
                            { proName: "TSE:6501", title: "日立製作所" },
                            { proName: "TSE:9432", title: "NTT" },
                            { proName: "TSE:4063", title: "信越化学" },
                            { proName: "TSE:6902", title: "デンソー" },
                            { proName: "TSE:7974", title: "任天堂" },
                            { proName: "FX:USDJPY", title: "ドル円" },
                            { proName: "BITSTAMP:BTCUSD", title: "ビットコイン" }
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
                    <h1 className="text-3xl font-bold text-slate-800 mb-2 flex items-center justify-center gap-3">
                        <Activity className="w-8 h-8 text-blue-600" />
                        リアルタイム銘柄スクリーナー
                    </h1>
                    <p className="text-slate-600">
                        TradingViewのリアルタイムデータで投資銘柄を探す
                    </p>
                </div>

                {/* スクリーナー選択タブ */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {(Object.entries(screenerConfigs) as [ScreenerType, WidgetConfig][]).map(([key, config]) => (
                        <Button
                            key={key}
                            variant={activeScreener === key ? "default" : "outline"}
                            onClick={() => setActiveScreener(key)}
                            className={`flex items-center gap-2 px-6 py-3 transition-all ${activeScreener === key
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
                        <div className="bg-slate-100 p-3 text-sm text-slate-600 border-b">
                            {screenerConfigs[activeScreener].description} - リアルタイム更新中
                        </div>

                        <div className="w-full" style={{ minHeight: "600px" }}>
                            {activeScreener === "japan" ? (
                                <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 bg-slate-50">
                                    {japanStocks.map(stock => (
                                        <div key={stock.symbol} className="bg-white rounded-lg shadow-sm overflow-hidden h-[220px]">
                                            <TradingViewWidgetIframe
                                                title={stock.name}
                                                scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-mini-chart.js"
                                                config={{
                                                    symbol: stock.symbol,
                                                    width: "100%",
                                                    height: "100%",
                                                    locale: "ja",
                                                    dateRange: "12M",
                                                    colorTheme: "light",
                                                    isTransparent: false,
                                                    autosize: false,
                                                    largeChartUrl: ""
                                                }}
                                            />
                                        </div>
                                    ))}
                                    <div className="col-span-full flex justify-center py-4">
                                        <Button
                                            onClick={() => window.open("https://www.tradingview.com/screener/?exchange=TSE", "_blank")}
                                            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                                        >
                                            詳細なスクリーナーを開く
                                        </Button>
                                    </div>
                                </div>
                            ) : activeScreener === "us" ? (
                                <div style={{ height: "800px" }}>
                                    <TradingViewWidgetIframe
                                        title="US Screener"
                                        scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js"
                                        config={{
                                            colorTheme: "light",
                                            dateRange: "12M",
                                            exchange: "US",
                                            showChart: true,
                                            locale: "ja",
                                            largeChartUrl: "",
                                            isTransparent: false,
                                            showSymbolLogo: true,
                                            showFloatingTooltip: false,
                                            width: "100%",
                                            height: "100%"
                                        }}
                                    />
                                </div>
                            ) : activeScreener === "crypto" ? (
                                <div style={{ height: "800px" }}>
                                    <TradingViewWidgetIframe
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
                                <div style={{ height: "800px" }}>
                                    <TradingViewWidgetIframe
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

                {/* 使い方ガイド */}
                <Card className="border-2 border-amber-200 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                        <CardTitle>📖 スクリーナーの使い方</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white p-4 rounded-xl border border-slate-200">
                                <h4 className="font-bold text-slate-800 mb-2">1. 市場を選択</h4>
                                <p className="text-sm text-slate-600">
                                    日本株、米国株、暗号資産、FXから分析したい市場を選択します。
                                </p>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-200">
                                <h4 className="font-bold text-slate-800 mb-2">2. ランキングを確認</h4>
                                <p className="text-sm text-slate-600">
                                    値上がり率、出来高、時価総額などでソートして有望銘柄を探します。
                                </p>
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-200">
                                <h4 className="font-bold text-slate-800 mb-2">3. 詳細を分析</h4>
                                <p className="text-sm text-slate-600">
                                    銘柄をクリックするとチャートや詳細情報を確認できます。
                                </p>
                            </div>
                        </div>
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
