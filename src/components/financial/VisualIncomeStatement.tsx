import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Sparkles } from "lucide-react";
import { HorizontalWaterfallChart, IncomeStatementData } from "./HorizontalWaterfallChart";

export type { IncomeStatementData };

interface VisualIncomeStatementProps {
    data: IncomeStatementData;
    symbol: string;
    period: string;
    currency?: string;
    unit?: string;
    exchangeRate?: number;
    isCompact?: boolean;
    analysis?: string;
    className?: string;
}

export const VisualIncomeStatement: React.FC<VisualIncomeStatementProps> = ({
    data,
    symbol,
    period,
    currency = "¥",
    unit = "",
    exchangeRate,
    isCompact = false,
    analysis,
    className = ""
}) => {
    // 日本語の金額表記フォーマット（万単位まで含める）
    const formatJapaneseFormal = (val: number, currentUnit: string) => {
        let multiplier = 1;
        if (currentUnit === "億円") multiplier = 100000000;
        else if (currentUnit === "百万") multiplier = 1000000;
        else if (currentUnit === "M") multiplier = 1000000; // Fallback
        else if (currentUnit === "千") multiplier = 1000;

        let totalYen = Math.abs(val) * multiplier;

        const trillions = Math.floor(totalYen / 1000000000000);
        const billions = Math.floor((totalYen % 1000000000000) / 100000000);
        const manYen = Math.floor((totalYen % 100000000) / 10000);

        let parts = [];
        if (trillions > 0) parts.push(`${trillions}兆`);
        if (billions > 0) parts.push(`${billions.toLocaleString()}億`);
        if (manYen > 0) parts.push(`${manYen.toLocaleString()}万`);

        if (parts.length === 0) return "0円";
        parts.push("円");

        return parts.join("");
    };

    // 数値フォーマット関数（サマリー用）
    const formatValue = (value: number) => {
        if (currency === "¥") {
            // 日本円の場合は詳細表記
            return formatJapaneseFormal(value, unit);
        }
        return `${currency}${Math.abs(value).toLocaleString()}${unit}`;
    };

    // パーセンテージ計算（サマリー用）
    const calcPercentage = (value: number) => {
        return ((value / data.revenue) * 100).toFixed(1);
    };

    return (
        <Card className={`w-full border border-amber-200 shadow-lg bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 text-slate-800 overflow-hidden ${className} ${isCompact ? 'shadow-none bg-white border-0' : ''}`}>
            {!isCompact && (
                <CardHeader className="pb-3">
                    <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 text-base sm:text-lg font-bold">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl text-white shadow-md">
                                <BookOpen className="w-5 h-5" />
                            </div>
                            <div>
                                <span className="flex items-center gap-2">
                                    損益計算書をグラフで見る
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
                    </p>
                </CardHeader>
            )}

            <CardContent className={`px-3 sm:px-6 pb-6 overflow-visible ${isCompact ? 'p-2 sm:p-4' : ''}`}>
                <div className={`rounded-2xl shadow-inner border border-white/50 ${isCompact ? 'bg-white shadow-none border-none p-0' : 'bg-white/90 backdrop-blur p-4 sm:p-6'}`}>

                    {/* 凡例 */}
                    {!isCompact && (
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
                    )}

                    {/* ウォーターフォールチャート（共通コンポーネント） */}
                    <HorizontalWaterfallChart
                        data={data}
                        currency={currency}
                        unit={unit}
                        exchangeRate={exchangeRate}
                    />

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

                    {analysis && (
                        <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-3">
                            <Sparkles className="w-5 h-5 text-amber-500 mt-1" />
                            <div>
                                <div className="text-sm font-bold text-amber-900">収益性の分析</div>
                                <p className="text-xs text-amber-700 leading-relaxed mt-1">
                                    {analysis}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};
