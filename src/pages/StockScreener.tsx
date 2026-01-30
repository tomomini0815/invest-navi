import { VisualIncomeStatement } from "@/components/financial/VisualIncomeStatement";
import { IncomeStatementData } from "@/components/financial/HorizontalWaterfallChart";
import { sp500Stocks, nikkei225Stocks, promisingStocks2026 } from "@/data/stockLists";
import { useEffect, useState, useRef, memo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, TrendingUp, BarChart2, Activity, Globe, Zap, RefreshCw, X, ChevronDown, ChevronUp, List, FileText, LineChart, Building } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart as RechartsLine, Line } from "recharts";
import { TradingViewWidgetIframe } from "@/components/common/TradingViewWidgetIframe";
import { StockAnalysisSection } from "@/components/financial/StockAnalysisSection";
import SEO from "@/components/seo/SEO";

// TradingViewウィジェットのタイプ定義
type ScreenerType = "total" | "japan" | "crypto" | "forex" | "us" | "promising";

interface WidgetConfig {
    title: string;
    icon: React.ReactNode;
    description: string;
}

import { StockPriceChart } from "../components/financial/StockPriceChart";

// Helper to generate mock price history for JPY stocks (Daily data for 1 year)
const generateMockHistory = (startPrice: number, endPrice: number) => {
    const data = [];
    // Generate approx 250 trading days (1 year)
    const days = 365;
    const now = new Date();
    // Start from 1 year ago
    const startDate = new Date();
    startDate.setFullYear(now.getFullYear() - 1);

    let currentPrice = startPrice;

    // Create a few trend points to create "waves" instead of a straight line
    const trendPoints = [
        startPrice,
        startPrice + (endPrice - startPrice) * 0.3 * (0.8 + Math.random() * 0.4), // 30% progress point
        startPrice + (endPrice - startPrice) * 0.6 * (0.8 + Math.random() * 0.4), // 60% progress point
        endPrice
    ];

    const segmentLength = Math.floor(days / 3);

    for (let i = 0; i <= days; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);

        // Skip weekends
        if (date.getDay() === 0 || date.getDay() === 6) continue;

        const dateStr = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;

        // Determine which segment we are in
        const segmentIndex = Math.min(Math.floor(i / segmentLength), 2);
        const segmentStartPrice = trendPoints[segmentIndex];
        const segmentEndPrice = trendPoints[segmentIndex + 1];

        // Calculate target drift for this segment
        const segmentDrift = (segmentEndPrice - segmentStartPrice) / segmentLength;

        // Volatility scales with price (higher price = bigger swings)
        // 3-5% daily volatility for more "wiggle"
        const volatility = currentPrice * 0.04;

        // Random walk with drift for this segment
        const change = segmentDrift + (Math.random() - 0.5) * volatility;
        currentPrice += change;

        // Ensure price doesn't go negative or too far off
        if (currentPrice < 1) currentPrice = 1;

        data.push({ date: dateStr, close: Math.round(currentPrice) });
    }

    // Force the last price to match endPrice roughly
    if (data.length > 0) {
        data[data.length - 1].close = endPrice;
    }

    return data;
};

