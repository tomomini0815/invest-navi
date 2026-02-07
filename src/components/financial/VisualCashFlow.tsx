import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, ArrowRightLeft, Wallet } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine } from "recharts";
import { formatToJapaneseTrillionBillion } from "./VisualIncomeStatementV2";

export interface CashFlowData {
    operatingCashFlow: number;
    investingCashFlow: number;
    financingCashFlow: number;
    freeCashFlow: number;
}

interface VisualCashFlowProps {
    data: CashFlowData;
    symbol: string;
    period: string;
    currency?: string;
    unit?: string;
    exchangeRate?: number;
}

export const VisualCashFlow: React.FC<VisualCashFlowProps> = ({
    data,
    symbol,
    period,
    currency = "¥",
    unit = "",
    exchangeRate
}) => {
    const chartData = [
        { name: "営業CF", value: data.operatingCashFlow, fill: "#10b981" },
        { name: "投資CF", value: data.investingCashFlow, fill: "#ef4444" },
        { name: "財務CF", value: data.financingCashFlow, fill: "#3b82f6" },
        { name: "フリーCF", value: data.freeCashFlow, fill: "#f59e0b" },
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

    const renderValueWithJpy = (val: number, labelClass: string = "text-sm font-bold") => {
        const native = formatValue(val);
        const jpy = formatJapaneseYen(val);

        if (!jpy) return <span className={labelClass}>{native}</span>;

        return (
            <div className="text-right">
                <div className={`${labelClass} leading-tight`}>{native}</div>
                <div className="text-[11px] font-medium text-slate-500 mt-0.5">{jpy.replace('(', '').replace(')', '')}</div>
            </div>
        );
    };

    return (
        <Card className="w-full border border-teal-200 shadow-lg bg-white overflow-hidden">
            <CardHeader className="pb-3 bg-gradient-to-r from-teal-50 to-emerald-50">
                <CardTitle className="flex items-center gap-3 text-lg font-bold">
                    <div className="p-2 bg-teal-600 rounded-lg text-white shadow-md">
                        <Activity className="w-5 h-5" />
                    </div>
                    <span>キャッシュフロー (C/F) 可視化</span>
                    <span className="text-sm font-normal text-slate-500 ml-auto">
                        {symbol} - {period}
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-2 md:p-6">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={chartData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis hide />
                                <Tooltip
                                    formatter={(value: number) => [formatValue(value), "金額"]}
                                />
                                <ReferenceLine y={0} stroke="#64748b" />
                                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="space-y-3">
                        <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100/50">
                            <div className="flex justify-between items-start">
                                <span className="text-sm font-bold text-emerald-800 pt-1">営業キャッシュフロー</span>
                                {renderValueWithJpy(data.operatingCashFlow, "text-sm font-bold text-emerald-800")}
                            </div>
                            <p className="text-[10px] text-slate-600 mt-1">本業による現金の増減（プラスが理想）</p>
                        </div>

                        <div className="bg-red-50 p-3 rounded-lg border border-red-100/50">
                            <div className="flex justify-between items-start">
                                <span className="text-sm font-bold text-red-800 pt-1">投資キャッシュフロー</span>
                                {renderValueWithJpy(data.investingCashFlow, "text-sm font-bold text-red-800")}
                            </div>
                            <p className="text-[10px] text-slate-600 mt-1">将来への投資による現金の出入り</p>
                        </div>

                        <div className="bg-blue-50 p-3 rounded-lg border border-blue-100/50">
                            <div className="flex justify-between items-start">
                                <span className="text-sm font-bold text-blue-800 pt-1">財務キャッシュフロー</span>
                                {renderValueWithJpy(data.financingCashFlow, "text-sm font-bold text-blue-800")}
                            </div>
                            <p className="text-[10px] text-slate-600 mt-1">資金調達や返済による現金の出入り</p>
                        </div>

                        <div className="mt-4 p-4 bg-amber-50 rounded-xl border-2 border-amber-100 flex items-start gap-4">
                            <div className="p-2 bg-amber-100 rounded-lg">
                                <Wallet className="w-5 h-5 text-amber-600" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-1 text-amber-900 font-bold">
                                    <span className="text-sm pt-1">フリーキャッシュフロー</span>
                                    {renderValueWithJpy(data.freeCashFlow, "text-xl font-black text-amber-600")}
                                </div>
                                <p className="text-[11px] text-amber-700 leading-tight mt-2 border-t border-amber-200 pt-2">
                                    会社が自由に使える現金。事業拡大や配当の原資となります。
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
