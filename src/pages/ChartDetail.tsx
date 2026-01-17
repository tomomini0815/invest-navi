import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ChartDetail = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const containerRef = useRef<HTMLDivElement>(null);

    // URLパラメータからシンボルを取得（デフォルトはS&P 500）
    const symbol = searchParams.get("symbol") || "FOREXCOM:SPXUSD";

    // シンボル名を見やすく変換
    const getDisplayName = (sym: string) => {
        const names: Record<string, string> = {
            "FOREXCOM:SPXUSD": "S&P 500 Index",
            "FOREXCOM:NSXUSD": "NASDAQ 100",
            "FOREXCOM:DJI": "Dow Jones",
            "INDEX:NKY": "日経225",
            "INDEX:DEU40": "DAX Index",
            "FOREXCOM:UKXGBP": "FTSE 100",
            "FX:EURUSD": "EUR/USD",
            "FX:GBPUSD": "GBP/USD",
            "FX:USDJPY": "USD/JPY",
            "FX:USDCHF": "USD/CHF",
            "FX:AUDUSD": "AUD/USD",
            "FX:USDCAD": "USD/CAD",
            "CMCMARKETS:GOLD": "Gold",
            "BITSTAMP:BTCUSD": "Bitcoin",
            "BITSTAMP:ETHUSD": "Ethereum"
        };
        return names[sym] || sym;
    };

    useEffect(() => {
        if (!containerRef.current) return;

        // 既存のウィジェットをクリア
        containerRef.current.innerHTML = '';

        // TradingView Advanced Chart Widget
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
        script.async = true;
        script.innerHTML = JSON.stringify({
            autosize: true,
            symbol: symbol,
            interval: "D",
            timezone: "Asia/Tokyo",
            theme: "light",
            style: "1",
            locale: "ja",
            enable_publishing: false,
            allow_symbol_change: true,
            calendar: false,
            support_host: "https://www.tradingview.com",
            hide_top_toolbar: false,
            hide_legend: false,
            save_image: false,
            studies: ["RSI@tv-basicstudies", "MASimple@tv-basicstudies"]
        });

        const widgetContainer = document.createElement('div');
        widgetContainer.className = 'tradingview-widget-container';
        widgetContainer.style.height = '100%';
        widgetContainer.style.width = '100%';

        const widgetInner = document.createElement('div');
        widgetInner.className = 'tradingview-widget-container__widget';
        widgetInner.style.height = 'calc(100% - 32px)';
        widgetInner.style.width = '100%';

        widgetContainer.appendChild(widgetInner);
        widgetContainer.appendChild(script);
        containerRef.current.appendChild(widgetContainer);

    }, [symbol]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
            {/* ヘッダー */}
            <div className="bg-white shadow-md px-4 py-3 flex items-center gap-4">
                <Button
                    variant="ghost"
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
                >
                    <ArrowLeft className="w-4 h-4" />
                    戻る
                </Button>
                <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <h1 className="text-xl font-bold text-slate-800">
                        {getDisplayName(symbol)}
                    </h1>
                    <span className="text-sm text-slate-500">({symbol})</span>
                </div>
            </div>

            {/* チャートコンテナ */}
            <div className="p-4">
                <div
                    ref={containerRef}
                    className="w-full bg-white rounded-xl shadow-lg overflow-hidden"
                    style={{ height: "800px" }}
                />
            </div>
        </div>
    );
};

export default ChartDetail;
