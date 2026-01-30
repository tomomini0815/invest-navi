import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Sparkles, TrendingDown, TrendingUp, ArrowDown } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { IncomeStatementData } from "./HorizontalWaterfallChart";

interface VisualIncomeStatementV2Props {
    data: IncomeStatementData;
    symbol: string;
    period: string;
    currency?: string;
    unit?: string;
    exchangeRate?: number;
    analysis?: string;
    className?: string;
}

// 金額を「〇〇兆〇〇億円」形式にフォーマットする共通関数
export const formatToJapaneseTrillionBillion = (valIn100M: number) => {
    const absVal = Math.abs(valIn100M);
    const trillions = Math.floor(absVal / 10000);
    const billions = absVal % 10000;

    let result = "";
    if (trillions > 0) {
        result += `${trillions}兆`;
    }
    if (billions > 0 || result === "") {
        result += `${billions.toLocaleString()}億円`;
    } else {
        // 兆のみで億円が0の場合、そのまま「〇〇兆円」とする
        result += "円";
    }

    return (valIn100M < 0 ? "▲" : "") + result;
};

export const VisualIncomeStatementV2: React.FC<VisualIncomeStatementV2Props> = ({
    data,
    symbol,
    period,
    currency = "¥",
    unit = "億円",
    analysis,
    className = ""
}) => {
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setAnimated(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const items = [
        { label: "売上高", value: data.revenue, color: "text-blue-600", bgColor: "bg-blue-500" },
        { label: "売上原価", value: -data.costOfGoodsSold, color: "text-red-500", bgColor: "bg-red-400" },
        { label: "売上総利益", value: data.grossProfit, color: "text-slate-700", bgColor: "bg-slate-400", isSubtotal: true },
        { label: "販管費", value: -data.sellingGeneralAdmin, color: "text-red-500", bgColor: "bg-red-400" },
        { label: "営業利益", value: data.operatingIncome, color: "text-emerald-600", bgColor: "bg-emerald-500", isSubtotal: true },
        { label: "営業外・税金", value: data.netIncome - data.operatingIncome, color: data.netIncome > data.operatingIncome ? "text-blue-500" : "text-red-500", bgColor: "bg-slate-300" },
        { label: "当期純利益", value: data.netIncome, color: "text-amber-600", bgColor: "bg-amber-500", isFinal: true },
    ];

    const maxValue = data.revenue;

    return (
        <Card className={`w-full border border-amber-200 shadow-xl bg-white overflow-hidden ${className}`}>
            <CardHeader className="pb-3 bg-gradient-to-r from-amber-50 to-orange-50">
                <CardTitle className="flex items-center gap-3 text-lg font-bold">
                    <div className="p-2 bg-amber-500 rounded-lg text-white shadow-md">
                        <BookOpen className="w-5 h-5" />
                    </div>
                    <span>損益計算書 (P/L) ウォーターフォール</span>
                    <span className="text-sm font-normal text-slate-500 ml-auto">
                        {symbol} - {period}
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
                <div className="space-y-4">
                    {items.map((item, idx) => {
                        const widthPct = (Math.abs(item.value) / maxValue) * 100;
                        const isNegative = item.value < 0;

                        return (
                            <div key={idx} className="relative">
                                <div className="flex justify-between items-center mb-1">
                                    <span className={`text-xs font-bold ${item.color} flex items-center gap-1`}>
                                        {item.label}
                                        {item.isSubtotal && <span className="text-[10px] bg-slate-100 px-1 rounded text-slate-500">小計</span>}
                                    </span>
                                    <span className={`text-sm font-mono font-bold ${item.color}`}>
                                        {formatToJapaneseTrillionBillion(item.value)}
                                    </span>
                                </div>
                                <div className="h-4 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                                    <div
                                        className={`h-full ${item.bgColor} transition-all duration-1000 ease-out`}
                                        style={{
                                            width: animated ? `${Math.max(widthPct, 1)}%` : '0%',
                                            opacity: animated ? 1 : 0
                                        }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-amber-500 mt-1" />
                    <div>
                        <div className="text-sm font-bold text-amber-900">収益性の分析</div>
                        <p className="text-xs text-amber-700 leading-relaxed mt-1">
                            {analysis || `売上高に対する純利益の割合（純利益率）は **${((data.netIncome / data.revenue) * 100).toFixed(1)}%** です。`}
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
