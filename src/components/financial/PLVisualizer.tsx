import { ArrowRight, TrendingDown } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface PLData {
  revenue: number;
  cogs: number;
  grossProfit: number;
  sga: number;
  operatingProfit: number;
  nonOperatingIncome: number;
  nonOperatingExpenses: number;
  ordinaryProfit: number;
  extraordinaryIncome: number;
  extraordinaryLoss: number;
  preTaxProfit: number;
  taxes: number;
  netProfit: number;
}

interface PLVisualizerProps {
  data: PLData;
  className?: string;
}

const PLVisualizer = ({ data, className = "" }: PLVisualizerProps) => {
  // Calculate percentages for height (relative to Revenue)
  const getHeight = (value: number) => {
    const percentage = (value / data.revenue) * 100;
    return Math.max(percentage, 5); // Minimum 5% for visibility
  };

  // Helper format function
  const format = (val: number) => `¥${val.toLocaleString()}`;

  // Calculate profit margin percentage
  const getMargin = (profit: number) => {
    return ((profit / data.revenue) * 100).toFixed(1);
  };

  const bars = [
    {
      id: 1,
      label: "売上高",
      value: data.revenue,
      height: 100,
      bgColor: "bg-gradient-to-t from-blue-500 to-blue-400",
      borderColor: "border-blue-300",
      badgeColor: "bg-blue-500",
      tooltip: "企業の稼ぐ力（商品力 × 販売力）",
      deduction: null,
      margin: "100.0",
    },
    {
      id: 2,
      label: "売上総利益",
      sublabel: "(粗利)",
      value: data.grossProfit,
      height: getHeight(data.grossProfit),
      bgColor: "bg-gradient-to-t from-green-500 to-green-400",
      borderColor: "border-green-300",
      badgeColor: "bg-green-500",
      tooltip: "商品力・サービスの付加価値",
      deduction: `売上原価 ${format(data.cogs)}`,
      margin: getMargin(data.grossProfit),
    },
    {
      id: 3,
      label: "営業利益",
      value: data.operatingProfit,
      height: getHeight(data.operatingProfit),
      bgColor: "bg-gradient-to-t from-orange-500 to-orange-400",
      borderColor: "border-orange-300",
      badgeColor: "bg-orange-500",
      tooltip: "本業の実力",
      deduction: `販管費 ${format(data.sga)}`,
      margin: getMargin(data.operatingProfit),
    },
    {
      id: 4,
      label: "経常利益",
      value: data.ordinaryProfit,
      height: getHeight(data.ordinaryProfit),
      bgColor: "bg-gradient-to-t from-indigo-500 to-indigo-400",
      borderColor: "border-indigo-300",
      badgeColor: "bg-indigo-500",
      tooltip: "会社の総合力（財務活動含む）",
      deduction: `営業外損益`,
      margin: getMargin(data.ordinaryProfit),
    },
    {
      id: 5,
      label: "税引前利益",
      value: data.preTaxProfit,
      height: getHeight(data.preTaxProfit),
      bgColor: "bg-gradient-to-t from-cyan-500 to-cyan-400",
      borderColor: "border-cyan-300",
      badgeColor: "bg-cyan-500",
      tooltip: "全ての収益・費用を含めた利益",
      deduction: `特別損益`,
      margin: getMargin(data.preTaxProfit),
    },
    {
      id: 6,
      label: "当期純利益",
      value: data.netProfit,
      height: getHeight(data.netProfit),
      bgColor: "bg-gradient-to-t from-rose-500 to-rose-400",
      borderColor: "border-rose-300",
      badgeColor: "bg-rose-500",
      tooltip: "最終利益（株主の取り分）",
      deduction: `法人税等 ${format(data.taxes)}`,
      margin: getMargin(data.netProfit),
    },
  ];

  return (
    <div className={`w-full font-sans ${className}`}>
      <TooltipProvider>
        {/* Chart Container */}
        <div className="relative bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 md:p-10 shadow-lg border border-slate-200 overflow-x-auto">

          {/* Grid Background */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="h-full w-full" style={{
              backgroundImage: 'linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}></div>
          </div>

          {/* Chart */}
          <div className="relative flex items-end justify-center gap-4 md:gap-8 min-w-[900px] pb-6 pt-20">
            {bars.map((bar, index) => (
              <div key={bar.id} className="flex items-end gap-3 md:gap-5">
                {/* Bar Column */}
                <div className="flex flex-col items-center justify-end w-[110px] md:w-[130px] relative group" style={{ height: '500px' }}>

                  {/* Number Badge */}
                  <div className={`absolute -top-12 left-1/2 -translate-x-1/2 w-11 h-11 rounded-full ${bar.badgeColor} text-white flex items-center justify-center font-bold shadow-lg z-20 border-4 border-white transform transition-transform group-hover:scale-110`}>
                    {bar.id}
                  </div>

                  {/* Deduction Label */}
                  {bar.deduction && (
                    <div className="absolute left-1/2 -translate-x-1/2 w-full" style={{ bottom: `calc(${bar.height}% + 16px)` }}>
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <TrendingDown className="w-3 h-3 text-red-400 flex-shrink-0" />
                        <span className="text-xs text-slate-600 font-medium bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm whitespace-nowrap border border-slate-200">
                          {bar.deduction}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Bar */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="relative w-full cursor-pointer">
                        <div
                          style={{ height: `${bar.height}%` }}
                          className={`w-full rounded-t-xl ${bar.bgColor} shadow-xl transition-all duration-500 ease-out relative overflow-hidden border-t-4 ${bar.borderColor} group-hover:shadow-2xl group-hover:brightness-110`}
                        >
                          {/* Shine Effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                          {/* Percentage Badge */}
                          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/25 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                            {bar.margin}%
                          </div>

                          {/* Animated Gradient Overlay for Last Bar */}
                          {bar.id === 6 && (
                            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-white/20 to-transparent animate-pulse"></div>
                          )}
                        </div>

                        {/* Base Shadow */}
                        <div className="absolute -bottom-1 left-0 right-0 h-2 bg-gradient-to-b from-black/10 to-transparent rounded-b-lg"></div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-slate-900 text-white border-none shadow-xl max-w-xs">
                      <div className="text-center">
                        <p className="font-bold mb-1">{bar.label}</p>
                        <p className="text-sm opacity-90">{bar.tooltip}</p>
                        <p className="text-xs mt-1 opacity-75">利益率: {bar.margin}%</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>

                  {/* Label */}
                  <div className="text-center mt-5 space-y-1.5">
                    <div className="font-bold text-sm md:text-base text-slate-700 leading-tight min-h-[2.5rem] flex flex-col items-center justify-center">
                      <span>{bar.label}</span>
                      {bar.sublabel && <span className="text-xs text-slate-500">{bar.sublabel}</span>}
                    </div>
                    <div className="font-bold text-base md:text-lg text-slate-900">
                      {format(bar.value)}
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                {index < bars.length - 1 && (
                  <div className="flex items-center justify-center pb-24" style={{ height: '500px' }}>
                    <div className="relative">
                      <ArrowRight className="text-slate-300 w-7 h-7 md:w-9 md:h-9" />
                      <div className="absolute inset-0 blur-sm opacity-50">
                        <ArrowRight className="text-slate-200 w-7 h-7 md:w-9 md:h-9" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-10 pt-6 border-t border-slate-200 flex flex-wrap justify-center gap-5 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-400 shadow-sm"></div>
              <span>売上規模</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-green-500 to-green-400 shadow-sm"></div>
              <span>商品力</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-orange-500 to-orange-400 shadow-sm"></div>
              <span>本業の力</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-br from-rose-500 to-rose-400 shadow-sm"></div>
              <span>最終利益</span>
            </div>
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default PLVisualizer;