const StockScreener = () => {
    const navigate = useNavigate();
    const [activeScreener, setActiveScreener] = useState<ScreenerType>("total");
    const [showList, setShowList] = useState(false);
    const [selectedChart, setSelectedChart] = useState<string>("FOREXCOM:SPXUSD"); // Default to S&P 500
    const [heatmapSource, setHeatmapSource] = useState<"SPX500" | "Japan">("SPX500");
    const chartContainerRef = useRef<HTMLDivElement>(null);

    // activeScreenerが変更されたときに選択されたチャートをリセット
    useEffect(() => {
        switch (activeScreener) {
            case "total":
                setSelectedChart("FOREXCOM:SPXUSD");
                break;
            case "japan":
                setSelectedChart("INDEX:NKY");
                break;
            case "us":
                setSelectedChart("NASDAQ:AAPL");
                break;
            case "promising":
                setSelectedChart("5805");
                break;
            default:
                break;
        }
    }, [activeScreener]);

    // サンプル財務データ（各銘柄用）- 2023年〜2026年1月最新
    const financialDataMap: Record<string, {
        revenue: { quarter: string; value: number }[];
        profit: { quarter: string; operating: number; net: number }[];
        segments: { name: string; value: number; color: string }[];
        metrics: { name: string; value: string }[];
        incomeStatement?: IncomeStatementData;
        balanceSheet?: any;
        cashFlow?: any;
        currency?: "USD" | "JPY" | "JPY_Oku";
        priceHistory?: { date: string; close: number }[];
        historicalPerformance?: {
            tableTitle: string;
            headers: string[];
            rows: (string | number)[][];
        };
    }> = {
        "NASDAQ:AAPL": {
            revenue: [
                { quarter: "23年1Q", value: 94.8 }, { quarter: "23年2Q", value: 81.8 },
                { quarter: "23年3Q", value: 89.5 }, { quarter: "23年4Q", value: 119.6 },
                { quarter: "24年1Q", value: 90.8 }, { quarter: "24年2Q", value: 85.8 },
                { quarter: "24年3Q", value: 94.9 }, { quarter: "24年4Q", value: 124.3 }, // Est
                { quarter: "25年1Q", value: 96.5 }, { quarter: "25年2Q", value: 89.2 },
                { quarter: "25年3Q", value: 101.5 }, { quarter: "25年4Q", value: 130.0 }
            ],
            profit: [
                { quarter: "23年1Q", operating: 28.3, net: 24.1 }, { quarter: "23年2Q", operating: 23.0, net: 19.9 },
                { quarter: "23年3Q", operating: 27.0, net: 22.9 }, { quarter: "23年4Q", operating: 40.4, net: 33.9 },
                { quarter: "24年1Q", operating: 27.9, net: 23.6 }, { quarter: "24年2Q", operating: 25.4, net: 21.4 },
                { quarter: "24年3Q", operating: 29.6, net: 24.7 }, { quarter: "24年4Q", operating: 42.0, net: 35.5 },
                { quarter: "25年1Q", operating: 30.2, net: 25.8 }, { quarter: "25年2Q", operating: 27.5, net: 22.9 },
                { quarter: "25年3Q", operating: 32.4, net: 27.2 }, { quarter: "25年4Q", operating: 45.3, net: 38.0 }
            ],
            segments: [
                { name: "iPhone", value: 50, color: "#3b82f6" },
                { name: "Services", value: 26, color: "#10b981" },
                { name: "Mac", value: 7, color: "#f59e0b" },
                { name: "iPad", value: 6, color: "#ef4444" },
                { name: "Wearables等", value: 11, color: "#8b5cf6" }
            ],
            metrics: [
                { name: "PER（株価収益率）", value: "33.29倍" }, { name: "PBR（株価純資産倍率）", value: "49.76倍" },
                { name: "ROE（自己資本利益率）", value: "171.42%" }, { name: "PSR（株価売上高倍率）", value: "8.87倍" }
            ],
            incomeStatement: {
                revenue: 416160, // TTM 416.16B USD (Millions USD)
                costOfGoodsSold: 220960, // 416160 - 195200
                grossProfit: 195200, // 195.20B USD
                sellingGeneralAdmin: 62150, // 195200 - 133050
                operatingIncome: 133050, // 133.05B USD
                nonOperatingIncome: -337, // 132713 - 133050
                ordinaryIncome: 132713, // 416160 * 0.3189
                specialIncome: 0,
                preTaxIncome: 132713,
                incomeTax: 20703, // 132713 - 112010
                netIncome: 112010 // 112.01B USD
            },
            balanceSheet: {
                totalAssets: 359240, // 359.24B USD
                totalLiabilities: 285510, // 285.51B USD
                totalEquity: 73730, // 73.73B USD
                totalDebt: 112380 // 112.38B USD
            },
            cashFlow: {
                operatingCashFlow: 111480, // 111.48B USD
                investingCashFlow: 15200, // 15.20B USD
                financingCashFlow: -120690, // -120.69B USD
                freeCashFlow: 98770 // 98.77B USD
            }
        },
        "NASDAQ:GOOGL": {
            revenue: [
                { quarter: "23年1月", value: 69.8 }, { quarter: "23年4月", value: 74.6 },
                { quarter: "23年7月", value: 76.7 }, { quarter: "23年10月", value: 86.3 },
                { quarter: "24年1月", value: 80.5 }, { quarter: "24年4月", value: 84.7 },
                { quarter: "24年7月", value: 88.3 }, { quarter: "24年10月", value: 96.5 },
                { quarter: "25年1月", value: 90.2 }, { quarter: "25年4月", value: 92.8 },
                { quarter: "25年7月", value: 95.1 }, { quarter: "25年10月", value: 102.4 },
                { quarter: "26年1月", value: 98.5 }
            ],
            profit: [
                { quarter: "23年1月", operating: 17.4, net: 15.1 }, { quarter: "23年4月", operating: 21.8, net: 18.4 },
                { quarter: "23年7月", operating: 21.3, net: 19.7 }, { quarter: "23年10月", operating: 23.7, net: 20.7 },
                { quarter: "24年1月", operating: 25.5, net: 23.7 }, { quarter: "24年4月", operating: 27.4, net: 23.6 },
                { quarter: "24年7月", operating: 28.5, net: 26.3 }, { quarter: "24年10月", operating: 30.2, net: 26.5 },
                { quarter: "25年1月", operating: 31.0, net: 27.8 }, { quarter: "25年4月", operating: 32.5, net: 28.5 },
                { quarter: "25年7月", operating: 33.2, net: 29.1 }, { quarter: "25年10月", operating: 35.0, net: 30.8 },
                { quarter: "26年1月", operating: 34.5, net: 30.2 }
            ],
            segments: [
                { name: "Google検索", value: 57, color: "#3b82f6" },
                { name: "YouTube広告", value: 10, color: "#ef4444" },
                { name: "Google Cloud", value: 13, color: "#10b981" },
                { name: "ネットワーク広告", value: 7, color: "#f59e0b" },
                { name: "その他", value: 13, color: "#8b5cf6" }
            ],
            metrics: [
                { name: "PER（株価収益率）", value: "32.61倍" }, { name: "PBR（株価純資産倍率）", value: "10.32倍" },
                { name: "ROE（自己資本利益率）", value: "35.45%" }, { name: "PSR（株価売上高倍率）", value: "10.46倍" }
            ],
            incomeStatement: {
                revenue: 385520, // TTM 385.52B USD
                costOfGoodsSold: 157390, // 385520 - 228130
                grossProfit: 228130, // 228.13B USD
                sellingGeneralAdmin: 100510, // 228130 - 127620
                operatingIncome: 127620, // 127.62B USD
                nonOperatingIncome: 24352, // 151972 - 127620
                ordinaryIncome: 151972, // 385520 * 0.3942
                specialIncome: 0,
                preTaxIncome: 151972,
                incomeTax: 27722, // 151972 - 124250
                netIncome: 124250 // 124.25B USD
            },
            balanceSheet: {
                totalAssets: 536470, // 536.47B USD
                totalLiabilities: 149600, // 149.60B USD
                totalEquity: 386870, // 386.870B USD
                totalDebt: 41200 // 41.20B USD
            },
            cashFlow: {
                operatingCashFlow: 151420, // 151.42B USD
                investingCashFlow: -84690, // -84.69B USD
                financingCashFlow: -63450, // -63.45B USD
                freeCashFlow: 73550 // 73.55B USD
            }
        },
        "NASDAQ:NVDA": {
            revenue: [
                { quarter: "23年1月", value: 6.1 }, { quarter: "23年4月", value: 7.2 },
                { quarter: "23年7月", value: 13.5 }, { quarter: "23年10月", value: 18.1 },
                { quarter: "24年1月", value: 22.1 }, { quarter: "24年4月", value: 26.0 },
                { quarter: "24年7月", value: 30.0 }, { quarter: "24年10月", value: 35.1 },
                { quarter: "25年1月", value: 38.5 }, { quarter: "25年4月", value: 42.0 },
                { quarter: "25年7月", value: 45.5 }, { quarter: "25年10月", value: 50.8 },
                { quarter: "26年1月", value: 52.5 }
            ],
            profit: [
                { quarter: "23年1月", operating: 1.3, net: 1.4 }, { quarter: "23年4月", operating: 2.1, net: 2.0 },
                { quarter: "23年7月", operating: 6.8, net: 6.2 }, { quarter: "23年10月", operating: 10.4, net: 9.2 },
                { quarter: "24年1月", operating: 13.6, net: 12.3 }, { quarter: "24年4月", operating: 16.9, net: 14.9 },
                { quarter: "24年7月", operating: 18.6, net: 16.6 }, { quarter: "24年10月", operating: 21.9, net: 19.3 },
                { quarter: "25年1月", operating: 24.2, net: 21.5 }, { quarter: "25年4月", operating: 26.8, net: 23.8 },
                { quarter: "25年7月", operating: 29.5, net: 26.2 }, { quarter: "25年10月", operating: 33.2, net: 29.5 },
                { quarter: "26年1月", operating: 34.5, net: 30.8 }
            ],
            segments: [
                { name: "データセンター", value: 87, color: "#10b981" },
                { name: "ゲーミング", value: 9, color: "#3b82f6" },
                { name: "プロ可視化", value: 2, color: "#ef4444" },
                { name: "自動車・その他", value: 2, color: "#f59e0b" }
            ],
            metrics: [
                { name: "PER（株価収益率）", value: "45.78倍" }, { name: "PBR（株価純資産倍率）", value: "37.79倍" },
                { name: "ROE（自己資本利益率）", value: "107.36%" }, { name: "PSR（株価売上高倍率）", value: "24.18倍" }
            ],
            incomeStatement: {
                revenue: 187140, // TTM 187.14B USD
                costOfGoodsSold: 56050,
                grossProfit: 131090,
                sellingGeneralAdmin: 20970,
                operatingIncome: 110120,
                nonOperatingIncome: 6149,
                ordinaryIncome: 116269,
                specialIncome: 0,
                preTaxIncome: 116269,
                incomeTax: 17069,
                netIncome: 99200
            },
            balanceSheet: {
                totalAssets: 161150, // 161.15B USD
                totalLiabilities: 42250, // 42.25B USD
                totalEquity: 118900, // 118.90B USD
                totalDebt: 10820 // 10.82B USD
            },
            cashFlow: {
                operatingCashFlow: 83160, // 83.16B USD
                investingCashFlow: -28570, // -28.57B USD
                financingCashFlow: -52220, // -52.22B USD
                freeCashFlow: 77320 // 77.32B USD
            }
        },
        "NASDAQ:MSFT": {
            revenue: [
                { quarter: "23年1月", value: 52.9 }, { quarter: "23年4月", value: 52.9 },
                { quarter: "23年7月", value: 56.2 }, { quarter: "23年10月", value: 62.0 },
                { quarter: "24年1月", value: 62.0 }, { quarter: "24年4月", value: 64.7 },
                { quarter: "24年7月", value: 65.6 }, { quarter: "24年10月", value: 69.6 },
                { quarter: "25年1月", value: 72.3 }, { quarter: "25年4月", value: 74.8 },
                { quarter: "25年7月", value: 77.2 }, { quarter: "25年10月", value: 80.5 },
                { quarter: "26年1月", value: 83.2 }
            ],
            profit: [
                { quarter: "23年1月", operating: 22.3, net: 18.3 }, { quarter: "23年4月", operating: 22.4, net: 18.3 },
                { quarter: "23年7月", operating: 24.3, net: 20.1 }, { quarter: "23年10月", operating: 27.0, net: 22.3 },
                { quarter: "24年1月", operating: 27.0, net: 21.9 }, { quarter: "24年4月", operating: 28.0, net: 22.0 },
                { quarter: "24年7月", operating: 28.0, net: 22.0 }, { quarter: "24年10月", operating: 30.6, net: 24.7 },
                { quarter: "25年1月", operating: 32.0, net: 26.5 }, { quarter: "25年4月", operating: 33.5, net: 27.8 },
                { quarter: "25年7月", operating: 35.0, net: 29.2 }, { quarter: "25年10月", operating: 36.8, net: 30.5 },
                { quarter: "26年1月", operating: 38.5, net: 32.0 }
            ],
            segments: [
                { name: "クラウド(Azure)", value: 42, color: "#3b82f6" },
                { name: "Office製品", value: 26, color: "#10b981" },
                { name: "Windows", value: 10, color: "#f59e0b" },
                { name: "Gaming", value: 10, color: "#ef4444" },
                { name: "その他", value: 12, color: "#8b5cf6" }
            ],
            metrics: [
                { name: "PER（株価収益率）", value: "32.10倍" }, { name: "PBR（株価純資産倍率）", value: "9.24倍" },
                { name: "ROE（自己資本利益率）", value: "32.24%" }, { name: "PSR（株価売上高倍率）", value: "11.46倍" }
            ],
            incomeStatement: {
                revenue: 293810, // TTM 293.81B USD
                costOfGoodsSold: 91770, // 293810 - 202040
                grossProfit: 202040, // 202.04B USD
                sellingGeneralAdmin: 66100, // 202040 - 135940
                operatingIncome: 135940, // 135.94B USD
                nonOperatingIncome: -8280, // 127660 - 135940
                ordinaryIncome: 127660, // 293810 * 0.4345
                specialIncome: 0,
                preTaxIncome: 127660,
                incomeTax: 22750, // 127660 - 104910
                netIncome: 104910 // 104.91B USD
            },
            balanceSheet: {
                totalAssets: 636350, // 636.35B USD
                totalLiabilities: 273270, // 273.27B USD
                totalEquity: 363080, // 363.08B USD
                totalDebt: 120380 // 120.38B USD
            },
            cashFlow: {
                operatingCashFlow: 147040, // 147.04B USD
                investingCashFlow: -91960, // -91.96B USD
                financingCashFlow: -46920, // -46.92B USD
                freeCashFlow: 78020 // 78.02B USD
            }
        },
        "NASDAQ:AMZN": {
            revenue: [
                { quarter: "23年1月", value: 127.4 }, { quarter: "23年4月", value: 127.4 },
                { quarter: "23年7月", value: 134.4 }, { quarter: "23年10月", value: 170.0 },
                { quarter: "24年1月", value: 143.3 }, { quarter: "24年4月", value: 148.0 },
                { quarter: "24年7月", value: 158.9 }, { quarter: "24年10月", value: 187.8 },
                { quarter: "25年1月", value: 156.5 }, { quarter: "25年4月", value: 162.3 },
                { quarter: "25年7月", value: 172.8 }, { quarter: "25年10月", value: 198.5 },
                { quarter: "26年1月", value: 170.2 }
            ],
            profit: [
                { quarter: "23年1月", operating: 4.4, net: 3.2 }, { quarter: "23年4月", operating: 7.7, net: 6.7 },
                { quarter: "23年7月", operating: 11.2, net: 9.9 }, { quarter: "23年10月", operating: 13.2, net: 10.6 },
                { quarter: "24年1月", operating: 15.3, net: 10.4 }, { quarter: "24年4月", operating: 15.3, net: 13.5 },
                { quarter: "24年7月", operating: 17.4, net: 15.3 }, { quarter: "24年10月", operating: 21.2, net: 17.1 },
                { quarter: "25年1月", operating: 18.4, net: 15.0 }, { quarter: "25年4月", operating: 19.5, net: 16.2 },
                { quarter: "25年7月", operating: 21.2, net: 17.8 }, { quarter: "25年10月", operating: 24.5, net: 20.1 },
                { quarter: "26年1月", operating: 20.8, net: 17.5 }
            ],
            segments: [
                { name: "オンラインストア", value: 38, color: "#f59e0b" },
                { name: "AWS", value: 20, color: "#3b82f6" },
                { name: "サードパーティ販売", value: 24, color: "#10b981" },
                { name: "広告", value: 10, color: "#ef4444" },
                { name: "その他", value: 8, color: "#8b5cf6" }
            ],
            metrics: [
                { name: "PER（株価収益率）", value: "33.11倍" }, { name: "PBR（株価純資産倍率）", value: "6.78倍" },
                { name: "ROE（自己資本利益率）", value: "24.33%" }, { name: "PSR（株価売上高倍率）", value: "3.68倍" }
            ],
            incomeStatement: {
                revenue: 691330, // TTM 691.33B USD
                costOfGoodsSold: 345350, // 691330 - 345980
                grossProfit: 345980, // 345.98B USD
                sellingGeneralAdmin: 266220, // 345980 - 79760
                operatingIncome: 79760, // 79.76B USD
                nonOperatingIncome: 13293, // 93053 - 79760
                ordinaryIncome: 93053, // 691330 * 13.46%
                specialIncome: 0,
                preTaxIncome: 93053,
                incomeTax: 16573, // 93053 - 76480
                netIncome: 76480 // 76.48B USD
            },
            balanceSheet: {
                totalAssets: 727920, // 727.92B USD
                totalLiabilities: 358290, // 358.29B USD
                totalEquity: 369630, // 369.63B USD
                totalDebt: 152740 // 152.74B USD
            },
            cashFlow: {
                operatingCashFlow: 130690, // 130.69B USD
                investingCashFlow: -132740, // -132.74B USD
                financingCashFlow: -5940, // -5.94B USD
                freeCashFlow: 10560 // 10.56B USD
            }
        },
        "NASDAQ:META": {
            revenue: [
                { quarter: "23年1月", value: 28.6 }, { quarter: "23年4月", value: 32.0 },
                { quarter: "23年7月", value: 34.1 }, { quarter: "23年10月", value: 40.1 },
                { quarter: "24年1月", value: 36.5 }, { quarter: "24年4月", value: 39.1 },
                { quarter: "24年7月", value: 40.6 }, { quarter: "24年10月", value: 46.2 },
                { quarter: "25年1月", value: 48.4 }, { quarter: "25年4月", value: 50.8 },
                { quarter: "25年7月", value: 53.2 }, { quarter: "25年10月", value: 58.5 },
                { quarter: "26年1月", value: 55.2 }
            ],
            profit: [
                { quarter: "23年1月", operating: 6.4, net: 5.7 }, { quarter: "23年4月", operating: 9.4, net: 7.8 },
                { quarter: "23年7月", operating: 13.7, net: 11.6 }, { quarter: "23年10月", operating: 16.4, net: 14.0 },
                { quarter: "24年1月", operating: 15.6, net: 14.0 }, { quarter: "24年4月", operating: 17.7, net: 13.5 },
                { quarter: "24年7月", operating: 19.4, net: 15.7 }, { quarter: "24年10月", operating: 21.8, net: 17.6 },
                { quarter: "25年1月", operating: 23.2, net: 18.8 }, { quarter: "25年4月", operating: 24.8, net: 20.0 },
                { quarter: "25年7月", operating: 26.5, net: 21.5 }, { quarter: "25年10月", operating: 29.2, net: 23.8 },
                { quarter: "26年1月", operating: 27.5, net: 22.2 }
            ],
            segments: [
                { name: "広告収入", value: 96, color: "#3b82f6" },
                { name: "Reality Labs", value: 3, color: "#ef4444" },
                { name: "その他", value: 1, color: "#8b5cf6" }
            ],
            metrics: [
                { name: "PER（株価収益率）", value: "28.62倍" }, { name: "PBR（株価純資産倍率）", value: "8.41倍" },
                { name: "ROE（自己資本利益率）", value: "32.64%" }, { name: "PSR（株価売上高倍率）", value: "8.79倍" }
            ],
            incomeStatement: {
                revenue: 189460, // TTM 189.46B USD
                costOfGoodsSold: 34100,
                grossProfit: 155360,
                sellingGeneralAdmin: 73370,
                operatingIncome: 81990,
                nonOperatingIncome: 2149,
                ordinaryIncome: 84139,
                specialIncome: 0,
                preTaxIncome: 84139,
                incomeTax: 25609,
                netIncome: 58530
            },
            balanceSheet: {
                totalAssets: 303840, // 303.84B USD
                totalLiabilities: 109780, // 109.78B USD
                totalEquity: 194070, // 194.07B USD
                totalDebt: 51060 // 51.06B USD
            },
            cashFlow: {
                operatingCashFlow: 107570, // 107.57B USD
                investingCashFlow: -89310, // -89.31B USD
                financingCashFlow: -50980, // -50.98B USD
                freeCashFlow: 44840 // 44.84B USD
            }
        },
        "NASDAQ:TSLA": {
            revenue: [
                { quarter: "23年1月", value: 23.3 }, { quarter: "23年4月", value: 23.3 },
                { quarter: "23年7月", value: 24.9 }, { quarter: "23年10月", value: 25.2 },
                { quarter: "24年1月", value: 21.3 }, { quarter: "24年4月", value: 23.3 },
                { quarter: "24年7月", value: 25.2 }, { quarter: "24年10月", value: 25.7 },
                { quarter: "25年1月", value: 25.7 }, { quarter: "25年4月", value: 24.8 },
                { quarter: "25年7月", value: 26.5 }, { quarter: "25年10月", value: 27.8 },
                { quarter: "26年1月", value: 26.2 }
            ],
            profit: [
                { quarter: "23年1月", operating: 2.1, net: 2.5 }, { quarter: "23年4月", operating: 2.7, net: 2.5 },
                { quarter: "23年7月", operating: 2.4, net: 1.9 }, { quarter: "23年10月", operating: 1.8, net: 1.9 },
                { quarter: "24年1月", operating: 1.2, net: 1.1 }, { quarter: "24年4月", operating: 1.6, net: 1.5 },
                { quarter: "24年7月", operating: 1.6, net: 1.5 }, { quarter: "24年10月", operating: 2.7, net: 2.2 },
                { quarter: "25年1月", operating: 1.6, net: 1.1 }, { quarter: "25年4月", operating: 1.8, net: 1.3 },
                { quarter: "25年7月", operating: 2.2, net: 1.8 }, { quarter: "25年10月", operating: 2.8, net: 2.3 },
                { quarter: "26年1月", operating: 2.0, net: 1.5 }
            ],
            segments: [
                { name: "車両販売", value: 75, color: "#ef4444" },
                { name: "エネルギー", value: 10, color: "#10b981" },
                { name: "サービス", value: 11, color: "#3b82f6" },
                { name: "その他", value: 4, color: "#f59e0b" }
            ],
            metrics: [
                { name: "PER（株価収益率）", value: "300.25倍" }, { name: "PBR（株価純資産倍率）", value: "18.68倍" },
                { name: "ROE（自己資本利益率）", value: "7.03%" }, { name: "PSR（株価売上高倍率）", value: "16.57倍" }
            ],
            incomeStatement: {
                revenue: 95630, // TTM 95.63B USD
                costOfGoodsSold: 79370,
                grossProfit: 16260,
                sellingGeneralAdmin: 11390,
                operatingIncome: 4870,
                nonOperatingIncome: 1996,
                ordinaryIncome: 6866,
                specialIncome: 0,
                preTaxIncome: 6866,
                incomeTax: 1596,
                netIncome: 5270
            },
            balanceSheet: {
                totalAssets: 133740, // 133.74B USD
                totalLiabilities: 53020, // 53.02B USD
                totalEquity: 80720, // 80.72B USD
                totalDebt: 13790 // 13.79B USD
            },
            cashFlow: {
                operatingCashFlow: 15750, // 15.75B USD
                investingCashFlow: -16560, // -16.56B USD
                financingCashFlow: 1420, // 1.42B USD
                freeCashFlow: 6830 // 6.83B USD
            }
        },
        "NASDAQ:AMD": {
            revenue: [
                { quarter: "23年1月", value: 5.4 }, { quarter: "23年4月", value: 5.4 },
                { quarter: "23年7月", value: 5.8 }, { quarter: "23年10月", value: 6.2 },
                { quarter: "24年1月", value: 5.5 }, { quarter: "24年4月", value: 5.8 },
                { quarter: "24年7月", value: 6.8 }, { quarter: "24年10月", value: 7.5 },
                { quarter: "25年1月", value: 7.6 }, { quarter: "25年4月", value: 8.2 },
                { quarter: "25年7月", value: 9.0 }, { quarter: "25年10月", value: 10.1 },
                { quarter: "26年1月", value: 9.5 }
            ],
            profit: [
                { quarter: "23年1月", operating: 0.0, net: 0.0 }, { quarter: "23年4月", operating: 0.1, net: 0.3 },
                { quarter: "23年7月", operating: 0.2, net: 0.3 }, { quarter: "23年10月", operating: 0.3, net: 0.3 },
                { quarter: "24年1月", operating: 0.5, net: 0.7 }, { quarter: "24年4月", operating: 0.6, net: 0.7 },
                { quarter: "24年7月", operating: 0.7, net: 0.8 }, { quarter: "24年10月", operating: 0.7, net: 0.8 },
                { quarter: "25年1月", operating: 0.9, net: 1.0 }, { quarter: "25年4月", operating: 1.1, net: 1.2 },
                { quarter: "25年7月", operating: 1.4, net: 1.5 }, { quarter: "25年10月", operating: 1.8, net: 1.9 },
                { quarter: "26年1月", operating: 1.5, net: 1.6 }
            ],
            segments: [
                { name: "データセンター", value: 55, color: "#10b981" },
                { name: "クライアント(PC)", value: 25, color: "#3b82f6" },
                { name: "ゲーミング", value: 10, color: "#ef4444" },
                { name: "組込み", value: 10, color: "#f59e0b" }
            ],
            metrics: [
                { name: "PER（株価収益率）", value: "125.40倍" }, { name: "PBR（株価純資産倍率）", value: "6.80倍" },
                { name: "ROE（自己資本利益率）", value: "5.32%" }, { name: "PSR（株価売上高倍率）", value: "13.00倍" }
            ],
            incomeStatement: {
                revenue: 32030, // TTM 32.03B USD
                costOfGoodsSold: 17830,
                grossProfit: 14200,
                sellingGeneralAdmin: 11170,
                operatingIncome: 3030,
                nonOperatingIncome: -74,
                ordinaryIncome: 2956,
                specialIncome: 0,
                preTaxIncome: 2956,
                incomeTax: -354,
                netIncome: 3310
            },
            balanceSheet: {
                totalAssets: 76890, // 76.89B USD
                totalLiabilities: 16100, // 16.10B USD
                totalEquity: 60790, // 60.79B USD
                totalDebt: 3870 // 3.87B USD
            },
            cashFlow: {
                operatingCashFlow: 6410, // 6.41B USD
                investingCashFlow: -5210, // -5.21B USD
                financingCashFlow: -274, // -274M USD
                freeCashFlow: 5450 // 5.45B USD
            }
        },
        // 日本株データの追加 (単位: 兆円/億円, currency: "JPY")
        "7203": { // Toyota
            currency: "JPY_Oku",

            revenue: [{ quarter: "25.3", value: 485000 }],
            profit: [{ quarter: "25.3", operating: 38000, net: 31000 }],
            segments: [{ name: "自動車", value: 90, color: "#ef4444" }, { name: "金融", value: 10, color: "#3b82f6" }],
            metrics: [
                { name: "PER", value: "9.5倍" }, { name: "PBR", value: "1.1倍" },
                { name: "ROE", value: "12.0%" }
            ],
            incomeStatement: {
                revenue: 485000, // 48.5兆 (予想)
                costOfGoodsSold: 390000,
                grossProfit: 95000,
                sellingGeneralAdmin: 57000,
                operatingIncome: 38000, // 3.8兆
                nonOperatingIncome: 5000,
                ordinaryIncome: 43000,
                specialIncome: 0,
                preTaxIncome: 43000,
                incomeTax: 12000,
                netIncome: 31000
            },
            balanceSheet: {
                totalAssets: 975700, // 97.57T
                totalLiabilities: 591200, // 59.12T
                totalEquity: 384600, // 38.46T
                totalDebt: 398600 // 39.86T
            },
            cashFlow: {
                operatingCashFlow: 48200, // 4.82T
                investingCashFlow: -46200, // -4.62T
                financingCashFlow: 1249, // 124.92B
                freeCashFlow: 3496 // 349.63B
            }
        },
        "6758": { // Sony Group
            currency: "JPY_Oku",

            revenue: [{ quarter: "25.3", value: 120000 }],
            profit: [{ quarter: "25.3", operating: 14000, net: 14000 }],
            segments: [{ name: "G&NS", value: 30, color: "#3b82f6" }, { name: "音楽", value: 15, color: "#ef4444" }],
            metrics: [{ name: "PER", value: "15.0倍" }, { name: "ROE", value: "14.5%" }],
            incomeStatement: {
                revenue: 120000, // 12.0兆 (予想)
                costOfGoodsSold: 80000,
                grossProfit: 40000,
                sellingGeneralAdmin: 26000,
                operatingIncome: 14000, // 1.4兆
                nonOperatingIncome: 1000,
                ordinaryIncome: 15000,
                specialIncome: 0,
                preTaxIncome: 15000,
                incomeTax: 1000,
                netIncome: 14000
            },
            balanceSheet: {
                totalAssets: 376730, // 244.63B USD * 154
                totalLiabilities: 293370, // 190.50B USD * 154
                totalEquity: 83360, // 54.13B USD * 154
                totalDebt: 16720 // 10.86B USD * 154
            },
            cashFlow: {
                operatingCashFlow: 30090, // 19.54B USD * 154
                investingCashFlow: -7130, // 4.63B USD * 154
                financingCashFlow: -5840, // 3.79B USD * 154
                freeCashFlow: 25250 // 16.40B USD * 154
            },
            historicalPerformance: {
                tableTitle: "業績推移",
                headers: ["決算期", "売上高(兆円)", "営業利益(兆円)", "純利益(兆円)", "備考"],
                rows: [
                    ["2022年3月期", "9.9", "1.2", "1.2", "過去最高水準"],
                    ["2023年3月期", "11.5", "1.3", "1.3", "増収増益"],
                    ["2024年3月期", "13.0", "1.2", "1.2", "減益"],
                    ["2025年3月期", "12.0", "1.3", "1.3", "回復"],
                    ["2026年3月期(予想)", "12.0", "1.4", "1.4", "増益予想"]
                ]
            }
        },
        "9984": { // SoftBank Group
            currency: "JPY_Oku",

            revenue: [{ quarter: "25.3", value: 74000 }],
            profit: [{ quarter: "25.3", operating: 72000, net: 12000 }],
            segments: [{ name: "投資事業", value: 100, color: "#f59e0b" }],
            metrics: [{ name: "PBR", value: "0.9倍" }, { name: "NAV", value: "High" }],
            incomeStatement: {
                revenue: 74000, // 7.4兆
                costOfGoodsSold: 1000, // 投資会社のため原価は少ない
                grossProfit: 73000,
                sellingGeneralAdmin: 1000,
                operatingIncome: 72000, // 7.2兆 (投資損益含む)
                nonOperatingIncome: -55000, // 金融費用等、大幅な支払利息
                ordinaryIncome: 17000,
                specialIncome: 0,
                preTaxIncome: 17000,
                incomeTax: 5000,
                netIncome: 12000
            },
            balanceSheet: {
                totalAssets: 491600, // 49.16T
                totalLiabilities: 324900, // 32.49T
                totalEquity: 166700, // 16.67T
                totalDebt: 203100 // 20.31T
            },
            cashFlow: {
                operatingCashFlow: 4398, // 439.80B
                investingCashFlow: -15400, // -1.54T
                financingCashFlow: 12400, // 1.24T
                freeCashFlow: -5044 // -504.45B
            }
        },
        "6861": { // Keyence
            currency: "JPY_Oku",

            revenue: [{ quarter: "25.3", value: 9500 }],
            profit: [{ quarter: "25.3", operating: 5800, net: 4200 }],
            segments: [{ name: "国内", value: 40, color: "#3b82f6" }, { name: "海外", value: 60, color: "#10b981" }],
            metrics: [{ name: "営業利益率", value: "61%" }, { name: "ROE", value: "15.0%" }],
            incomeStatement: {
                revenue: 9500,
                costOfGoodsSold: 1700, // 高利益率モデル
                grossProfit: 7800,
                sellingGeneralAdmin: 2000,
                operatingIncome: 5800,
                nonOperatingIncome: 200,
                ordinaryIncome: 6000,
                specialIncome: 0,
                preTaxIncome: 6000,
                incomeTax: 1800,
                netIncome: 4200
            },
            balanceSheet: {
                totalAssets: 34500,
                totalLiabilities: 1718,
                totalEquity: 32800,
                totalDebt: 0
            }
        },
        "7974": { // Nintendo
            currency: "JPY_Oku",

            revenue: [{ quarter: "25.3", value: 14000 }],
            profit: [{ quarter: "25.3", operating: 4000, net: 4000 }],
            segments: [{ name: "ゲーム専用機", value: 95, color: "#ef4444" }],
            metrics: [{ name: "PER", value: "18.0倍" }, { name: "ROE", value: "13.0%" }],
            incomeStatement: {
                revenue: 14000, // 1.4兆 (予想)
                costOfGoodsSold: 6000,
                grossProfit: 8000,
                sellingGeneralAdmin: 4000,
                operatingIncome: 4000, // 0.4兆
                nonOperatingIncome: 1000,
                ordinaryIncome: 5000,
                specialIncome: 0,
                preTaxIncome: 5000,
                incomeTax: 1000,
                netIncome: 4000
            },
            balanceSheet: {
                totalAssets: 36400,
                totalLiabilities: 8178,
                totalEquity: 28200,
                totalDebt: 513
            }
        },
        "9983": { // Fast Retailing
            currency: "JPY_Oku",

            revenue: [{ quarter: "25.8", value: 35000 }],
            profit: [{ quarter: "25.8", operating: 6000, net: 5200 }],
            segments: [{ name: "ユニクロ海外", value: 55, color: "#ef4444" }, { name: "ユニクロ国内", value: 30, color: "#3b82f6" }],
            metrics: [{ name: "PER", value: "35.0倍" }, { name: "ROE", value: "18.0%" }],
            incomeStatement: {
                revenue: 35000, // 3.5兆
                costOfGoodsSold: 16000, // 原価率改善
                grossProfit: 19000,
                sellingGeneralAdmin: 13000,
                operatingIncome: 6000,
                nonOperatingIncome: 1000,
                ordinaryIncome: 7000,
                specialIncome: 0,
                preTaxIncome: 7000,
                incomeTax: 1800,
                netIncome: 5200
            },
            balanceSheet: {
                totalAssets: 42900,
                totalLiabilities: 17200,
                totalEquity: 25700,
                totalDebt: 6904
            },
            cashFlow: {
                operatingCashFlow: 6847,
                investingCashFlow: -6598,
                financingCashFlow: -3506,
                freeCashFlow: 5308
            },
            historicalPerformance: {
                tableTitle: "業績推移",
                headers: ["決算期", "売上高(兆円)", "営業利益(億円)", "純利益(億円)", "備考"],
                rows: [
                    ["2022年8月期", "2.3", "2,971", "2,374", "回復基調"],
                    ["2023年8月期", "2.8", "3,810", "3,152", "大幅増益"],
                    ["2024年8月期", "3.1", "5,015", "4,352", "過去最高益"],
                    ["2025年8月期", "3.5", "6,000", "5,200", "連続最高益"]
                ]
            }
        },
        "7409": { // AeroEdge
            currency: "JPY",

            revenue: [
                { quarter: "23年1Q", value: 0.008 }, { quarter: "23年2Q", value: 0.009 },
                { quarter: "23年3Q", value: 0.010 }, { quarter: "23年4Q", value: 0.009 },
                { quarter: "24年1Q", value: 0.009 }, { quarter: "24年2Q", value: 0.010 },
                { quarter: "24年3Q", value: 0.011 }, { quarter: "24年4Q", value: 0.010 },
                { quarter: "25年1Q", value: 0.011 }, { quarter: "25年2Q", value: 0.012 }
            ],
            profit: [
                { quarter: "23年1Q", operating: 0.002, net: 0.001 }, { quarter: "23年2Q", operating: 0.002, net: 0.001 },
                { quarter: "23年3Q", operating: 0.003, net: 0.002 }, { quarter: "23年4Q", operating: 0.002, net: 0.001 },
                { quarter: "24年1Q", operating: 0.002, net: 0.001 }, { quarter: "24年2Q", operating: 0.003, net: 0.002 },
                { quarter: "24年3Q", operating: 0.003, net: 0.002 }, { quarter: "24年4Q", operating: 0.002, net: 0.001 },
                { quarter: "25年1Q", operating: 0.003, net: 0.002 }, { quarter: "25年2Q", operating: 0.004, net: 0.003 }
            ],
            segments: [
                { name: "航空機エンジン部品", value: 95, color: "#3b82f6" },
                { name: "その他", value: 5, color: "#f59e0b" }
            ],
            metrics: [
                { name: "PER（株価収益率）", value: "44.75倍" }, { name: "PBR（株価純資産倍率）", value: "9.06倍" },
                { name: "ROE（自己資本利益率）", value: "24.98%" }, { name: "PSR（株価売上高倍率）", value: "10.32倍" }
            ],
            incomeStatement: {
                revenue: 40.2, // 4.02B JPY
                costOfGoodsSold: 20.9, // 40.2 - 19.3
                grossProfit: 19.3, // 1.93B JPY
                sellingGeneralAdmin: 10.8, // 19.3 - 8.5
                operatingIncome: 8.5, // 850.72M JPY
                nonOperatingIncome: 0.5,
                ordinaryIncome: 9.0,
                specialIncome: 0,
                preTaxIncome: 9.0,
                incomeTax: 0,
                netIncome: 9.0 // 898.01M JPY
            },
            balanceSheet: {
                totalAssets: 90.6, // 9.06B JPY
                totalLiabilities: 50.0, // 5.00B JPY
                totalEquity: 40.6, // 4.06B JPY
                totalDebt: 43.0 // 4.30B JPY
            }
        },
        "8306": { // MUFG
            currency: "JPY_Oku",

            revenue: [{ quarter: "25.3", value: 115000 }],
            profit: [{ quarter: "25.3", operating: 25000, net: 18000 }],
            segments: [{ name: "法人・リテール", value: 40, color: "#ef4444" }, { name: "グローバル", value: 35, color: "#10b981" }],
            metrics: [{ name: "PER", value: "12.0倍" }, { name: "配当利回り", value: "3.5%" }],
            incomeStatement: {
                revenue: 115000, // 経常収益 11.5兆
                costOfGoodsSold: 60000, // 資金調達費用等
                grossProfit: 55000,
                sellingGeneralAdmin: 30000,
                operatingIncome: 25000, // 業務純益近似
                nonOperatingIncome: 0,
                ordinaryIncome: 25000,
                specialIncome: 0,
                preTaxIncome: 25000,
                incomeTax: 7000,
                netIncome: 18000 // 1.8兆
            },
            balanceSheet: {
                totalAssets: 4043200,
                totalLiabilities: 3820800,
                totalEquity: 222400,
                totalDebt: 826100
            },
            historicalPerformance: {
                tableTitle: "業績推移",
                headers: ["決算期", "経常収益(兆円)", "経常利益(億円)", "当期利益(兆円)", "備考"],
                rows: [
                    ["2022年3月期", "6.7", "12,865", "1.2", "好調"],
                    ["2023年3月期", "9.4", "18,144", "1.5", "大幅増益"],
                    ["2024年3月期", "10.8", "20,513", "1.6", "過去最高益"],
                    ["2025年3月期", "11.5", "22,000", "1.8", "さらに増益"]
                ]
            }
        },
        "8035": { // Tokyo Electron
            currency: "JPY_Oku",

            revenue: [{ quarter: "25.3", value: 27000 }],
            profit: [{ quarter: "25.3", operating: 8500, net: 6500 }],
            segments: [{ name: "SPE", value: 95, color: "#3b82f6" }],
            metrics: [{ name: "PER", value: "25.0倍" }, { name: "ROE", value: "20.0%" }],
            incomeStatement: {
                revenue: 27000,
                costOfGoodsSold: 14000,
                grossProfit: 13000,
                sellingGeneralAdmin: 4500,
                operatingIncome: 8500,
                nonOperatingIncome: 500,
                ordinaryIncome: 9000,
                specialIncome: 0,
                preTaxIncome: 9000,
                incomeTax: 2500,
                netIncome: 6500
            },
            balanceSheet: {
                totalAssets: 26700,
                totalLiabilities: 6624,
                totalEquity: 20000,
                totalDebt: 406
            },
            cashFlow: {
                operatingCashFlow: 5006,
                investingCashFlow: -2188,
                financingCashFlow: -3459,
                freeCashFlow: 2818
            },
            historicalPerformance: {
                tableTitle: "業績推移",
                headers: ["決算期", "売上高(億円)", "営業利益(億円)", "純利益(億円)", "備考"],
                rows: [
                    ["2022年3月期", "20,245", "5,863", "4,446", "半導体好調"],
                    ["2023年3月期", "23,002", "6,834", "5,187", "過去最高"],
                    ["2024年3月期", "22,407", "6,237", "4,748", "微減"],
                    ["2025年3月期", "27,000", "8,500", "6,500", "大幅増益"]
                ]
            }
        },
        "9432": { // NTT
            currency: "JPY",
            revenue: [
                { quarter: "23年1Q", value: 3.2 }, { quarter: "23年2Q", value: 3.3 },
                { quarter: "23年3Q", value: 3.4 }, { quarter: "23年4Q", value: 3.3 },
                { quarter: "24年1Q", value: 3.4 }, { quarter: "24年2Q", value: 3.5 },
                { quarter: "24年3Q", value: 3.6 }, { quarter: "24年4Q", value: 3.5 },
                { quarter: "25年1Q", value: 3.6 }, { quarter: "25年2Q", value: 3.7 }
            ],
            profit: [
                { quarter: "23年1Q", operating: 0.45, net: 0.3 }, { quarter: "23年2Q", operating: 0.48, net: 0.32 },
                { quarter: "23年3Q", operating: 0.5, net: 0.35 }, { quarter: "23年4Q", operating: 0.46, net: 0.31 },
                { quarter: "24年1Q", operating: 0.49, net: 0.33 }, { quarter: "24年2Q", operating: 0.52, net: 0.35 },
                { quarter: "24年3Q", operating: 0.54, net: 0.37 }, { quarter: "24年4Q", operating: 0.5, net: 0.33 },
                { quarter: "25年1Q", operating: 0.53, net: 0.36 }, { quarter: "25年2Q", operating: 0.55, net: 0.38 }
            ],
            segments: [
                { name: "総合ICT", value: 40, color: "#3b82f6" },
                { name: "地域通信", value: 25, color: "#10b981" },
                { name: "グローバル", value: 20, color: "#f59e0b" },
                { name: "その他", value: 15, color: "#ef4444" }
            ],
            metrics: [
                { name: "PER（株価収益率）", value: "12.44倍" }, { name: "PBR（株価純資産倍率）", value: "1.40倍" },
                { name: "ROE（自己資本利益率）", value: "10.84%" }, { name: "PSR（株価売上高倍率）", value: "0.93倍" }
            ],
            incomeStatement: {
                revenue: 138900, // TTM 13.89T
                costOfGoodsSold: 117900, // 138900 - 21000
                grossProfit: 21000, // 2.10T
                sellingGeneralAdmin: 2800, // 21000 - 18200
                operatingIncome: 18200, // 1.82T
                nonOperatingIncome: -2713, // 15487 - 18200 (Estimated Ordinary < Operating)
                ordinaryIncome: 15487, // 138900 * 0.1115
                specialIncome: 0,
                preTaxIncome: 15487,
                incomeTax: 5087, // 15487 - 10400
                netIncome: 10400 // 1.04T
            },
            balanceSheet: {
                totalAssets: 334500, // 33.45T
                totalLiabilities: 239100, // 23.91T
                totalEquity: 95400, // 9.54T
                totalDebt: 155900 // 15.59T
            },
            cashFlow: {
                operatingCashFlow: 22200, // 2.22T
                investingCashFlow: -36500, // -3.65T
                financingCashFlow: 35300, // 3.53T
                freeCashFlow: 853 // 85.36B
            },
            historicalPerformance: {
                tableTitle: "業績推移",
                headers: ["決算期", "営業収益(兆円)", "営業利益(兆円)", "純利益(兆円)", "備考"],
                rows: [
                    ["2022年3月期", "12.0", "1.7", "0.9", "堅調"],
                    ["2023年3月期", "13.0", "1.9", "1.0", "増収増益"],
                    ["2024年3月期", "13.7", "2.1", "1.2", "過去最高益"],
                    ["2025年3月期", "14.0", "2.2", "1.3", "連続最高益"]
                ]
            }
        },
        "8316": { // 三井住友FG
            currency: "JPY",
            revenue: [
                { quarter: "23年1Q", value: 1.5 }, { quarter: "23年2Q", value: 1.6 },
                { quarter: "23年3Q", value: 1.7 }, { quarter: "23年4Q", value: 1.6 },
                { quarter: "24年1Q", value: 1.8 }, { quarter: "24年2Q", value: 1.9 },
                { quarter: "24年3Q", value: 2.0 }, { quarter: "24年4Q", value: 1.9 },
                { quarter: "25年1Q", value: 2.1 }, { quarter: "25年2Q", value: 2.2 }
            ],
            profit: [
                { quarter: "23年1Q", operating: 0.25, net: 0.2 }, { quarter: "23年2Q", operating: 0.3, net: 0.25 },
                { quarter: "23年3Q", operating: 0.35, net: 0.3 }, { quarter: "23年4Q", operating: 0.3, net: 0.25 },
                { quarter: "24年1Q", operating: 0.4, net: 0.35 }, { quarter: "24年2Q", operating: 0.45, net: 0.4 },
                { quarter: "24年3Q", operating: 0.5, net: 0.45 }, { quarter: "24年4Q", operating: 0.4, net: 0.35 },
                { quarter: "25年1Q", operating: 0.5, net: 0.45 }, { quarter: "25年2Q", operating: 0.6, net: 0.5 }
            ],
            segments: [
                { name: "ホールセール", value: 40, color: "#3b82f6" },
                { name: "リテール", value: 30, color: "#10b981" },
                { name: "グローバル", value: 20, color: "#f59e0b" },
                { name: "市場", value: 10, color: "#ef4444" }
            ],
            metrics: [
                { name: "PER（株価収益率）", value: "15.10倍" }, { name: "PBR（株価純資産倍率）", value: "1.37倍" },
                { name: "ROE（自己資本利益率）", value: "9.27%" }, { name: "PSR（株価売上高倍率）", value: "2.19倍" }
            ],
            incomeStatement: {
                revenue: 95100, // TTM 9.51T
                costOfGoodsSold: 28530, // 95100 - 66570
                grossProfit: 66570, // 0.7 * 95100 (Estimated)
                sellingGeneralAdmin: 48170, // 66570 - 18400
                operatingIncome: 18400, // 1.84T
                nonOperatingIncome: 1076, // 19476 - 18400
                ordinaryIncome: 19476, // 95100 * 0.2048
                specialIncome: 0,
                preTaxIncome: 19476,
                incomeTax: 5576, // 19476 - 13900
                netIncome: 13900 // 1.39T
            },
            historicalPerformance: {
                tableTitle: "業績推移",
                headers: ["決算期", "経常収益(兆円)", "経常利益(億円)", "当期利益(兆円)", "備考"],
                rows: [
                    ["2022年3月期", "5.8", "9,435", "0.8", "好調"],
                    ["2023年3月期", "7.5", "12,157", "1.0", "大幅増益"],
                    ["2024年3月期", "8.2", "13,405", "1.1", "過去最高益"],
                    ["2025年3月期", "8.8", "14,500", "1.2", "さらに増益"]
                ]
            },
        },

        "6501": { // 日立製作所
            currency: "JPY",
            revenue: [
                { quarter: "23年1Q", value: 2.3 }, { quarter: "23年2Q", value: 2.5 },
                { quarter: "23年3Q", value: 2.6 }, { quarter: "23年4Q", value: 2.4 },
                { quarter: "24年1Q", value: 2.6 }, { quarter: "24年2Q", value: 2.8 },
                { quarter: "24年3Q", value: 2.9 }, { quarter: "24年4Q", value: 2.7 },
                { quarter: "25年1Q", value: 3.0 }, { quarter: "25年2Q", value: 3.2 }
            ],
            profit: [
                { quarter: "23年1Q", operating: 0.15, net: 0.1 }, { quarter: "23年2Q", operating: 0.18, net: 0.12 },
                { quarter: "23年3Q", operating: 0.2, net: 0.14 }, { quarter: "23年4Q", operating: 0.16, net: 0.11 },
                { quarter: "24年1Q", operating: 0.22, net: 0.15 }, { quarter: "24年2Q", operating: 0.24, net: 0.17 },
                { quarter: "24年3Q", operating: 0.26, net: 0.19 }, { quarter: "24年4Q", operating: 0.23, net: 0.16 },
                { quarter: "25年1Q", operating: 0.28, net: 0.2 }, { quarter: "25年2Q", operating: 0.3, net: 0.22 }
            ],
            segments: [
                { name: "デジタルシステム", value: 35, color: "#3b82f6" },
                { name: "グリーンエナジー", value: 30, color: "#10b981" },
                { name: "コネクティブ", value: 30, color: "#f59e0b" },
                { name: "その他", value: 5, color: "#ef4444" }
            ],
            metrics: [
                { name: "PER（株価収益率）", value: "30.24倍" }, { name: "PBR（株価純資産倍率）", value: "3.90倍" },
                { name: "ROE（自己資本利益率）", value: "13.70%" }, { name: "PSR（株価売上高倍率）", value: "2.39倍" }
            ],
            incomeStatement: {
                revenue: 100200, // TTM 10.02T
                costOfGoodsSold: 70700, // 100200 - 29500
                grossProfit: 29500, // 2.95T
                sellingGeneralAdmin: 18800, // 29500 - 10700
                operatingIncome: 10700, // 1.07T
                nonOperatingIncome: 663, // 11363 - 10700
                ordinaryIncome: 11363, // 100200 * 0.1134
                specialIncome: 0,
                preTaxIncome: 11363,
                incomeTax: 3400, // 11363 - 7963
                netIncome: 7963 // 796.31B
            },
            balanceSheet: {
                totalAssets: 138900, // 13.89T
                totalLiabilities: 76000, // 7.60T
                totalEquity: 62900, // 6.29T
                totalDebt: 12100 // 1.21T
            },
            cashFlow: {
                operatingCashFlow: 16000, // 1.60T
                investingCashFlow: -2065, // -206.55B
                financingCashFlow: -9429, // -942.91B
                freeCashFlow: 13100 // 1.31T
            },
            historicalPerformance: {
                tableTitle: "業績推移",
                headers: ["決算期", "売上高(兆円)", "営業利益(億円)", "純利益(億円)", "備考"],
                rows: [
                    ["2022年3月期", "10.3", "6,781", "5,350", "構造改革効果"],
                    ["2023年3月期", "10.9", "7,484", "6,056", "増収増益"],
                    ["2024年3月期", "11.6", "8,612", "7,012", "過去最高益"],
                    ["2025年3月期", "12.0", "9,000", "7,500", "連続最高益"]
                ]
            }
        },
        "8001": { // 伊藤忠商事
            currency: "JPY_Oku",
            revenue: [
                { quarter: "23年1Q", value: 3.0 }, { quarter: "23年2Q", value: 3.2 },
                { quarter: "23年3Q", value: 3.4 }, { quarter: "23年4Q", value: 3.1 },
                { quarter: "24年1Q", value: 3.5 }, { quarter: "24年2Q", value: 3.7 },
                { quarter: "24年3Q", value: 3.9 }, { quarter: "24年4Q", value: 3.6 },
                { quarter: "25年1Q", value: 3.8 }, { quarter: "25年2Q", value: 4.0 }
            ],
            profit: [
                { quarter: "23年1Q", operating: 0.2, net: 0.18 }, { quarter: "23年2Q", operating: 0.22, net: 0.2 },
                { quarter: "23年3Q", operating: 0.24, net: 0.22 }, { quarter: "23年4Q", operating: 0.20, net: 0.18 },
                { quarter: "24年1Q", operating: 0.25, net: 0.23 }, { quarter: "24年2Q", operating: 0.28, net: 0.25 },
                { quarter: "24年3Q", operating: 0.3, net: 0.27 }, { quarter: "24年4Q", operating: 0.26, net: 0.23 },
                { quarter: "25年1Q", operating: 0.32, net: 0.28 }, { quarter: "25年2Q", operating: 0.35, net: 0.3 }
            ],
            segments: [
                { name: "繊維・機械", value: 30, color: "#3b82f6" },
                { name: "金属・エネルギー", value: 25, color: "#ef4444" },
                { name: "食料", value: 25, color: "#10b981" },
                { name: "住生活・情報", value: 20, color: "#f59e0b" }
            ],
            metrics: [
                { name: "PER（株価収益率）", value: "15.49倍" }, { name: "PBR（株価純資産倍率）", value: "2.39倍" },
                { name: "ROE（自己資本利益率）", value: "16.16%" }, { name: "PSR（株価売上高倍率）", value: "0.99倍" }
            ],
            incomeStatement: {
                revenue: 146800, // TTM 14.68T
                costOfGoodsSold: 122600, // 146800 - 24200
                grossProfit: 24200, // 2.42T
                sellingGeneralAdmin: 17487, // 24200 - 6713
                operatingIncome: 6713, // 671.31B
                nonOperatingIncome: 2256, // 8969 - 6713
                ordinaryIncome: 8969, // 146800 * 0.0611
                specialIncome: 0,
                preTaxIncome: 8969,
                incomeTax: -452, // 8969 - 9421 (Benefit estimated based on NI > PreTax)
                netIncome: 9421 // 942.09B
            },
            balanceSheet: {
                totalAssets: 155900, // 15.59T
                totalLiabilities: 89600, // 8.96T
                totalEquity: 66300, // 6.63T
                totalDebt: 45500 // 4.55T
            },
            cashFlow: {
                operatingCashFlow: 10300, // 1.03T
                investingCashFlow: -4984, // -498.40B
                financingCashFlow: -5479, // -547.93B
                freeCashFlow: 7831 // 783.08B
            },
            historicalPerformance: {
                tableTitle: "業績推移",
                headers: ["決算期", "収益(兆円)", "営業利益(億円)", "純利益(億円)", "備考"],
                rows: [
                    ["2022年3月期", "12.3", "5,813", "8,203", "過去最高益"],
                    ["2023年3月期", "14.2", "6,021", "8,005", "高水準維持"],
                    ["2024年3月期", "14.9", "6,500", "8,500", "さらに増益"],
                    ["2025年3月期", "15.5", "7,000", "9,000", "連続最高益"]
                ]
            }
        },
        "6902": { // デンソー
            currency: "JPY",
            revenue: [
                { quarter: "23年1Q", value: 1.6 }, { quarter: "23年2Q", value: 1.7 },
                { quarter: "23年3Q", value: 1.8 }, { quarter: "23年4Q", value: 1.7 },
                { quarter: "24年1Q", value: 1.8 }, { quarter: "24年2Q", value: 1.9 },
                { quarter: "24年3Q", value: 2.0 }, { quarter: "24年4Q", value: 1.9 },
                { quarter: "25年1Q", value: 2.0 }, { quarter: "25年2Q", value: 2.1 }
            ],
            profit: [
                { quarter: "23年1Q", operating: 0.1, net: 0.08 }, { quarter: "23年2Q", operating: 0.12, net: 0.09 },
                { quarter: "23年3Q", operating: 0.14, net: 0.1 }, { quarter: "23年4Q", operating: 0.11, net: 0.08 },
                { quarter: "24年1Q", operating: 0.15, net: 0.11 }, { quarter: "24年2Q", operating: 0.16, net: 0.12 },
                { quarter: "24年3Q", operating: 0.18, net: 0.14 }, { quarter: "24年4Q", operating: 0.15, net: 0.11 },
                { quarter: "25年1Q", operating: 0.19, net: 0.15 }, { quarter: "25年2Q", operating: 0.21, net: 0.16 }
            ],
            segments: [
                { name: "モビリティ", value: 85, color: "#3b82f6" },
                { name: "インダストリー", value: 10, color: "#10b981" },
                { name: "その他", value: 5, color: "#f59e0b" }
            ],
            metrics: [
                { name: "PER（株価収益率）", value: "15.5倍" }, { name: "PBR（株価純資産倍率）", value: "1.2倍" },
                { name: "ROE", value: "8.5%" }, { name: "EV化率", value: "25%" }
            ],
            incomeStatement: {
                revenue: 70000,
                costOfGoodsSold: 58000,
                grossProfit: 12000,
                sellingGeneralAdmin: 7000,
                operatingIncome: 5000,
                nonOperatingIncome: 500,
                ordinaryIncome: 5500,
                specialIncome: 0,
                preTaxIncome: 5500,
                incomeTax: 1500,
                netIncome: 4000
            }
        },
        "4063": { // 信越化学
            currency: "JPY",
            revenue: [
                { quarter: "23年1Q", value: 0.6 }, { quarter: "23年2Q", value: 0.65 },
                { quarter: "23年3Q", value: 0.7 }, { quarter: "23年4Q", value: 0.68 },
                { quarter: "24年1Q", value: 0.72 }, { quarter: "24年2Q", value: 0.75 },
                { quarter: "24年3Q", value: 0.78 }, { quarter: "24年4Q", value: 0.74 },
                { quarter: "25年1Q", value: 0.8 }, { quarter: "25年2Q", value: 0.85 }
            ],
            profit: [
                { quarter: "23年1Q", operating: 0.25, net: 0.18 }, { quarter: "23年2Q", operating: 0.28, net: 0.2 },
                { quarter: "23年3Q", operating: 0.3, net: 0.22 }, { quarter: "23年4Q", operating: 0.26, net: 0.19 },
                { quarter: "24年1Q", operating: 0.3, net: 0.22 }, { quarter: "24年2Q", operating: 0.32, net: 0.24 },
                { quarter: "24年3Q", operating: 0.35, net: 0.26 }, { quarter: "24年4Q", operating: 0.31, net: 0.23 },
                { quarter: "25年1Q", operating: 0.35, net: 0.27 }, { quarter: "25年2Q", operating: 0.38, net: 0.29 }
            ],
            segments: [
                { name: "塩ビ・化成品", value: 40, color: "#3b82f6" },
                { name: "半導体シリコン", value: 35, color: "#10b981" },
                { name: "機能性化学品", value: 15, color: "#f59e0b" },
                { name: "その他", value: 10, color: "#ef4444" }
            ],
            metrics: [
                { name: "PER（株価収益率）", value: "18.5倍" }, { name: "PBR（株価純資産倍率）", value: "2.5倍" },
                { name: "営業利益率", value: "40.5%" }, { name: "ROE", value: "12.8%" }
            ],
            incomeStatement: {
                revenue: 28000,
                costOfGoodsSold: 15000,
                grossProfit: 13000,
                sellingGeneralAdmin: 3000,
                operatingIncome: 10000,
                nonOperatingIncome: 500,
                ordinaryIncome: 10500,
                specialIncome: 0,
                preTaxIncome: 10500,
                incomeTax: 3000,
                netIncome: 7500
            }
        },
        "8411": { // みずほFG
            currency: "JPY",
            revenue: [
                { quarter: "23年1Q", value: 1.0 }, { quarter: "23年2Q", value: 1.1 },
                { quarter: "23年3Q", value: 1.15 }, { quarter: "23年4Q", value: 1.1 },
                { quarter: "24年1Q", value: 1.2 }, { quarter: "24年2Q", value: 1.3 },
                { quarter: "24年3Q", value: 1.35 }, { quarter: "24年4Q", value: 1.25 },
                { quarter: "25年1Q", value: 1.3 }, { quarter: "25年2Q", value: 1.4 }
            ],
            profit: [
                { quarter: "23年1Q", operating: 0.2, net: 0.15 }, { quarter: "23年2Q", operating: 0.22, net: 0.17 },
                { quarter: "23年3Q", operating: 0.24, net: 0.18 }, { quarter: "23年4Q", operating: 0.21, net: 0.16 },
                { quarter: "24年1Q", operating: 0.25, net: 0.2 }, { quarter: "24年2Q", operating: 0.28, net: 0.22 },
                { quarter: "24年3Q", operating: 0.3, net: 0.24 }, { quarter: "24年4Q", operating: 0.26, net: 0.21 },
                { quarter: "25年1Q", operating: 0.3, net: 0.25 }, { quarter: "25年2Q", operating: 0.32, net: 0.27 }
            ],
            segments: [
                { name: "法人・リテール", value: 40, color: "#3b82f6" },
                { name: "グローバル", value: 30, color: "#ef4444" },
                { name: "市場", value: 20, color: "#10b981" },
                { name: "その他", value: 10, color: "#f59e0b" }
            ],
            metrics: [
                { name: "PER（株価収益率）", value: "12.5倍" }, { name: "PBR（株価純資産倍率）", value: "0.75倍" },
                { name: "配当利回り", value: "3.5%" }, { name: "ROE", value: "8.2%" }
            ],
            incomeStatement: {
                revenue: 55000,
                costOfGoodsSold: 25000,
                grossProfit: 30000,
                sellingGeneralAdmin: 18000,
                operatingIncome: 12000,
                nonOperatingIncome: 500,
                ordinaryIncome: 12500,
                specialIncome: 0,
                preTaxIncome: 12500,
                incomeTax: 3500,
                netIncome: 9000
            }
        },
        "4568": { // 第一三共
            currency: "JPY",
            revenue: [
                { quarter: "23年1Q", value: 0.3 }, { quarter: "23年2Q", value: 0.32 },
                { quarter: "23年3Q", value: 0.35 }, { quarter: "23年4Q", value: 0.33 },
                { quarter: "24年1Q", value: 0.38 }, { quarter: "24年2Q", value: 0.4 },
                { quarter: "24年3Q", value: 0.42 }, { quarter: "24年4Q", value: 0.4 },
                { quarter: "25年1Q", value: 0.45 }, { quarter: "25年2Q", value: 0.48 }
            ],
            profit: [
                { quarter: "23年1Q", operating: 0.05, net: 0.04 }, { quarter: "23年2Q", operating: 0.06, net: 0.05 },
                { quarter: "23年3Q", operating: 0.07, net: 0.06 }, { quarter: "23年4Q", operating: 0.06, net: 0.05 },
                { quarter: "24年1Q", operating: 0.08, net: 0.07 }, { quarter: "24年2Q", operating: 0.09, net: 0.08 },
                { quarter: "24年3Q", operating: 0.1, net: 0.09 }, { quarter: "24年4Q", operating: 0.09, net: 0.08 },
                { quarter: "25年1Q", operating: 0.11, net: 0.1 }, { quarter: "25年2Q", operating: 0.12, net: 0.11 }
            ],
            segments: [
                { name: "国内医薬品", value: 45, color: "#3b82f6" },
                { name: "海外医薬品", value: 45, color: "#10b981" },
                { name: "その他", value: 10, color: "#f59e0b" }
            ],
            metrics: [
                { name: "PER（株価収益率）", value: "35.5倍" }, { name: "PBR（株価純資産倍率）", value: "4.5倍" },
                { name: "ROE", value: "12.5%" }, { name: "研究開発費率", value: "22%" }
            ],
            incomeStatement: {
                revenue: 16000,
                costOfGoodsSold: 4000,
                grossProfit: 12000,
                sellingGeneralAdmin: 9000, // 研究開発費含む
                operatingIncome: 3000,
                nonOperatingIncome: 100,
                ordinaryIncome: 3100,
                specialIncome: 0,
                preTaxIncome: 3100,
                incomeTax: 900,
                netIncome: 2200
            }
        },
        "6954": { // ファナック
            currency: "JPY",
            revenue: [
                { quarter: "23年1Q", value: 0.2 }, { quarter: "23年2Q", value: 0.21 },
                { quarter: "23年3Q", value: 0.22 }, { quarter: "23年4Q", value: 0.21 },
                { quarter: "24年1Q", value: 0.23 }, { quarter: "24年2Q", value: 0.24 },
                { quarter: "24年3Q", value: 0.25 }, { quarter: "24年4Q", value: 0.24 },
                { quarter: "25年1Q", value: 0.26 }, { quarter: "25年2Q", value: 0.27 }
            ],
            profit: [
                { quarter: "23年1Q", operating: 0.05, net: 0.04 }, { quarter: "23年2Q", operating: 0.06, net: 0.05 },
                { quarter: "23年3Q", operating: 0.06, net: 0.05 }, { quarter: "23年4Q", operating: 0.05, net: 0.04 },
                { quarter: "24年1Q", operating: 0.07, net: 0.06 }, { quarter: "24年2Q", operating: 0.07, net: 0.06 },
                { quarter: "24年3Q", operating: 0.08, net: 0.07 }, { quarter: "24年4Q", operating: 0.07, net: 0.06 },
                { quarter: "25年1Q", operating: 0.08, net: 0.07 }, { quarter: "25年2Q", operating: 0.09, net: 0.08 }
            ],
            segments: [
                { name: "FA", value: 30, color: "#3b82f6" },
                { name: "ロボット", value: 40, color: "#ef4444" },
                { name: "ロボマシン", value: 20, color: "#10b981" },
                { name: "サービス", value: 10, color: "#f59e0b" }
            ],
            metrics: [
                { name: "PER（株価収益率）", value: "25.5倍" }, { name: "PBR（株価純資産倍率）", value: "3.2倍" },
                { name: "ROE", value: "9.5%" }, { name: "営業利益率", value: "20.5%" }
            ],
            incomeStatement: {
                revenue: 8500,
                costOfGoodsSold: 5000,
                grossProfit: 3500,
                sellingGeneralAdmin: 1500,
                operatingIncome: 2000,
                nonOperatingIncome: 200,
                ordinaryIncome: 2200,
                specialIncome: 0,
                preTaxIncome: 2200,
                incomeTax: 600,
                netIncome: 1600
            }
        },
        "9433": { // KDDI
            currency: "JPY",
            revenue: [
                { quarter: "23年1Q", value: 1.3 }, { quarter: "23年2Q", value: 1.35 },
                { quarter: "23年3Q", value: 1.4 }, { quarter: "23年4Q", value: 1.35 },
                { quarter: "24年1Q", value: 1.45 }, { quarter: "24年2Q", value: 1.5 },
                { quarter: "24年3Q", value: 1.55 }, { quarter: "24年4Q", value: 1.5 },
                { quarter: "25年1Q", value: 1.55 }, { quarter: "25年2Q", value: 1.6 }
            ],
            profit: [
                { quarter: "23年1Q", operating: 0.25, net: 0.15 }, { quarter: "23年2Q", operating: 0.27, net: 0.17 },
                { quarter: "23年3Q", operating: 0.28, net: 0.18 }, { quarter: "23年4Q", operating: 0.26, net: 0.16 },
                { quarter: "24年1Q", operating: 0.29, net: 0.19 }, { quarter: "24年2Q", operating: 0.3, net: 0.2 },
                { quarter: "24年3Q", operating: 0.32, net: 0.21 }, { quarter: "24年4Q", operating: 0.3, net: 0.19 },
                { quarter: "25年1Q", operating: 0.33, net: 0.22 }, { quarter: "25年2Q", operating: 0.35, net: 0.23 }
            ],
            segments: [
                { name: "パーソナル", value: 80, color: "#3b82f6" },
                { name: "ビジネス", value: 20, color: "#10b981" }
            ],
            metrics: [
                { name: "PER（株価収益率）", value: "11.5倍" }, { name: "PBR（株価純資産倍率）", value: "1.6倍" },
                { name: "配当利回り", value: "3.5%" }, { name: "連続増配", value: "22期" }
            ],
            incomeStatement: {
                revenue: 57000,
                costOfGoodsSold: 30000,
                grossProfit: 27000,
                sellingGeneralAdmin: 16000,
                operatingIncome: 11000,
                nonOperatingIncome: 500,
                ordinaryIncome: 11500,
                specialIncome: 0,
                preTaxIncome: 11500,
                incomeTax: 3500,
                netIncome: 8000
            }
        },
        "6098": { // リクルート
            currency: "JPY",
            revenue: [
                { quarter: "23年1Q", value: 0.8 }, { quarter: "23年2Q", value: 0.85 },
                { quarter: "23年3Q", value: 0.9 }, { quarter: "23年4Q", value: 0.85 },
                { quarter: "24年1Q", value: 0.95 }, { quarter: "24年2Q", value: 1.0 },
                { quarter: "24年3Q", value: 1.05 }, { quarter: "24年4Q", value: 1.0 },
                { quarter: "25年1Q", value: 1.1 }, { quarter: "25年2Q", value: 1.15 }
            ],
            profit: [
                { quarter: "23年1Q", operating: 0.1, net: 0.08 }, { quarter: "23年2Q", operating: 0.12, net: 0.09 },
                { quarter: "23年3Q", operating: 0.14, net: 0.11 }, { quarter: "23年4Q", operating: 0.12, net: 0.09 },
                { quarter: "24年1Q", operating: 0.15, net: 0.12 }, { quarter: "24年2Q", operating: 0.16, net: 0.13 },
                { quarter: "24年3Q", operating: 0.18, net: 0.14 }, { quarter: "24年4Q", operating: 0.15, net: 0.12 },
                { quarter: "25年1Q", operating: 0.2, net: 0.16 }, { quarter: "25年2Q", operating: 0.22, net: 0.18 }
            ],
            segments: [
                { name: "HRテクノロジー", value: 35, color: "#3b82f6" },
                { name: "マッチング&ソリューション", value: 35, color: "#10b981" },
                { name: "人材派遣", value: 30, color: "#f59e0b" }
            ],
            metrics: [
                { name: "PER（株価収益率）", value: "30.5倍" }, { name: "PBR（株価純資産倍率）", value: "5.5倍" },
                { name: "ROE", value: "18.5%" }, { name: "海外売上比率", value: "55%" }
            ],
            incomeStatement: {
                revenue: 35000,
                costOfGoodsSold: 15000,
                grossProfit: 20000,
                sellingGeneralAdmin: 16000,
                operatingIncome: 4000,
                nonOperatingIncome: 100,
                ordinaryIncome: 4100,
                specialIncome: 0,
                preTaxIncome: 4100,
                incomeTax: 1200,
                netIncome: 2900
            }
        },
        "7267": { // ホンダ
            currency: "JPY",
            revenue: [
                { quarter: "23年1Q", value: 4.5 }, { quarter: "23年2Q", value: 4.8 },
                { quarter: "23年3Q", value: 5.0 }, { quarter: "23年4Q", value: 4.8 },
                { quarter: "24年1Q", value: 5.2 }, { quarter: "24年2Q", value: 5.5 },
                { quarter: "24年3Q", value: 5.8 }, { quarter: "24年4Q", value: 5.3 },
                { quarter: "25年1Q", value: 5.6 }, { quarter: "25年2Q", value: 5.9 }
            ],
            profit: [
                { quarter: "23年1Q", operating: 0.3, net: 0.25 }, { quarter: "23年2Q", operating: 0.35, net: 0.3 },
                { quarter: "23年3Q", operating: 0.4, net: 0.35 }, { quarter: "23年4Q", operating: 0.3, net: 0.25 },
                { quarter: "24年1Q", operating: 0.45, net: 0.38 }, { quarter: "24年2Q", operating: 0.5, net: 0.42 },
                { quarter: "24年3Q", operating: 0.55, net: 0.45 }, { quarter: "24年4Q", operating: 0.4, net: 0.35 },
                { quarter: "25年1Q", operating: 0.5, net: 0.42 }, { quarter: "25年2Q", operating: 0.55, net: 0.46 }
            ],
            segments: [
                { name: "四輪", value: 65, color: "#3b82f6" },
                { name: "二輪", value: 20, color: "#ef4444" },
                { name: "金融", value: 10, color: "#10b981" },
                { name: "パワープロダクツ", value: 5, color: "#f59e0b" }
            ],
            metrics: [
                { name: "PER（株価収益率）", value: "8.5倍" }, { name: "PBR（株価純資産倍率）", value: "0.65倍" },
                { name: "配当利回り", value: "3.8%" }, { name: "世界販売台数", value: "400万台" }
            ],
            incomeStatement: {
                revenue: 200000,
                costOfGoodsSold: 160000,
                grossProfit: 40000,
                sellingGeneralAdmin: 28000,
                operatingIncome: 12000,
                nonOperatingIncome: 3000, // 持分法投資利益等
                ordinaryIncome: 15000,
                specialIncome: 0,
                preTaxIncome: 15000,
                incomeTax: 4000,
                netIncome: 11000
            }
        },
        "5805": { // SWCC - 2025年3月期決算（最新）
            currency: "JPY_Oku",
            priceHistory: generateMockHistory(2000, 11460),
            revenue: [
                { quarter: "22.3", value: 454 }, { quarter: "22.6", value: 465 },
                { quarter: "22.9", value: 475 }, { quarter: "22.12", value: 485 },
                { quarter: "23.3", value: 522 }, { quarter: "23.6", value: 515 },
                { quarter: "23.9", value: 525 }, { quarter: "23.12", value: 535 },
                { quarter: "24.3", value: 535 }, { quarter: "24.6", value: 595 },
                { quarter: "24.9", value: 605 }, { quarter: "25.3", value: 595 }
            ],
            profit: [
                { quarter: "22.3", operating: 25, net: 8 }, { quarter: "22.6", operating: 24, net: 7 },
                { quarter: "22.9", operating: 26, net: 8 }, { quarter: "22.12", operating: 27, net: 8 },
                { quarter: "23.3", operating: 27, net: 16 }, { quarter: "23.6", operating: 26, net: 15 },
                { quarter: "23.9", operating: 28, net: 17 }, { quarter: "23.12", operating: 30, net: 17 },
                { quarter: "24.3", operating: 31, net: 21 }, { quarter: "24.6", operating: 50, net: 27 },
                { quarter: "24.9", operating: 55, net: 30 }, { quarter: "25.3", operating: 52, net: 28 }
            ],
            segments: [
                { name: "エネルギー・インフラ", value: 45, color: "#3b82f6" },
                { name: "通信・産業用電線", value: 35, color: "#10b981" },
                { name: "電装・コンポーネント", value: 20, color: "#f59e0b" }
            ],
            metrics: [
                { name: "PER", value: "22.45倍" }, { name: "PBR", value: "3.84倍" },
                { name: "ROE", value: "18.07%" }, { name: "配当利回り", value: "1.75%" },
                { name: "自己資本比率", value: "48.0%" }, { name: "営業利益率", value: "8.8%" },
                { name: "EV/EBITDA", value: "8.5倍" }, { name: "PSR", value: "1.36倍" }
            ],
            incomeStatement: {
                revenue: 2380, // 2025年3月期 売上高 2,380億円
                costOfGoodsSold: 1950,
                grossProfit: 430,
                sellingGeneralAdmin: 221,
                operatingIncome: 209, // 営業利益 209.3億円
                nonOperatingIncome: 5,
                ordinaryIncome: 214,
                specialIncome: 0,
                preTaxIncome: 214,
                incomeTax: 100,
                netIncome: 114, // 純利益 114億円
                analysis: "売上高に対する純利益の割合（純利益率）は **4.8%** です。電線・エネルギー関連の堅調な需要背景に、安定した収益力を維持しています。"
            },
            balanceSheet: { totalAssets: 2200, totalLiabilities: 1150, totalEquity: 1050, totalDebt: 480 }
        },
        "6315": { // TOWA - 2025年3月期決算（最新）
            currency: "JPY_Oku",
            priceHistory: generateMockHistory(2000, 3000),
            revenue: [
                { quarter: "22.3", value: 108 }, { quarter: "22.6", value: 110 },
                { quarter: "22.9", value: 112 }, { quarter: "22.12", value: 103 },
                { quarter: "23.3", value: 123 }, { quarter: "23.6", value: 125 },
                { quarter: "23.9", value: 128 }, { quarter: "23.12", value: 117 },
                { quarter: "24.3", value: 134 }, { quarter: "24.6", value: 130 },
                { quarter: "24.9", value: 132 }, { quarter: "25.3", value: 116 }
            ],
            profit: [
                { quarter: "22.3", operating: 17, net: 12 }, { quarter: "22.6", operating: 18, net: 13 },
                { quarter: "22.9", operating: 19, net: 14 }, { quarter: "22.12", operating: 16, net: 11 },
                { quarter: "23.3", operating: 27, net: 20 }, { quarter: "23.6", operating: 28, net: 21 },
                { quarter: "23.9", operating: 29, net: 20 }, { quarter: "23.12", operating: 25, net: 17 },
                { quarter: "24.3", operating: 21, net: 15 }, { quarter: "24.6", operating: 20, net: 14 },
                { quarter: "24.9", operating: 22, net: 15 }, { quarter: "25.3", operating: 20, net: 14 }
            ],
            segments: [
                { name: "モールディング装置", value: 85, color: "#3b82f6" },
                { name: "シンギュレーション装置", value: 10, color: "#10b981" },
                { name: "その他", value: 5, color: "#f59e0b" }
            ],
            metrics: [
                { name: "PER", value: "37.72倍" }, { name: "PBR", value: "3.63倍" },
                { name: "ROE", value: "10.01%" }, { name: "配当利回り", value: "0.67%" },
                { name: "自己資本比率", value: "70.1%" }, { name: "営業利益率", value: "16.1%" },
                { name: "EV/EBITDA", value: "12.5倍" }, { name: "PSR", value: "4.64倍" }
            ],
            incomeStatement: {
                revenue: 512, // 2025年3月期 売上高 512.45億円
                costOfGoodsSold: 320,
                grossProfit: 192,
                sellingGeneralAdmin: 110,
                operatingIncome: 82, // 営業利益 82.37億円
                nonOperatingIncome: 3,
                ordinaryIncome: 85,
                specialIncome: 0,
                preTaxIncome: 85,
                incomeTax: 26,
                netIncome: 59, // 純利益 58.59億円
                analysis: "純利益率は **11.5%** と非常に高く、半導体製造装置（モールディング装置）における圧倒的なシェアと技術力が収益を支えています。"
            },
            balanceSheet: { totalAssets: 910, totalLiabilities: 272, totalEquity: 638, totalDebt: 139 }
        },
        "3778": { // さくらインターネット - 2025年3月期決算（最新）
            currency: "JPY_Oku",
            priceHistory: generateMockHistory(1500, 2750),
            revenue: [
                { quarter: "22.3", value: 47 }, { quarter: "22.6", value: 48 },
                { quarter: "22.9", value: 49 }, { quarter: "22.12", value: 49 },
                { quarter: "23.3", value: 52 }, { quarter: "23.6", value: 51 },
                { quarter: "23.9", value: 52 }, { quarter: "23.12", value: 53 },
                { quarter: "24.3", value: 55 }, { quarter: "24.6", value: 78 },
                { quarter: "24.9", value: 80 }, { quarter: "25.3", value: 78 }
            ],
            profit: [
                { quarter: "22.3", operating: 1.6, net: 0.4 }, { quarter: "22.6", operating: 1.5, net: 0.3 },
                { quarter: "22.9", operating: 1.7, net: 0.4 }, { quarter: "22.12", operating: 1.7, net: 0.4 },
                { quarter: "23.3", operating: 2.7, net: 1.7 }, { quarter: "23.6", operating: 2.5, net: 1.5 },
                { quarter: "23.9", operating: 2.8, net: 1.8 }, { quarter: "23.12", operating: 3.0, net: 1.8 },
                { quarter: "24.3", operating: 3.1, net: 1.9 }, { quarter: "24.6", operating: 14.6, net: 9.5 },
                { quarter: "24.9", operating: 15.0, net: 10.0 }, { quarter: "25.3", operating: 14.5, net: 9.0 }
            ],
            segments: [
                { name: "クラウドサービス", value: 75, color: "#3b82f6" },
                { name: "物理ホスティング", value: 15, color: "#10b981" },
                { name: "その他", value: 10, color: "#f59e0b" }
            ],
            metrics: [
                { name: "PER", value: "68.62倍" }, { name: "PBR", value: "3.74倍" },
                { name: "ROE", value: "5.60%" }, { name: "配当利回り", value: "0.18%" },
                { name: "自己資本比率", value: "36.9%" }, { name: "営業利益率", value: "18.6%" },
                { name: "EV/EBITDA", value: "25.0倍" }, { name: "PSR", value: "3.25倍" }
            ],
            incomeStatement: {
                revenue: 314, // 2025年3月期 売上高 314.0億円
                costOfGoodsSold: 210,
                grossProfit: 104,
                sellingGeneralAdmin: 45,
                operatingIncome: 58.5, // 営業利益 58.5億円
                nonOperatingIncome: 1,
                ordinaryIncome: 59.5,
                specialIncome: 0,
                preTaxIncome: 59.5,
                incomeTax: 21,
                netIncome: 37.8, // 純利益 37.85億円
                analysis: "データセンター需要の急拡大により、純利益率は **12.0%** に達しています。GPUサーバーを中心とした高付加価値サービスへの投資が奏功しています。"
            },
            balanceSheet: { totalAssets: 1200, totalLiabilities: 700, totalEquity: 500, totalDebt: 450 }
        },
        "5595": { // QPS研究所 - 2025年5月期決算（最新）
            currency: "JPY_Oku",
            priceHistory: generateMockHistory(1200, 1720),
            revenue: [
                { quarter: "22.5", value: 0.4 }, { quarter: "22.8", value: 0.3 },
                { quarter: "22.11", value: 0.4 }, { quarter: "23.2", value: 0.5 },
                { quarter: "23.5", value: 0.9 }, { quarter: "23.8", value: 1.5 },
                { quarter: "23.11", value: 2.0 }, { quarter: "24.2", value: 2.5 },
                { quarter: "24.5", value: 2.9 }, { quarter: "24.8", value: 2.6 },
                { quarter: "24.11", value: 2.7 }, { quarter: "25.5", value: 2.6 }
            ],
            profit: [
                { quarter: "22.5", operating: -2.1, net: -2.8 }, { quarter: "22.8", operating: -2.0, net: -2.7 },
                { quarter: "22.11", operating: -2.2, net: -2.8 }, { quarter: "23.2", operating: -2.1, net: -2.7 },
                { quarter: "23.5", operating: -0.8, net: -0.8 }, { quarter: "23.8", operating: 0.5, net: 0.2 },
                { quarter: "23.11", operating: 0.6, net: 0.2 }, { quarter: "24.2", operating: 0.5, net: 0.1 },
                { quarter: "24.5", operating: 0.5, net: 0.1 }, { quarter: "24.8", operating: -0.5, net: -0.7 },
                { quarter: "24.11", operating: -0.6, net: -0.7 }, { quarter: "25.5", operating: -0.5, net: -0.7 }
            ],
            segments: [
                { name: "SAR衛星データ販売", value: 90, color: "#3b82f6" },
                { name: "衛星開発受託", value: 10, color: "#10b981" }
            ],
            metrics: [
                { name: "時価総額", value: "830億円" }, { name: "EV", value: "803億円" },
                { name: "PBR", value: "5.47倍" }, { name: "DEレシオ", value: "0.35" },
                { name: "売上総利益率", value: "48.9%" }, { name: "ROA", value: "2.8%" },
                { name: "ROE", value: "4.4%" }, { name: "ROIC", value: "3.5%" }
            ],
            incomeStatement: {
                revenue: 10.5, // 2025年5月期 売上高 10.53億円
                costOfGoodsSold: 7.5,
                grossProfit: 3.0,
                sellingGeneralAdmin: 5.1,
                operatingIncome: -2.1, // 営業利益 △2.1億円
                nonOperatingIncome: 0,
                ordinaryIncome: -2.1,
                specialIncome: 0,
                preTaxIncome: -2.1,
                incomeTax: 0.6,
                netIncome: -2.7, // 純利益 △2.78億円
                analysis: "成長投資が先行しており、現時点では純利益率はマイナスの状態ですが、SAR衛星の打ち上げ進展に伴う売上高の急拡大が期待されています。"
            },
            balanceSheet: { totalAssets: 250, totalLiabilities: 120, totalEquity: 130, totalDebt: 60 }
        },
        "1942": { // 関電工 - 2025年3月期決算（最新）
            currency: "JPY_Oku",
            priceHistory: generateMockHistory(1500, 5740),
            revenue: [
                { quarter: "22.3", value: 1238 }, { quarter: "22.6", value: 1230 },
                { quarter: "22.9", value: 1240 }, { quarter: "22.12", value: 1247 },
                { quarter: "23.3", value: 1353 }, { quarter: "23.6", value: 1350 },
                { quarter: "23.9", value: 1355 }, { quarter: "23.12", value: 1357 },
                { quarter: "24.3", value: 1496 }, { quarter: "24.6", value: 1679 },
                { quarter: "24.9", value: 1680 }, { quarter: "25.3", value: 1679 }
            ],
            profit: [
                { quarter: "22.3", operating: 79, net: 50 }, { quarter: "22.6", operating: 78, net: 49 },
                { quarter: "22.9", operating: 80, net: 51 }, { quarter: "22.12", operating: 80, net: 52 },
                { quarter: "23.3", operating: 85, net: 52 }, { quarter: "23.6", operating: 84, net: 51 },
                { quarter: "23.9", operating: 86, net: 53 }, { quarter: "23.12", operating: 85, net: 55 },
                { quarter: "24.3", operating: 106, net: 68 }, { quarter: "24.6", operating: 145, net: 94 },
                { quarter: "24.9", operating: 146, net: 95 }, { quarter: "25.3", operating: 145, net: 94 }
            ],
            segments: [
                { name: "屋内線・環境設備工事", value: 60, color: "#3b82f6" },
                { name: "送電・情報通信工事", value: 30, color: "#10b981" },
                { name: "その他", value: 10, color: "#f59e0b" }
            ],
            metrics: [
                { name: "PER", value: "22.78倍" }, { name: "PBR", value: "3.00倍" },
                { name: "ROE", value: "14.00%" }, { name: "配当利回り", value: "1.56%" },
                { name: "自己資本比率", value: "68.1%" }, { name: "営業利益率", value: "8.6%" },
                { name: "EV/EBITDA", value: "7.5倍" }, { name: "PSR", value: "1.56倍" }
            ],
            incomeStatement: {
                revenue: 6718, // 2025年3月期 売上高 6,718.8億円
                costOfGoodsSold: 5600,
                grossProfit: 1118,
                sellingGeneralAdmin: 535,
                operatingIncome: 583, // 営業利益 583.2億円
                nonOperatingIncome: 5,
                ordinaryIncome: 588,
                specialIncome: 0,
                preTaxIncome: 588,
                incomeTax: 210,
                netIncome: 378, // 純利益 378.8億円
                analysis: "堅調な工事需要を背景に、純利益率は **5.6%** を確保。施工能力の拡大と受注時採算の改善が利益を押し上げています。"
            },
            balanceSheet: { totalAssets: 6500, totalLiabilities: 2100, totalEquity: 4400, totalDebt: 120 }
        },
        "6506": { // 安川電機 - 2025年2月期決算（最新）
            currency: "JPY_Oku",
            priceHistory: generateMockHistory(4500, 5150),
            revenue: [
                { quarter: "22.2", value: 1138 }, { quarter: "22.5", value: 1135 },
                { quarter: "22.8", value: 1139 }, { quarter: "22.11", value: 1140 },
                { quarter: "23.2", value: 1390 }, { quarter: "23.5", value: 1385 },
                { quarter: "23.8", value: 1395 }, { quarter: "23.11", value: 1390 },
                { quarter: "24.2", value: 1439 }, { quarter: "24.5", value: 1460 },
                { quarter: "24.8", value: 1465 }, { quarter: "25.2", value: 1462 }
            ],
            profit: [
                { quarter: "22.2", operating: 110, net: 81 }, { quarter: "22.5", operating: 109, net: 80 },
                { quarter: "22.8", operating: 111, net: 82 }, { quarter: "22.11", operating: 111, net: 81 },
                { quarter: "23.2", operating: 170, net: 129 }, { quarter: "23.5", operating: 168, net: 128 },
                { quarter: "23.8", operating: 172, net: 130 }, { quarter: "23.11", operating: 173, net: 130 },
                { quarter: "24.2", operating: 165, net: 126 }, { quarter: "24.5", operating: 160, net: 121 },
                { quarter: "24.8", operating: 162, net: 122 }, { quarter: "25.2", operating: 158, net: 120 }
            ],
            segments: [
                { name: "モーションコントロール", value: 45, color: "#3b82f6" },
                { name: "ロボット", value: 35, color: "#10b981" },
                { name: "システムエンジニアリング", value: 15, color: "#f59e0b" },
                { name: "その他", value: 5, color: "#64748b" }
            ],
            metrics: [
                { name: "PER", value: "36.12倍" }, { name: "PBR", value: "2.89倍" },
                { name: "ROE", value: "8.43%" }, { name: "配当利回り", value: "1.32%" },
                { name: "自己資本比率", value: "59.3%" }, { name: "営業利益率", value: "10.9%" },
                { name: "EV/EBITDA", value: "18.2倍" }, { name: "PSR", value: "2.45倍" }
            ],
            incomeStatement: {
                revenue: 5850, // 2025年2月期 売上高 5,850億円
                costOfGoodsSold: 3750,
                grossProfit: 2100,
                sellingGeneralAdmin: 1460,
                operatingIncome: 640, // 営業利益 640億円
                nonOperatingIncome: 45,
                ordinaryIncome: 685,
                specialIncome: 0,
                preTaxIncome: 685,
                incomeTax: 200,
                netIncome: 485, // 純利益 485億円
                analysis: "純利益率は **8.3%** です。サーボモータやロボットなど、高付加価値なモーションコントロール製品の伸長が利益率向上に寄与しています。"
            },
            balanceSheet: { totalAssets: 8200, totalLiabilities: 3300, totalEquity: 4900, totalDebt: 1200 },
            cashFlow: { operatingCashFlow: 500, investingCashFlow: -500, financingCashFlow: -10, freeCashFlow: -10 }
        },
        "6269": { // 三井海洋開発 - 2025年12月期決算（予想）
            currency: "JPY_Oku",
            priceHistory: generateMockHistory(2500, 3140),
            revenue: [
                { quarter: "23.3", value: 1250 }, { quarter: "23.6", value: 1260 },
                { quarter: "23.9", value: 1270 }, { quarter: "23.12", value: 1290 },
                { quarter: "24.3", value: 1443 }, { quarter: "24.6", value: 1445 },
                { quarter: "24.9", value: 1447 }, { quarter: "24.12", value: 1440 },
                { quarter: "25.3", value: 1550 }, { quarter: "25.6", value: 1555 },
                { quarter: "25.9", value: 1550 }, { quarter: "25.12", value: 1545 }
            ],
            profit: [
                { quarter: "23.3", operating: 65, net: 30 }, { quarter: "23.6", operating: 68, net: 31 },
                { quarter: "23.9", operating: 70, net: 32 }, { quarter: "23.12", operating: 70, net: 31 },
                { quarter: "24.3", operating: 102, net: 51 }, { quarter: "24.6", operating: 102, net: 52 },
                { quarter: "24.9", operating: 102, net: 52 }, { quarter: "24.12", operating: 102, net: 51 },
                { quarter: "25.3", operating: 112, net: 60 }, { quarter: "25.6", operating: 113, net: 61 },
                { quarter: "25.9", operating: 112, net: 60 }, { quarter: "25.12", operating: 113, net: 59 }
            ],
            segments: [
                { name: "FPSO等建造・据付", value: 70, color: "#3b82f6" },
                { name: "FPSO等チャーター", value: 30, color: "#10b981" }
            ],
            metrics: [
                { name: "PER", value: "11.23倍" }, { name: "PBR", value: "1.45倍" },
                { name: "ROE", value: "12.00%" }, { name: "自己資本比率", value: "32.0%" },
                { name: "EV/EBITDA", value: "5.5倍" }, { name: "営業利益率", value: "7.1%" },
                { name: "配当利回り", value: "1.8%" }, { name: "株主資本比率", value: "30.5%" }
            ],
            incomeStatement: {
                revenue: 6200, // 2025年12月期 予想売上高 6,200億円
                costOfGoodsSold: 5400,
                grossProfit: 800,
                sellingGeneralAdmin: 350,
                operatingIncome: 450, // 営業利益 450億円
                nonOperatingIncome: 10,
                ordinaryIncome: 460,
                specialIncome: 0,
                preTaxIncome: 460,
                incomeTax: 220,
                netIncome: 240, // 純利益 240億円
                analysis: "純利益率は **3.9%** です。洋上浮体式生産設備（FPSO）市場の活況を背景に、長期チャーター契約による安定収益の積み上げが進んでいます。"
            },
            balanceSheet: { totalAssets: 6657, totalLiabilities: 4612, totalEquity: 2045, totalDebt: 620 },
            cashFlow: { operatingCashFlow: 1170, investingCashFlow: -4, financingCashFlow: -311, freeCashFlow: 1159 }
        },
        "6965": { // 浜松ホトニクス - 2025年9月期決算（最新）
            currency: "JPY_Oku",
            priceHistory: generateMockHistory(1900, 1760),
            revenue: [
                { quarter: "22.9", value: 522 }, { quarter: "22.12", value: 553 },
                { quarter: "23.3", value: 554 }, { quarter: "23.6", value: 556 },
                { quarter: "23.9", value: 551 }, { quarter: "23.12", value: 510 },
                { quarter: "24.3", value: 510 }, { quarter: "24.6", value: 510 },
                { quarter: "24.9", value: 510 }, { quarter: "24.12", value: 530 },
                { quarter: "25.3", value: 530 }, { quarter: "25.9", value: 530 }
            ],
            profit: [
                { quarter: "22.9", operating: 142, net: 104 }, { quarter: "22.12", operating: 142, net: 103 },
                { quarter: "23.3", operating: 143, net: 104 }, { quarter: "23.6", operating: 141, net: 102 },
                { quarter: "23.9", operating: 140, net: 103 }, { quarter: "23.12", operating: 86, net: 61 },
                { quarter: "24.3", operating: 86, net: 62 }, { quarter: "24.6", operating: 86, net: 62 },
                { quarter: "24.9", operating: 87, net: 61 }, { quarter: "24.12", operating: 40, net: 27 },
                { quarter: "25.3", operating: 40, net: 28 }, { quarter: "25.9", operating: 39, net: 27 }
            ],
            segments: [
                { name: "光検出器", value: 45, color: "#3b82f6" },
                { name: "光源", value: 30, color: "#10b981" },
                { name: "画像処理・計測システム", value: 25, color: "#f59e0b" }
            ],
            metrics: [
                { name: "PER", value: "37.27倍" }, { name: "PBR", value: "1.64倍" },
                { name: "ROE", value: "4.35%" }, { name: "配当利回り", value: "2.16%" },
                { name: "自己資本比率", value: "70.8%" }, { name: "営業利益率", value: "7.5%" },
                { name: "EV/EBITDA", value: "14.2倍" }, { name: "PSR", value: "2.51倍" }
            ],
            incomeStatement: {
                revenue: 2120, // 2025年9月期 売上高 2,120.5億円
                costOfGoodsSold: 1200,
                grossProfit: 920,
                sellingGeneralAdmin: 760,
                operatingIncome: 159, // 営業利益 159.5億円
                nonOperatingIncome: 5,
                ordinaryIncome: 164,
                specialIncome: 0,
                preTaxIncome: 164,
                incomeTax: 55,
                netIncome: 109, // 純利益 109.4億円
                analysis: "研究開発投資や新工場建設等により現時点での純利益率は **5.1%** ですが、光技術の世界的リーダーとして、高度なフォトニクス需要に応える体制を固めています。"
            },
            balanceSheet: { totalAssets: 4564, totalLiabilities: 1329, totalEquity: 3234, totalDebt: 723 }
        },
        "5253": { // カバー - 2025年3月期決算（最新）
            currency: "JPY_Oku",
            priceHistory: generateMockHistory(1500, 1740),
            revenue: [
                { quarter: "22.3", value: 143 }, { quarter: "22.6", value: 148 },
                { quarter: "22.9", value: 155 }, { quarter: "22.12", value: 162 },
                { quarter: "23.3", value: 204 }, { quarter: "23.6", value: 210 },
                { quarter: "23.9", value: 215 }, { quarter: "23.12", value: 220 },
                { quarter: "24.3", value: 301 }, { quarter: "24.6", value: 320 },
                { quarter: "24.9", value: 330 }, { quarter: "25.3", value: 325 }
            ],
            profit: [
                { quarter: "22.3", operating: 20, net: 15 }, { quarter: "22.6", operating: 22, net: 17 },
                { quarter: "22.9", operating: 24, net: 18 }, { quarter: "22.12", operating: 26, net: 20 },
                { quarter: "23.3", operating: 34, net: 25 }, { quarter: "23.6", operating: 36, net: 26 },
                { quarter: "23.9", operating: 38, net: 27 }, { quarter: "23.12", operating: 35, net: 25 },
                { quarter: "24.3", operating: 55, net: 41 }, { quarter: "24.6", operating: 60, net: 45 },
                { quarter: "24.9", operating: 62, net: 46 }, { quarter: "25.3", operating: 60, net: 44 }
            ],
            segments: [
                { name: "ライブエンターテインメント", value: 40, color: "#3b82f6" },
                { name: "マーチャンダイジング", value: 35, color: "#10b981" },
                { name: "ライセンス・タイアップ", value: 25, color: "#f59e0b" }
            ],
            metrics: [
                { name: "PER", value: "21.26倍" }, { name: "PBR", value: "5.98倍" },
                { name: "ROE", value: "33.70%" }, { name: "売上高成長率", value: "45.8%" },
                { name: "自己資本比率", value: "57.4%" }, { name: "営業利益率", value: "17.5%" },
                { name: "EV/EBITDA", value: "22.5倍" }, { name: "PSR", value: "2.45倍" }
            ],
            incomeStatement: {
                revenue: 437, // 2025年3月期 売上高 437.3億円
                costOfGoodsSold: 220,
                grossProfit: 217,
                sellingGeneralAdmin: 140,
                operatingIncome: 76.5, // 営業利益 76.5億円
                nonOperatingIncome: 1,
                ordinaryIncome: 77.5,
                specialIncome: 0,
                preTaxIncome: 77.5,
                incomeTax: 21,
                netIncome: 56.7, // 純利益 56.7億円
                analysis: "純利益率は **13.0%** です。VTuberグループ「ホロライブプロダクション」の国内外での人気拡大により、マーチャンダイジングやライセンス収益が大きく伸長しています。"
            },
            balanceSheet: { totalAssets: 500, totalLiabilities: 210, totalEquity: 290, totalDebt: 0 }
        },
        "6228": { // JET - 2025年12月期決算（予想）
            currency: "JPY_Oku",
            priceHistory: generateMockHistory(1000, 800),
            revenue: [
                { quarter: "22.12", value: 178 }, { quarter: "23.3", value: 185 },
                { quarter: "23.6", value: 190 }, { quarter: "23.9", value: 195 },
                { quarter: "23.12", value: 249 }, { quarter: "24.3", value: 255 },
                { quarter: "24.6", value: 260 }, { quarter: "24.9", value: 255 },
                { quarter: "24.12", value: 295 }, { quarter: "25.3", value: 300 },
                { quarter: "25.6", value: 305 }, { quarter: "25.12", value: 310 }
            ],
            profit: [
                { quarter: "22.12", operating: 7, net: 3 }, { quarter: "23.3", operating: 8, net: 4 },
                { quarter: "23.6", operating: 8, net: 4 }, { quarter: "23.9", operating: 8, net: 4 },
                { quarter: "23.12", operating: 55, net: 38 }, { quarter: "24.3", operating: 56, net: 39 },
                { quarter: "24.6", operating: 58, net: 40 }, { quarter: "24.9", operating: 56, net: 39 },
                { quarter: "24.12", operating: 62, net: 43 }, { quarter: "25.3", operating: 63, net: 44 },
                { quarter: "25.6", operating: 64, net: 45 }, { quarter: "25.12", operating: 65, net: 45 }
            ],
            segments: [
                { name: "半導体洗浄装置", value: 95, color: "#3b82f6" },
                { name: "その他生活家電関連", value: 5, color: "#10b981" }
            ],
            metrics: [
                { name: "PSR", value: "0.75倍" }, { name: "PBR", value: "1.11倍" },
                { name: "ROE", value: "15.0%" }, { name: "自己資本比率", value: "48.9%" },
                { name: "EV/EBITDA", value: "8.5倍" }, { name: "営業利益率", value: "21.0%" },
                { name: "配当利回り", value: "1.5%" }, { name: "時価総額", value: "950億円" }
            ],
            incomeStatement: {
                revenue: 310, // 2025年12月期 予想売上高 310億円
                costOfGoodsSold: 210,
                grossProfit: 100,
                sellingGeneralAdmin: 35,
                operatingIncome: 65, // 営業利益 65億円
                nonOperatingIncome: 1,
                ordinaryIncome: 66,
                specialIncome: 0,
                preTaxIncome: 66,
                incomeTax: 21,
                netIncome: 45, // 純利益 45億円
                analysis: "純利益率は **14.5%** と高水準です。半導体洗浄装置市場における特化戦略と、急拡大する半導体投資 需要が収益を強力に支えています。"
            },
            balanceSheet: { totalAssets: 2004, totalLiabilities: 1023, totalEquity: 981, totalDebt: 472 }
        }
    };

    const getFinancialData = () => {
        return financialDataMap[selectedChart || ""] || financialDataMap["NASDAQ:AAPL"];
    };

    const screenerConfigs: Record<ScreenerType, WidgetConfig> = {
        total: {
            title: "総合",
            icon: <Activity className="w-4 h-4 md:w-5 md:h-5" />,
            description: "世界の主要指数・注目銘柄のリアルタイム情報"
        },
        japan: {
            title: "日本株",
            icon: <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />,
            description: "日本国内の主要銘柄・財務データ"
        },
        us: {
            title: "米国株",
            icon: <BarChart2 className="w-4 h-4 md:w-5 md:h-5" />,
            description: "NYSE/NASDAQ上場銘柄"
        },
        promising: {
            title: "注目銘柄",
            icon: <LineChart className="w-4 h-4 md:w-5 md:h-5" />,
            description: "2026年注目！テンバガー候補・話題の10銘柄"
        },
        forex: {
            title: "為替(FX)",
            icon: <Globe className="w-4 h-4 md:w-5 md:h-5" />,
            description: "主要通貨ペアのリアルタイムレート"
        },
        crypto: {
            title: "暗号資産",
            icon: <Zap className="w-4 h-4 md:w-5 md:h-5" />,
            description: "主要暗号資産のリアルタイム価格"
        }
    };

    // 日本株リスト
    const japanStocks = [
        { symbol: "7203", name: "トヨタ自動車" },
        { symbol: "6758", name: "ソニーG" },
        { symbol: "9984", name: "ソフトバンクG" },
        { symbol: "8306", name: "三菱UFJ" },
        { symbol: "6861", name: "キーエンス" },
        { symbol: "7974", name: "任天堂" },
        { symbol: "9983", name: "ファストリ" },
        { symbol: "8035", name: "東京エレク" },
        { symbol: "9432", name: "NTT" },
        { symbol: "8316", name: "三井住友FG" },
        { symbol: "6501", name: "日立製作所" },
        { symbol: "8001", name: "伊藤忠商事" },
        { symbol: "6902", name: "デンソー" },
        { symbol: "4063", name: "信越化学" },
        { symbol: "8411", name: "みずほFG" },
        { symbol: "4568", name: "第一三共" },
        { symbol: "6954", name: "ファナック" },
        { symbol: "9433", name: "KDDI" },
        { symbol: "6098", name: "リクルート" },
        { symbol: "7267", name: "ホンダ" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
            <SEO
                title="リアルタイム銘柄スクリーナー | 投資総合ガイド"
                description="TradingViewのリアルタイムデータで投資銘柄を探す。S&P500、日経225、米国株、日本株、FX、暗号資産の価格をリアルタイムでチェック。"
                path="/screener"
            />
            {/* ティッカーテープ */}
            <div className="sticky top-0 z-50 shadow-md bg-white h-[78px] md:h-[46px] overflow-hidden">
                <TradingViewWidgetIframe
                    title="Ticker Tape"
                    height={78}
                    scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"
                    config={{
                        symbols: [
                            { proName: "FOREXCOM:SPXUSD", title: "S&P 500" },
                            { proName: "FOREXCOM:NSXUSD", title: "NASDAQ" },
                            { proName: "FOREXCOM:DJI", title: "Dow Jones" },
                            { proName: "INDEX:NKY", title: "日経225" },
                            { proName: "FX:USDJPY", title: "USD/JPY" },
                            { proName: "FX:EURUSD", title: "EUR/USD" },
                            { proName: "CMCMARKETS:GOLD", title: "Gold" },
                            { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
                            { proName: "BITSTAMP:ETHUSD", title: "Ethereum" }
                        ],
                        showSymbolLogo: true,
                        colorTheme: "light",
                        isTransparent: false,
                        displayMode: "adaptive",
                        locale: "ja"
                    }}
                />
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* ヘッダー */}
                <div className="mb-0">
                    <Button
                        variant="ghost"
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        戻る
                    </Button>
                </div>

                <div className="mb-4 text-center">
                    <h1 className="text-xl md:text-3xl font-bold text-slate-800 mb-2 flex items-center justify-center gap-2 md:gap-3">
                        <Activity className="w-5 h-5 md:w-8 md:h-8 text-blue-600" />
                        リアルタイム銘柄スクリーナー
                    </h1>
                    <p className="text-sm md:text-base text-slate-600">
                        TradingViewのリアルタイムデータで投資銘柄を探す
                    </p>
                </div>

                {/* スクリーナー選択タブ */}
                <div className="flex overflow-x-auto pb-2 gap-2 md:justify-center md:gap-3 mb-4 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
                    {(Object.entries(screenerConfigs) as [ScreenerType, WidgetConfig][]).map(([key, config]) => (
                        <Button
                            key={key}
                            variant={activeScreener === key ? "default" : "outline"}
                            onClick={() => setActiveScreener(key)}
                            className={`flex items-center gap-1 md:gap-2 px-3 py-2 md:px-6 md:py-4 text-xs md:text-sm transition-all whitespace-nowrap min-w-fit ${activeScreener === key
                                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105"
                                : "hover:bg-blue-50"
                                }`}
                        >
                            {config.icon}
                            {config.title}
                        </Button>
                    ))}
                </div>

                {/* 現在のスクリーナー情報 */}
                <Card className="mb-6 border-2 border-blue-200 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
                        <CardTitle className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                {screenerConfigs[activeScreener].icon}
                                <span>{screenerConfigs[activeScreener].title}</span>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="w-full" style={{ minHeight: "600px" }}>
                            {activeScreener === "total" ? (
                                <div key="total-market">
                                    <div ref={chartContainerRef} className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
                                        <div className="flex flex-wrap gap-2">
                                            {[
                                                { symbol: "FOREXCOM:SPXUSD", name: "S&P 500" },
                                                { symbol: "INDEX:NKY", name: "日経225" },
                                                { symbol: "NASDAQ:NVDA", name: "NVIDIA" },
                                                { symbol: "NASDAQ:AAPL", name: "Apple" },
                                                { symbol: "NASDAQ:TSLA", name: "Tesla" },
                                                { symbol: "NASDAQ:MSFT", name: "Microsoft" },
                                                { symbol: "NASDAQ:AMZN", name: "Amazon" },
                                                { symbol: "NASDAQ:GOOGL", name: "Google" },
                                                { symbol: "NASDAQ:META", name: "Meta" },
                                                { symbol: "7203", name: "トヨタ" },
                                                { symbol: "NYSE:SONY", name: "ソニーG" },
                                                { symbol: "9984", name: "ソフトバンクG" },
                                                { symbol: "7974", name: "任天堂" },
                                                { symbol: "6861", name: "キーエンス" },
                                                { symbol: "9983", name: "ファストリ" },
                                                { symbol: "7409", name: "AeroEdge" },
                                                { symbol: "FX:EURUSD", name: "EUR/USD" },
                                                { symbol: "FX:USDJPY", name: "USD/JPY" },
                                                { symbol: "FX:GBPUSD", name: "GBP/USD" },
                                                { symbol: "FX:AUDUSD", name: "AUD/USD" },
                                                { symbol: "OANDA:XAUUSD", name: "Gold" },
                                                { symbol: "OANDA:XAGUSD", name: "Silver" },
                                                { symbol: "BITSTAMP:BTCUSD", name: "Bitcoin" },
                                                { symbol: "BITSTAMP:ETHUSD", name: "Ethereum" },
                                                { symbol: "BINANCE:SUIUSDT", name: "SUI" }
                                            ].map(item => (
                                                <Button
                                                    key={item.symbol}
                                                    variant={selectedChart === item.symbol ? "default" : "outline"}
                                                    size="sm"
                                                    onClick={() => {
                                                        setSelectedChart(item.symbol);
                                                        setTimeout(() => {
                                                            if (chartContainerRef.current) {
                                                                const yOffset = -100;
                                                                const y = chartContainerRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                                                window.scrollTo({ top: y, behavior: 'smooth' });
                                                            }
                                                        }, 100);
                                                    }}
                                                    className={selectedChart === item.symbol
                                                        ? "bg-blue-600 text-white"
                                                        : "bg-white hover:bg-blue-50 border-blue-200 text-blue-700"}
                                                >
                                                    {item.name}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>
                                    <StockAnalysisSection
                                        symbol={selectedChart}
                                        activeScreener={activeScreener}
                                        financialDataMap={financialDataMap}
                                    />
                                </div>
                            ) : activeScreener === "japan" ? (
                                <div key="market-quotes">
                                    {/* クイックチャートアクセス - 最初に表示 */}
                                    <div ref={chartContainerRef} className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
                                        <div className="flex flex-wrap gap-2">
                                            {[
                                                { symbol: "INDEX:NKY", name: "日経225" },
                                                { symbol: "7203", name: "トヨタ" },
                                                { symbol: "NYSE:SONY", name: "ソニーG" },
                                                { symbol: "9984", name: "ソフトバンクG" },
                                                { symbol: "7974", name: "任天堂" },
                                                { symbol: "6861", name: "キーエンス" },
                                                { symbol: "1942", name: "関電工" },
                                                { symbol: "TSE:9983", name: "ファストリ" },
                                                { symbol: "TSE:8306", name: "三菱UFJ" },
                                                { symbol: "TSE:8035", name: "東京エレク" },
                                                { symbol: "TSE:9432", name: "NTT" },
                                                { symbol: "TSE:8316", name: "三井住友FG" },
                                                { symbol: "TSE:6501", name: "日立製作所" },
                                                { symbol: "TSE:8001", name: "伊藤忠商事" },
                                                { symbol: "7409", name: "AeroEdge" }
                                            ].map(item => (
                                                <Button
                                                    key={item.symbol}
                                                    variant={selectedChart === item.symbol ? "default" : "outline"}
                                                    size="sm"
                                                    onClick={() => {
                                                        setSelectedChart(item.symbol);
                                                        setTimeout(() => {
                                                            if (chartContainerRef.current) {
                                                                const yOffset = -100; // ティッカーテープの高さ分の余白
                                                                const y = chartContainerRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                                                window.scrollTo({ top: y, behavior: 'smooth' });
                                                            }
                                                        }, 100);
                                                    }}
                                                    className={selectedChart === item.symbol
                                                        ? "bg-blue-600 text-white"
                                                        : "bg-white hover:bg-blue-50 border-blue-200 text-blue-700"}
                                                >
                                                    {item.name}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>



                                    {/* 銘柄分析・財務データセクション（統合） */}
                                    <StockAnalysisSection
                                        symbol={selectedChart}
                                        activeScreener={activeScreener}
                                        financialDataMap={financialDataMap}
                                    />

                                    {/* 一覧を見る - アコーディオン */}
                                    <div className="border-t">
                                        <button
                                            onClick={() => setShowList(!showList)}
                                            className="w-full bg-slate-50 hover:bg-slate-100 p-3 flex items-center justify-between transition-colors"
                                        >
                                            <span className="font-bold text-slate-700 flex items-center gap-2">
                                                <List className="w-4 h-4" />
                                                一覧を見る
                                            </span>
                                            {showList ? (
                                                <ChevronUp className="w-5 h-5 text-slate-500" />
                                            ) : (
                                                <ChevronDown className="w-5 h-5 text-slate-500" />
                                            )}
                                        </button>
                                        {showList && (
                                            <div style={{ height: "500px" }}>
                                                <TradingViewWidgetIframe
                                                    key="market-quotes-widget"
                                                    title="Market Summary"
                                                    scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js"
                                                    config={{
                                                        colorTheme: "light",
                                                        locale: "ja",
                                                        largeChartUrl: "",
                                                        isTransparent: false,
                                                        showSymbolLogo: true,
                                                        backgroundColor: "#ffffff",
                                                        width: "100%",
                                                        height: "100%",
                                                        symbolsGroups: [
                                                            {
                                                                name: "Indices",
                                                                symbols: [
                                                                    { name: "FOREXCOM:SPXUSD", displayName: "S&P 500 Index" },
                                                                    { name: "FOREXCOM:NSXUSD", displayName: "US 100 Cash CFD" },
                                                                    { name: "FOREXCOM:DJI", displayName: "Dow Jones Industrial Average Index" },
                                                                    { name: "INDEX:NKY", displayName: "Japan 225" },
                                                                    { name: "INDEX:DEU40", displayName: "DAX Index" },
                                                                    { name: "FOREXCOM:UKXGBP", displayName: "FTSE 100 Index" }
                                                                ]
                                                            },
                                                            {
                                                                name: "Futures",
                                                                symbols: [
                                                                    { name: "BMFBOVESPA:ISP1!", displayName: "S&P 500" },
                                                                    { name: "BMFBOVESPA:EUR1!", displayName: "Euro" },
                                                                    { name: "CMCMARKETS:GOLD", displayName: "Gold" },
                                                                    { name: "PYTH:WTI3!", displayName: "WTI Crude Oil" },
                                                                    { name: "BMFBOVESPA:CCM1!", displayName: "Corn" }
                                                                ]
                                                            },
                                                            {
                                                                name: "Bonds",
                                                                symbols: [
                                                                    { name: "EUREX:FGBL1!", displayName: "Euro Bund" },
                                                                    { name: "EUREX:FBTP1!", displayName: "Euro BTP" },
                                                                    { name: "EUREX:FGBM1!", displayName: "Euro BOBL" }
                                                                ]
                                                            },
                                                            {
                                                                name: "Forex",
                                                                symbols: [
                                                                    { name: "FX:EURUSD", displayName: "EUR to USD" },
                                                                    { name: "FX:GBPUSD", displayName: "GBP to USD" },
                                                                    { name: "FX:USDJPY", displayName: "USD to JPY" },
                                                                    { name: "FX:USDCHF", displayName: "USD to CHF" },
                                                                    { name: "FX:AUDUSD", displayName: "AUD to USD" },
                                                                    { name: "FX:USDCAD", displayName: "USD to CAD" }
                                                                ]
                                                            },
                                                            {
                                                                name: "日経225採用銘柄",
                                                                symbols: nikkei225Stocks.slice(0, 10).map(s => ({
                                                                    name: `TSE:${s.symbol}`,
                                                                    displayName: s.name
                                                                }))
                                                            }
                                                        ]
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : activeScreener === "us" ? (
                                <div key="us-screener">
                                    {/* クイックチャートアクセス - 米国株 */}
                                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4">
                                        <div className="flex flex-wrap gap-2">
                                            {[
                                                // テック株
                                                { symbol: "NASDAQ:AAPL", name: "Apple" },
                                                { symbol: "NASDAQ:MSFT", name: "Microsoft" },
                                                { symbol: "NASDAQ:GOOGL", name: "Google" },
                                                { symbol: "NASDAQ:AMZN", name: "Amazon" },
                                                { symbol: "NASDAQ:META", name: "Meta" },
                                                { symbol: "NASDAQ:NVDA", name: "NVIDIA" },
                                                { symbol: "NASDAQ:TSLA", name: "Tesla" },
                                                // 半導体
                                                { symbol: "NASDAQ:AMD", name: "AMD" },
                                                { symbol: "NASDAQ:INTC", name: "Intel" },
                                                { symbol: "NASDAQ:AVGO", name: "Broadcom" },
                                                { symbol: "NASDAQ:QCOM", name: "Qualcomm" },
                                                { symbol: "NYSE:TSM", name: "TSMC" }
                                            ].map(item => (
                                                <Button
                                                    key={item.symbol}
                                                    variant={selectedChart === item.symbol ? "default" : "outline"}
                                                    size="sm"
                                                    onClick={() => {
                                                        setSelectedChart(item.symbol);
                                                        setTimeout(() => {
                                                            if (chartContainerRef.current) {
                                                                const yOffset = -100;
                                                                const y = chartContainerRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                                                window.scrollTo({ top: y, behavior: 'smooth' });
                                                            }
                                                        }, 100);
                                                    }}
                                                    className={selectedChart === item.symbol
                                                        ? "bg-green-600 text-white"
                                                        : "bg-white hover:bg-green-50 border-green-200 text-green-700"}
                                                >
                                                    {item.name}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>



                                    {/* 銘柄分析・財務データセクション（統合） */}
                                    <StockAnalysisSection
                                        symbol={selectedChart}
                                        activeScreener={activeScreener}
                                        financialDataMap={financialDataMap}
                                    />

                                    {/* 一覧 */}
                                    <div className="border-t" style={{ height: "500px" }}>
                                        <TradingViewWidgetIframe
                                            key="us-widget"
                                            title="US Stock List"
                                            scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js"
                                            config={{
                                                colorTheme: "light",
                                                locale: "ja",
                                                largeChartUrl: "",
                                                isTransparent: false,
                                                showSymbolLogo: true,
                                                backgroundColor: "#ffffff",
                                                width: "100%",
                                                height: "100%",
                                                symbolsGroups: [
                                                    {
                                                        name: "テック株",
                                                        symbols: [
                                                            { name: "NASDAQ:AAPL", displayName: "Apple" },
                                                            { name: "NASDAQ:MSFT", displayName: "Microsoft" },
                                                            { name: "NASDAQ:GOOGL", displayName: "Google" },
                                                            { name: "NASDAQ:AMZN", displayName: "Amazon" },
                                                            { name: "NASDAQ:META", displayName: "Meta" },
                                                            { name: "NASDAQ:NVDA", displayName: "NVIDIA" },
                                                            { name: "NASDAQ:TSLA", displayName: "Tesla" }
                                                        ]
                                                    },
                                                    {
                                                        name: "半導体",
                                                        symbols: [
                                                            { name: "NASDAQ:AMD", displayName: "AMD" },
                                                            { name: "NASDAQ:INTC", displayName: "Intel" },
                                                            { name: "NASDAQ:AVGO", displayName: "Broadcom" },
                                                            { name: "NASDAQ:QCOM", displayName: "Qualcomm" },
                                                            { name: "NYSE:TSM", displayName: "TSMC" }
                                                        ]
                                                    },
                                                    {
                                                        name: "金融",
                                                        symbols: [
                                                            { name: "NYSE:JPM", displayName: "JPMorgan" },
                                                            { name: "NYSE:BAC", displayName: "Bank of America" },
                                                            { name: "NYSE:GS", displayName: "Goldman Sachs" },
                                                            { name: "NYSE:V", displayName: "Visa" },
                                                            { name: "NYSE:MA", displayName: "Mastercard" }
                                                        ]
                                                    },
                                                    {
                                                        name: "ヘルスケア",
                                                        symbols: [
                                                            { name: "NYSE:JNJ", displayName: "Johnson & Johnson" },
                                                            { name: "NYSE:UNH", displayName: "UnitedHealth" },
                                                            { name: "NYSE:PFE", displayName: "Pfizer" },
                                                            { name: "NYSE:LLY", displayName: "Eli Lilly" },
                                                            { name: "NYSE:MRK", displayName: "Merck" }
                                                        ]
                                                    },
                                                    {
                                                        name: "S&P 500採用銘柄",
                                                        symbols: sp500Stocks.slice(0, 10).map(s => ({
                                                            name: s.symbol,
                                                            displayName: s.name
                                                        }))
                                                    }
                                                ]
                                            }}
                                        />
                                    </div>
                                </div>
                            ) : activeScreener === "crypto" ? (
                                <div key="crypto-screener" style={{ height: "800px" }}>
                                    <TradingViewWidgetIframe
                                        key="crypto-widget"
                                        title="Crypto Screener"
                                        scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-screener.js"
                                        config={{
                                            width: "100%",
                                            height: "100%",
                                            defaultColumn: "overview",
                                            screener_type: "crypto_mkt",
                                            displayCurrency: "USD",
                                            showToolbar: true,
                                            colorTheme: "light",
                                            locale: "ja"
                                        }}
                                    />
                                </div>
                            ) : activeScreener === "promising" ? (
                                <div key="promising-stocks" className="pb-8">
                                    {/* テンバガー候補 10選 グリッド */}
                                    <div className="bg-gradient-to-br from-indigo-50 to-blue-100 p-4">
                                        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-6">
                                            {promisingStocks2026.map((stock) => (
                                                <Card
                                                    key={stock.symbol}
                                                    className={`cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] border ${selectedChart === stock.symbol ? 'border-blue-500 bg-blue-50' : 'border-transparent bg-white shadow-sm'}`}
                                                    onClick={() => {
                                                        setSelectedChart(stock.symbol);
                                                        setTimeout(() => {
                                                            if (chartContainerRef.current) {
                                                                const yOffset = -100;
                                                                const y = chartContainerRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                                                window.scrollTo({ top: y, behavior: 'smooth' });
                                                            }
                                                        }, 100);
                                                    }}
                                                >
                                                    <CardContent className="p-3">
                                                        <div className="flex justify-between items-center mb-1">
                                                            <div className="text-[10px] font-bold text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded">{stock.theme}</div>
                                                            <div className="text-[10px] text-slate-500 font-bold font-mono">{stock.symbol}</div>
                                                        </div>
                                                        <div className="text-base font-bold text-slate-800 leading-tight mb-1.5">{stock.name}</div>
                                                        <div className="text-[10px] text-slate-600 leading-snug line-clamp-2">
                                                            {stock.description}
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>

                                        <div ref={chartContainerRef} className="scroll-mt-24">
                                            <StockAnalysisSection
                                                symbol={selectedChart}
                                                activeScreener={activeScreener}
                                                financialDataMap={financialDataMap}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : activeScreener === "forex" ? (
                                <div key="forex-screener" style={{ height: "800px" }}>
                                    <TradingViewWidgetIframe
                                        key="forex-market-quotes"
                                        title="Forex Rates"
                                        scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js"
                                        config={{
                                            width: "100%",
                                            height: "100%",
                                            symbolsGroups: [
                                                {
                                                    name: "Major Pairs",
                                                    symbols: [
                                                        { name: "FX:USDJPY", displayName: "USD/JPY" },
                                                        { name: "FX:EURUSD", displayName: "EUR/USD" },
                                                        { name: "FX:GBPUSD", displayName: "GBP/USD" },
                                                        { name: "FX:AUDUSD", displayName: "AUD/USD" },
                                                        { name: "FX:USDCAD", displayName: "USD/CAD" },
                                                        { name: "FX:USDCHF", displayName: "USD/CHF" }
                                                    ]
                                                },
                                                {
                                                    name: "Yen Crosses",
                                                    symbols: [
                                                        { name: "FX:EURJPY", displayName: "EUR/JPY" },
                                                        { name: "FX:GBPJPY", displayName: "GBP/JPY" },
                                                        { name: "FX:AUDJPY", displayName: "AUD/JPY" },
                                                        { name: "FX:NZDJPY", displayName: "NZD/JPY" },
                                                        { name: "FX:CADJPY", displayName: "CAD/JPY" },
                                                        { name: "FX:CHFJPY", displayName: "CHF/JPY" }
                                                    ]
                                                },
                                                {
                                                    name: "Others",
                                                    symbols: [
                                                        { name: "FX:EURGBP", displayName: "EUR/GBP" },
                                                        { name: "FX:NZDUSD", displayName: "NZD/USD" },
                                                        { name: "FX:USDCNH", displayName: "USD/CNH" },
                                                        { name: "FX:USDMXN", displayName: "USD/MXN" }
                                                    ]
                                                }
                                            ],
                                            showSymbolLogo: true,
                                            isTransparent: false,
                                            colorTheme: "light",
                                            locale: "ja"
                                        }}
                                    />
                                </div>
                            ) : null}
                        </div>
                    </CardContent>
                </Card>

                {/* ヒートマップセクション */}
                <Card className="mb-6 border-2 border-emerald-200 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                        <CardTitle className="flex items-center gap-3">
                            <BarChart2 className="w-5 h-5" />
                            マーケットヒートマップ
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="bg-slate-100 p-3 text-sm text-slate-600 border-b flex justify-between items-center">
                            <span>セクター別の値動きを視覚化 - サイズは時価総額、色は変化率を表示</span>
                            <div className="flex gap-2">
                                <Button
                                    variant={heatmapSource === "SPX500" ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setHeatmapSource("SPX500")}
                                    className={heatmapSource === "SPX500" ? "bg-emerald-600 text-white" : "text-emerald-700 border-emerald-200 bg-white"}
                                >
                                    S&P 500
                                </Button>

                            </div>
                        </div>
                        <div style={{ height: "600px" }}>
                            <TradingViewWidgetIframe
                                key={`heatmap-${heatmapSource}`} // Force re-render on tab change
                                title="Heatmap"
                                scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js"
                                config={{
                                    dataSource: heatmapSource,
                                    grouping: "sector",
                                    blockSize: "market_cap_basic",
                                    blockColor: "change",
                                    locale: "ja",
                                    colorTheme: "light",
                                    width: "100%",
                                    height: "100%"
                                }}
                            />
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div >
    );
};

export default StockScreener;
