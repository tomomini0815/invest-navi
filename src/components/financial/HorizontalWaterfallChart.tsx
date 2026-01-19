import React, { useState, useEffect } from 'react';
import { ArrowDown, TrendingDown, TrendingUp } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export interface IncomeStatementData {
    revenue: number;
    costOfGoodsSold: number;
    grossProfit: number;
    sellingGeneralAdmin: number;
    operatingIncome: number;
    nonOperatingIncome: number;
    ordinaryIncome: number;
    specialIncome?: number; // Optional as FactoryIncomeStatement might not have it
    preTaxIncome?: number;
    incomeTax: number;
    netIncome: number;
}

interface HorizontalWaterfallChartProps {
    data: IncomeStatementData;
    currency?: string;
    unit?: string;
    exchangeRate?: number;
    className?: string;
}

type BarType = 'start' | 'decrease' | 'increase' | 'subtotal' | 'final';

interface WaterfallItem {
    id: number;
    label: string;
    shortLabel: string;
    value: number;
    type: BarType;
    description: string;
    color: string;
    bgColor: string;
    borderColor: string;
}

export const HorizontalWaterfallChart: React.FC<HorizontalWaterfallChartProps> = ({
    data,
    currency = "¥",
    unit = "",
    exchangeRate,
    className = ""
}) => {
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setAnimated(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // 数値フォーマット関数
    const formatValue = (value: number) => {
        return `${currency}${Math.abs(value).toLocaleString()}${unit}`;
    };

    // 日本円換算関数
    const formatJapaneseYen = (value: number) => {
        if (!exchangeRate) return null;

        let actualValue = Math.abs(value);
        if (unit === "百万") {
            actualValue = actualValue * 1000000;
        } else if (unit === "千") {
            actualValue = actualValue * 1000;
        } else if (unit === "億") {
            actualValue = actualValue * 100000000;
        }

        const yenValue = actualValue * exchangeRate;

        if (yenValue >= 1000000000000) {
            return `約${(yenValue / 1000000000000).toFixed(1)}兆円`;
        } else if (yenValue >= 100000000) {
            return `約${(yenValue / 100000000).toFixed(1)}億円`;
        } else if (yenValue >= 10000) {
            return `約${(yenValue / 10000).toFixed(0)}万円`;
        } else {
            return `約${yenValue.toLocaleString()}円`;
        }
    };

    // パーセンテージ計算
    const calcPercentage = (value: number) => {
        return ((value / data.revenue) * 100).toFixed(1);
    };

    // ウォーターフォールデータ作成
    const waterfallData: WaterfallItem[] = [
        {
            id: 1,
            label: "売上高",
            shortLabel: "売上",
            value: data.revenue,
            type: 'start',
            description: "会社が商品やサービスを提供して得た収入の合計",
            color: "text-blue-700",
            bgColor: "bg-gradient-to-b from-blue-400 to-blue-600",
            borderColor: "border-blue-500"
        },
        {
            id: 2,
            label: "売上原価",
            shortLabel: "原価",
            value: -data.costOfGoodsSold,
            type: 'decrease',
            description: "商品の仕入れや製造にかかった直接的なコスト（材料費・仕入れ代など）",
            color: "text-red-600",
            bgColor: "bg-gradient-to-b from-red-400 to-red-600",
            borderColor: "border-red-400"
        },
        {
            id: 3,
            label: "売上総利益（粗利）",
            shortLabel: "粗利",
            value: data.grossProfit,
            type: 'subtotal',
            description: "売上から原価を引いた、商品力を示す基本的な利益",
            color: "text-emerald-700",
            bgColor: "bg-gradient-to-b from-emerald-400 to-emerald-600",
            borderColor: "border-emerald-500"
        },
        {
            id: 4,
            label: "販管費",
            shortLabel: "販管費",
            value: -data.sellingGeneralAdmin,
            type: 'decrease',
            description: "人件費・広告費・家賃・通信費など、営業活動にかかる費用",
            color: "text-red-600",
            bgColor: "bg-gradient-to-b from-red-400 to-red-600",
            borderColor: "border-red-400"
        },
        {
            id: 5,
            label: "営業利益",
            shortLabel: "営業利益",
            value: data.operatingIncome,
            type: 'subtotal',
            description: "本業で稼いだ利益。会社の「稼ぐ力」を最もよく表す指標",
            color: "text-orange-700",
            bgColor: "bg-gradient-to-b from-orange-400 to-orange-600",
            borderColor: "border-orange-500"
        },
        {
            id: 6,
            label: data.nonOperatingIncome >= 0 ? "営業外収益" : "営業外費用",
            shortLabel: "営業外",
            value: data.nonOperatingIncome,
            type: data.nonOperatingIncome >= 0 ? 'increase' : 'decrease',
            description: "利息収入・配当金・為替差損益など、本業以外の収支",
            color: data.nonOperatingIncome >= 0 ? "text-teal-600" : "text-red-600",
            bgColor: data.nonOperatingIncome >= 0
                ? "bg-gradient-to-b from-teal-400 to-teal-600"
                : "bg-gradient-to-b from-red-400 to-red-600",
            borderColor: data.nonOperatingIncome >= 0 ? "border-teal-400" : "border-red-400"
        },
        {
            id: 7,
            label: "経常利益",
            shortLabel: "経常利益",
            value: data.ordinaryIncome,
            type: 'subtotal',
            description: "本業＋財務活動を含めた、通常の企業活動による利益",
            color: "text-violet-700",
            bgColor: "bg-gradient-to-b from-violet-400 to-violet-600",
            borderColor: "border-violet-500"
        },
        {
            id: 8,
            label: (data.specialIncome || 0) >= 0 ? "特別利益" : "特別損失",
            shortLabel: "特別",
            value: data.specialIncome || 0,
            type: (data.specialIncome || 0) >= 0 ? 'increase' : 'decrease',
            description: "資産売却益・災害損失など、臨時的・例外的な損益",
            color: (data.specialIncome || 0) >= 0 ? "text-teal-600" : "text-red-600",
            bgColor: (data.specialIncome || 0) >= 0
                ? "bg-gradient-to-b from-teal-400 to-teal-600"
                : "bg-gradient-to-b from-red-400 to-red-600",
            borderColor: (data.specialIncome || 0) >= 0 ? "border-teal-400" : "border-red-400"
        },
        {
            id: 9,
            label: "法人税等",
            shortLabel: "税金",
            value: -data.incomeTax,
            type: 'decrease',
            description: "法人税・住民税・事業税など、国や自治体に納める税金",
            color: "text-slate-600",
            bgColor: "bg-gradient-to-b from-slate-400 to-slate-600",
            borderColor: "border-slate-400"
        },
        {
            id: 10,
            label: "当期純利益",
            shortLabel: "純利益",
            value: data.netIncome,
            type: 'final',
            description: "全ての費用・税金を差し引いた、最終的に会社に残る「真の利益」",
            color: "text-amber-700",
            bgColor: "bg-gradient-to-b from-amber-400 via-yellow-500 to-amber-600",
            borderColor: "border-amber-500"
        }
    ];

    const maxValue = data.revenue;
    const filteredData = waterfallData.filter(item => item.value !== 0 || item.type === 'start' || item.type === 'final');

    return (
        <div className={`space-y-2 px-2 ${className}`}>
            {filteredData.map((item, index) => {
                const barWidth = (Math.abs(item.value) / maxValue) * 100;
                const isNegative = item.type === 'decrease';
                const isPositive = item.type === 'increase';

                return (
                    <TooltipProvider key={item.id}>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div
                                    className="group cursor-pointer"
                                    style={{
                                        opacity: animated ? 1 : 0,
                                        transform: animated ? 'translateX(0)' : 'translateX(-20px)',
                                        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                        transitionDelay: `${index * 60}ms`
                                    }}
                                >
                                    {/* ラベル行 */}
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center gap-2">
                                            {isNegative && (
                                                <div className="bg-red-100 rounded-full p-0.5">
                                                    <ArrowDown className="w-3 h-3 text-red-500" />
                                                </div>
                                            )}
                                            {isPositive && item.value > 0 && (
                                                <div className="bg-teal-100 rounded-full p-0.5 rotate-180">
                                                    <ArrowDown className="w-3 h-3 text-teal-500" />
                                                </div>
                                            )}
                                            <span className={`text-xs font-bold ${item.color}`}>
                                                {item.shortLabel}
                                            </span>
                                        </div>
                                        <div className="text-right flex items-baseline justify-end gap-1 flex-wrap">
                                            <span className={`text-xs font-bold ${item.color}`}>
                                                {isNegative ? '−' : ''}{formatValue(Math.abs(item.value))}
                                            </span>
                                            {exchangeRate && (
                                                <span className="text-[10px] text-amber-600 font-medium">
                                                    ({formatJapaneseYen(item.value)})
                                                </span>
                                            )}
                                            <span className="text-[10px] text-slate-600 font-medium">
                                                {calcPercentage(Math.abs(item.value))}%
                                            </span>
                                        </div>
                                    </div>
                                    {/* バー */}
                                    <div className="h-6 bg-slate-100 rounded-lg overflow-hidden">
                                        <div
                                            className={`h-full rounded-lg shadow-sm ${item.bgColor} ${item.type === 'final' ? 'ring-2 ring-amber-300' : ''} group-hover:brightness-110 transition-all duration-300`}
                                            style={{
                                                width: `${Math.max(barWidth, 3)}%`,
                                                transition: animated ? 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
                                                transitionDelay: `${index * 60}ms`
                                            }}
                                        />
                                    </div>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent
                                side="bottom"
                                sideOffset={8}
                                className="max-w-xs bg-slate-900 text-white border-0 shadow-xl z-[100]"
                            >
                                <div className="p-2">
                                    <div className="font-bold text-sm mb-1 flex items-center gap-2">
                                        {item.type === 'decrease' && <TrendingDown className="w-4 h-4 text-red-400" />}
                                        {item.type === 'increase' && <TrendingUp className="w-4 h-4 text-teal-400" />}
                                        {item.label}
                                    </div>
                                    <div className="text-lg font-mono font-bold text-amber-300">
                                        {item.value < 0 ? '−' : ''}{formatValue(Math.abs(item.value))}
                                    </div>
                                    {exchangeRate && (
                                        <div className="text-xs text-slate-300 mb-2">
                                            ({formatJapaneseYen(item.value)})
                                        </div>
                                    )}
                                    <p className="text-xs text-slate-300 leading-relaxed border-t border-slate-700 pt-2 mt-1">
                                        {item.description}
                                    </p>
                                </div>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                );
            })}
        </div>
    );
};
