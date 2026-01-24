import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, PieChart as PieChartIcon, ShieldCheck } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts";
import { formatToJapaneseTrillionBillion } from "./VisualIncomeStatementV2";

export interface BalanceSheetData {
    totalAssets: number;
    totalLiabilities: number;
    totalEquity: number;
    totalDebt: number;
}

interface VisualBalanceSheetProps {
    data: BalanceSheetData;
    symbol: string;
    period: string;
    currency?: string;
    unit?: string;
    exchangeRate?: number;
}

export const VisualBalanceSheet: React.FC<VisualBalanceSheetProps> = ({
    data,
    symbol,
    period,
    currency = "¥",
    unit = "",
    exchangeRate
}) => {
    const chartData = [
        {
            name: "資産と負債・資本の構成",
            assets: data.totalAssets,
            liabilities: data.totalLiabilities,
            equity: data.totalEquity,
        }
    ];

    // 日本円換算関数
    const formatJapaneseYen = (value: number) => {
        if (!exchangeRate) return null;

        let multiplier = 1;
        if (unit.includes("百万") || unit === "M") {
            multiplier = 1000000;
        } else if (unit.includes("億")) {
            multiplier = 100000000;
        }

        const totalYen = Math.abs(value) * multiplier * exchangeRate;

        // 1兆円以上の場合は兆・億表記
        const trillions = Math.floor(totalYen / 1000000000000);
        const billions = Math.floor((totalYen % 1000000000000) / 100000000);

        if (trillions > 0) {
            return `(約${trillions}兆${billions}億円)`;
        }
        return `(約${billions.toLocaleString()}億円)`;
    };

    const formatValue = (val: number) => {
        if (currency === "¥") {
            return formatToJapaneseTrillionBillion(val);
        }
        return `${currency}${val.toLocaleString()}${unit}`;
    };

    const renderValueWithJpy = (val: number, colorClass: string = "text-slate-800") => {
        const native = formatValue(val);
        const jpy = formatJapaneseYen(val);

        if (!jpy) return <span className={`text-lg font-bold ${colorClass}`}>{native}</span>;

        return (
            <div className="text-right">
                <div className={`text-lg font-bold leading-tight ${colorClass}`}>{native}</div>
                <div className="text-[11px] font-medium text-slate-500 mt-0.5">{jpy.replace('(', '').replace(')', '')}</div>
            </div>
        );
    };

    return (
        <Card className="w-full border border-blue-200 shadow-lg bg-white overflow-hidden">
            <CardHeader className="pb-3 bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="flex items-center gap-3 text-lg font-bold">
                    <div className="p-2 bg-blue-600 rounded-lg text-white shadow-md">
                        <Building2 className="w-5 h-5" />
                    </div>
                    <span>貸借対照表 (B/S) 可視化</span>
                    <span className="text-sm font-normal text-slate-500 ml-auto">
                        {symbol} - {period}
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={chartData}
                                layout="vertical"
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                stackOffset="sign"
                            >
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                                <XAxis type="number" hide />
                                <YAxis type="category" dataKey="name" hide />
                                <Tooltip
                                    formatter={(value: number) => [formatValue(value), ""]}
                                />
                                <Legend verticalAlign="top" height={36} />
                                <Bar
                                    dataKey="assets"
                                    name="総資産"
                                    fill="#3b82f6"
                                    radius={[0, 4, 4, 0]}
                                    barSize={60}
                                />
                                <Bar
                                    dataKey="liabilities"
                                    name="負債合計"
                                    stackId="right"
                                    fill="#ef4444"
                                    barSize={60}
                                />
                                <Bar
                                    dataKey="equity"
                                    name="資本合計"
                                    stackId="right"
                                    fill="#10b981"
                                    radius={[0, 4, 4, 0]}
                                    barSize={60}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                            <div className="flex justify-between items-start mb-1">
                                <span className="text-sm text-blue-600 font-medium pt-1">総資産</span>
                                {renderValueWithJpy(data.totalAssets, "text-blue-800")}
                            </div>
                            <p className="text-xs text-slate-500">会社が所有する全財産</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                                <div className="flex justify-between items-start">
                                    <div className="text-sm text-red-600 font-medium">負債合計</div>
                                </div>
                                <div className="mt-1 flex justify-end">
                                    {renderValueWithJpy(data.totalLiabilities, "text-red-800")}
                                </div>
                                <div className="text-[10px] text-red-500 mt-2 border-t border-red-200/50 pt-1">
                                    構成比: {((data.totalLiabilities / data.totalAssets) * 100).toFixed(1)}%
                                </div>
                            </div>
                            <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                                <div className="flex justify-between items-start">
                                    <div className="text-sm text-emerald-600 font-medium">資本合計</div>
                                </div>
                                <div className="mt-1 flex justify-end">
                                    {renderValueWithJpy(data.totalEquity, "text-emerald-800")}
                                </div>
                                <div className="text-[10px] text-emerald-500 mt-2 border-t border-emerald-200/50 pt-1">
                                    自己資本比率: {((data.totalEquity / data.totalAssets) * 100).toFixed(1)}%
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-start gap-3">
                            <ShieldCheck className="w-5 h-5 text-indigo-500 mt-1" />
                            <div>
                                <div className="text-sm font-bold text-slate-800">自己資本比率が健全性の鍵</div>
                                <p className="text-xs text-slate-600 leading-relaxed mt-1">
                                    総資産に占める資本の割合（自己資本比率）は **{((data.totalEquity / data.totalAssets) * 100).toFixed(1)}%** です。
                                    一般的に30%以上が健全、50%以上で非常に良好とされます。
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
