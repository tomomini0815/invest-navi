import { VisualIncomeStatement, IncomeStatementData } from "@/components/financial/VisualIncomeStatement";
import { sp500Stocks, nikkei225Stocks } from "@/data/stockLists";
import { TradingViewWidgetIframe } from "@/components/common/TradingViewWidgetIframe";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    FileText,
    Building,
    LineChart,
    TrendingUp,
    BarChart2,
    Shield,
    Globe,
    Award,
    Activity,
    Wallet,
    PieChart as LucidePieChart,
    Sparkles,
    BookOpen,
    Trash2,
    ChevronDown,
    Search,
    Filter,
    ArrowUpRight,
    ArrowDownRight,
    Info,
    AlertCircle
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart as RechartsLine, Line } from "recharts";
import { VisualBalanceSheet } from "./VisualBalanceSheet";
import { VisualCashFlow } from "./VisualCashFlow";
import { StockPriceChart } from "./StockPriceChart";
import { StockAnalysisVisualizer } from "./StockAnalysisVisualizer";
import { japanStockDetailData } from "../../data/japanStockDetailData";
import { promisingStocks2026 } from "../../data/stockLists";

interface StockAnalysisSectionProps {
    symbol: string | null;
    activeScreener: "total" | "japan" | "us" | "crypto" | "forex" | "promising";
    financialDataMap: Record<string, any>;
}

