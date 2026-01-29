import { Link } from "react-router-dom";
import { Check, ArrowUpDown } from "lucide-react";
import { Company } from "./SurveyDiagnostic";

interface CryptoComparisonTableProps {
  data: Company[];
}

const getDetailUrl = (name: string) => {
  if (name.includes("GMO")) return "/crypto/gmo-coin";
  if (name.includes("Coincheck")) return "/crypto/coincheck";
  if (name.includes("bitFlyer")) return "/crypto/bitflyer";
  if (name.includes("DMM")) return "/crypto/dmm-bitcoin";
  if (name.includes("SBI")) return "/crypto/sbi-vc-trade";
  if (name.includes("BitTrade")) return "/crypto/bittrade";
  if (name.includes("BITPOINT")) return "/crypto/bitpoint";
  return "#";
};

export const CryptoComparisonTable = ({ data }: CryptoComparisonTableProps) => {
  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight sm:tracking-wide flex items-center justify-center gap-1 sm:gap-2 mb-2 whitespace-nowrap overflow-hidden">
          <span>主要取引所</span>
          <span className="text-emerald-600 text-3xl sm:text-5xl font-extrabold sm:-mt-2 mx-0.5">{data.length}</span>
          <span>社を徹底比較</span>
        </h2>

      </div>

      <div className="bg-emerald-50 rounded-t-xl p-2 border-t border-x border-emerald-100 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.02)]">
        <div className="flex bg-emerald-100/50 rounded-lg p-1 gap-1">
          <div className="flex-1 py-3 text-sm sm:text-base font-bold text-center rounded-md transition-all shadow-sm bg-white text-emerald-700 shadow">
            手数料・取扱・サービス
          </div>
        </div>
      </div>

      <div className="overflow-x-auto shadow-lg border-l border-r border-b border-gray-200 bg-white">
        <table className="w-full text-sm text-left border-collapse min-w-[1000px]">
          <thead className="text-xs text-white uppercase bg-emerald-600">
            <tr>
              <th className="px-2 py-3 w-[130px] text-center border-r border-emerald-500">取引所</th>
              <th className="px-2 py-3 min-w-[140px] text-center border-r border-emerald-500">取引手数料</th>
              <th className="px-2 py-3 min-w-[110px] text-center border-r border-emerald-500">送金手数料</th>
              <th className="px-2 py-3 min-w-[90px] text-center border-r border-emerald-500">取扱通貨</th>
              <th className="px-2 py-3 min-w-[90px] text-center border-r border-emerald-500">アプリ</th>
              <th className="px-2 py-3 text-center border-r border-emerald-500">取扱サービス</th>
              <th className="px-2 py-3 min-w-[180px] text-center border-r border-emerald-500">特徴</th>
              <th className="px-2 py-3 w-[150px] text-center">口座開設</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((company, index) => {
              const fee = company.specs.find(s => s.label === "取引手数料")?.value || "-";
              const transferFee = company.specs.find(s => s.label === "送金手数料")?.value || "-";
              const coins = company.specs.find(s => s.label === "取扱通貨数")?.value || "-";
              const app = company.specs.find(s => s.label === "アプリ")?.value || "-";
              const service = company.specs.find(s => s.label === "サービス")?.value || "-";

              return (
                <tr key={company.name} className={`border-b border-gray-200 hover:bg-emerald-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                  <td className="px-2 py-4 border-r border-gray-200 text-center">
                    <div className="font-bold text-gray-800 text-base mb-1">{company.name}</div>
                    <Link
                      to={getDetailUrl(company.name)}
                      className="text-xs text-blue-600 hover:underline font-medium hover:text-blue-800 transition-colors cursor-pointer block"
                    >
                      詳細 &gt;
                    </Link>
                  </td>
                  <td className="px-2 py-4 border-r border-gray-200 text-center">
                    <div className={`font-bold ${fee.includes("無料") ? "text-red-600" : "text-gray-700"}`}>
                      {fee.includes("無料") ? <span className="text-lg mr-1">◎</span> : null}
                      <div className="text-sm px-1">{fee}</div>
                    </div>
                  </td>
                  <td className="px-2 py-4 border-r border-gray-200 text-center text-gray-700 font-medium">
                    {transferFee}
                  </td>
                  <td className="px-2 py-4 border-r border-gray-200 text-center">
                    <div className="font-bold text-emerald-700 text-lg">{coins}</div>
                  </td>
                  <td className="px-2 py-4 border-r border-gray-200 text-center text-gray-700 text-sm">
                    {app}
                  </td>
                  <td className="px-2 py-4 border-r border-gray-200 text-left">
                    <p className="text-xs text-gray-700 leading-relaxed font-medium">
                      {service}
                    </p>
                  </td>
                  <td className="px-2 py-4 border-r border-gray-200 text-left">
                    <ul className="text-xs text-gray-600 space-y-1">
                      {company.points.slice(0, 3).map((point, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <span className="text-emerald-500 font-bold shrink-0">・</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-2 py-4 text-center">
                    <button
                      onClick={() => window.open(company.affiliateUrl || "#", '_blank')}
                      className="w-auto inline-block px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-9 shadow-sm rounded-md whitespace-nowrap"
                    >
                      公式サイトへ
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};