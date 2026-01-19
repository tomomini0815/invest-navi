import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HorizontalWaterfallChart } from "./HorizontalWaterfallChart";

export interface FactoryIncomeData {
    revenue: number;
    costOfGoodsSold: number;
    grossProfit: number;
    sellingGeneralAdmin: number;
    operatingIncome: number;
    nonOperatingIncome: number;
    ordinaryIncome: number;
    incomeTax: number;
    netIncome: number;
}

interface FactoryIncomeStatementProps {
    data: FactoryIncomeData;
    symbol: string;
    companyName: string;
    exchangeRate?: number;
}

export const FactoryIncomeStatement: React.FC<FactoryIncomeStatementProps> = ({
    data,
    symbol,
    companyName,
    exchangeRate = 155
}) => {
    // データ変換
    const chartData = {
        ...data,
        specialIncome: 0,
        preTaxIncome: 0
    };

    return (
        <Card className="w-full border-0 shadow-2xl overflow-hidden rounded-2xl">
            {/* ヘッダー - 赤いグラデーション */}
            <CardHeader className="bg-gradient-to-r from-red-700 via-red-600 to-amber-500 text-white py-5 px-6">
                <CardTitle className="text-lg md:text-xl lg:text-2xl font-bold text-center drop-shadow-md">
                    {companyName}の「稼ぐ力」を解剖する：損益計算書(P/L)の仕組み
                </CardTitle>
            </CardHeader>

            <CardContent className="p-4 sm:p-6 bg-white min-h-[400px]">
                <HorizontalWaterfallChart
                    data={chartData}
                    currency="$"
                    unit="M"
                    exchangeRate={exchangeRate}
                />
            </CardContent>
        </Card>
    );
};