// 過去の財務データ
const HISTORICAL_FIN_DATA: Record<string, any[]> = {
    "5805": [
        { period: "2022年3月期", revenue: "181,700", op: "9,820", net: "3,064", remark: "回復基調" },
        { period: "2023年3月期", revenue: "208,859", op: "10,810", net: "6,520", remark: "構造改革進行" },
        { period: "2024年3月期", revenue: "213,904", op: "12,350", net: "8,240", remark: "増収増益" },
        { period: "2025年3月期", revenue: "238,000", op: "20,930", net: "11,400", remark: "大幅増益達成" }
    ],
    "6315": [
        { period: "2022年3月期", revenue: "43,260", op: "6,979", net: "4,940", remark: "高収益維持" },
        { period: "2023年3月期", revenue: "49,324", op: "10,931", net: "7,825", remark: "過去最高水準" },
        { period: "2024年3月期", revenue: "53,487", op: "8,212", net: "6,100", remark: "半導体後工程堅調" },
        { period: "2025年3月期", revenue: "51,245", op: "8,237", net: "5,859", remark: "減収減益" }
    ],
    "3778": [
        { period: "2022年3月期", revenue: "18,989", op: "649", net: "170", remark: "回復局面" },
        { period: "2023年3月期", revenue: "20,622", op: "1,099", net: "678", remark: "GPU投資フェーズ" },
        { period: "2024年3月期", revenue: "21,826", op: "1,248", net: "769", remark: "クラウド需要急増" },
        { period: "2025年3月期", revenue: "31,400", op: "5,850", net: "3,785", remark: "大幅増収増益" }
    ],
    "5595": [
        { period: "2022年5月期", revenue: "157", op: "△846", net: "△1,105", remark: "先行投資期" },
        { period: "2023年5月期", revenue: "372", op: "△315", net: "△324", remark: "売上拡大中" },
        { period: "2024年5月期", revenue: "889", op: "207", net: "63", remark: "黒字転換" },
        { period: "2025年5月期", revenue: "1,053", op: "△210", net: "△278", remark: "再び赤字" }
    ],
    "1942": [
        { period: "2022年3月期", revenue: "495,567", op: "31,754", net: "20,315", remark: "堅調推移" },
        { period: "2023年3月期", revenue: "541,579", op: "34,059", net: "21,167", remark: "受注増加" },
        { period: "2024年3月期", revenue: "598,427", op: "42,648", net: "27,345", remark: "大幅増益" },
        { period: "2025年3月期", revenue: "671,888", op: "58,326", net: "37,885", remark: "過去最高益" }
    ],
    "6506": [
        { period: "2022年2月期", revenue: "455,200", op: "44,100", net: "32,400", remark: "回復基調" },
        { period: "2023年2月期", revenue: "556,000", op: "68,300", net: "51,700", remark: "過去最高水準" },
        { period: "2024年2月期", revenue: "575,658", op: "66,220", net: "50,600", remark: "ロボット需要底堅い" },
        { period: "2025年2月期", revenue: "585,000", op: "64,000", net: "48,500", remark: "微減益" }
    ],
    "6269": [
        { period: "2022年12月期", revenue: "344,800", op: "9,997", net: "△6,504", remark: "収益改善途上" },
        { period: "2023年12月期", revenue: "507,031", op: "27,364", net: "12,411", remark: "黒字定着" },
        { period: "2024年12月期", revenue: "577,542", op: "40,879", net: "20,645", remark: "増収増益継続" },
        { period: "2025年12月期(予)", revenue: "620,000", op: "45,000", net: "24,000", remark: "成長継続見込" }
    ],
    "6965": [
        { period: "2022年9月期", revenue: "208,800", op: "56,900", net: "41,800", remark: "高収益維持" },
        { period: "2023年9月期", revenue: "221,458", op: "56,690", net: "41,200", remark: "産業用堅調" },
        { period: "2024年9月期", revenue: "204,040", op: "34,530", net: "24,680", remark: "大幅減益" },
        { period: "2025年9月期", revenue: "212,051", op: "15,955", net: "10,942", remark: "さらに減益" }
    ],
    "5253": [
        { period: "2022年3月期", revenue: "14,365", op: "2,075", net: "1,501", remark: "成長加速" },
        { period: "2023年3月期", revenue: "20,451", op: "3,417", net: "2,508", remark: "IP展開拡大" },
        { period: "2024年3月期", revenue: "30,166", op: "5,536", net: "4,137", remark: "大幅増収増益" },
        { period: "2025年3月期", revenue: "43,732", op: "7,652", net: "5,673", remark: "高成長継続" }
    ],
    "6228": [
        { period: "2022年12月期", revenue: "17,880", op: "780", net: "310", remark: "回復期" },
        { period: "2023年12月期", revenue: "24,984", op: "5,535", net: "3,880", remark: "利益急拡大" },
        { period: "2024年12月期", revenue: "29,597", op: "6,261", net: "4,369", remark: "半導体洗浄好調" },
        { period: "2025年12月期(予)", revenue: "31,000", op: "6,500", net: "4,500", remark: "成長継続予想" }
    ],
    // --- Major Stocks ---
    "7203": [
        { period: "2022年3月期", revenue: "31.4兆", op: "2.9兆", net: "2.8兆", remark: "回復基調" },
        { period: "2023年3月期", revenue: "37.2兆", op: "3.0兆", net: "2.4兆", remark: "過去最高売上" },
        { period: "2024年3月期", revenue: "45.1兆", op: "5.4兆", net: "4.9兆", remark: "過去最高益" },
        { period: "2025年3月期", revenue: "48.0兆", op: "4.8兆", net: "4.8兆", remark: "減益" },
        { period: "2026年3月期(予)", revenue: "48.5兆", op: "3.8兆", net: "3.1兆", remark: "大幅減益予想" }
    ],
    "6758": [
        { period: "2022年3月期", revenue: "9.9兆", op: "1.2兆", net: "1.2兆", remark: "過去最高水準" },
        { period: "2023年3月期", revenue: "11.5兆", op: "1.3兆", net: "1.3兆", remark: "増収増益" },
        { period: "2024年3月期", revenue: "13.0兆", op: "1.2兆", net: "1.2兆", remark: "減益" },
        { period: "2025年3月期", revenue: "12.0兆", op: "1.3兆", net: "1.3兆", remark: "回復" },
        { period: "2026年3月期(予)", revenue: "12.0兆", op: "1.4兆", net: "1.4兆", remark: "増益予想" }
    ],
    "9984": [
        { period: "2022年3月期", revenue: "5.6兆", op: "△1.7兆", net: "△1.7兆", remark: "投資損失" },
        { period: "2023年3月期", revenue: "6.6兆", op: "△2.8兆", net: "△1.0兆", remark: "大幅赤字" },
        { period: "2024年3月期", revenue: "6.9兆", op: "5.5兆", net: "△0.2兆", remark: "黒字転換" },
        { period: "2025年3月期", revenue: "7.4兆", op: "7.2兆", net: "1.2兆", remark: "黒字定着" },
        { period: "2026年3月期(予)", revenue: "---", op: "---", net: "---", remark: "OpenAI投資で大幅増益" }
    ],
    "7974": [
        { period: "2022年3月期", revenue: "1.7兆", op: "0.6兆", net: "0.5兆", remark: "Switch好調" },
        { period: "2023年3月期", revenue: "1.6兆", op: "0.5兆", net: "0.4兆", remark: "減収減益" },
        { period: "2024年3月期", revenue: "1.7兆", op: "0.5兆", net: "0.5兆", remark: "微増" },
        { period: "2025年3月期", revenue: "1.2兆", op: "0.3兆", net: "0.3兆", remark: "大幅減益" },
        { period: "2026年3月期(予)", revenue: "1.4兆", op: "0.4兆", net: "0.4兆", remark: "Switch 2効果" }
    ],
    "6861": [
        { period: "2022年3月期", revenue: "6,269億", op: "3,525億", net: "2,536億", remark: "高収益維持" },
        { period: "2023年3月期", revenue: "8,169億", op: "4,872億", net: "3,522億", remark: "過去最高" },
        { period: "2024年3月期", revenue: "9,164億", op: "5,639億", net: "4,079億", remark: "連続最高益" },
        { period: "2025年3月期", revenue: "9,500億", op: "5,800億", net: "4,200億", remark: "さらに増益" }
    ],
    "9983": [
        { period: "2022年8月期", revenue: "2.3兆", op: "2,971億", net: "2,374億", remark: "回復基調" },
        { period: "2023年8月期", revenue: "2.8兆", op: "3,810億", net: "3,152億", remark: "大幅増益" },
        { period: "2024年8月期", revenue: "3.1兆", op: "5,015億", net: "4,352億", remark: "過去最高益" },
        { period: "2025年8月期", revenue: "3.5兆", op: "6,000億", net: "5,200億", remark: "連続最高益" }
    ],
    "8306": [
        { period: "2022年3月期", revenue: "6.7兆", op: "12,865億", net: "1.2兆", remark: "好調" },
        { period: "2023年3月期", revenue: "9.4兆", op: "18,144億", net: "1.5兆", remark: "大幅増益" },
        { period: "2024年3月期", revenue: "10.8兆", op: "20,513億", net: "1.6兆", remark: "過去最高益" },
        { period: "2025年3月期", revenue: "11.5兆", op: "22,000億", net: "1.8兆", remark: "さらに増益" }
    ],
    "8035": [
        { period: "2022年3月期", revenue: "20,245億", op: "5,863億", net: "4,446億", remark: "半導体好調" },
        { period: "2023年3月期", revenue: "23,002億", op: "6,834億", net: "5,187億", remark: "過去最高" },
        { period: "2024年3月期", revenue: "22,407億", op: "6,237億", net: "4,748億", remark: "微減" },
        { period: "2025年3月期", revenue: "27,000億", op: "8,500億", net: "6,500億", remark: "大幅増益" }
    ],
    "9432": [
        { period: "2022年3月期", revenue: "12.0兆", op: "1.7兆", net: "0.9兆", remark: "堅調" },
        { period: "2023年3月期", revenue: "13.0兆", op: "1.9兆", net: "1.0兆", remark: "増収増益" },
        { period: "2024年3月期", revenue: "13.7兆", op: "2.1兆", net: "1.2兆", remark: "過去最高益" },
        { period: "2025年3月期", revenue: "14.0兆", op: "2.2兆", net: "1.3兆", remark: "連続最高益" }
    ],
    "8316": [
        { period: "2022年3月期", revenue: "5.8兆", op: "9,435億", net: "0.8兆", remark: "好調" },
        { period: "2023年3月期", revenue: "7.5兆", op: "12,157億", net: "1.0兆", remark: "大幅増益" },
        { period: "2024年3月期", revenue: "8.2兆", op: "13,405億", net: "1.1兆", remark: "過去最高益" },
        { period: "2025年3月期", revenue: "8.8兆", op: "14,500億", net: "1.2兆", remark: "さらに増益" }
    ],
    "6501": [
        { period: "2022年3月期", revenue: "10.3兆", op: "6,781億", net: "5,350億", remark: "構造改革効果" },
        { period: "2023年3月期", revenue: "10.9兆", op: "7,484億", net: "6,056億", remark: "増収増益" },
        { period: "2024年3月期", revenue: "11.6兆", op: "8,612億", net: "7,012億", remark: "過去最高益" },
        { period: "2025年3月期", revenue: "12.0兆", op: "9,000億", net: "7,500億", remark: "連続最高益" }
    ],
    "8001": [
        { period: "2022年3月期", revenue: "12.3兆", op: "5,813億", net: "8,203億", remark: "過去最高益" },
        { period: "2023年3月期", revenue: "14.2兆", op: "6,021億", net: "8,005億", remark: "高水準維持" },
        { period: "2024年3月期", revenue: "14.9兆", op: "6,500億", net: "8,500億", remark: "さらに増益" },
        { period: "2025年3月期", revenue: "15.5兆", op: "7,000億", net: "9,000億", remark: "連続最高益" }
    ]
};

