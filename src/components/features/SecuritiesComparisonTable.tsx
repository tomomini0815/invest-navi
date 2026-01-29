import { Link } from "react-router-dom";
import { Check, ArrowUpDown, Scale } from "lucide-react";
import { Company } from "./SurveyDiagnostic";

interface SecuritiesComparisonTableProps {
    data: Company[];
}


export const SecuritiesComparisonTable = ({ data }: SecuritiesComparisonTableProps) => {
    return (
        <div className="w-full">
            <div className="text-center mb-6">
                {/* Design Match: Header Title like ComparisonTable */}
                <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 tracking-tight sm:tracking-wide flex items-center justify-center gap-1 sm:gap-2 mb-2 whitespace-nowrap overflow-hidden">
                    <Scale className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600 shrink-0" />
                    <span>ネット証券</span>
                    <span className="text-emerald-600 text-3xl sm:text-5xl font-extrabold sm:-mt-2 mx-0.5">{data.length}</span>
                    <span>社を徹底比較</span>
                </h2>

            </div>

            {/* Design Match: Tabs (Integrated Design imitation - placeholder to keep structure) */}
            <div className="bg-emerald-50 rounded-t-xl p-2 border-t border-x border-emerald-100 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.02)]">
                <div className="flex bg-emerald-100/50 rounded-lg p-1 gap-1">
                    <div className="flex-1 py-3 text-sm sm:text-base font-bold text-center rounded-md transition-all shadow-sm bg-white text-emerald-700 shadow">
                        手数料・ポイント・NISA
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto shadow-lg border-l border-r border-b border-gray-200 bg-white">
                <table className="w-full text-sm text-left border-collapse min-w-[1000px]">
                    {/* Design Match: Header Color (Emerald-600) */}
                    <thead className="text-xs text-white uppercase bg-emerald-600">
                        <tr>
                            <th className="px-2 py-3 w-[130px] text-center border-r border-emerald-500">証券会社</th>
                            <th className="px-2 py-3 min-w-[110px] text-center border-r border-emerald-500">国内株手数料</th>
                            <th className="px-2 py-3 min-w-[110px] text-center border-r border-emerald-500">米国株手数料</th>
                            <th className="px-2 py-3 min-w-[90px] text-center border-r border-emerald-500">NISA対応</th>
                            <th className="px-2 py-3 min-w-[90px] text-center border-r border-emerald-500">ポイント</th>
                            {/* Swapped: Products then Features */}
                            <th className="px-2 py-3 text-center border-r border-emerald-500">取扱商品</th>
                            <th className="px-2 py-3 min-w-[180px] text-center border-r border-emerald-500">特徴</th>
                            {/* Added CTA Column */}
                            <th className="px-2 py-3 w-[150px] text-center">口座開設</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {data.map((company, index) => {
                            const domesticFee = company.specs.find(s => s.label === "国内株手数料")?.value || "-";
                            const usFee = company.specs.find(s => s.label === "米国株手数料")?.value || "-";
                            const nisa = company.specs.find(s => s.label === "NISA")?.value || "-";
                            const points = company.specs.find(s => s.label === "ポイント")?.value || "-";
                            const products = company.specs.find(s => s.label === "取扱商品")?.value || "-";

                            return (
                                <tr key={company.name} className={`border-b border-gray-200 hover:bg-emerald-50 transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                                    <td className="px-2 py-4 border-r border-gray-200 text-center">
                                        <div className="font-bold text-gray-800 text-base mb-1">{company.name}</div>
                                        {/* Link to affiliate URL */}
                                        {company.id === "monex" ? (
                                            <div className="relative inline-block">
                                                <a
                                                    href="https://h.accesstrade.net/sp/cc?rk=0100q1bu00ol0m"
                                                    rel="nofollow"
                                                    referrerPolicy="no-referrer-when-downgrade"
                                                    target="_blank"
                                                    className="text-xs text-blue-600 hover:underline font-medium hover:text-blue-800 transition-colors cursor-pointer block"
                                                >
                                                    詳細 &gt;
                                                    <img src="https://h.accesstrade.net/sp/rr?rk=0100q1bu00ol0m" width="1" height="1" style={{ border: 0, position: 'absolute', width: 1, height: 1, opacity: 0 }} alt="" />
                                                </a>
                                            </div>
                                        ) : (
                                            <a
                                                href={company.affiliateUrl || "#"}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs text-blue-600 hover:underline font-medium hover:text-blue-800 transition-colors cursor-pointer block"
                                            >
                                                詳細 &gt;
                                            </a>
                                        )}
                                    </td>
                                    <td className="px-2 py-4 border-r border-gray-200 text-center">
                                        <div className={`font-bold ${domesticFee.includes("無料") || domesticFee.includes("0円") ? "text-red-600" : "text-gray-700"}`}>
                                            {domesticFee.includes("無料") || domesticFee.includes("0円") ? <span className="text-lg mr-1">◎</span> : null}
                                            <div className="text-sm">{domesticFee}</div>
                                        </div>
                                    </td>
                                    <td className="px-2 py-4 border-r border-gray-200 text-center text-gray-700 font-medium">
                                        {usFee}
                                    </td>
                                    <td className="px-2 py-4 border-r border-gray-200 text-center">
                                        {nisa.includes("無料") ? (
                                            <div className="flex flex-col items-center">
                                                <span className="text-red-500 text-lg font-bold">◎</span>
                                                <span className="text-xs text-green-600 font-bold bg-green-50 px-2 py-1 rounded-full">対応</span>
                                            </div>
                                        ) : (
                                            <div className="text-gray-500">{nisa}</div>
                                        )}
                                    </td>
                                    <td className="px-2 py-4 border-r border-gray-200 text-center text-gray-700 text-sm">
                                        {points}
                                    </td>
                                    {/* Swapped: Products content */}
                                    <td className="px-2 py-4 border-r border-gray-200 text-left">
                                        <p className="text-xs text-gray-700 leading-relaxed font-medium">
                                            {products}
                                        </p>
                                    </td>
                                    {/* Swapped: Features content */}
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
                                    {/* CTA Column Content */}
                                    <td className="px-2 py-4 text-center">
                                        {company.id === "monex" ? (
                                            <div className="relative inline-block">
                                                <a
                                                    href="https://h.accesstrade.net/sp/cc?rk=0100q1bu00ol0m"
                                                    rel="nofollow"
                                                    referrerPolicy="no-referrer-when-downgrade"
                                                    className="w-auto inline-flex items-center justify-center px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-9 shadow-sm rounded-md"
                                                >
                                                    公式サイトへ
                                                    <img src="https://h.accesstrade.net/sp/rr?rk=0100q1bu00ol0m" width="1" height="1" style={{ border: 0, position: 'absolute', width: 1, height: 1, opacity: 0 }} alt="" />
                                                </a>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => window.open(company.affiliateUrl || "#", '_blank')}
                                                className="w-auto inline-block px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-9 shadow-sm rounded-md"
                                            >
                                                公式サイトへ
                                            </button>
                                        )}
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
