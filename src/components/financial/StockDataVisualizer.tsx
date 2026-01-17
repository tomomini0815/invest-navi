import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StockDataVisualizerProps {
    className?: string;
}

const StockDataVisualizer = ({ className = "" }: StockDataVisualizerProps) => {
    // キオクシアの実際のデータ（画像から）
    const stockData = {
        name: "キオクシア",
        code: "285A",
        currentPrice: 14750,
        change: 1120,
        changePercent: 8.22,
        trends: {
            short: { days: 5, percent: 8.40 },
            medium: { days: 25, percent: 8.38 },
            midLong: { days: 75, percent: 55.96 },
            long: { days: 200, percent: 9.18 },
        },
        financials: {
            revenue: 17064, // 億円
            operatingProfit: 3706,
            ordinaryProfit: 2723,
            netProfit: 520,
        }
    };

    const trendItems = [
        { label: "5日線", value: stockData.trends.short.percent, color: "text-orange-600", bgColor: "bg-orange-500" },
        { label: "25日線", value: stockData.trends.medium.percent, color: "text-orange-600", bgColor: "bg-orange-500" },
        { label: "75日線", value: stockData.trends.midLong.percent, color: "text-red-600", bgColor: "bg-red-500" },
        { label: "200日線", value: stockData.trends.long.percent, color: "text-orange-600", bgColor: "bg-orange-500" },
    ];

    return (
        <div className={`w-full ${className}`}>
            <Card className="border-2 border-blue-200 shadow-xl">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-blue-200">
                    <CardTitle className="flex items-center justify-between">
                        <div>
                            <span className="text-2xl font-bold text-slate-800">{stockData.name}</span>
                            <span className="text-sm text-slate-500 ml-3">({stockData.code})</span>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-bold text-slate-900">¥{stockData.currentPrice.toLocaleString()}</div>
                            <div className="flex items-center justify-end gap-1 text-red-600 font-bold">
                                <TrendingUp className="w-5 h-5" />
                                <span>+{stockData.change.toLocaleString()} (+{stockData.changePercent}%)</span>
                            </div>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    {/* 株価トレンド */}
                    <div className="mb-8">
                        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-blue-600" />
                            株価トレンド（移動平均線）
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {trendItems.map((item, index) => (
                                <div key={index} className="bg-gradient-to-br from-slate-50 to-white p-4 rounded-xl border-2 border-slate-200 hover:shadow-lg transition-shadow">
                                    <div className="text-sm text-slate-600 mb-2">{item.label}</div>
                                    <div className={`text-2xl font-bold ${item.color} flex items-center gap-1`}>
                                        <TrendingUp className="w-5 h-5" />
                                        +{item.value}%
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 業績データ（2025年3月期予想） */}
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-4">業績推移（2025年3月期）</h3>
                        <div className="relative bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border-2 border-slate-200">
                            <div className="flex items-end justify-center gap-6 h-64">
                                {/* 売上高 */}
                                <div className="flex flex-col items-center justify-end h-full w-24 group">
                                    <div className="text-xs text-slate-600 mb-2 text-center font-medium">
                                        売上高
                                    </div>
                                    <div
                                        className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg shadow-lg transition-all hover:brightness-110 relative"
                                        style={{ height: '100%' }}
                                    >
                                        <div className="absolute top-3 left-1/2 -translate-x-1/2 text-white text-xs font-bold bg-black/20 px-2 py-1 rounded-full">
                                            100%
                                        </div>
                                    </div>
                                    <div className="mt-2 text-sm font-bold text-slate-900">
                                        {stockData.financials.revenue.toLocaleString()}億円
                                    </div>
                                </div>

                                {/* 営業利益 */}
                                <div className="flex flex-col items-center justify-end h-full w-24 group">
                                    <div className="text-xs text-slate-600 mb-2 text-center font-medium">
                                        営業利益
                                    </div>
                                    <div
                                        className="w-full bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-lg shadow-lg transition-all hover:brightness-110 relative"
                                        style={{ height: `${(stockData.financials.operatingProfit / stockData.financials.revenue) * 100}%` }}
                                    >
                                        <div className="absolute top-3 left-1/2 -translate-x-1/2 text-white text-xs font-bold bg-black/20 px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                            {((stockData.financials.operatingProfit / stockData.financials.revenue) * 100).toFixed(1)}%
                                        </div>
                                    </div>
                                    <div className="mt-2 text-sm font-bold text-slate-900">
                                        {stockData.financials.operatingProfit.toLocaleString()}億円
                                    </div>
                                </div>

                                {/* 経常利益 */}
                                <div className="flex flex-col items-center justify-end h-full w-24 group">
                                    <div className="text-xs text-slate-600 mb-2 text-center font-medium">
                                        経常利益
                                    </div>
                                    <div
                                        className="w-full bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-t-lg shadow-lg transition-all hover:brightness-110 relative"
                                        style={{ height: `${(stockData.financials.ordinaryProfit / stockData.financials.revenue) * 100}%` }}
                                    >
                                        <div className="absolute top-3 left-1/2 -translate-x-1/2 text-white text-xs font-bold bg-black/20 px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                            {((stockData.financials.ordinaryProfit / stockData.financials.revenue) * 100).toFixed(1)}%
                                        </div>
                                    </div>
                                    <div className="mt-2 text-sm font-bold text-slate-900">
                                        {stockData.financials.ordinaryProfit.toLocaleString()}億円
                                    </div>
                                </div>

                                {/* 純利益 */}
                                <div className="flex flex-col items-center justify-end h-full w-24 group">
                                    <div className="text-xs text-slate-600 mb-2 text-center font-medium">
                                        純利益
                                    </div>
                                    <div
                                        className="w-full bg-gradient-to-t from-rose-500 to-rose-400 rounded-t-lg shadow-lg transition-all hover:brightness-110 relative"
                                        style={{ height: `${(stockData.financials.netProfit / stockData.financials.revenue) * 100}%` }}
                                    >
                                        <div className="absolute top-3 left-1/2 -translate-x-1/2 text-white text-xs font-bold bg-black/20 px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                            {((stockData.financials.netProfit / stockData.financials.revenue) * 100).toFixed(1)}%
                                        </div>
                                    </div>
                                    <div className="mt-2 text-sm font-bold text-slate-900">
                                        {stockData.financials.netProfit.toLocaleString()}億円
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-4 border-t border-slate-200 text-center text-sm text-slate-500">
                                ※ 2025年3月期予想データ（ホバーすると利益率が表示されます）
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default StockDataVisualizer;