const HistoricalDataTable = ({ data, symbol }: { data: any[], symbol: string }) => {
    // ヘッダー動的化
    const code = symbol.replace("TSE:", "");
    const isBank = ["8306", "8316"].includes(code);
    const isSBG = code === "9984";
    const isItochu = code === "8001";

    // データ単位の自動判別用 (最初の行で判定)
    const firstRow = data[0];
    const isTrillion = firstRow.revenue?.includes("兆") || false;
    const isBillion = firstRow.revenue?.includes("億") || false;

    let unitLabel = "(百万円)";
    if (isTrillion || isBillion) unitLabel = "(単位: そのまま)";

    return (
        <div className="bg-white p-3 md:p-5 rounded-xl border border-blue-100 shadow-sm overflow-hidden">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm md:text-base">
                <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                通期業績推移 {unitLabel}
            </h4>
            <div className="overflow-x-auto -mx-1 px-1">
                <table className="w-full text-[11px] md:text-sm text-left border-collapse">
                    <thead className="text-[10px] md:text-xs text-slate-500 uppercase bg-slate-50 border-y border-slate-100">
                        <tr>
                            <th className="px-2 md:px-4 py-2 md:py-3 font-bold min-w-[85px]">決算期</th>
                            <th className="px-2 md:px-4 py-2 md:py-3 font-bold text-right min-w-[70px]">{isBank || isItochu ? "収益" : "売上高"}</th>
                            <th className="px-2 md:px-4 py-2 md:py-3 font-bold text-right text-emerald-600 min-w-[70px]">
                                {isSBG ? "投資損益" : (isBank || isItochu ? "営業（経常）利益" : "営業利益")}
                            </th>
                            <th className="px-2 md:px-4 py-2 md:py-3 font-bold text-right text-blue-600 min-w-[70px]">
                                {isBank ? "当期利益" : "純利益"}
                            </th>
                            <th className="px-2 md:px-4 py-2 md:py-3 font-bold min-w-[100px]">備考</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {data.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-2 md:px-4 py-2 md:py-3 font-medium text-slate-900 whitespace-nowrap">{row.period}</td>
                                <td className="px-2 md:px-4 py-2 md:py-3 text-right font-mono whitespace-nowrap">{row.revenue}</td>
                                <td className="px-2 md:px-4 py-2 md:py-3 text-right font-mono text-emerald-600 whitespace-nowrap">{row.op}</td>
                                <td className="px-2 md:px-4 py-2 md:py-3 text-right font-mono text-blue-600 whitespace-nowrap">{row.net}</td>
                                <td className="px-2 md:px-4 py-2 md:py-3 text-slate-600 text-[10px] md:text-xs leading-relaxed">{row.remark}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const HistoricalPerformanceTable = ({ performance }: { performance: { tableTitle: string, headers: string[], rows: (string | number)[][] } }) => {
    return (
        <div className="bg-white p-3 md:p-5 rounded-xl border border-blue-100 shadow-sm overflow-hidden">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm md:text-base">
                <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                {performance.tableTitle}
            </h4>
            <div className="overflow-x-auto -mx-1 px-1">
                <table className="w-full text-[11px] md:text-sm text-left border-collapse">
                    <thead className="text-[10px] md:text-xs text-slate-500 uppercase bg-slate-50 border-y border-slate-100">
                        <tr>
                            {performance.headers.map((header, i) => (
                                <th
                                    key={i}
                                    className={`px-2 md:px-4 py-2 md:py-3 font-bold
                                        ${i > 0 && i < performance.headers.length - 1 ? "text-right" : ""}
                                        ${i === 0 ? "min-w-[85px]" : ""}
                                        ${i > 0 && i < performance.headers.length - 1 ? "min-w-[70px]" : ""}
                                        ${i === performance.headers.length - 1 ? "min-w-[100px]" : ""}
                                    `}
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {performance.rows.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                                {row.map((cell, j) => (
                                    <td
                                        key={j}
                                        className={`px-2 md:px-4 py-2 md:py-3
                                            ${j === 0 ? "font-medium text-slate-900 whitespace-nowrap" :
                                                (j === row.length - 1 ? "text-slate-600 text-[10px] md:text-xs leading-relaxed" : "text-right font-mono whitespace-nowrap")}`}
                                    >
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export const StockAnalysisSection = ({ symbol, activeScreener, financialDataMap }: StockAnalysisSectionProps) => {

    if (!symbol) return null;

    const normalizeSymbol = (s: string) => {
        if (!s) return "";
        let code = s.replace("TSE:", "");
        // Map NYSE/OTC ADRs to TSE codes for data lookup
        const adrToTse: Record<string, string> = {
            "NYSE:SONY": "6758",
            "NYSE:TM": "7203",
            "NYSE:MUFG": "8306",
            "NYSE:SMFG": "8316",
            "NYSE:HMC": "7267",
            "NYSE:MFG": "8411",
            "OTC:SFTBY": "9984",
            "OTC:NTDOY": "7974",
            "OTC:KYCCF": "6861",
            "OTC:FRCOY": "9983",
            "OTC:TOELF": "8035",
            "OTC:NTTYY": "9432",
            "OTC:HTHIY": "6501",
            "OTC:ITOCY": "8001"
        };
        return adrToTse[s] || code;
    };

    const getFinancialData = () => {
        const normalized = normalizeSymbol(symbol);
        const rawData = financialDataMap[symbol] || financialDataMap[normalized] || financialDataMap["NASDAQ:AAPL"];

        // 単位判定・正規化ヘルパー
        const parseNormalizedVal = (s: any, header: string = "") => {
            if (typeof s === "number") return s;
            if (!s || s === "---") return 0;
            let clean = s.toString().replace(/,/g, "").replace(/△/g, "-");

            // ヘッダーまたは値自体の単位を考慮
            const isTrillion = clean.includes("兆") || header.includes("兆");
            const isBillion = clean.includes("億") || header.includes("億");

            const valueStr = clean.replace("兆", "").replace("億", "");
            const num = parseFloat(valueStr);

            if (isNaN(num)) return 0;

            // すべて「億円」に正規化
            if (isTrillion) return num * 10000;

            // 単位がなく、かつカンマ付きの大きな数（例：455,200）なら百万円単位とみなして億円に変換
            if (!isTrillion && !isBillion && Math.abs(num) > 1000) {
                return num / 100;
            }

            return num;
        };

        if (rawData?.historicalPerformance) {
            const perf = rawData.historicalPerformance;
            const revIdx = perf.headers.findIndex(h => h.includes("売上") || h.includes("収益"));
            // 営業利益、または銀行向けの経常利益、または投資損益を探す
            const opIdx = perf.headers.findIndex(h => h.includes("営業利益") || h.includes("経常利益") || h.includes("投資損益") || h.includes("投資利益"));
            const netIdx = perf.headers.findIndex(h => h.includes("純利益") || h.includes("当期利益"));

            return {
                ...rawData,
                revenue: perf.rows.map(row => ({
                    quarter: row[0] as string,
                    value: revIdx !== -1 ? Math.round(parseNormalizedVal(row[revIdx], perf.headers[revIdx])) : 0
                })),
                profit: perf.rows.map(row => ({
                    quarter: row[0] as string,
                    operating: opIdx !== -1 ? Math.round(parseNormalizedVal(row[opIdx], perf.headers[opIdx])) : 0,
                    net: netIdx !== -1 ? Math.round(parseNormalizedVal(row[netIdx], perf.headers[netIdx])) : 0
                }))
            };
        }

        const code = symbol?.replace("TSE:", "");
        const hData = code ? HISTORICAL_FIN_DATA[code] : null;

        if (hData) {
            return {
                ...rawData,
                revenue: hData.map(d => ({
                    quarter: d.period,
                    value: Math.round(parseNormalizedVal(d.revenue))
                })),
                profit: hData.map(d => ({
                    quarter: d.period,
                    operating: Math.round(parseNormalizedVal(d.op)),
                    net: Math.round(parseNormalizedVal(d.net))
                }))
            };
        }
        return rawData;
    };

    const isSp500 = symbol === "FOREXCOM:SPXUSD";
    const isNikkei225 = symbol === "INDEX:NKY";
    const isAeroEdge = symbol === "7409";
    const isIndex = isSp500 || isNikkei225;

    // チャート用：日本株はADR×ドル円の計算式を返す
    const getChartSymbol = (s: string) => {
        const code = s.replace("TSE:", "");
        if (!/^[0-9]{4}$/.test(code)) return s;

        // 特定銘柄の例外処理 (ADR * USDJPY)
        const usdJpy = "FX_IDC:USDJPY";
        const exceptions: Record<string, string> = {
            // Main NYSE ADRs
            "7203": `NYSE:TM*${usdJpy}/10`,      // トヨタ
            "6758": `NYSE:SONY*${usdJpy}`,       // ソニーG
            "8306": `NYSE:MUFG*${usdJpy}`,       // 三菱UFJ
            "8316": `NYSE:SMFG*${usdJpy}/0.2`,   // 三井住友FG
            "7267": `NYSE:HMC*${usdJpy}/3`,      // ホンダ
            "8411": `NYSE:MFG*${usdJpy}/0.1`,    // みずほ
            "7974": `OTC:NTDOY*${usdJpy}*4`,     // 任天堂

            // OTC / Other
            "9984": `OTC:SFTBY*${usdJpy}*2`,     // ソフトバンクG
            "6861": `OTC:KYCCF*${usdJpy}`,       // キーエンス
            "9983": `OTC:FRCOY*${usdJpy}*10`,    // ファストリ

            // Default 1:1 assumptions
            "8035": `OTC:TOELF*${usdJpy}`,       // 東京エレク
            "9432": `OTC:NTTYY*${usdJpy}`,       // NTT
            "4568": `OTC:DSNKY*${usdJpy}`,       // 第一三共
            "6954": `OTC:FANUY*${usdJpy}`,       // ファナック
            "9433": `OTC:KDDIY*${usdJpy}`,       // KDDI
            "6098": `OTC:RCRUY*${usdJpy}`,       // リクルート
            "6501": `OTC:HTHIY*${usdJpy}`,       // 日立
            "8001": `OTC:ITOCY*${usdJpy}`,       // 伊藤忠
            "6902": `OTC:DNZOY*${usdJpy}`,       // デンソー
            "4063": `OTC:SHECY*${usdJpy}`,       // 信越化学
            "7409": "TSE:7409",                  // AeroEdge

            // 注目銘柄 (2026 Promising Stocks) - Display Fixes
            "5805": `OTC:SWCPF*${usdJpy}`,       // SWCC (Pink)
            "3778": `OTC:SKURF*${usdJpy}`,       // さくらインターネット (Pink)
            "5595": "TSE:464A",                  // QPS研究所 (Ticker Change)
            "1942": "TSE:1942",                  // 関電工 (Data Center / Electrical)
            "6506": `OTC:YASKY*${usdJpy}`,       // 安川電機 (ADR)
            "6965": `OTC:HPHTY*${usdJpy}`,       // 浜松ホトニクス (ADR)
            "5253": `OTC:COVCF*${usdJpy}`,       // カバー (Pink)
            "6315": `OTC:TOWCF*${usdJpy}`,       // TOWA (Pink)
            "6269": `OTC:MDIKY*${usdJpy}`,       // 三井海洋開発 (ADR)
            // Note: 6228 (JET) has no liquid OTC/ADR. Defaulting to TSE.
        };

        if (code in exceptions) {
            return exceptions[code];
        }

        return `TSE:${s.replace("TSE:", "")}`;
    };

    // 企業情報・決算用：日本株はTSE（東京証券取引所）のシンボルを返す
    // ※ADRの計算式を入れるとウィジェットが表示されないため、正規のTSEコードを使用
    const getCorporateSymbol = (s: string) => {
        const code = s.replace("TSE:", "");
        if (code === "5595") return "TSE:464A"; // QPS研究所 (Ticker Change)
        if (/^[0-9]{4}$/.test(code)) {
            return `TSE:${code}`;
        }
        return s;
    };

    // テクニカル分析用のシンボル変換（TSEデータが表示されないためADR/OTCを使用）
    const getTechnicalSymbol = (s: string) => {
        const code = s.replace("TSE:", "");
        if (!/^[0-9]{4}$/.test(code)) return s;

        const adrMap: Record<string, string> = {
            "7203": "NYSE:TM",    // トヨタ
            "6758": "NYSE:SONY",  // ソニーG
            "9984": "OTC:SFTBY",  // ソフトバンクG
            "8306": "NYSE:MUFG",  // 三菱UFJ
            "6861": "OTC:KYCCF",  // キーエンス
            "7974": "OTC:NTDOY",  // 任天堂
            "9983": "OTC:FRCOY",  // ファストリ
            "8035": "OTC:TOELF",  // 東京エレク
            "9432": "OTC:NTTYY",  // NTT
            "8316": "NYSE:SMFG",  // 三井住友FG
            "6501": "OTC:HTHIY",  // 日立製作所
            "8001": "OTC:ITOCY",  // 伊藤忠商事
            "6902": "OTC:DNZOY",  // デンソー
            "4063": "OTC:SHECY",  // 信越化学
            "8411": "NYSE:MFG",   // みずほFG
            "4568": "OTC:DSNKY",  // 第一三共
            "6954": "OTC:FANUY",  // ファナック
            "9433": "OTC:KDDIY",  // KDDI
            "6098": "OTC:RCRUY",  // リクルート
            "7267": "NYSE:HMC",   // ホンダ

            // 注目銘柄 (Promising Stocks) - Tech Analysis Fixes
            "5805": "OTC:SWCPF",  // SWCC
            "3778": "OTC:SKURF",  // さくらインターネット
            "5595": "TSE:464A",   // QPS研究所 (Ticker Change)
            "1942": "TSE:1942",                  // 関電工
            "6506": "OTC:YASKY",  // 安川電機
            "6965": "OTC:HPHTY",  // 浜松ホトニクス
            "5253": "OTC:COVCF",  // カバー
            "6315": "OTC:TOWCF",  // TOWA
        };

        return adrMap[code] || s; // マップになければそのまま（表示されない可能性あり）
    };

    return (
        <Card className="border-2 border-blue-200 shadow-lg">
            <CardContent className="p-4 space-y-8">
                {/* --- 1. チャート・トレンド領域 (Hero Section) --- */}
                <section>
                    <h3 className="font-bold text-lg text-slate-800 border-b pb-2 mb-4 flex items-center gap-2">
                        <LineChart className="w-5 h-5 text-blue-600" />
                        株価チャート・トレンド分析
                    </h3>

                    {/* メインチャート (Daily) */}
                    <div className="mb-6" style={{ height: getFinancialData().priceHistory ? "450px" : (isAeroEdge ? "400px" : "850px") }}>
                        {getFinancialData().priceHistory ? (
                            <div className="h-full p-4 bg-white rounded-lg border border-slate-200">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-lg text-slate-800">株価推移 (直近1年)</h3>
                                    <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">
                                        Based on closing price (JPY)
                                    </span>
                                </div>
                                <StockPriceChart
                                    data={getFinancialData().priceHistory || []}
                                    symbol={symbol}
                                    currency="JPY"
                                />
                            </div>
                        ) : isAeroEdge ? (
                            <TradingViewWidgetIframe
                                key={`main-chart-info-${symbol}`}
                                title="Symbol Info"
                                scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js"
                                config={{
                                    symbol: "TSE:7409",
                                    width: "100%",
                                    locale: "ja",
                                    colorTheme: "light",
                                    isTransparent: false
                                }}
                            />
                        ) : (
                            <TradingViewWidgetIframe
                                key={`main-chart-${symbol}`}
                                title="Advanced Chart"
                                scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js"
                                config={{
                                    autosize: true,
                                    symbol: getChartSymbol(symbol),
                                    interval: "D",
                                    timezone: activeScreener === "japan" ? "Asia/Tokyo" : "America/New_York",
                                    theme: "light",
                                    style: "1",
                                    locale: "ja",
                                    enable_publishing: false,
                                    allow_symbol_change: true,
                                    calendar: false,
                                    hide_top_toolbar: false,
                                    hide_legend: false,
                                    hide_side_toolbar: false,
                                    save_image: true,
                                    studies: [
                                        {
                                            id: "MASimple@tv-basicstudies",
                                            inputs: { length: 20 }
                                        },
                                        {
                                            id: "RSI@tv-basicstudies",
                                            inputs: { length: 20 }
                                        }
                                    ],
                                    withdateranges: true,
                                    details: true,
                                    hotlist: false,
                                    width: "100%",
                                    height: "100%"
                                }}
                            />
                        )}
                    </div>

                    {/* テクニカル分析 */}
                    {!isIndex && (
                        <div className="mb-4" style={{ height: "250px" }}>
                            <TradingViewWidgetIframe
                                key={`ta-${symbol}`}
                                title="Technical Analysis"
                                scriptSrc="https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js"
                                config={{
                                    interval: "1D",
                                    width: "100%",
                                    height: "100%",
                                    isTransparent: false,
                                    symbol: getTechnicalSymbol(symbol),
                                    showIntervalTabs: true,
                                    displayMode: "single",
                                    locale: "ja",
                                    colorTheme: "light"
                                }}
                            />
                        </div>
                    )}
                </section>

                {!isIndex && (() => {
                    const normalized = normalizeSymbol(symbol || "");
                    const hasDetailedData = !!japanStockDetailData[normalized];
                    const finData = getFinancialData();

                    return (
                        <>
                            {/* Standard Profile Section */}
                            <section className="border-t pt-8">
                                <h3 className="font-bold text-lg text-slate-800 border-b pb-2 mb-4 flex items-center gap-2">
                                    <Building className="w-5 h-5 text-amber-600" />
                                    企業情報・プロフィール
                                </h3>
                                <div className="flex flex-col gap-6">
                                    {/* 上段: プロフィール + セグメント構成 */}
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                        <div className="lg:col-span-2">
                                            {(() => {
                                                const stockDetail = japanStockDetailData[normalized];
                                                const promising = promisingStocks2026.find(s => s.symbol === normalized);

                                                return (
                                                    <div className="bg-white p-4 sm:p-6 rounded-2xl border border-blue-100 shadow-sm h-full flex flex-col">
                                                        <div className="flex items-center justify-between mb-4 sm:mb-6">
                                                            <div className="flex items-center gap-2 sm:gap-3">
                                                                <div className="bg-slate-100 p-2 sm:p-2.5 rounded-xl border border-slate-200">
                                                                    <div className="w-4 h-4 sm:w-5 h-5 bg-blue-600 rounded-sm" />
                                                                </div>
                                                                <div>
                                                                    <h4 className="text-lg sm:text-xl font-bold text-slate-900 border-none pb-0 mb-0">
                                                                        {stockDetail?.name || normalized} のプロフィール
                                                                    </h4>
                                                                    <div className="flex items-center gap-2 mt-2">
                                                                        <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded uppercase tracking-wider border border-slate-200">
                                                                            コード: {normalized}
                                                                        </span>
                                                                        {stockDetail?.market && (
                                                                            <span className="text-xs font-bold bg-blue-50 text-blue-600 px-2.5 py-1 rounded uppercase tracking-wider border border-blue-100">
                                                                                市場: {stockDetail.market}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-6 sm:space-y-8">
                                                            {(stockDetail?.businessProfile || promising?.description || promising?.theme) && (
                                                                <div className="bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-blue-100 relative overflow-hidden shadow-sm">
                                                                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                                                                    <div className="text-[10px] sm:text-xs font-black text-blue-600 mb-1.5 sm:mb-2 flex items-center gap-2 uppercase tracking-[0.15em]">
                                                                        企業プロフィール
                                                                    </div>
                                                                    <p className="text-sm sm:text-[15px] text-slate-800 leading-relaxed font-semibold">
                                                                        {stockDetail?.businessProfile || promising?.description}
                                                                        {promising?.theme && (
                                                                            <span className="block mt-2 text-xs sm:text-sm text-slate-500 font-medium bg-white/50 py-0.5 sm:py-1 px-2 sm:px-3 rounded-lg border border-slate-100 inline-block">
                                                                                関連テーマ: {promising.theme}
                                                                            </span>
                                                                        )}
                                                                    </p>
                                                                </div>
                                                            )}


                                                            {!promising && !stockDetail && (
                                                                <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                                                    <div className="p-3 bg-white rounded-full shadow-sm mb-3">
                                                                        <BookOpen className="w-6 h-6 text-slate-400" />
                                                                    </div>
                                                                    <p className="text-sm text-slate-500 font-medium">基本情報を準備中です</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })()}
                                        </div>
                                        <div className="lg:col-span-1">
                                            {finData?.segments && (
                                                <div className="bg-white p-6 rounded-2xl border border-blue-50 shadow-sm overflow-hidden flex flex-col h-full">
                                                    <h4 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                                                        <LucidePieChart className="w-5 h-5 text-indigo-600" />
                                                        セグメント構成
                                                    </h4>
                                                    <div className="flex-grow flex items-center justify-center">
                                                        <div className="w-full h-[220px]">
                                                            <ResponsiveContainer width="100%" height="100%">
                                                                <PieChart>
                                                                    <Pie
                                                                        data={finData.segments}
                                                                        cx="50%"
                                                                        cy="50%"
                                                                        innerRadius={50}
                                                                        outerRadius={70}
                                                                        paddingAngle={5}
                                                                        dataKey="value"
                                                                        label={({ name, value }) => `${name}: ${value}%`}
                                                                        labelLine={false}
                                                                    >
                                                                        {finData.segments.map((entry: any, index: number) => (
                                                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                                                        ))}
                                                                    </Pie>
                                                                    <Tooltip />
                                                                    <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '11px' }} />
                                                                </PieChart>
                                                            </ResponsiveContainer>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {hasDetailedData && (
                                <div className="border-t pt-8 space-y-8">
                                    <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                        <Sparkles className="w-6 h-6 text-blue-600" />
                                        詳細財務・バリュエーション分析
                                    </h3>
                                    <StockAnalysisVisualizer code={normalized} isInline={true} />
                                </div>
                            )}

                            {finData?.incomeStatement && (
                                <VisualIncomeStatement
                                    data={finData.incomeStatement}
                                    symbol={symbol}
                                    period="直近12ヶ月 (TTM)"
                                    currency={finData.currency === "JPY" || finData.currency === "JPY_Oku" ? "¥" : "$"}
                                    unit={finData.currency === "JPY" || finData.currency === "JPY_Oku" ? "億円" : "百万"}
                                    exchangeRate={finData.currency === "JPY" || finData.currency === "JPY_Oku" ? undefined : 155}
                                    analysis={finData.incomeStatement.analysis}
                                />
                            )}
                            <div className="grid grid-cols-1 gap-8">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {finData?.balanceSheet && (
                                        <VisualBalanceSheet
                                            data={finData.balanceSheet}
                                            symbol={symbol}
                                            period="直近四半期"
                                            currency={finData.currency === "JPY" || finData.currency === "JPY_Oku" ? "¥" : "$"}
                                            unit={finData.currency === "JPY" || finData.currency === "JPY_Oku" ? "億円" : "百万"}
                                            exchangeRate={finData.currency === "JPY" || finData.currency === "JPY_Oku" ? undefined : 155}
                                        />
                                    )}
                                    {finData?.cashFlow && (
                                        <VisualCashFlow
                                            data={finData.cashFlow}
                                            symbol={symbol}
                                            period="直近12ヶ月 (TTM)"
                                            currency={finData.currency === "JPY" || finData.currency === "JPY_Oku" ? "¥" : "$"}
                                            unit={finData.currency === "JPY" || finData.currency === "JPY_Oku" ? "億円" : "百万"}
                                            exchangeRate={finData.currency === "JPY" || finData.currency === "JPY_Oku" ? undefined : 155}
                                        />
                                    )}
                                </div>
                            </div>
                        </>
                    );
                })()}

                {/* --- 4. 採用銘柄一覧 (指数のみ) --- */}
                {isIndex && (
                    <section className="border-t pt-8">
                        <h3 className="font-bold text-lg text-slate-800 border-b pb-2 mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-amber-600" />
                            {isSp500 ? "S&P 500 採用銘柄一覧" : "日経225 採用銘柄一覧"}
                        </h3>
                        <div className="border rounded-lg overflow-hidden shadow-sm">
                            <div className="bg-slate-100 p-3 grid grid-cols-12 gap-4 font-bold text-slate-700 border-b text-sm">
                                <div className="col-span-3">シンボル</div>
                                <div className="col-span-9">企業名</div>
                            </div>
                            <div className="max-h-[600px] overflow-y-auto bg-white">
                                {(isSp500 ? sp500Stocks : nikkei225Stocks).map((stock, idx) => (
                                    <div
                                        key={stock.symbol}
                                        className={`grid grid-cols-12 gap-4 p-3 border-b text-sm hover:bg-slate-50 transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
                                    >
                                        <div className="col-span-3 font-medium text-blue-600">{stock.symbol}</div>
                                        <div className="col-span-9 text-slate-800">{stock.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* --- 5. 外部リンク --- */}
                {!isIndex && (
                    <section className="border-t pt-8">
                        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 shadow-sm">
                            <div className="flex items-center justify-between flex-wrap gap-6">
                                <div>
                                    <h4 className="font-bold text-lg text-blue-800 flex items-center gap-2">
                                        <TrendingUp className="w-6 h-6" />
                                        TradingViewで詳細な財務分析をチェック
                                    </h4>
                                    <p className="text-slate-600 mt-2">
                                        評価、成長性、収益性、配当、財務健全性などのインタラクティブ・チャートを確認できます。
                                    </p>
                                </div>
                                <a
                                    href={`https://jp.tradingview.com/symbols/${symbol?.replace(":", "-")}/financials-overview/`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-bold shadow-md hover:shadow-lg active:scale-95"
                                >
                                    <Globe className="w-5 h-5" />
                                    TradingViewで開く
                                </a>
                            </div>
                        </div>
                    </section>
                )}
            </CardContent>
        </Card >
    );
};
