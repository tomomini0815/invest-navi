
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, ArrowUpDown, Scale } from "lucide-react";

export interface ComparisonRow {
  id: string;
  name: string;
  logoText: string;
  detailUrl: string;
  affiliateUrl: string;
  overallRating: number;
  overallRatingText: string;
  transactionUnit: number;
  transactionUnitText: string;
  appUsability: number;
  appUsabilityText: string;
  demoPeriod: string;
  cashback: number;
  cashbackText: string;
  features: string;
  tableFeatures?: string;
  campaign?: string;
  // Spreads (Values for sorting, Text for display)
  spreadUsdJpy: number;
  spreadUsdJpyText: string;
  spreadEurJpy: number;
  spreadEurJpyText: string;
  spreadGbpJpy: number;
  spreadGbpJpyText: string;
  spreadAudJpy: number;
  spreadAudJpyText: string;
  spreadEurUsd: number;
  spreadEurUsdText: string;
  // New Enhanced Fields
  goodPoints?: string[];
  startGuideSteps?: { title: string; description: React.ReactNode }[];
  guideTitle?: string;
  guideDescription?: string;
}

interface ComparisonTableProps {
  data: ComparisonRow[];
}

type SortKey = "overallRating" | "transactionUnit" | "appUsability" | "cashback" | "spreadUsdJpy" | "spreadEurJpy" | "spreadGbpJpy" | "spreadAudJpy" | "spreadEurUsd" | "demoPeriod";
type SortDirection = "asc" | "desc";
type TabType = "overall" | "spread";

