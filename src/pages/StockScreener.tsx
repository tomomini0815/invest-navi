import { VisualIncomeStatement, IncomeStatementData } from "@/components/financial/VisualIncomeStatement";
import { useEffect, useState, useRef, memo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, TrendingUp, BarChart2, Activity, Globe, Zap, RefreshCw, X, ChevronDown, ChevronUp, List, FileText, LineChart, Building } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart as RechartsLine, Line } from "recharts";
import { TradingViewWidgetIframe } from "@/components/common/TradingViewWidgetIframe";
import { StockAnalysisSection } from "@/components/financial/StockAnalysisSection";

// TradingViewウィジェットのタイプ定義
type ScreenerType = "japan" | "crypto" | "forex" | "us";

interface WidgetConfig {
    title: string;
    icon: React.ReactNode;
    description: string;
}

const StockScreener = () => {
    const navigate = useNavigate();
    const [activeScreener, setActiveScreener] = useState<ScreenerType>("japan");
    const [selectedChart, setSelectedChart] = useState<string | null>("FOREXCOM:SPXUSD");
    const [showList, setShowList] = useState(false);
    const [financialTab, setFinancialTab] = useState<"overview" | "chart">("overview");
    const chartContainerRef = useRef<HTMLDivElement>(null);

    // サンプル財務データ（各銘柄用）- 2023年〜2026年1月最新
    const financialDataMap: Record<string, {
        revenue: { quarter: string; value: number }[];
        profit: { quarter: string; operating: number; net: number }[];
        segments: { name: string; value: number; color: string }[];
        metrics: { name: string; value: string }[];
        incomeStatement?: IncomeStatementData;
    }> = {
        "NASDAQ:AAPL": {
            revenue: [
                { quarter: "23年1月", value: 117.2 }, { quarter: "23年4月", value: 94.8 },
                { quarter: "23年7月", value: 81.8 }, { quarter: "23年10月", value: 89.5 },
                { quarter: "24年1月", value: 119.6 }, { quarter: "24年4月", value: 90.8 },
                { quarter: "24年7月", value: 85.8 }, { quarter: "24年10月", value: 94.9 },
                { quarter: "25年1月", value: 124.3 }, { quarter: "25年4月", value: 95.4 },
                { quarter: "25年7月", value: 89.5 }, { quarter: "25年10月", value: 99.2 },
                { quarter: "26年1月", value: 128.5 }
            ],
            profit: [
                { quarter: "23年1月", operating: 41.5, net: 34.0 }, { quarter: "23年4月", operating: 28.2, net: 24.2 },
                { quarter: "23年7月", operating: 23.2, net: 19.9 }, { quarter: "23年10月", operating: 30.0, net: 23.0 },
                { quarter: "24年1月", operating: 40.4, net: 33.9 }, { quarter: "24年4月", operating: 26.7, net: 23.6 },
                { quarter: "24年7月", operating: 26.3, net: 21.4 }, { quarter: "24年10月", operating: 29.6, net: 24.7 },
                { quarter: "25年1月", operating: 42.8, net: 36.3 }, { quarter: "25年4月", operating: 28.5, net: 24.8 },
                { quarter: "25年7月", operating: 27.2, net: 23.1 }, { quarter: "25年10月", operating: 31.5, net: 26.2 },
                { quarter: "26年1月", operating: 45.0, net: 38.5 }
            ],
            segments: [
                { name: "iPhone", value: 51, color: "#3b82f6" },
                { name: "Services", value: 24, color: "#10b981" },
                { name: "Mac", value: 8, color: "#f59e0b" },
                { name: "iPad", value: 7, color: "#ef4444" },
                { name: "Wearables等", value: 10, color: "#8b5cf6" }
            ],
            metrics: [
                { name: "PER（株価収益率）", value: "32.18倍" }, { name: "PBR（株価純資産倍率）", value: "58.45倍" },
                { name: "ROE（自己資本利益率）", value: "168.52%" }, { name: "配当利回り", value: "0.48%" }
            ],
            incomeStatement: {
                revenue: 383285,
                costOfGoodsSold: 214117,
                grossProfit: 169168,
                sellingGeneralAdmin: 54847,
                operatingIncome: 114301,
                nonOperatingIncome: -565,
                ordinaryIncome: 113736,
                specialIncome: 0,
                preTaxIncome: 113736,
                incomeTax: 16741,
                netIncome: 96995
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
                { name: "PER（株価収益率）", value: "28.45倍" }, { name: "PBR（株価純資産倍率）", value: "9.82倍" },
                { name: "ROE（自己資本利益率）", value: "38.12%" }, { name: "配当利回り", value: "0.52%" }
            ],
            incomeStatement: {
                revenue: 339859,
                costOfGoodsSold: 148164,
                grossProfit: 191695,
                sellingGeneralAdmin: 81248,
                operatingIncome: 110447,
                nonOperatingIncome: 3974,
                ordinaryIncome: 114421,
                specialIncome: 0,
                preTaxIncome: 114421,
                incomeTax: 14383,
                netIncome: 100038
            }
        },
        "NASDAQ:NVDA": {
            revenue: [
                { quarter: "23年1月", value: 7.2 }, { quarter: "23年4月", value: 13.5 },
                { quarter: "23年7月", value: 18.1 }, { quarter: "23年10月", value: 22.1 },
                { quarter: "24年1月", value: 26.0 }, { quarter: "24年4月", value: 30.0 },
                { quarter: "24年7月", value: 35.1 }, { quarter: "24年10月", value: 39.3 },
                { quarter: "25年1月", value: 44.1 }, { quarter: "25年4月", value: 48.5 },
                { quarter: "25年7月", value: 52.8 }, { quarter: "25年10月", value: 58.2 },
                { quarter: "26年1月", value: 62.0 }
            ],
            profit: [
                { quarter: "23年1月", operating: 2.1, net: 2.0 }, { quarter: "23年4月", operating: 6.8, net: 6.2 },
                { quarter: "23年7月", operating: 10.4, net: 9.2 }, { quarter: "23年10月", operating: 13.6, net: 12.3 },
                { quarter: "24年1月", operating: 16.9, net: 14.9 }, { quarter: "24年4月", operating: 18.6, net: 16.6 },
                { quarter: "24年7月", operating: 21.9, net: 19.3 }, { quarter: "24年10月", operating: 24.0, net: 22.1 },
                { quarter: "25年1月", operating: 27.5, net: 25.2 }, { quarter: "25年4月", operating: 30.2, net: 27.8 },
                { quarter: "25年7月", operating: 33.0, net: 30.5 }, { quarter: "25年10月", operating: 36.5, net: 33.8 },
                { quarter: "26年1月", operating: 39.2, net: 36.0 }
            ],
            segments: [
                { name: "データセンター", value: 91, color: "#10b981" },
                { name: "ゲーミング", value: 6, color: "#3b82f6" },
                { name: "プロフェッショナル", value: 1, color: "#f59e0b" },
                { name: "自動車", value: 2, color: "#ef4444" }
            ],
            metrics: [
                { name: "PER（株価収益率）", value: "38.25倍" }, { name: "PSR（株価売上高倍率）", value: "20.15倍" },
                { name: "ROE（自己資本利益率）", value: "125.8%" }, { name: "純利益率", value: "58.06%" }
            ],
            incomeStatement: {
                revenue: 130497,
                costOfGoodsSold: 34282,
                grossProfit: 96215,
                sellingGeneralAdmin: 20400,
                operatingIncome: 75815,
                nonOperatingIncome: 492,
                ordinaryIncome: 76307,
                specialIncome: 0,
                preTaxIncome: 76307,
                incomeTax: 6242,
                netIncome: 70065
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
                { name: "PER（株価収益率）", value: "30.82倍" }, { name: "PBR（株価純資産倍率）", value: "10.25倍" },
                { name: "ROE（自己資本利益率）", value: "35.45%" }, { name: "配当性向", value: "25.12%" }
            ],
            incomeStatement: {
                revenue: 254256,
                costOfGoodsSold: 74114,
                grossProfit: 180142,
                sellingGeneralAdmin: 65572,
                operatingIncome: 114570,
                nonOperatingIncome: 1821,
                ordinaryIncome: 116391,
                specialIncome: 0,
                preTaxIncome: 116391,
                incomeTax: 15820,
                netIncome: 100571
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
                { name: "PER（株価収益率）", value: "28.95倍" }, { name: "PBR（株価純資産倍率）", value: "7.12倍" },
                { name: "ROE（自己資本利益率）", value: "28.45%" }, { name: "配当利回り", value: "0.00%" }
            ],
            incomeStatement: {
                revenue: 637959,
                costOfGoodsSold: 380285,
                grossProfit: 257674,
                sellingGeneralAdmin: 200268,
                operatingIncome: 57406,
                nonOperatingIncome: 2867,
                ordinaryIncome: 60273,
                specialIncome: 0,
                preTaxIncome: 60273,
                incomeTax: 11512,
                netIncome: 48761
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
                { name: "PER（株価収益率）", value: "24.85倍" }, { name: "PSR（株価売上高倍率）", value: "7.92倍" },
                { name: "ROE（自己資本利益率）", value: "36.25%" }, { name: "売上総利益率", value: "83.50%" }
            ],
            incomeStatement: {
                revenue: 164500,
                costOfGoodsSold: 27154,
                grossProfit: 137346,
                sellingGeneralAdmin: 67854,
                operatingIncome: 69492,
                nonOperatingIncome: 1572,
                ordinaryIncome: 71064,
                specialIncome: 0,
                preTaxIncome: 71064,
                incomeTax: 9614,
                netIncome: 61450
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
                { name: "PER（株価収益率）", value: "185.42倍" }, { name: "PSR（株価売上高倍率）", value: "12.85倍" },
                { name: "ROE（自己資本利益率）", value: "8.92%" }, { name: "流動比率", value: "1.95倍" }
            ],
            incomeStatement: {
                revenue: 96773,
                costOfGoodsSold: 82749,
                grossProfit: 14024,
                sellingGeneralAdmin: 6773,
                operatingIncome: 7251,
                nonOperatingIncome: 1157,
                ordinaryIncome: 8408,
                specialIncome: 0,
                preTaxIncome: 8408,
                incomeTax: 1189,
                netIncome: 7219
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
                { name: "PER（株価収益率）", value: "85.42倍" }, { name: "PBR（株価純資産倍率）", value: "5.85倍" },
                { name: "ROE（自己資本利益率）", value: "8.52%" }, { name: "売上総利益率", value: "48.25%" }
            ],
            incomeStatement: {
                revenue: 23282,
                costOfGoodsSold: 12021,
                grossProfit: 11261,
                sellingGeneralAdmin: 6478,
                operatingIncome: 4783,
                nonOperatingIncome: 135,
                ordinaryIncome: 4918,
                specialIncome: 0,
                preTaxIncome: 4918,
                incomeTax: 693,
                netIncome: 4225
            }
        }
    };

    const getFinancialData = () => {
        return financialDataMap[selectedChart || ""] || financialDataMap["NASDAQ:AAPL"];
    };

    const screenerConfigs: Record<ScreenerType, WidgetConfig> = {
        japan: {
            title: "総合",
            icon: <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />,
            description: "世界の主要指数・先物・債券・為替のリアルタイム情報"
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
        }
    };

    // 日本株リスト
    const japanStocks = [
        { symbol: "TSE:7203", name: "トヨタ自動車" },
        { symbol: "TSE:6758", name: "ソニーG" },
        { symbol: "TSE:9984", name: "ソフトバンクG" },
        { symbol: "TSE:8306", name: "三菱UFJ" },
        { symbol: "TSE:6861", name: "キーエンス" },
        { symbol: "TSE:7974", name: "任天堂" },
        { symbol: "TSE:9983", name: "ファストリ" },
        { symbol: "TSE:8035", name: "東京エレク" },
        { symbol: "TSE:9432", name: "NTT" },
        { symbol: "TSE:8316", name: "三井住友FG" },
        { symbol: "TSE:6501", name: "日立製作所" },
        { symbol: "TSE:8001", name: "伊藤忠商事" },
        { symbol: "TSE:6902", name: "デンソー" },
        { symbol: "TSE:4063", name: "信越化学" },
        { symbol: "TSE:8411", name: "みずほFG" },
        { symbol: "TSE:4568", name: "第一三共" },
        { symbol: "TSE:6954", name: "ファナック" },
        { symbol: "TSE:9433", name: "KDDI" },
        { symbol: "TSE:6098", name: "リクルート" },
        { symbol: "TSE:7267", name: "ホンダ" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
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
                <div className="flex justify-center gap-1 md:gap-3 mb-4">
                    {(Object.entries(screenerConfigs) as [ScreenerType, WidgetConfig][]).map(([key, config]) => (
                        <Button
                            key={key}
                            variant={activeScreener === key ? "default" : "outline"}
                            onClick={() => setActiveScreener(key)}
                            className={`flex items-center gap-1 md:gap-2 px-2 md:px-6 py-4 text-xs md:text-sm transition-all ${activeScreener === key
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
                            {activeScreener === "japan" ? (
                                <div key="market-quotes">
                                    {/* クイックチャートアクセス - 最初に表示 */}
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
                                                { symbol: "FX:EURUSD", name: "EUR/USD" },
                                                { symbol: "FX:USDJPY", name: "USD/JPY" },
                                                { symbol: "FX:GBPUSD", name: "GBP/USD" },
                                                { symbol: "FX:AUDUSD", name: "AUD/USD" },
                                                { symbol: "CMCMARKETS:GOLD", name: "Gold" },
                                                { symbol: "BITSTAMP:BTCUSD", name: "Bitcoin" },
                                                { symbol: "BITSTAMP:ETHUSD", name: "Ethereum" }
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
                            ) : (
                                <div key="forex-screener" style={{ height: "800px" }}>
                                    <TradingViewWidgetIframe
                                        key="forex-widget"
                                        title="Forex Screener"
                                        scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-screener.js"
                                        config={{
                                            width: "100%",
                                            height: "100%",
                                            defaultColumn: "overview",
                                            defaultScreen: "general",
                                            market: "forex",
                                            showToolbar: true,
                                            colorTheme: "light",
                                            locale: "ja"
                                        }}
                                    />
                                </div>
                            )}
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
                        <div className="bg-slate-100 p-3 text-sm text-slate-600 border-b">
                            セクター別の値動きを視覚化 - サイズは時価総額、色は変化率を表示
                        </div>
                        <div style={{ height: "600px" }}>
                            <TradingViewWidgetIframe
                                title="Heatmap"
                                scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js"
                                config={{
                                    exchanges: [],
                                    dataSource: "SPX500",
                                    grouping: "sector",
                                    blockSize: "market_cap_basic",
                                    blockColor: "change",
                                    locale: "ja",
                                    symbolUrl: "",
                                    colorTheme: "light",
                                    hasTopBar: true,
                                    isDataSetEnabled: true,
                                    isZoomEnabled: true,
                                    hasSymbolTooltip: true,
                                    width: "100%",
                                    height: "100%"
                                }}
                            />
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
};

export default StockScreener;
