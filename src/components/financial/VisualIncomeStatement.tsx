import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, TrendingDown, TrendingUp, ArrowDown, Sparkles } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export interface IncomeStatementData {
    revenue: number;
    costOfGoodsSold: number;
    grossProfit: number;
    sellingGeneralAdmin: number;
    operatingIncome: number;
    nonOperatingIncome: number; // ネットの営業外損益
    ordinaryIncome: number;
    specialIncome: number; // ネットの特別損益
    preTaxIncome: number;
    incomeTax: number;
    netIncome: number;
}

interface VisualIncomeStatementProps {
    data: IncomeStatementData;
    symbol: string;
    period: string;
    currency?: string;
    unit?: string;
    exchangeRate?: number;
}

// ウォーターフォールチャートのバータイプ
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

export const VisualIncomeStatement: React.FC<VisualIncomeStatementProps> = ({
    data,
    symbol,
    period,
    currency = "¥",
    unit = "",
    exchangeRate
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

    // ウォーターフォールデータ
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
            label: data.specialIncome >= 0 ? "特別利益" : "特別損失",
            shortLabel: "特別",
            value: data.specialIncome,
            type: data.specialIncome >= 0 ? 'increase' : 'decrease',
            description: "資産売却益・災害損失など、臨時的・例外的な損益",
            color: data.specialIncome >= 0 ? "text-teal-600" : "text-red-600",
            bgColor: data.specialIncome >= 0
                ? "bg-gradient-to-b from-teal-400 to-teal-600"
                : "bg-gradient-to-b from-red-400 to-red-600",
            borderColor: data.specialIncome >= 0 ? "border-teal-400" : "border-red-400"
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

    // 累積値を計算（ウォーターフォールの位置決め用）
    const calculatePositions = () => {
        let cumulative = 0;
        return waterfallData.map((item, index) => {
            let startY = 0;
            let height = 0;

            if (item.type === 'start') {
                startY = 0;
                height = item.value;
                cumulative = item.value;
            } else if (item.type === 'decrease' || item.type === 'increase') {
                if (item.value < 0) {
                    startY = cumulative + item.value;
                    height = Math.abs(item.value);
                } else {
                    startY = cumulative;
                    height = item.value;
                }
                cumulative += item.value;
            } else if (item.type === 'subtotal' || item.type === 'final') {
                startY = 0;
                height = item.value;
                cumulative = item.value;
            }

            return {
                ...item,
                startY,
                height,
                endY: startY + height
            };
        });
    };

    const positionedData = calculatePositions();
    const maxValue = data.revenue;

    // 0を含まない項目をフィルタ
    const filteredData = positionedData.filter(item =>
        !(item.type === 'increase' || item.type === 'decrease') || item.value !== 0
    );

    return (
        <Card className="w-full border border-amber-200 shadow-lg bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 text-slate-800 overflow-hidden">
            <CardHeader className="pb-3">
                <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 text-base sm:text-lg font-bold">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl text-white shadow-md">
                            <BookOpen className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="flex items-center gap-2">
                                損益計算書を図解で見る
                                <span className="text-xs bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-0.5 rounded-full font-medium">
                                    ウォーターフォール
                                </span>
                            </span>
                        </div>
                    </div>
                    <span className="text-xs sm:text-sm font-normal text-slate-500 sm:ml-auto flex flex-wrap items-center gap-2">
                        <span className="bg-white/80 px-2 py-1 rounded-md border border-slate-200">{symbol} - {period}</span>
                        {exchangeRate && (
                            <span className="text-xs bg-white/80 border border-amber-200 px-2 py-1 rounded-md text-amber-700">
                                $1 = {exchangeRate}円
                            </span>
                        )}
                    </span>
                </CardTitle>
                <p className="text-xs sm:text-sm text-slate-600 pl-0 sm:pl-14 mt-2 leading-relaxed">
                    <Sparkles className="w-4 h-4 inline-block text-amber-500 mr-1" />
                    売上高から各費用が<span className="text-red-500 font-semibold">引かれていく流れ</span>を視覚的に確認！
                    最終的にどれだけ利益が残るかが一目で分かります。
                </p>
            </CardHeader>

            <CardContent className="px-3 sm:px-6 pb-6 overflow-visible">
                <div className="bg-white/90 backdrop-blur rounded-2xl p-4 sm:p-6 shadow-inner border border-white/50">

                    {/* 凡例 */}
                    <div className="flex flex-wrap justify-center gap-3 sm:gap-6 border-b border-slate-100 pb-4 mb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-gradient-to-b from-blue-400 to-blue-600 shadow-sm" />
                            <span className="text-[10px] sm:text-xs text-slate-600">売上・利益（残高）</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-gradient-to-b from-red-400 to-red-600 shadow-sm" />
                            <span className="text-[10px] sm:text-xs text-slate-600">費用（マイナス）</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-gradient-to-b from-teal-400 to-teal-600 shadow-sm" />
                            <span className="text-[10px] sm:text-xs text-slate-600">収益（プラス）</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-gradient-to-b from-amber-400 to-amber-600 shadow-sm ring-2 ring-amber-300" />
                            <span className="text-[10px] sm:text-xs text-slate-600">最終利益</span>
                        </div>
                    </div>

                    {/* ウォーターフォールチャート (スクロール領域) */}
                    <div className="overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
                        <div className="min-w-[800px] lg:min-w-0">
                            {/* チャート本体 */}
                            <div className="relative h-[320px] sm:h-[380px] flex items-end gap-1 sm:gap-2 px-2">
                                {/* Y軸グリッドライン */}
                                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                                    {[0, 25, 50, 75, 100].map((percent) => (
                                        <div key={percent} className="flex items-center gap-2 w-full">
                                            <span className="text-[10px] text-slate-400 w-8 text-right">
                                                {percent}%
                                            </span>
                                            <div className="flex-1 border-t border-dashed border-slate-200" />
                                        </div>
                                    ))}
                                </div>

                                {/* バー */}
                                <div className="relative flex-1 flex items-end justify-around gap-1 sm:gap-2 pl-10 h-full">
                                    {filteredData.map((item, index) => {
                                        const barHeight = (item.height / maxValue) * 100;
                                        const bottomPosition = (item.startY / maxValue) * 100;
                                        const isNegative = item.type === 'decrease';
                                        const isPositive = item.type === 'increase';
                                        const isTotal = item.type === 'subtotal' || item.type === 'final' || item.type === 'start';

                                        return (
                                            <TooltipProvider key={item.id}>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <div
                                                            className="relative flex-1 max-w-[100px] flex flex-col items-center group cursor-pointer"
                                                            style={{ height: '100%' }}
                                                        >
                                                            {/* バー */}
                                                            <div
                                                                className="absolute w-full flex flex-col items-center"
                                                                style={{
                                                                    bottom: `${Math.max(0, bottomPosition)}%`,
                                                                    height: `${Math.min(100, Math.max(barHeight, 2))}%`,
                                                                    transition: animated ? 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
                                                                    transitionDelay: animated ? `${index * 80}ms` : '0ms',
                                                                    opacity: animated ? 1 : 0,
                                                                    transform: animated ? 'translateY(0)' : 'translateY(20px)'
                                                                }}
                                                            >
                                                                {/* 接続線（費用・収益項目のみ） */}
                                                                {(isNegative || isPositive) && index > 0 && (
                                                                    <div
                                                                        className="absolute -top-0 left-1/2 w-px border-l-2 border-dashed border-slate-300 -translate-x-1/2"
                                                                        style={{
                                                                            height: '8px'
                                                                        }}
                                                                    />
                                                                )}

                                                                {/* バー本体 */}
                                                                <div
                                                                    className={`
                                                                        w-full rounded-lg shadow-lg
                                                                        ${item.bgColor}
                                                                        ${item.type === 'final' ? 'ring-2 ring-amber-300 ring-offset-2' : ''}
                                                                        transition-all duration-300
                                                                        group-hover:shadow-xl group-hover:scale-105 group-hover:brightness-110
                                                                    `}
                                                                    style={{
                                                                        height: '100%',
                                                                        minHeight: '24px'
                                                                    }}
                                                                >
                                                                    {/* バー内の金額表示 */}
                                                                    {barHeight > 8 && (
                                                                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
                                                                            <span className="text-white text-[9px] sm:text-xs font-bold drop-shadow-md whitespace-nowrap px-1">
                                                                                {isNegative ? '−' : ''}{formatValue(Math.abs(item.value))}
                                                                            </span>
                                                                            {exchangeRate && (
                                                                                <span className="text-yellow-200 text-[7px] sm:text-[9px] font-medium drop-shadow-md whitespace-nowrap">
                                                                                    ({formatJapaneseYen(item.value)})
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {/* 増減アイコン */}
                                                                {isNegative && (
                                                                    <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                                                                        <div className="bg-red-100 rounded-full p-0.5">
                                                                            <ArrowDown className="w-3 h-3 text-red-500" />
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                {isPositive && item.value > 0 && (
                                                                    <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                                                                        <div className="bg-teal-100 rounded-full p-0.5 rotate-180">
                                                                            <ArrowDown className="w-3 h-3 text-teal-500" />
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>

                                                            {/* ラベル（下部） */}
                                                            <div className="absolute -bottom-16 sm:-bottom-14 left-1/2 -translate-x-1/2 w-full">
                                                                <div className="text-center">
                                                                    <div className={`text-[9px] sm:text-xs font-bold leading-tight ${item.color}`}>
                                                                        {item.shortLabel}
                                                                    </div>
                                                                    <div className="text-[8px] sm:text-[10px] text-slate-500 mt-0.5">
                                                                        {calcPercentage(Math.abs(item.value))}%
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </TooltipTrigger>
                                                    <TooltipContent
                                                        side="bottom"
                                                        sideOffset={8}
                                                        className="max-w-xs bg-slate-900 text-white border-0 shadow-xl z-[100]"
                                                        avoidCollisions={true}
                                                        collisionPadding={16}
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
                            </div>

                            {/* ラベル用スペース */}
                            <div className="h-16 sm:h-14" />
                        </div>
                    </div>

                    {/* サマリー */}
                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 border border-blue-200">
                            <div className="text-[10px] sm:text-xs text-blue-600 font-medium">売上高</div>
                            <div className="text-sm sm:text-lg font-bold text-blue-700">{formatValue(data.revenue)}</div>
                        </div>
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-3 border border-orange-200">
                            <div className="text-[10px] sm:text-xs text-orange-600 font-medium">営業利益率</div>
                            <div className="text-sm sm:text-lg font-bold text-orange-700">{calcPercentage(data.operatingIncome)}%</div>
                        </div>
                        <div className="bg-gradient-to-br from-violet-50 to-violet-100 rounded-xl p-3 border border-violet-200">
                            <div className="text-[10px] sm:text-xs text-violet-600 font-medium">経常利益率</div>
                            <div className="text-sm sm:text-lg font-bold text-violet-700">{calcPercentage(data.ordinaryIncome)}%</div>
                        </div>
                        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-3 border border-amber-200">
                            <div className="text-[10px] sm:text-xs text-amber-600 font-medium">純利益率</div>
                            <div className="text-sm sm:text-lg font-bold text-amber-700">{calcPercentage(data.netIncome)}%</div>
                        </div>
                    </div>

                </div>
            </CardContent>
        </Card>
    );
};
