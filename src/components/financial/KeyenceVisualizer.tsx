import { TrendingUp, BarChart2, Coins, DollarSign, Wallet, Shield, Globe, Award, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useRef } from "react";

interface KeyenceVisualizerProps {
    className?: string;
}

const TradingViewWidget = ({ symbol }: { symbol: string }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        containerRef.current.innerHTML = '';
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-financials.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = JSON.stringify({
            "isTransparent": false,
            "largeChartUrl": "",
            "displayMode": "regular",
            "width": "100%",
            "height": "600",
            "colorTheme": "light",
            "symbol": symbol,
            "locale": "ja"
        });
        containerRef.current.appendChild(script);
    }, [symbol]);

    return (
        <div className="tradingview-widget-container" ref={containerRef}>
            <div className="tradingview-widget-container__widget"></div>
        </div>
    );
};

const KeyenceVisualizer = ({ className = "" }: KeyenceVisualizerProps) => {
    // キーエンス（6861）のデータ (StockScreener.tsx 参照)
    const stockData = {
        name: "キーエンス",
        code: "6861",
        market: "東証P",
        currentPrice: 65420.0, // 仮の最新値
        change: 1240.0,
        changePercent: 1.93,
        per: 38.5,
        pbr: 5.8,
        dividendYield: 0.46,
        marketCap: 158900, // 億円 (約15.8兆円)
        trends: {
            short: { days: 5, percent: 2.3 },
            medium: { days: 25, percent: 8.5 },
            midLong: { days: 75, percent: 12.1 },
            long: { days: 200, percent: 15.4 },
        },
        financials: [
            { period: "2022.03", revenue: 6269, ordinaryProfit: 3525, netProfit: 2536, eps: 1045.2, dividend: 200, isEstimate: false },
            { period: "2023.03", revenue: 8169, ordinaryProfit: 4872, netProfit: 3522, eps: 1452.1, dividend: 300, isEstimate: false },
            { period: "2024.03", revenue: 9164, ordinaryProfit: 5639, netProfit: 4079, eps: 1681.5, dividend: 350, isEstimate: false },
            { period: "2025.03(予)", revenue: 9500, ordinaryProfit: 6000, netProfit: 4200, eps: 1730.0, dividend: 400, isEstimate: true }
        ]
    };

    const maxRevenue = Math.max(...stockData.financials.map(f => f.revenue));
    const maxProfit = Math.max(...stockData.financials.map(f => Math.max(f.ordinaryProfit, f.netProfit)));

    return (
        <div className={`w-full space-y-6 ${className}`}>
            {/* ヘッダーカード */}
            <Card className="border-2 border-slate-300 shadow-xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 text-white">
                    <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                                <span className="text-3xl font-bold tracking-tight">{stockData.name}</span>
                                <span className="text-sm opacity-80 ml-2">({stockData.code})</span>
                            </div>
                            <div className="text-sm font-medium bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30">
                                {stockData.market}
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-4xl font-bold font-mono">¥{stockData.currentPrice.toLocaleString()}</div>
                            <div className="flex items-center justify-end gap-2 mt-1">
                                <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full flex items-center gap-1 text-sm font-bold border border-emerald-500/30">
                                    <TrendingUp className="w-4 h-4" />
                                    +{stockData.change.toLocaleString()} (+{stockData.changePercent}%)
                                </span>
                            </div>
                        </div>
                    </CardTitle>
                </CardHeader>

                <CardContent className="p-6 bg-slate-50/50">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        {[
                            { label: "PER（株価収益率）", value: `${stockData.per}倍`, color: "text-blue-600", desc: "収益性から見た株価水準" },
                            { label: "PBR（株価純資産倍率）", value: `${stockData.pbr}倍`, color: "text-indigo-600", desc: "資産価値から見た株価水準" },
                            { label: "配当利回り", value: `${stockData.dividendYield}%`, color: "text-emerald-600", desc: "直近の配当収益率" },
                            { label: "時価総額", value: `${(stockData.marketCap / 10000).toFixed(1)}兆円`, color: "text-slate-900", desc: "企業の市場価値合計" }
                        ].map((item, i) => (
                            <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group">
                                <div className="text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">{item.label}</div>
                                <div className={`text-3xl font-bold ${item.color} mb-1`}>{item.value}</div>
                                <div className="text-[10px] text-slate-400 group-hover:text-slate-500 transition-colors">{item.desc}</div>
                            </div>
                        ))}
                    </div>

                    {/* 割安・割高判断セクション */}
                    <div className="mb-8 p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl border border-amber-200/50 shadow-inner">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="flex-shrink-0 flex flex-col items-center">
                                <div className="text-xs font-bold text-amber-700 mb-2 uppercase tracking-widest">現在の割安・割高判断</div>
                                <div className="bg-white px-8 py-4 rounded-2xl shadow-sm border-2 border-amber-400 flex flex-col items-center">
                                    <span className="text-3xl font-black text-amber-600">やや割高</span>
                                    <span className="text-[10px] font-bold text-amber-500 mt-1">PREMIUM VALUATION</span>
                                </div>
                            </div>
                            <div className="flex-grow">
                                <div className="flex items-center gap-2 mb-2">
                                    <Activity className="w-5 h-5 text-amber-600 font-bold" />
                                    <h4 className="font-bold text-slate-800">バリュエーション解説</h4>
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    現在のPER 38.5倍は、同社の過去5年間の平均PER（約32〜36倍）と比較して<span className="font-bold text-amber-700">やや高い水準</span>にあります。営業利益率50%超という圧倒的な効率性とキャッシュ創出力が常にプレミアム評価の対象となっており、完全な「割安」圏まで下落することは稀です。現値は、次期以降の継続的な高成長を織り込んだ「強気な妥当水準」と判断されます。
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                <Shield className="w-5 h-5 text-blue-600" />
                                企業の強み・特徴
                            </h3>
                            <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-sm space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-blue-50 rounded-lg"><Award className="w-4 h-4 text-blue-600" /></div>
                                    <div>
                                        <div className="font-bold text-sm">驚異的な営業利益率</div>
                                        <p className="text-xs text-slate-600">50%を超える異次元の利益率を維持。高付加価値な製品開発力が源泉。</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-indigo-50 rounded-lg"><Globe className="w-4 h-4 text-indigo-600" /></div>
                                    <div>
                                        <div className="font-bold text-sm">世界初・業界初の開発力</div>
                                        <p className="text-xs text-slate-600">新製品の約7割が「世界初」または「業界初」。圧倒的な技術的優位性。</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-emerald-50 rounded-lg"><TrendingUp className="w-4 h-4 text-emerald-600" /></div>
                                    <div>
                                        <div className="font-bold text-sm">直販体制によるソリューション提供</div>
                                        <p className="text-xs text-slate-600">代理店を介さない直販により、顧客の課題を直接把握し即座に解決。</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <BarChart2 className="w-5 h-5 text-indigo-600" />
                                業績ハイライト（億円）
                            </h3>
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm h-[220px] flex items-end justify-around pb-10 relative">
                                {stockData.financials.map((data, index) => (
                                    <div key={index} className="flex flex-col items-center group relative">
                                        <div
                                            className={`w-12 rounded-t-lg transition-all duration-500 group-hover:brightness-110 shadow-lg ${data.isEstimate ? 'bg-indigo-300 border-2 border-dashed border-indigo-400' : 'bg-gradient-to-t from-indigo-600 to-indigo-400'}`}
                                            style={{ height: `${(data.revenue / maxRevenue) * 140}px` }}
                                        >
                                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-600 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                                                {data.revenue.toLocaleString()}
                                            </div>
                                        </div>
                                        <div className="mt-3 text-[10px] font-bold text-slate-500">{data.period}</div>
                                    </div>
                                ))}
                                <div className="absolute bottom-4 left-0 right-0 text-center text-[10px] text-slate-400">売上高の推移</div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* 財務詳細テーブル */}
            <Card className="border-2 border-slate-200 shadow-xl">
                <CardHeader className="border-b border-slate-100">
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                        <Wallet className="w-5 h-5 text-purple-600" />
                        詳細業績データ
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 text-left font-bold text-slate-600">決算期</th>
                                    <th className="px-6 py-4 text-right font-bold text-slate-600">売上高(億)</th>
                                    <th className="px-6 py-4 text-right font-bold text-slate-600">営業益(億)</th>
                                    <th className="px-6 py-4 text-right font-bold text-slate-600">最終益(億)</th>
                                    <th className="px-6 py-4 text-right font-bold text-slate-600">1株益(円)</th>
                                    <th className="px-6 py-4 text-right font-bold text-slate-600">配当(円)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stockData.financials.map((data, index) => (
                                    <tr key={index} className={`border-b border-slate-100 hover:bg-blue-50/50 transition-colors ${data.isEstimate ? 'bg-indigo-50/30' : ''}`}>
                                        <td className="px-6 py-4 font-bold text-slate-700">
                                            {data.isEstimate && <span className="text-indigo-500 mr-1">予</span>}
                                            {data.period}
                                        </td>
                                        <td className="px-6 py-4 text-right font-mono font-medium">{data.revenue.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-right font-mono font-medium text-blue-600">{data.ordinaryProfit.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-right font-mono font-medium text-indigo-600">{data.netProfit.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-right font-mono font-bold">{data.eps.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-right font-mono font-bold text-emerald-600">{data.dividend}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* TradingView ファンダメンタル・ウィジェット */}
            <Card className="border-2 border-slate-200 shadow-xl overflow-hidden">
                <CardHeader className="bg-slate-50 border-b border-slate-200">
                    <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-blue-600" />
                        TradingView 詳細ファンダメンタル分析
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0 border-t border-slate-200">
                    <div className="min-h-[600px] bg-white">
                        <TradingViewWidget symbol="TSE:6861" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default KeyenceVisualizer;
