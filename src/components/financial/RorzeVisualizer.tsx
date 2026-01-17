import { TrendingUp, TrendingDown, BarChart2, Coins, DollarSign, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RorzeVisualizerProps {
    className?: string;
}

const RorzeVisualizer = ({ className = "" }: RorzeVisualizerProps) => {
    // ローツェ（6323）の実際のデータ
    const stockData = {
        name: "ローツェ",
        code: "6323",
        market: "東証P",
        currentPrice: 3178.0,
        change: 386.0,
        changePercent: 13.83,
        per: 23.5,
        pbr: 4.42,
        dividendYield: 0.53,
        marginRatio: 12.32,
        marketCap: 5606, // 億円
        trends: {
            short: { days: 5, percent: 12.39 },
            medium: { days: 25, percent: 35.36 },
            midLong: { days: 75, percent: 42.70 },
            long: { days: 200, percent: 66.15 },
        },
        // 業績推移データ（億円）
        financials: [
            {
                period: "2024.02",
                revenue: 932,
                ordinaryProfit: 270,
                netProfit: 195,
                eps: 111.1,
                dividend: 13.5,
                isEstimate: false
            },
            {
                period: "2025.02",
                revenue: 1244,
                ordinaryProfit: 354,
                netProfit: 236,
                eps: 134.1,
                dividend: 17.0,
                isEstimate: false
            },
            {
                period: "2026.02",
                revenue: 1281,
                ordinaryProfit: 306,
                netProfit: 234,
                eps: 133.5,
                dividend: 17.0,
                isEstimate: true
            }
        ]
    };

    // 前期比の計算
    const yoyGrowth = {
        revenue: ((stockData.financials[2].revenue - stockData.financials[1].revenue) / stockData.financials[1].revenue * 100).toFixed(1),
        ordinaryProfit: ((stockData.financials[2].ordinaryProfit - stockData.financials[1].ordinaryProfit) / stockData.financials[1].ordinaryProfit * 100).toFixed(1),
        netProfit: ((stockData.financials[2].netProfit - stockData.financials[1].netProfit) / stockData.financials[1].netProfit * 100).toFixed(1),
    };

    const trendItems = [
        { label: "5日線", value: stockData.trends.short.percent, bgGradient: "from-orange-500 to-amber-400" },
        { label: "25日線", value: stockData.trends.medium.percent, bgGradient: "from-orange-600 to-orange-400" },
        { label: "75日線", value: stockData.trends.midLong.percent, bgGradient: "from-red-600 to-rose-400" },
        { label: "200日線", value: stockData.trends.long.percent, bgGradient: "from-red-700 to-red-500" },
    ];

    // 最大値を取得（グラフのスケーリング用）
    const maxRevenue = Math.max(...stockData.financials.map(f => f.revenue));
    const maxProfit = Math.max(...stockData.financials.map(f => Math.max(f.ordinaryProfit, f.netProfit)));

    return (
        <div className={`w-full space-y-6 ${className}`}>
            {/* ヘッダーカード */}
            <Card className="border-2 border-blue-300 shadow-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
                    <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                                <span className="text-3xl font-bold">{stockData.name}</span>
                                <span className="text-sm opacity-80 ml-2">({stockData.code})</span>
                            </div>
                            <div className="text-sm opacity-80 bg-white/10 px-3 py-1 rounded-full">
                                {stockData.market}
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-4xl font-bold">¥{stockData.currentPrice.toLocaleString()}</div>
                            <div className="flex items-center justify-end gap-2 mt-1">
                                <span className="bg-green-400/30 text-green-100 px-3 py-1 rounded-full flex items-center gap-1 text-sm font-bold">
                                    <TrendingUp className="w-4 h-4" />
                                    +{stockData.change.toLocaleString()} (+{stockData.changePercent}%)
                                </span>
                            </div>
                        </div>
                    </CardTitle>
                </CardHeader>

                <CardContent className="p-6 bg-gradient-to-br from-slate-50 to-white">
                    {/* 基本指標 */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-xs text-slate-500 mb-1">PER（株価収益率）</div>
                            <div className="text-2xl font-bold text-blue-600">{stockData.per}倍</div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-xs text-slate-500 mb-1">PBR（株価純資産倍率）</div>
                            <div className="text-2xl font-bold text-indigo-600">{stockData.pbr}倍</div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-xs text-slate-500 mb-1">配当利回り</div>
                            <div className="text-2xl font-bold text-green-600">{stockData.dividendYield}%</div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-xs text-slate-500 mb-1">時価総額</div>
                            <div className="text-2xl font-bold text-purple-600">{stockData.marketCap.toLocaleString()}億円</div>
                        </div>
                    </div>

                    {/* 株価トレンド */}
                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                            株価トレンド（移動平均線からの乖離率）
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {trendItems.map((item, index) => (
                                <div
                                    key={index}
                                    className={`bg-gradient-to-br ${item.bgGradient} p-5 rounded-xl shadow-lg transform hover:scale-105 transition-all`}
                                >
                                    <div className="text-sm text-white/80 mb-1">{item.label}</div>
                                    <div className="text-3xl font-bold text-white flex items-center gap-1">
                                        <TrendingUp className="w-6 h-6" />
                                        +{item.value}%
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* 業績推移グラフ */}
            <Card className="border-2 border-emerald-200 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b-2 border-emerald-200">
                    <CardTitle className="flex items-center gap-2 text-slate-800">
                        <BarChart2 className="w-6 h-6 text-emerald-600" />
                        業績推移（単位：億円）
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    {/* 売上高グラフ */}
                    <div className="mb-8">
                        <h4 className="text-md font-bold text-slate-700 mb-4 flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-blue-500" />
                            売上高推移
                        </h4>
                        <div className="flex items-end justify-around h-48 bg-slate-50 rounded-xl p-4 relative">
                            {stockData.financials.map((data, index) => (
                                <div key={index} className="flex flex-col items-center group">
                                    <div className="relative flex flex-col items-center">
                                        <div
                                            className={`text-sm font-bold text-white mb-2 px-2 py-1 rounded ${data.isEstimate ? 'bg-blue-400' : 'bg-blue-600'} shadow`}
                                        >
                                            {data.revenue.toLocaleString()}
                                        </div>
                                        <div
                                            className={`w-20 rounded-t-lg shadow-lg transition-all group-hover:brightness-110 ${data.isEstimate
                                                    ? 'bg-gradient-to-t from-blue-300 to-blue-200 border-2 border-dashed border-blue-400'
                                                    : 'bg-gradient-to-t from-blue-600 to-blue-400'
                                                }`}
                                            style={{ height: `${(data.revenue / maxRevenue) * 140}px` }}
                                        />
                                    </div>
                                    <div className={`mt-2 text-sm font-semibold ${data.isEstimate ? 'text-blue-400' : 'text-slate-700'}`}>
                                        {data.isEstimate && '予 '}{data.period}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 利益グラフ */}
                    <div className="mb-8">
                        <h4 className="text-md font-bold text-slate-700 mb-4 flex items-center gap-2">
                            <Coins className="w-5 h-5 text-emerald-500" />
                            利益推移（経常利益 / 純利益）
                        </h4>
                        <div className="flex items-end justify-around h-48 bg-slate-50 rounded-xl p-4">
                            {stockData.financials.map((data, index) => (
                                <div key={index} className="flex flex-col items-center group">
                                    <div className="flex gap-2 items-end">
                                        {/* 経常利益 */}
                                        <div className="flex flex-col items-center">
                                            <div className={`text-xs font-bold text-white px-2 py-0.5 rounded ${data.isEstimate ? 'bg-emerald-400' : 'bg-emerald-600'} shadow mb-1`}>
                                                {data.ordinaryProfit}
                                            </div>
                                            <div
                                                className={`w-12 rounded-t-lg shadow-lg transition-all group-hover:brightness-110 ${data.isEstimate
                                                        ? 'bg-gradient-to-t from-emerald-300 to-emerald-200 border-2 border-dashed border-emerald-400'
                                                        : 'bg-gradient-to-t from-emerald-600 to-emerald-400'
                                                    }`}
                                                style={{ height: `${(data.ordinaryProfit / maxProfit) * 120}px` }}
                                            />
                                        </div>
                                        {/* 純利益 */}
                                        <div className="flex flex-col items-center">
                                            <div className={`text-xs font-bold text-white px-2 py-0.5 rounded ${data.isEstimate ? 'bg-amber-400' : 'bg-amber-600'} shadow mb-1`}>
                                                {data.netProfit}
                                            </div>
                                            <div
                                                className={`w-12 rounded-t-lg shadow-lg transition-all group-hover:brightness-110 ${data.isEstimate
                                                        ? 'bg-gradient-to-t from-amber-300 to-amber-200 border-2 border-dashed border-amber-400'
                                                        : 'bg-gradient-to-t from-amber-600 to-amber-400'
                                                    }`}
                                                style={{ height: `${(data.netProfit / maxProfit) * 120}px` }}
                                            />
                                        </div>
                                    </div>
                                    <div className={`mt-2 text-sm font-semibold ${data.isEstimate ? 'text-slate-400' : 'text-slate-700'}`}>
                                        {data.isEstimate && '予 '}{data.period}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center gap-8 mt-4">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-emerald-500 rounded"></div>
                                <span className="text-sm text-slate-600">経常利益</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-amber-500 rounded"></div>
                                <span className="text-sm text-slate-600">純利益</span>
                            </div>
                        </div>
                    </div>

                    {/* 1株当たり指標 */}
                    <div>
                        <h4 className="text-md font-bold text-slate-700 mb-4 flex items-center gap-2">
                            <Wallet className="w-5 h-5 text-purple-500" />
                            1株当たり指標（EPS / 配当）
                        </h4>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gradient-to-r from-purple-100 to-indigo-100">
                                        <th className="px-4 py-3 text-left font-bold text-slate-700 rounded-tl-lg">決算期</th>
                                        <th className="px-4 py-3 text-right font-bold text-slate-700">売上高</th>
                                        <th className="px-4 py-3 text-right font-bold text-slate-700">経常益</th>
                                        <th className="px-4 py-3 text-right font-bold text-slate-700">最終益</th>
                                        <th className="px-4 py-3 text-right font-bold text-slate-700">1株益(円)</th>
                                        <th className="px-4 py-3 text-right font-bold text-slate-700 rounded-tr-lg">1株配(円)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stockData.financials.map((data, index) => (
                                        <tr
                                            key={index}
                                            className={`border-b border-slate-200 hover:bg-slate-50 transition-colors ${data.isEstimate ? 'bg-blue-50/50' : ''
                                                }`}
                                        >
                                            <td className="px-4 py-3 font-semibold text-slate-700">
                                                {data.isEstimate && <span className="text-blue-500 mr-1">予</span>}
                                                {data.period}
                                            </td>
                                            <td className="px-4 py-3 text-right font-mono">{data.revenue.toLocaleString()}</td>
                                            <td className="px-4 py-3 text-right font-mono">{data.ordinaryProfit}</td>
                                            <td className="px-4 py-3 text-right font-mono">{data.netProfit}</td>
                                            <td className="px-4 py-3 text-right font-mono font-bold text-purple-600">{data.eps}</td>
                                            <td className="px-4 py-3 text-right font-mono font-bold text-green-600">{data.dividend}</td>
                                        </tr>
                                    ))}
                                    {/* 前期比 */}
                                    <tr className="bg-orange-50">
                                        <td className="px-4 py-3 font-bold text-orange-600">前期比(%)</td>
                                        <td className="px-4 py-3 text-right font-mono text-orange-600">+{yoyGrowth.revenue}%</td>
                                        <td className={`px-4 py-3 text-right font-mono ${parseFloat(yoyGrowth.ordinaryProfit) < 0 ? 'text-red-600' : 'text-orange-600'}`}>
                                            {parseFloat(yoyGrowth.ordinaryProfit) >= 0 ? '+' : ''}{yoyGrowth.ordinaryProfit}%
                                        </td>
                                        <td className={`px-4 py-3 text-right font-mono ${parseFloat(yoyGrowth.netProfit) < 0 ? 'text-red-600' : 'text-orange-600'}`}>
                                            {parseFloat(yoyGrowth.netProfit) >= 0 ? '+' : ''}{yoyGrowth.netProfit}%
                                        </td>
                                        <td className="px-4 py-3 text-right text-slate-400">-</td>
                                        <td className="px-4 py-3 text-right text-slate-400">-</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* 会社情報 */}
            <Card className="border-2 border-slate-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-slate-100 to-slate-50 border-b border-slate-200">
                    <CardTitle className="text-slate-800">
                        会社情報
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <table className="w-full text-sm">
                                <tbody>
                                    <tr className="border-b border-slate-100">
                                        <td className="py-2 text-slate-500 w-28">英語社名</td>
                                        <td className="py-2 font-semibold">RORZE CORPORATION</td>
                                    </tr>
                                    <tr className="border-b border-slate-100">
                                        <td className="py-2 text-slate-500">会社サイト</td>
                                        <td className="py-2">
                                            <a href="https://www.rorze.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                https://www.rorze.com/
                                            </a>
                                        </td>
                                    </tr>
                                    <tr className="border-b border-slate-100">
                                        <td className="py-2 text-slate-500">業種</td>
                                        <td className="py-2 font-semibold">機械</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <div className="text-slate-500 text-sm mb-2">概要</div>
                            <p className="text-slate-700 text-sm leading-relaxed">
                                ウエハー、ガラス基板搬送機器最大手。台湾・韓・米が大口顧客。アジアに生産シフト。
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">半導体製造装置</span>
                                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">液晶製造装置</span>
                                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">FA関連</span>
                                <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">ロボット</span>
                                <span className="px-3 py-1 bg-rose-100 text-rose-700 text-xs rounded-full">設備投資</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default RorzeVisualizer;