const ComparisonTable = ({ data }: ComparisonTableProps) => {
  const [activeTab, setActiveTab] = useState<TabType>("overall");
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection } | null>(null);

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
    if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (key: SortKey) => {
    let direction: SortDirection = "asc"; // Default asc for spreads (lower is better)
    // For ratings/cashback, default desc (higher is better)
    if (["overallRating", "appUsability", "cashback"].includes(key)) {
      direction = "desc";
    }

    if (sortConfig && sortConfig.key === key) {
      // Toggle
      direction = sortConfig.direction === "asc" ? "desc" : "asc";
    }
    setSortConfig({ key, direction });
  };

  const SortIcon = ({ columnKey }: { columnKey: SortKey }) => {
    if (sortConfig?.key !== columnKey) return <ArrowUpDown className="w-4 h-4 text-white/50 ml-1.5 inline transition-colors hover:text-white" />;
    return sortConfig.direction === "asc" ? <ChevronUp className="w-4 h-4 ml-1.5 inline text-white font-bold" /> : <ChevronDown className="w-4 h-4 ml-1.5 inline text-white font-bold" />;
  };

  const renderRatingIcon = (score: number) => {
    if (score >= 5) return <span className="text-red-500 font-bold text-lg">◎</span>;
    if (score >= 4) return <span className="text-orange-500 font-bold text-lg">○</span>;
    return <span className="text-gray-500 font-bold text-lg">△</span>;
  };

  const getSpreadIcon = (value: number, type: "usd" | "eur" | "aud" | "gbp" | "eurusd") => {
    // Thresholds
    const thresholds = {
      usd: { full: 0.2, mid: 0.3 }, // <= 0.2: ◎, <= 0.3: ○
      eur: { full: 0.4, mid: 0.5 },
      aud: { full: 0.5, mid: 0.6 },
      gbp: { full: 0.9, mid: 1.0 },
      eurusd: { full: 0.3, mid: 0.4 }
    };

    const t = thresholds[type];
    if (value <= t.full) return <span className="text-red-500 font-bold text-lg">◎</span>;
    if (value <= t.mid) return <span className="text-orange-500 font-bold text-lg">○</span>;
    return <span className="text-gray-500 font-bold text-lg">△</span>;
  };

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-wide flex items-center justify-center gap-2 mb-2">
          <Scale className="w-8 h-8 text-emerald-600" />
          FX口座<span className="text-emerald-600 text-5xl font-extrabold -mt-2 mx-1">12</span>社を徹底比較
        </h2>
        <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
          <span>▼</span> 項目名をクリックすると並び替えができます
        </p>
      </div>

      {/* Tabs - Integrated Design */}
      <div className="bg-emerald-50 rounded-t-xl p-2 border-t border-x border-emerald-100 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.02)]">
        <div className="flex bg-emerald-100/50 rounded-lg p-1 gap-1">
          <button
            onClick={() => setActiveTab("overall")}
            className={`flex-1 py-3 text-sm sm:text-base font-bold text-center rounded-md transition-all shadow-sm ${activeTab === "overall" ? "bg-white text-emerald-700 shadow" : "text-emerald-600 hover:bg-white/50 hover:text-emerald-700"
              }`}
          >
            総合評価
          </button>
          <button
            onClick={() => setActiveTab("spread")}
            className={`flex-1 py-3 text-sm sm:text-base font-bold text-center rounded-md transition-all shadow-sm ${activeTab === "spread" ? "bg-white text-emerald-700 shadow" : "text-emerald-600 hover:bg-white/50 hover:text-emerald-700"
              }`}
          >
            スプレッド <span className="text-xs font-normal opacity-80">※原則固定</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto shadow-lg border-l border-r border-b border-gray-200 bg-white">
        <table className="w-full text-sm text-left border-collapse min-w-[900px]">
          <thead className="text-xs text-white uppercase bg-emerald-600">
            <tr>
              <th className="px-4 py-3 w-[140px] text-center border-r border-emerald-500">FX会社</th>

              {activeTab === "overall" ? (
                <>
                  <th className="px-2 py-3 w-[100px] text-center border-r border-emerald-500 cursor-pointer hover:bg-emerald-700" onClick={() => handleSort("overallRating")}>
                    総合評価<br /><span className="text-[10px] opacity-90"><SortIcon columnKey="overallRating" /></span>
                  </th>
                  <th className="px-2 py-3 w-[100px] text-center border-r border-emerald-500 cursor-pointer hover:bg-emerald-700" onClick={() => handleSort("transactionUnit")}>
                    取引単位<br /><span className="text-[10px] opacity-90"><SortIcon columnKey="transactionUnit" /></span>
                  </th>
                  <th className="px-2 py-3 w-[100px] text-center border-r border-emerald-500 cursor-pointer hover:bg-emerald-700" onClick={() => handleSort("appUsability")}>
                    アプリ<br /><span className="text-[10px] opacity-90"><SortIcon columnKey="appUsability" /></span>
                  </th>
                  <th className="px-2 py-3 w-[100px] text-center border-r border-emerald-500 cursor-pointer hover:bg-emerald-700" onClick={() => handleSort("demoPeriod")}>
                    デモ取引<br />(期間)<span className="text-[10px] opacity-90"><SortIcon columnKey="demoPeriod" /></span>
                  </th>
                  <th className="px-2 py-3 w-[110px] text-center border-r border-emerald-500 cursor-pointer hover:bg-emerald-700" onClick={() => handleSort("cashback")}>
                    キャッシュ<br />バック<span className="text-[10px] opacity-90"><SortIcon columnKey="cashback" /></span>
                  </th>
                  <th className="px-4 py-3 text-center border-r border-emerald-500">
                    特徴・おすすめの人
                  </th>
                </>
              ) : (
                <>
                  <th className="px-2 py-3 text-center border-r border-emerald-500 cursor-pointer hover:bg-emerald-700" onClick={() => handleSort("spreadUsdJpy")}>
                    米ドル/円<br /><span className="text-[10px] opacity-90"><SortIcon columnKey="spreadUsdJpy" /></span>
                  </th>
                  <th className="px-2 py-3 text-center border-r border-emerald-500 cursor-pointer hover:bg-emerald-700" onClick={() => handleSort("spreadEurJpy")}>
                    ユーロ/円<br /><span className="text-[10px] opacity-90"><SortIcon columnKey="spreadEurJpy" /></span>
                  </th>
                  <th className="px-2 py-3 text-center border-r border-emerald-500 cursor-pointer hover:bg-emerald-700" onClick={() => handleSort("spreadAudJpy")}>
                    豪ドル/円<br /><span className="text-[10px] opacity-90"><SortIcon columnKey="spreadAudJpy" /></span>
                  </th>
                  <th className="px-2 py-3 text-center border-r border-emerald-500 cursor-pointer hover:bg-emerald-700" onClick={() => handleSort("spreadGbpJpy")}>
                    ポンド/円<br /><span className="text-[10px] opacity-90"><SortIcon columnKey="spreadGbpJpy" /></span>
                  </th>
                  <th className="px-2 py-3 text-center border-r border-emerald-500 cursor-pointer hover:bg-emerald-700" onClick={() => handleSort("spreadEurUsd")}>
                    ユーロ/米ドル<br /><span className="text-[10px] opacity-90"><SortIcon columnKey="spreadEurUsd" /></span>
                  </th>
                </>
              )}

              <th className="px-4 py-3 w-[120px] text-center">
                口座開設
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {sortedData.map((item, index) => (
              <tr key={item.id} className={`border-b border-gray-200 hover:bg-emerald-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                {/* Company Name & Logo */}
                <td className="px-4 py-4 border-r border-gray-200 text-center">
                  <div className="font-bold text-gray-800 text-base mb-1">{item.logoText}</div>
                  {item.id === "hirose" ? (
                    <div className="relative inline-block">
                      <a href="https://px.a8.net/svt/ejp?a8mat=45I5TK+6AU69E+1FOU+6BU5T" rel="nofollow" target="_blank" className="text-xs text-blue-600 hover:underline font-medium hover:text-blue-800 transition-colors">
                        {item.name} &gt;
                      </a>
                      <img style={{ border: 'none', position: 'absolute', width: 1, height: 1, opacity: 0 }} src="https://www18.a8.net/0.gif?a8mat=45I5TK+6AU69E+1FOU+6BU5T" alt="" />
                    </div>
                  ) : (
                    <a href={item.affiliateUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline font-medium hover:text-blue-800 transition-colors">
                      {item.name} &gt;
                    </a>
                  )}
                </td>

                {activeTab === "overall" ? (
                  <>
                    {/* Overall Rating */}
                    <td className="px-2 py-4 border-r border-gray-200 text-center">
                      <div className="flex flex-col items-center">
                        {renderRatingIcon(item.overallRating)}
                        <span className="text-xs font-bold text-gray-600 mt-1">{item.overallRatingText}</span>
                      </div>
                    </td>
                    {/* Transaction Unit */}
                    <td className="px-2 py-4 border-r border-gray-200 text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-red-500 text-lg font-bold">{item.transactionUnit <= 1000 ? "◎" : "○"}</span>
                        <span className="text-xs text-gray-600 mt-1">{item.transactionUnitText}</span>
                      </div>
                    </td>
                    {/* App Usability */}
                    <td className="px-2 py-4 border-r border-gray-200 text-center">
                      <div className="flex flex-col items-center">
                        {renderRatingIcon(item.appUsability)}
                        <span className="text-xs text-gray-600 mt-1">{item.appUsabilityText}</span>
                      </div>
                    </td>
                    {/* Demo Trade */}
                    <td className="px-2 py-4 border-r border-gray-200 text-center">
                      <div className="flex flex-col items-center">
                        <span className={`text-lg font-bold ${item.demoPeriod.includes("なし") || item.demoPeriod === "未対応" ? "text-gray-400" : "text-red-500"}`}>
                          {item.demoPeriod.includes("なし") || item.demoPeriod === "未対応" ? "△" : "◎"}
                        </span>
                        <span className="text-xs text-gray-600 mt-1">{item.demoPeriod}</span>
                      </div>
                    </td>
                    {/* Cashback */}
                    <td className="px-2 py-4 border-r border-gray-200 text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-red-500 text-lg font-bold">◎</span>
                        <span className="text-xs font-bold text-red-600 mt-1">{item.cashbackText}</span>
                      </div>
                    </td>
                    {/* Features */}
                    <td className="px-4 py-4 border-r border-gray-200 text-left">
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
                        {item.tableFeatures || item.features}
                      </p>
                    </td>
                  </>
                ) : (
                  <>
                    {/* Spreads */}
                    <td className="px-2 py-4 border-r border-gray-200 text-center">
                      <div className="flex flex-col items-center">
                        {getSpreadIcon(item.spreadUsdJpy, "usd")}
                        <span className="text-sm font-bold text-gray-800">{item.spreadUsdJpyText}</span>
                      </div>
                    </td>
                    <td className="px-2 py-4 border-r border-gray-200 text-center">
                      <div className="flex flex-col items-center">
                        {getSpreadIcon(item.spreadEurJpy, "eur")}
                        <span className="text-sm font-bold text-gray-800">{item.spreadEurJpyText}</span>
                      </div>
                    </td>
                    <td className="px-2 py-4 border-r border-gray-200 text-center">
                      <div className="flex flex-col items-center">
                        {getSpreadIcon(item.spreadAudJpy, "aud")}
                        <span className="text-sm font-bold text-gray-800">{item.spreadAudJpyText}</span>
                      </div>
                    </td>
                    <td className="px-2 py-4 border-r border-gray-200 text-center">
                      <div className="flex flex-col items-center">
                        {getSpreadIcon(item.spreadGbpJpy, "gbp")}
                        <span className="text-sm font-bold text-gray-800">{item.spreadGbpJpyText}</span>
                      </div>
                    </td>
                    <td className="px-2 py-4 border-r border-gray-200 text-center">
                      <div className="flex flex-col items-center">
                        {getSpreadIcon(item.spreadEurUsd, "eurusd")}
                        <span className="text-sm font-bold text-gray-800">{item.spreadEurUsdText}</span>
                      </div>
                    </td>
                  </>
                )}

                {/* CTA */}
                <td className="px-3 py-4 text-center">
                  {item.campaign && (
                    <div className="text-[10px] text-orange-700 font-bold mb-1 border border-orange-200 bg-orange-50 rounded px-1">
                      {item.campaign}
                    </div>
                  )}
                  {item.id === "hirose" ? (
                    <div className="relative w-full">
                      <Button
                        asChild
                        size="sm"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-9 shadow-sm"
                      >
                        <a href="https://px.a8.net/svt/ejp?a8mat=45I5TK+6AU69E+1FOU+6BU5T" rel="nofollow" target="_blank">
                          公式サイトへ
                        </a>
                      </Button>
                      <img style={{ border: 'none', position: 'absolute', width: 1, height: 1, opacity: 0 }} src="https://www18.a8.net/0.gif?a8mat=45I5TK+6AU69E+1FOU+6BU5T" alt="" />
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => window.open(item.affiliateUrl, '_blank')}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-9 shadow-sm"
                    >
                      公式サイトへ
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonTable;