import { TrendingUp, BarChart2, Wallet, Shield, Globe, Award, Activity, Sparkles, LineChart as LucideLineChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useRef } from "react";
import { StockDetailData, japanStockDetailData } from "@/data/japanStockDetailData";
import { usStockDetailData } from "@/data/usStockDetailData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, Cell } from "recharts";

interface StockAnalysisVisualizerProps {
    code: string;
    className?: string;
    isInline?: boolean;
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

export const StockAnalysisVisualizer = ({ code, className = "", isInline = false }: StockAnalysisVisualizerProps) => {
    const stockData = japanStockDetailData[code] || usStockDetailData[code];

    if (!stockData) {
        return null;
    }

    const maxRevenue = Math.max(...stockData.financials.map(f => f.revenue));

    // アイコンのマッピング
    const getIcon = (type: "award" | "globe" | "trending") => {
        switch (type) {
            case "award": return <Award className="w-4 h-4 text-blue-600" />;
            case "globe": return <Globe className="w-4 h-4 text-indigo-600" />;
            case "trending": return <TrendingUp className="w-4 h-4 text-emerald-600" />;
        }
    };

    const getIconBg = (type: "award" | "globe" | "trending") => {
        switch (type) {
            case "award": return "bg-blue-50";
            case "globe": return "bg-indigo-50";
            case "trending": return "bg-emerald-50";
        }
    };

    return (
        <div className={`w-full space-y-6 ${className}`}>
            <Card className={`overflow-hidden ${isInline ? 'border-none shadow-none bg-transparent' : 'border-2 border-slate-300 shadow-xl'}`}>
                {!isInline && (
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
                                    <span className={`${stockData.change >= 0 ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'} px-3 py-1 rounded-full flex items-center gap-1 text-sm font-bold border`}>
                                        {stockData.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <Activity className="w-4 h-4 rotate-180" />}
                                        {stockData.change >= 0 ? '+' : ''}{stockData.change.toLocaleString()} ({stockData.changePercent >= 0 ? '+' : ''}{stockData.changePercent}%)
                                    </span>
                                </div>
                            </div>
                        </CardTitle>
                    </CardHeader>
                )}

                <CardContent className={`p-6 ${isInline ? 'bg-transparent' : 'bg-slate-50/50'}`}>
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

                    {/* 割安・割高判断 & 企業の強み・特徴 */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        {/* 割安・割高判断 */}
                        <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl border border-amber-200/50 shadow-inner">
                            <div className="flex flex-col items-center mb-4">
                                <div className="text-[10px] font-black text-amber-700 mb-2 uppercase tracking-widest">現在の割安・割高判断</div>
                                <div className="bg-white px-8 py-3 rounded-2xl shadow-sm border-2 border-amber-400 flex flex-col items-center min-w-[160px]">
                                    <span className="text-2xl font-black text-amber-600 whitespace-nowrap">{stockData.valuation.status}</span>
                                    <span className="text-[10px] font-bold text-amber-500 mt-0.5 uppercase tracking-tighter">{stockData.valuation.statusEn}</span>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Activity className="w-4 h-4 text-amber-600 font-bold" />
                                    <h4 className="font-bold text-slate-800 text-sm">バリュエーション解説</h4>
                                </div>
                                <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
                                    {stockData.valuation.analysis}
                                </p>
                            </div>
                        </div>

                        {/* 企業の強み・特徴 (Relocated here) */}
                        <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border border-blue-200/50 shadow-inner">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="p-1.5 bg-blue-600 rounded-lg shadow-lg shadow-blue-200">
                                    <Shield className="w-4 h-4 text-white" />
                                </div>
                                <h4 className="font-bold text-slate-800">企業の強み・特徴</h4>
                            </div>
                            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-blue-100 shadow-sm space-y-3 min-h-[140px] flex flex-col justify-center">
                                {stockData.strengths.map((s, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <div className={`p-1.5 ${getIconBg(s.icon)} rounded-lg`}>{getIcon(s.icon)}</div>
                                        <div>
                                            <div className="font-bold text-sm text-slate-800 leading-tight">{s.title}</div>
                                            <p className="text-[11px] text-slate-600 leading-tight">{s.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 最新業績ハイライト（億円） - Upgraded with Recharts */}
                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <BarChart2 className="w-5 h-5 text-indigo-600" />
                            最新業績ハイライト（億円）
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
                                <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2 text-sm">
                                    <TrendingUp className="w-4 h-4 text-blue-500" />
                                    売上高推移
                                </h4>
                                <div className="h-[250px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={stockData.financials}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                                            <YAxis hide />
                                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                            <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={32}>
                                                {stockData.financials.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.isEstimate ? '#93c5fd' : '#3b82f6'} stroke={entry.isEstimate ? '#3b82f6' : 'none'} strokeDasharray={entry.isEstimate ? "4 4" : "0"} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
                                <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2 text-sm">
                                    <LucideLineChart className="w-4 h-4 text-emerald-500" />
                                    利益推移
                                </h4>
                                <div className="h-[250px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={stockData.financials}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                                            <YAxis hide />
                                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                            <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                                            <Line type="monotone" dataKey="ordinaryProfit" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} activeDot={{ r: 6 }} name="営業利益" />
                                            <Line type="monotone" dataKey="netProfit" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 6 }} name="純利益" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
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
                                    <th className="px-6 py-4 text-left font-bold text-slate-600">備考</th>
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
                                        <td className="px-6 py-4 text-right font-mono font-bold text-indigo-600">{data.netProfit.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-right font-mono font-bold">{data.eps.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-right font-mono font-bold text-emerald-600">{data.dividend}</td>
                                        <td className="px-6 py-4 text-left font-medium text-slate-600 min-w-[120px]">{data.remark || "-"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

        </div>
    );
};

