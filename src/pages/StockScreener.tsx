import { VisualIncomeStatement, IncomeStatementData } from "@/components/financial/VisualIncomeStatement";
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
    const [financialTab, setFinancialTab] = useState<"overview" | "chart">("chart");
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
        "7203": { // トヨタ自動車
            currency: "JPY",
            revenue: [
                { quarter: "23年1Q", value: 10.5 }, { quarter: "23年2Q", value: 11.4 },
                { quarter: "23年3Q", value: 12.0 }, { quarter: "23年4Q", value: 11.1 },
                { quarter: "24年1Q", value: 11.8 }, { quarter: "24年2Q", value: 12.0 },
                { quarter: "24年3Q", value: 12.6 }, { quarter: "24年4Q", value: 11.5 },
                { quarter: "25年1Q", value: 12.2 }, { quarter: "25年2Q", value: 12.8 }
            ],
            profit: [
                { quarter: "23年1Q", operating: 1.1, net: 1.3 }, { quarter: "23年2Q", operating: 1.4, net: 1.2 },
                { quarter: "23年3Q", operating: 1.6, net: 1.3 }, { quarter: "23年4Q", operating: 1.1, net: 1.0 },
                { quarter: "24年1Q", operating: 1.3, net: 1.3 }, { quarter: "24年2Q", operating: 1.4, net: 1.2 },
                { quarter: "24年3Q", operating: 1.6, net: 1.3 }, { quarter: "24年4Q", operating: 1.1, net: 0.9 },
                { quarter: "25年1Q", operating: 1.1, net: 0.8 }, { quarter: "25年2Q", operating: 1.3, net: 1.0 }
            ],
            segments: [
                { name: "自動車", value: 90, color: "#3b82f6" },
                { name: "金融", value: 7, color: "#10b981" },
                { name: "その他", value: 3, color: "#f59e0b" }
            ],
            metrics: [
                { name: "PER（株価収益率）", value: "10.11倍" }, { name: "PBR（株価純資産倍率）", value: "1.25倍" },
                { name: "ROE（自己資本利益率）", value: "12.89%" }, { name: "PSR（株価売上高倍率）", value: "0.95倍" }
            ],
            incomeStatement: {
                revenue: 493900, // TTM 49.39T
                costOfGoodsSold: 405100, // 493900 - 88800
                grossProfit: 88800, // 8.88T
                sellingGeneralAdmin: 45400, // 88800 - 43400
                operatingIncome: 43400, // 4.34T
                nonOperatingIncome: 12200, // 55600 - 43400 (Estimated from margin)
                ordinaryIncome: 55600, // 493900 * 0.1126
                specialIncome: 0,
                preTaxIncome: 55600,
                incomeTax: 9300, // 55600 - 46300
                netIncome: 46300 // 4.63T
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
        "NYSE:SONY": { // ソニーグループ (円ベース)
            currency: "JPY",
            revenue: [
                { quarter: "23年1Q", value: 2.9 }, { quarter: "23年2Q", value: 2.8 },
                { quarter: "23年3Q", value: 3.7 }, { quarter: "23年4Q", value: 3.5 },
                { quarter: "24年1Q", value: 3.0 }, { quarter: "24年2Q", value: 2.9 },
                { quarter: "24年3Q", value: 3.2 }, { quarter: "24年4Q", value: 2.8 },
                { quarter: "25年1Q", value: 3.0 }, { quarter: "25年2Q", value: 3.1 }
            ],
            profit: [
                { quarter: "23年1Q", operating: 0.25, net: 0.21 }, { quarter: "23年2Q", operating: 0.26, net: 0.20 },
                { quarter: "23年3Q", operating: 0.46, net: 0.36 }, { quarter: "23年4Q", operating: 0.23, net: 0.19 },
                { quarter: "24年1Q", operating: 0.27, net: 0.23 }, { quarter: "24年2Q", operating: 0.34, net: 0.29 },
                { quarter: "24年3Q", operating: 0.45, net: 0.37 }, { quarter: "24年4Q", operating: 0.22, net: 0.18 },
                { quarter: "25年1Q", operating: 0.28, net: 0.25 }, { quarter: "25年2Q", operating: 0.42, net: 0.34 }
            ],
            segments: [
                { name: "G&NS(ゲーム)", value: 30, color: "#3b82f6" },
                { name: "音楽・映画", value: 25, color: "#ef4444" },
                { name: "ET&S(エレキ)", value: 20, color: "#10b981" },
                { name: "I&SS(半導体)", value: 15, color: "#f59e0b" },
                { name: "金融", value: 10, color: "#8b5cf6" }
            ],
            metrics: [
                { name: "PER（株価収益率）", value: "17.69倍" }, { name: "PBR（株価純資産倍率）", value: "2.64倍" },
                { name: "ROE（自己資本利益率）", value: "14.45%" }, { name: "PSR（株価売上高倍率）", value: "1.62倍" }
            ],
            incomeStatement: {
                revenue: 131530, // Updated TTM 13.153T (85.41B USD * 154)
                costOfGoodsSold: 93200, // 131530 - 38330 (Gross Profit)
                grossProfit: 38330, // 24.89B USD * 154
                sellingGeneralAdmin: 23150, // 38330 - 15180 (Operating Income)
                operatingIncome: 15180, // 9.86B USD * 154
                nonOperatingIncome: 300,
                ordinaryIncome: 15480,
                specialIncome: 0,
                preTaxIncome: 15480,
                incomeTax: 3410,
                netIncome: 12070 // 7.84B USD * 154
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
            }
        },
        "9984": { // ソフトバンクグループ
            currency: "JPY",
            revenue: [
                { quarter: "23年1Q", value: 1.5 }, { quarter: "23年2Q", value: 1.6 },
                { quarter: "23年3Q", value: 1.7 }, { quarter: "23年4Q", value: 1.7 },
                { quarter: "24年1Q", value: 1.6 }, { quarter: "24年2Q", value: 1.7 },
                { quarter: "24年3Q", value: 1.8 }, { quarter: "24年4Q", value: 1.8 }
            ],
            profit: [
                { quarter: "23年1Q", operating: -0.1, net: -0.5 }, { quarter: "23年2Q", operating: 0.1, net: -0.9 },
                { quarter: "23年3Q", operating: 0.0, net: 0.9 }, { quarter: "23年4Q", operating: -0.2, net: 0.2 },
                { quarter: "24年1Q", operating: 0.1, net: 0.0 }, { quarter: "24年2Q", operating: 0.3, net: 1.0 },
                { quarter: "24年3Q", operating: 0.5, net: 1.2 }, { quarter: "24年4Q", operating: 0.2, net: 0.4 }
            ],
            segments: [
                { name: "SVF(投資)", value: 50, color: "#ef4444" },
                { name: "ソフトバンク", value: 30, color: "#3b82f6" },
                { name: "Arm", value: 15, color: "#10b981" },
                { name: "その他", value: 5, color: "#f59e0b" }
            ],
            metrics: [
                { name: "PER（株価収益率）", value: "8.10倍" }, { name: "PBR（株価純資産倍率）", value: "1.75倍" },
                { name: "ROE（自己資本利益率）", value: "24.78%" }, { name: "PSR（株価売上高倍率）", value: "3.29倍" }
            ],
            incomeStatement: {
                revenue: 75100, // TTM 7.51T
                costOfGoodsSold: 36500, // 75100 - 38600
                grossProfit: 38600, // 3.86T
                sellingGeneralAdmin: 32049, // 38600 - 6551
                operatingIncome: 6551, // 655.10B
                nonOperatingIncome: 32914, // 39465 - 6551
                ordinaryIncome: 39465, // 75100 * 0.5255
                specialIncome: 0,
                preTaxIncome: 39465,
                incomeTax: 8965, // 39465 - 30500
                netIncome: 30500 // 3.05T
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
        "6861": { // キーエンス
            currency: "JPY",
            revenue: [
                { quarter: "23年1Q", value: 0.23 }, { quarter: "23年2Q", value: 0.25 },
                { quarter: "23年3Q", value: 0.26 }, { quarter: "23年4Q", value: 0.24 },
                { quarter: "24年1Q", value: 0.25 }, { quarter: "24年2Q", value: 0.27 },
                { quarter: "24年3Q", value: 0.26 }, { quarter: "24年4Q", value: 0.25 },
                { quarter: "25年1Q", value: 0.28 }, { quarter: "25年2Q", value: 0.29 }
            ],
            profit: [
                { quarter: "23年1Q", operating: 0.11, net: 0.08 }, { quarter: "23年2Q", operating: 0.13, net: 0.09 },
                { quarter: "23年3Q", operating: 0.13, net: 0.10 }, { quarter: "23年4Q", operating: 0.12, net: 0.09 },
                { quarter: "24年1Q", operating: 0.13, net: 0.09 }, { quarter: "24年2Q", operating: 0.14, net: 0.10 },
                { quarter: "24年3Q", operating: 0.13, net: 0.10 }, { quarter: "24年4Q", operating: 0.12, net: 0.09 },
                { quarter: "25年1Q", operating: 0.14, net: 0.11 }, { quarter: "25年2Q", operating: 0.15, net: 0.12 }
            ],
            segments: [
                { name: "センサー", value: 70, color: "#3b82f6" },
                { name: "測定器", value: 20, color: "#10b981" },
                { name: "その他", value: 10, color: "#f59e0b" }
            ],
            metrics: [
                { name: "PER（株価収益率）", value: "35.18倍" }, { name: "PBR（株価純資産倍率）", value: "4.39倍" },
                { name: "ROE（自己資本利益率）", value: "13.14%" }, { name: "PSR（株価売上高倍率）", value: "13.21倍" }
            ],
            incomeStatement: {
                revenue: 10900, // TTM 1.09T
                costOfGoodsSold: 1847, // 10900 - 9053
                grossProfit: 9053, // 905.33B
                sellingGeneralAdmin: 3473, // 9053 - 5580
                operatingIncome: 5580, // 557.99B
                nonOperatingIncome: 228, // 5808 - 5580
                ordinaryIncome: 5808, // 10900 * 0.5329
                specialIncome: 0,
                preTaxIncome: 5808,
                incomeTax: 1719, // 5808 - 4089
                netIncome: 4089 // 408.89B
            },
            balanceSheet: {
                totalAssets: 34500, // 3.45T
                totalLiabilities: 1718, // 171.79B
                totalEquity: 32800, // 3.28T
                totalDebt: 0
            }
        },
        "7974": { // 任天堂
            currency: "JPY",
            revenue: [
                { quarter: "23年1Q", value: 0.30 }, { quarter: "23年2Q", value: 0.35 },
                { quarter: "23年3Q", value: 0.60 }, { quarter: "23年4Q", value: 0.35 },
                { quarter: "24年1Q", value: 0.45 }, { quarter: "24年2Q", value: 0.33 },
                { quarter: "24年3Q", value: 0.58 }, { quarter: "24年4Q", value: 0.30 },
                { quarter: "25年1Q", value: 0.25 }, { quarter: "25年2Q", value: 0.28 }
            ],
            profit: [
                { quarter: "23年1Q", operating: 0.10, net: 0.11 }, { quarter: "23年2Q", operating: 0.11, net: 0.09 },
                { quarter: "23年3Q", operating: 0.19, net: 0.13 }, { quarter: "23年4Q", operating: 0.08, net: 0.07 },
                { quarter: "24年1Q", operating: 0.18, net: 0.18 }, { quarter: "24年2Q", operating: 0.10, net: 0.08 },
                { quarter: "24年3Q", operating: 0.20, net: 0.15 }, { quarter: "24年4Q", operating: 0.06, net: 0.05 },
                { quarter: "25年1Q", operating: 0.05, net: 0.08 }, { quarter: "25年2Q", operating: 0.07, net: 0.06 }
            ],
            segments: [
                { name: "ゲーム専用機", value: 95, color: "#ef4444" },
                { name: "モバイル・IP", value: 4, color: "#3b82f6" },
                { name: "トランプ他", value: 1, color: "#10b981" }
            ],
            metrics: [
                { name: "PER（株価収益率）", value: "31.39倍" }, { name: "PBR（株価純資産倍率）", value: "4.11倍" },
                { name: "ROE（自己資本利益率）", value: "13.78%" }, { name: "PSR（株価売上高倍率）", value: "6.65倍" }
            ],
            incomeStatement: {
                revenue: 17400, // TTM 1.74T
                costOfGoodsSold: 9493, // 17400 - 7907
                grossProfit: 7907, // 790.7B
                sellingGeneralAdmin: 4845, // 7907 - 3062
                operatingIncome: 3062, // 306.2B
                nonOperatingIncome: 1869, // 4931 - 3062
                ordinaryIncome: 4931, // 17400 * 0.2834 (Estimated from pre-tax margin)
                specialIncome: 0,
                preTaxIncome: 4931,
                incomeTax: 1240, // 4931 - 3691
                netIncome: 3691 // 369.1B
            },
            balanceSheet: {
                totalAssets: 36400, // 3.64T
                totalLiabilities: 8178, // 817.79B
                totalEquity: 28200, // 2.82T
                totalDebt: 513 // 51.31B
            }
        },
        "9983": { // ファーストリテイリング
            currency: "JPY",
            revenue: [
                { quarter: "23年1Q", value: 0.81 }, { quarter: "23年2Q", value: 0.76 },
                { quarter: "23年3Q", value: 0.75 }, { quarter: "23年4Q", value: 0.72 },
                { quarter: "24年1Q", value: 0.90 }, { quarter: "24年2Q", value: 0.82 },
                { quarter: "24年3Q", value: 0.85 }, { quarter: "24年4Q", value: 0.80 },
                { quarter: "25年1Q", value: 1.02 }, { quarter: "25年2Q", value: 0.95 }
            ],
            profit: [
                { quarter: "23年1Q", operating: 0.11, net: 0.08 }, { quarter: "23年2Q", operating: 0.10, net: 0.07 },
                { quarter: "23年3Q", operating: 0.11, net: 0.08 }, { quarter: "23年4Q", operating: 0.09, net: 0.06 },
                { quarter: "24年1Q", operating: 0.14, net: 0.10 }, { quarter: "24年2Q", operating: 0.12, net: 0.09 },
                { quarter: "24年3Q", operating: 0.13, net: 0.10 }, { quarter: "24年4Q", operating: 0.11, net: 0.08 },
                { quarter: "25年1Q", operating: 0.16, net: 0.12 }, { quarter: "25年2Q", operating: 0.14, net: 0.11 }
            ],
            segments: [
                { name: "海外ユニクロ", value: 55, color: "#3b82f6" },
                { name: "国内ユニクロ", value: 30, color: "#ef4444" },
                { name: "ジーユー", value: 10, color: "#10b981" },
                { name: "Global Brands", value: 5, color: "#f59e0b" }
            ],
            metrics: [
                { name: "PER（株価収益率）", value: "41.69倍" }, { name: "PBR（株価純資産倍率）", value: "7.46倍" },
                { name: "ROE（自己資本利益率）", value: "19.32%" }, { name: "PSR（株価売上高倍率）", value: "5.29倍" }
            ],
            incomeStatement: {
                revenue: 35300, // TTM 3.53T
                costOfGoodsSold: 18400, // 35300 - 16900
                grossProfit: 16900, // 1.69T
                sellingGeneralAdmin: 10902, // 16900 - 5998
                operatingIncome: 5998, // 599.81B
                nonOperatingIncome: 787, // 6785 - 5998
                ordinaryIncome: 6785, // 35300 * 0.1922
                specialIncome: 0,
                preTaxIncome: 6785,
                incomeTax: 2300, // 6785 - 4485
                netIncome: 4485 // 448.49B
            },
            balanceSheet: {
                totalAssets: 42900, // 4.29T
                totalLiabilities: 17200, // 1.72T
                totalEquity: 25700, // 2.57T
                totalDebt: 6904 // 690.41B
            },
            cashFlow: {
                operatingCashFlow: 6847, // 684.72B
                investingCashFlow: -6598, // -659.83B
                financingCashFlow: -3506, // -350.62B
                freeCashFlow: 5308 // 530.81B
            }
        },
        "7409": { // AeroEdge
            currency: "JPY",
            priceHistory: generateMockHistory(570, 3455),
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
        "8306": { // 三菱UFJフィナンシャル・グループ
            currency: "JPY",
            revenue: [
                { quarter: "23年1Q", value: 2.1 }, { quarter: "23年2Q", value: 2.3 },
                { quarter: "23年3Q", value: 2.4 }, { quarter: "23年4Q", value: 2.2 },
                { quarter: "24年1Q", value: 2.6 }, { quarter: "24年2Q", value: 2.8 },
                { quarter: "24年3Q", value: 2.9 }, { quarter: "24年4Q", value: 2.7 },
                { quarter: "25年1Q", value: 3.0 }, { quarter: "25年2Q", value: 3.1 }
            ],
            profit: [
                { quarter: "23年1Q", operating: 0.3, net: 0.3 }, { quarter: "23年2Q", operating: 0.4, net: 0.4 },
                { quarter: "23年3Q", operating: 0.35, net: 0.35 }, { quarter: "23年4Q", operating: 0.3, net: 0.25 },
                { quarter: "24年1Q", operating: 0.5, net: 0.45 }, { quarter: "24年2Q", operating: 0.6, net: 0.5 },
                { quarter: "24年3Q", operating: 0.65, net: 0.55 }, { quarter: "24年4Q", operating: 0.5, net: 0.4 },
                { quarter: "25年1Q", operating: 0.7, net: 0.6 }, { quarter: "25年2Q", operating: 0.8, net: 0.7 }
            ],
            segments: [
                { name: "デジタルサービス", value: 35, color: "#ef4444" },
                { name: "法人・リテール", value: 30, color: "#3b82f6" },
                { name: "市場事業", value: 20, color: "#10b981" },
                { name: "海外銀行", value: 15, color: "#f59e0b" }
            ],
            metrics: [
                { name: "PER（株価収益率）", value: "17.09倍" }, { name: "PBR（株価純資産倍率）", value: "1.54倍" },
                { name: "ROE（自己資本利益率）", value: "9.18%" }, { name: "PSR（株価売上高倍率）", value: "2.66倍" }
            ],
            incomeStatement: {
                revenue: 121100, // TTM 12.11T
                costOfGoodsSold: 36330, // 121100 - 84770
                grossProfit: 84770, // 0.7 * 121100 (Estimated)
                sellingGeneralAdmin: 67770, // 84770 - 17000
                operatingIncome: 17000, // 1.70T
                nonOperatingIncome: 8806, // 25806 - 17000
                ordinaryIncome: 25806, // 121100 * 0.2131
                specialIncome: 0,
                preTaxIncome: 25806,
                incomeTax: 6806, // 25806 - 19000
                netIncome: 19000 // 1.90T
            },
            balanceSheet: {
                totalAssets: 4043200, // 404.32T
                totalLiabilities: 3820800, // 382.08T
                totalEquity: 222400, // 22.24T
                totalDebt: 826100 // 82.61T
            }
        },
        "8035": { // 東京エレクトロン
            currency: "JPY",
            revenue: [
                { quarter: "23年1Q", value: 0.4 }, { quarter: "23年2Q", value: 0.45 },
                { quarter: "23年3Q", value: 0.5 }, { quarter: "23年4Q", value: 0.48 },
                { quarter: "24年1Q", value: 0.55 }, { quarter: "24年2Q", value: 0.6 },
                { quarter: "24年3Q", value: 0.65 }, { quarter: "24年4Q", value: 0.62 },
                { quarter: "25年1Q", value: 0.7 }, { quarter: "25年2Q", value: 0.75 }
            ],
            profit: [
                { quarter: "23年1Q", operating: 0.1, net: 0.08 }, { quarter: "23年2Q", operating: 0.12, net: 0.09 },
                { quarter: "23年3Q", operating: 0.15, net: 0.11 }, { quarter: "23年4Q", operating: 0.13, net: 0.1 },
                { quarter: "24年1Q", operating: 0.18, net: 0.13 }, { quarter: "24年2Q", operating: 0.2, net: 0.15 },
                { quarter: "24年3Q", operating: 0.22, net: 0.16 }, { quarter: "24年4Q", operating: 0.2, net: 0.15 },
                { quarter: "25年1Q", operating: 0.25, net: 0.19 }, { quarter: "25年2Q", operating: 0.28, net: 0.21 }
            ],
            segments: [
                { name: "半導体製造装置", value: 95, color: "#3b82f6" },
                { name: "FPD製造装置", value: 5, color: "#10b981" }
            ],
            metrics: [
                { name: "PER（株価収益率）", value: "36.09倍" }, { name: "PBR（株価純資産倍率）", value: "9.72倍" },
                { name: "ROE（自己資本利益率）", value: "28.50%" }, { name: "PSR（株価売上高倍率）", value: "7.85倍" }
            ],
            incomeStatement: {
                revenue: 24900, // TTM 2.49T
                costOfGoodsSold: 13300, // 24900 - 11600
                grossProfit: 11600, // 1.16T
                sellingGeneralAdmin: 4734, // 11600 - 6866
                operatingIncome: 6866, // 686.57B
                nonOperatingIncome: 118, // 6984 - 6866
                ordinaryIncome: 6984, // 24900 * 0.2805
                specialIncome: 0,
                preTaxIncome: 6984,
                incomeTax: 1565, // 6984 - 5419
                netIncome: 5419 // 541.86B
            },
            balanceSheet: {
                totalAssets: 26700, // 2.67T
                totalLiabilities: 6624, // 662.38B
                totalEquity: 20000, // 2.00T
                totalDebt: 406 // 40.63B
            },
            cashFlow: {
                operatingCashFlow: 5006, // 500.59B
                investingCashFlow: -2188, // -218.78B
                financingCashFlow: -3459, // -345.89B
                freeCashFlow: 2818 // OpCF + InvCF
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
            balanceSheet: {
                totalAssets: 3059100, // 305.91T
                totalLiabilities: 2906000, // 290.60T
                totalEquity: 153000, // 15.30T
                totalDebt: 614200 // 61.42T
            }
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
            }
        },
        "8001": { // 伊藤忠商事
            currency: "JPY",
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
        "5805": {
            currency: "JPY_Oku",
            priceHistory: generateMockHistory(9000, 11460),
            revenue: [
                { quarter: "23.3", value: 580 }, { quarter: "23.6", value: 600 },
                { quarter: "23.9", value: 610 }, { quarter: "23.12", value: 620 },
                { quarter: "24.3", value: 630 }, { quarter: "24.6", value: 640 },
                { quarter: "24.9", value: 650 }, { quarter: "24.12", value: 660 },
                { quarter: "25.3", value: 680 }, { quarter: "25.6", value: 700 }
            ],
            profit: [
                { quarter: "23.3", operating: 50, net: 35 }, { quarter: "23.6", operating: 55, net: 40 },
                { quarter: "23.9", operating: 60, net: 45 }, { quarter: "23.12", operating: 58, net: 42 },
                { quarter: "24.3", operating: 65, net: 48 }, { quarter: "24.6", operating: 70, net: 50 },
                { quarter: "24.9", operating: 75, net: 55 }, { quarter: "24.12", operating: 80, net: 60 },
                { quarter: "25.3", operating: 85, net: 65 }, { quarter: "25.6", operating: 90, net: 70 }
            ],
            segments: [
                { name: "エネルギー・インフラ", value: 45, color: "#3b82f6" },
                { name: "通信・産業用電線", value: 35, color: "#10b981" },
                { name: "電装・コンポーネント", value: 20, color: "#f59e0b" }
            ],
            metrics: [
                { name: "PER", value: "22.45倍" }, { name: "PBR", value: "3.84倍" },
                { name: "ROE", value: "18.07%" }, { name: "配当利回り", value: "1.75%" },
                { name: "自己資本比率", value: "48.0%" }, { name: "営業利益率", value: "9.4%" },
                { name: "EV/EBITDA", value: "8.5倍" }, { name: "PSR", value: "1.36倍" }
            ],
            incomeStatement: {
                revenue: 2493, costOfGoodsSold: 2064, grossProfit: 429,
                sellingGeneralAdmin: 194, operatingIncome: 235, nonOperatingIncome: 15,
                ordinaryIncome: 250, specialIncome: 0, preTaxIncome: 250,
                incomeTax: 99, netIncome: 151
            },
            balanceSheet: { totalAssets: 2012, totalLiabilities: 1046, totalEquity: 966, totalDebt: 473 }
            // cashFlow: Data not available
        },
        "6315": {
            currency: "JPY_Oku",
            priceHistory: generateMockHistory(2000, 3000),
            revenue: [
                { quarter: "23.3", value: 110 }, { quarter: "23.6", value: 115 },
                { quarter: "23.9", value: 120 }, { quarter: "23.12", value: 125 },
                { quarter: "24.3", value: 130 }, { quarter: "24.6", value: 135 },
                { quarter: "24.9", value: 140 }, { quarter: "24.12", value: 145 },
                { quarter: "25.3", value: 150 }, { quarter: "25.6", value: 160 }
            ],
            profit: [
                { quarter: "23.3", operating: 12, net: 8 }, { quarter: "23.6", operating: 14, net: 10 },
                { quarter: "23.9", operating: 15, net: 11 }, { quarter: "23.12", operating: 16, net: 12 },
                { quarter: "24.3", operating: 18, net: 13 }, { quarter: "24.6", operating: 20, net: 15 },
                { quarter: "24.9", operating: 22, net: 16 }, { quarter: "24.12", operating: 24, net: 18 },
                { quarter: "25.3", operating: 26, net: 20 }, { quarter: "25.6", operating: 30, net: 22 }
            ],
            segments: [
                { name: "モールディング装置", value: 85, color: "#3b82f6" },
                { name: "シンギュレーション装置", value: 10, color: "#10b981" },
                { name: "その他", value: 5, color: "#f59e0b" }
            ],
            metrics: [
                { name: "PER", value: "37.72倍" }, { name: "PBR", value: "3.63倍" },
                { name: "ROE", value: "10.01%" }, { name: "配当利回り", value: "0.67%" },
                { name: "自己資本比率", value: "70.1%" }, { name: "営業利益率", value: "12.3%" },
                { name: "EV/EBITDA", value: "12.5倍" }, { name: "PSR", value: "4.64倍" }
            ],
            incomeStatement: {
                revenue: 495, costOfGoodsSold: 322, grossProfit: 174,
                sellingGeneralAdmin: 113, operatingIncome: 61, nonOperatingIncome: 0,
                ordinaryIncome: 61, specialIncome: 0, preTaxIncome: 61,
                incomeTax: 0, netIncome: 61
            },
            balanceSheet: { totalAssets: 910, totalLiabilities: 272, totalEquity: 638, totalDebt: 139 }
            // cashFlow: Data not available
        },
        "3778": {
            currency: "JPY_Oku",
            priceHistory: generateMockHistory(1500, 2750),
            revenue: [
                { quarter: "23.3", value: 78 }, { quarter: "23.6", value: 80 },
                { quarter: "23.9", value: 82 }, { quarter: "23.12", value: 83 },
                { quarter: "24.3", value: 84 }, { quarter: "24.6", value: 86 },
                { quarter: "24.9", value: 88 }, { quarter: "24.12", value: 90 },
                { quarter: "25.3", value: 92 }, { quarter: "25.6", value: 95 }
            ],
            profit: [
                { quarter: "23.3", operating: 4.5, net: 3.5 }, { quarter: "23.6", operating: 4.8, net: 3.8 },
                { quarter: "23.9", operating: 5.0, net: 4.0 }, { quarter: "23.12", operating: 5.2, net: 4.2 },
                { quarter: "24.3", operating: 5.5, net: 4.5 }, { quarter: "24.6", operating: 6.0, net: 5.0 },
                { quarter: "24.9", operating: 6.5, net: 5.2 }, { quarter: "24.12", operating: 7.0, net: 5.5 },
                { quarter: "25.3", operating: 7.5, net: 6.0 }, { quarter: "25.6", operating: 8.0, net: 6.5 }
            ],
            segments: [
                { name: "クラウドサービス", value: 75, color: "#3b82f6" },
                { name: "物理ホスティング", value: 15, color: "#10b981" },
                { name: "その他", value: 10, color: "#f59e0b" }
            ],
            metrics: [
                { name: "PER", value: "68.62倍" }, { name: "PBR", value: "3.74倍" },
                { name: "ROE", value: "5.60%" }, { name: "配当利回り", value: "0.18%" },
                { name: "自己資本比率", value: "36.9%" }, { name: "営業利益率", value: "5.6%" },
                { name: "EV/EBITDA", value: "25.0倍" }, { name: "PSR", value: "3.25倍" }
            ],
            incomeStatement: {
                revenue: 337, costOfGoodsSold: 237, grossProfit: 100,
                sellingGeneralAdmin: 81, operatingIncome: 19, nonOperatingIncome: 2,
                ordinaryIncome: 21, specialIncome: 0, preTaxIncome: 21,
                incomeTax: 5, netIncome: 16
            },
            balanceSheet: { totalAssets: 802, totalLiabilities: 506, totalEquity: 296, totalDebt: 297 }
            // cashFlow: Data not available
        },
        "5595": {
            currency: "JPY_Oku",
            priceHistory: generateMockHistory(1200, 1720),
            revenue: [
                { quarter: "23.5", value: 3.8 }, { quarter: "23.8", value: 5.2 },
                { quarter: "23.11", value: 6.1 }, { quarter: "24.2", value: 6.8 },
                { quarter: "24.5", value: 4.9 }, { quarter: "24.8", value: 1.0 },
                { quarter: "24.11", value: 9.15 }, { quarter: "25.2", value: 7.5 },
                { quarter: "25.5", value: 8.0 }, { quarter: "25.8", value: 9.0 }
            ],
            profit: [
                { quarter: "23.5", operating: -2.0, net: -1.0 }, { quarter: "23.8", operating: -1.8, net: -0.9 },
                { quarter: "23.11", operating: -1.5, net: -0.7 }, { quarter: "24.2", operating: -1.2, net: -0.5 },
                { quarter: "24.5", operating: 2.89, net: 2.5 }, { quarter: "24.8", operating: -0.5, net: -0.2 },
                { quarter: "24.11", operating: -9.03, net: -2.27 }, { quarter: "25.2", operating: 0.1, net: 0.05 },
                { quarter: "25.5", operating: 0.0, net: 0.0 }, { quarter: "25.8", operating: -2.0, net: -0.8 }
            ],
            segments: [
                { name: "SAR衛星データ販売", value: 90, color: "#3b82f6" },
                { name: "衛星開発受託", value: 10, color: "#10b981" }
            ],
            metrics: [
                { name: "時価総額", value: "830億円" }, { name: "EV", value: "803億円" },
                { name: "PBR", value: "5.47倍" }, { name: "DEレシオ", value: "0.35" },
                { name: "売上総利益率", value: "2.66%" }, { name: "ROA", value: "-1.77%" },
                { name: "ROE", value: "-3.16%" }, { name: "ROIC", value: "-2.13%" }
            ],
            incomeStatement: {
                revenue: 23.5,
                costOfGoodsSold: 22.88,
                grossProfit: 0.62,
                sellingGeneralAdmin: 8.86,
                operatingIncome: -8.24,
                nonOperatingIncome: 4.78,
                ordinaryIncome: -3.46,
                specialIncome: 0,
                preTaxIncome: -3.46,
                incomeTax: 0,
                netIncome: -3.46
            },
            balanceSheet: { totalAssets: 238.7, totalLiabilities: 88.5, totalEquity: 150.2, totalDebt: 53.0 },
            cashFlow: { operatingCashFlow: -5, investingCashFlow: -5, financingCashFlow: 10, freeCashFlow: -10 }
        },
        "1942": {
            currency: "JPY_Oku",
            priceHistory: generateMockHistory(1500, 5740),
            revenue: [
                { quarter: "23.3", value: 1600 }, { quarter: "23.6", value: 1650 },
                { quarter: "23.9", value: 1700 }, { quarter: "23.12", value: 1800 },
                { quarter: "24.3", value: 1900 }, { quarter: "24.6", value: 1750 },
                { quarter: "24.9", value: 1850 }, { quarter: "24.12", value: 2000 },
                { quarter: "25.3", value: 2100 }, { quarter: "25.6", value: 1950 }
            ],
            profit: [
                { quarter: "23.3", operating: 120, net: 80 }, { quarter: "23.6", operating: 130, net: 90 },
                { quarter: "23.9", operating: 140, net: 100 }, { quarter: "23.12", operating: 160, net: 120 },
                { quarter: "24.3", operating: 180, net: 130 }, { quarter: "24.6", operating: 150, net: 110 },
                { quarter: "24.9", operating: 190, net: 140 }, { quarter: "24.12", operating: 220, net: 160 },
                { quarter: "25.3", operating: 240, net: 180 }, { quarter: "25.6", operating: 200, net: 150 }
            ],
            segments: [
                { name: "屋内線・環境設備工事", value: 60, color: "#3b82f6" },
                { name: "送電・情報通信工事", value: 30, color: "#10b981" },
                { name: "その他", value: 10, color: "#f59e0b" }
            ],
            metrics: [
                { name: "PER", value: "22.78倍" }, { name: "PBR", value: "3.00倍" },
                { name: "ROE", value: "14.00%" }, { name: "配当利回り", value: "1.56%" },
                { name: "自己資本比率", value: "68.1%" }, { name: "営業利益率", value: "9.7%" },
                { name: "EV/EBITDA", value: "7.5倍" }, { name: "PSR", value: "1.56倍" }
            ],
            incomeStatement: {
                revenue: 7258, costOfGoodsSold: 6186, grossProfit: 1072,
                sellingGeneralAdmin: 364, operatingIncome: 708, nonOperatingIncome: 10,
                ordinaryIncome: 718, specialIncome: 0, preTaxIncome: 718,
                incomeTax: 203, netIncome: 515
            },
            balanceSheet: { totalAssets: 5963, totalLiabilities: 1905, totalEquity: 4058, totalDebt: 108 }
            // cashFlow: Data not available
        },
        "6506": {
            currency: "JPY_Oku",
            priceHistory: generateMockHistory(4500, 5150),
            revenue: [
                { quarter: "23.3", value: 1250 }, { quarter: "23.6", value: 1280 },
                { quarter: "23.9", value: 1300 }, { quarter: "23.12", value: 1320 },
                { quarter: "24.3", value: 1350 }, { quarter: "24.6", value: 1380 },
                { quarter: "24.9", value: 1400 }, { quarter: "24.12", value: 1420 },
                { quarter: "25.3", value: 1450 }, { quarter: "25.6", value: 1480 }
            ],
            profit: [
                { quarter: "23.3", operating: 110, net: 85 }, { quarter: "23.6", operating: 115, net: 90 },
                { quarter: "23.9", operating: 118, net: 92 }, { quarter: "23.12", operating: 120, net: 95 },
                { quarter: "24.3", operating: 125, net: 98 }, { quarter: "24.6", operating: 130, net: 100 },
                { quarter: "24.9", operating: 135, net: 105 }, { quarter: "24.12", operating: 140, net: 110 },
                { quarter: "25.3", operating: 145, net: 115 }, { quarter: "25.6", operating: 150, net: 120 }
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
                { name: "自己資本比率", value: "59.3%" }, { name: "営業利益率", value: "8.8%" },
                { name: "EV/EBITDA", value: "18.2倍" }, { name: "PSR", value: "2.45倍" }
            ],
            incomeStatement: {
                revenue: 5392, costOfGoodsSold: 3479, grossProfit: 1913,
                sellingGeneralAdmin: 1440, operatingIncome: 473, nonOperatingIncome: 27,
                ordinaryIncome: 500, specialIncome: 0, preTaxIncome: 500,
                incomeTax: 130, netIncome: 370
            },
            balanceSheet: { totalAssets: 7966, totalLiabilities: 3239, totalEquity: 4727, totalDebt: 1177 },
            cashFlow: { operatingCashFlow: 476, investingCashFlow: -481, financingCashFlow: -11, freeCashFlow: -13 }
        },
        "6269": {
            currency: "JPY_Oku",
            priceHistory: generateMockHistory(10000, 13900),
            revenue: [
                { quarter: "23.3", value: 1550 }, { quarter: "23.6", value: 1600 },
                { quarter: "23.9", value: 1650 }, { quarter: "23.12", value: 1680 },
                { quarter: "24.3", value: 1700 }, { quarter: "24.6", value: 1750 },
                { quarter: "24.9", value: 1800 }, { quarter: "24.12", value: 1850 },
                { quarter: "25.3", value: 1900 }, { quarter: "25.6", value: 1950 }
            ],
            profit: [
                { quarter: "23.3", operating: 75, net: 95 }, { quarter: "23.6", operating: 80, net: 100 },
                { quarter: "23.9", operating: 85, net: 110 }, { quarter: "23.12", operating: 90, net: 115 },
                { quarter: "24.3", operating: 95, net: 120 }, { quarter: "24.6", operating: 100, net: 130 },
                { quarter: "24.9", operating: 110, net: 140 }, { quarter: "24.12", operating: 120, net: 150 },
                { quarter: "25.3", operating: 130, net: 160 }, { quarter: "25.6", operating: 140, net: 170 }
            ],
            segments: [
                { name: "FPSO（洋上石油生産施設）", value: 85, color: "#3b82f6" },
                { name: "その他サービス", value: 15, color: "#10b981" }
            ],
            metrics: [
                { name: "PER", value: "21.12倍" }, { name: "PBR", value: "4.67倍" },
                { name: "ROE", value: "24.76%" }, { name: "配当利回り", value: "1.01%" },
                { name: "自己資本比率", value: "30.7%" }, { name: "営業利益率", value: "4.8%" },
                { name: "EV/EBITDA", value: "7.2倍" }, { name: "PSR", value: "1.35倍" }
            ],
            incomeStatement: {
                revenue: 6766, costOfGoodsSold: 6062, grossProfit: 703,
                sellingGeneralAdmin: 374, operatingIncome: 328, nonOperatingIncome: 130,
                ordinaryIncome: 458, specialIncome: 0, preTaxIncome: 458,
                incomeTax: 21, netIncome: 437
            },
            balanceSheet: { totalAssets: 6657, totalLiabilities: 4612, totalEquity: 2045, totalDebt: 620 },
            cashFlow: { operatingCashFlow: 1170, investingCashFlow: -4, financingCashFlow: -311, freeCashFlow: 1159 }
        },
        "6965": {
            currency: "JPY_Oku",
            priceHistory: generateMockHistory(1900, 1760),
            revenue: [
                { quarter: "23.3", value: 520 }, { quarter: "23.6", value: 525 },
                { quarter: "23.9", value: 530 }, { quarter: "23.12", value: 535 },
                { quarter: "24.3", value: 530 }, { quarter: "24.6", value: 500 },
                { quarter: "24.9", value: 520 }, { quarter: "24.12", value: 540 },
                { quarter: "25.3", value: 550 }, { quarter: "25.6", value: 560 }
            ],
            profit: [
                { quarter: "23.3", operating: 55, net: 45 }, { quarter: "23.6", operating: 60, net: 50 },
                { quarter: "23.9", operating: 45, net: 40 }, { quarter: "23.12", operating: 35, net: 25 },
                { quarter: "24.3", operating: 30, net: 25 }, { quarter: "24.6", operating: 35, net: 30 },
                { quarter: "24.9", operating: 40, net: 35 }, { quarter: "24.12", operating: 45, net: 38 },
                { quarter: "25.3", operating: 48, net: 40 }, { quarter: "25.6", operating: 50, net: 42 }
            ],
            segments: [
                { name: "光検出器", value: 45, color: "#3b82f6" },
                { name: "光源", value: 30, color: "#10b981" },
                { name: "画像処理・計測システム", value: 25, color: "#f59e0b" }
            ],
            metrics: [
                { name: "PER", value: "37.27倍" }, { name: "PBR", value: "1.64倍" },
                { name: "ROE", value: "4.35%" }, { name: "配当利回り", value: "2.16%" },
                { name: "自己資本比率", value: "70.8%" }, { name: "営業利益率", value: "7.6%" },
                { name: "EV/EBITDA", value: "14.2倍" }, { name: "PSR", value: "2.51倍" }
            ],
            incomeStatement: {
                revenue: 2120, costOfGoodsSold: 1106, grossProfit: 1013,
                sellingGeneralAdmin: 852, operatingIncome: 161, nonOperatingIncome: 46,
                ordinaryIncome: 207, specialIncome: 0, preTaxIncome: 207,
                incomeTax: 65, netIncome: 142
            },
            balanceSheet: { totalAssets: 4564, totalLiabilities: 1329, totalEquity: 3234, totalDebt: 723 }
            // cashFlow: Data not available
        },
        "5253": {
            currency: "JPY_Oku",
            priceHistory: generateMockHistory(1500, 1740),
            revenue: [
                { quarter: "23.3", value: 110 }, { quarter: "23.6", value: 115 },
                { quarter: "23.9", value: 120 }, { quarter: "23.12", value: 125 },
                { quarter: "24.3", value: 130 }, { quarter: "24.6", value: 100 },
                { quarter: "24.9", value: 120 }, { quarter: "24.12", value: 140 },
                { quarter: "25.3", value: 160 }, { quarter: "25.6", value: 180 }
            ],
            profit: [
                { quarter: "23.3", operating: 15, net: 10 }, { quarter: "23.6", operating: 16, net: 11 },
                { quarter: "23.9", operating: 18, net: 13 }, { quarter: "23.12", operating: 20, net: 15 },
                { quarter: "24.3", operating: 22, net: 16 }, { quarter: "24.6", operating: 15, net: 10 },
                { quarter: "24.9", operating: 20, net: 14 }, { quarter: "24.12", operating: 25, net: 18 },
                { quarter: "25.3", operating: 30, net: 22 }, { quarter: "25.6", operating: 35, net: 26 }
            ],
            segments: [
                { name: "ライブエンターテインメント", value: 40, color: "#3b82f6" },
                { name: "マーチャンダイジング", value: 35, color: "#10b981" },
                { name: "ライセンス・タイアップ", value: 25, color: "#f59e0b" }
            ],
            metrics: [
                { name: "PER", value: "21.26倍" }, { name: "PBR", value: "5.98倍" },
                { name: "ROE", value: "33.70%" }, { name: "売上高成長率", value: "45.8%" },
                { name: "自己資本比率", value: "57.4%" }, { name: "営業利益率", value: "15.2%" },
                { name: "EV/EBITDA", value: "22.5倍" }, { name: "PSR", value: "2.45倍" }
            ],
            incomeStatement: {
                revenue: 481, costOfGoodsSold: 247, grossProfit: 233,
                sellingGeneralAdmin: 160, operatingIncome: 73, nonOperatingIncome: 0,
                ordinaryIncome: 73, specialIncome: 0, preTaxIncome: 73,
                incomeTax: 19, netIncome: 54
            },
            balanceSheet: { totalAssets: 331, totalLiabilities: 141, totalEquity: 190, totalDebt: 0 }
            // cashFlow: Data not available
        },
        "6228": {
            currency: "JPY_Oku",
            priceHistory: generateMockHistory(1000, 800),
            revenue: [
                { quarter: "23.3", value: 350 }, { quarter: "23.6", value: 360 },
                { quarter: "23.9", value: 370 }, { quarter: "23.12", value: 380 },
                { quarter: "24.3", value: 400 }, { quarter: "24.6", value: 300 },
                { quarter: "24.9", value: 350 }, { quarter: "24.12", value: 350 },
                { quarter: "25.3", value: 380 }, { quarter: "25.6", value: 400 }
            ],
            profit: [
                { quarter: "23.3", operating: -20, net: -30 }, { quarter: "23.6", operating: -25, net: -35 },
                { quarter: "23.9", operating: -30, net: -40 }, { quarter: "23.12", operating: -35, net: -50 },
                { quarter: "24.3", operating: -40, net: -60 }, { quarter: "24.6", operating: -50, net: -80 },
                { quarter: "24.9", operating: -50, net: -90 }, { quarter: "24.12", operating: -40, net: -80 },
                { quarter: "25.3", operating: -30, net: -60 }, { quarter: "25.6", operating: -20, net: -50 }
            ],
            segments: [
                { name: "半導体洗浄装置", value: 95, color: "#3b82f6" },
                { name: "その他生活家電関連", value: 5, color: "#10b981" }
            ],
            metrics: [
                { name: "PSR", value: "0.75倍" }, { name: "PBR", value: "1.11倍" },
                { name: "ROE", value: "-23.63%" }, { name: "自己資本比率", value: "48.9%" },
                { name: "EV/EBITDA", value: "N/A" }, { name: "営業利益率", value: "-11.4%" },
                { name: "配当利回り", value: "0.0%" }, { name: "時価総額", value: "95億円" }
            ],
            incomeStatement: {
                revenue: 1461, costOfGoodsSold: 1350, grossProfit: 111,
                sellingGeneralAdmin: 278, operatingIncome: -167, nonOperatingIncome: 5,
                ordinaryIncome: -150, specialIncome: 0, preTaxIncome: -190,
                incomeTax: 20, netIncome: -263
            },
            balanceSheet: { totalAssets: 2004, totalLiabilities: 1023, totalEquity: 981, totalDebt: 472 }
            // cashFlow: Data not available
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
        forex: {
            title: "為替(FX)",
            icon: <Globe className="w-4 h-4 md:w-5 md:h-5" />,
            description: "主要通貨ペアのリアルタイムレート"
        },
        crypto: {
            title: "暗号資産",
            icon: <Zap className="w-4 h-4 md:w-5 md:h-5" />,
            description: "主要暗号資産のリアルタイム価格"
        },
        promising: {
            title: "注目銘柄",
            icon: <LineChart className="w-4 h-4 md:w-5 md:h-5" />,
            description: "2026年注目！テンバガー候補・話題の10銘柄"
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
                                        financialTab={financialTab}
                                        setFinancialTab={setFinancialTab}
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
                                        financialTab={financialTab}
                                        setFinancialTab={setFinancialTab}
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
                                        financialTab={financialTab}
                                        setFinancialTab={setFinancialTab}
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
                                                financialTab={financialTab}
                                                setFinancialTab={setFinancialTab}
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
