import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    // 日本円換算
    const toYen = (value: number) => {
        const yen = value * 1000000 * exchangeRate;
        if (yen >= 1000000000000) {
            return `約${(yen / 1000000000000).toFixed(1)}兆円`;
        } else if (yen >= 100000000) {
            return `約${(yen / 100000000).toFixed(1)}億円`;
        }
        return `約${(yen / 10000).toFixed(0)}万円`;
    };

    const formatMoney = (value: number) => `$${value.toLocaleString()}M`;

    return (
        <Card className="w-full border-0 shadow-2xl overflow-hidden rounded-2xl">
            {/* ヘッダー - 赤いグラデーション */}
            <CardHeader className="bg-gradient-to-r from-red-700 via-red-600 to-amber-500 text-white py-5 px-6">
                <CardTitle className="text-lg md:text-xl lg:text-2xl font-bold text-center drop-shadow-md">
                    {companyName}の「稼ぐ力」を解剖する：損益計算書(P/L)の仕組み
                </CardTitle>
            </CardHeader>

            <CardContent className="p-0 relative">
                {/* メインコンテンツエリア */}
                <div
                    className="relative min-h-[550px] md:min-h-[600px] overflow-hidden"
                    style={{
                        background: 'linear-gradient(160deg, #fef9c3 0%, #fde68a 25%, #e5e7eb 50%, #d1d5db 75%, #9ca3af 100%)',
                    }}
                >
                    {/* SVG パイプライン・装飾 */}
                    <svg
                        className="absolute inset-0 w-full h-full"
                        viewBox="0 0 1000 600"
                        preserveAspectRatio="xMidYMid slice"
                    >
                        <defs>
                            {/* パイプグラデーション */}
                            <linearGradient id="pipeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#e5e7eb" />
                                <stop offset="50%" stopColor="#9ca3af" />
                                <stop offset="100%" stopColor="#6b7280" />
                            </linearGradient>
                            {/* コインのグラデーション */}
                            <radialGradient id="coinGrad" cx="30%" cy="30%">
                                <stop offset="0%" stopColor="#fef08a" />
                                <stop offset="50%" stopColor="#fbbf24" />
                                <stop offset="100%" stopColor="#b45309" />
                            </radialGradient>
                            {/* 影 */}
                            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                                <feDropShadow dx="3" dy="5" stdDeviation="4" floodOpacity="0.25" />
                            </filter>
                            <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
                                <feDropShadow dx="2" dy="3" stdDeviation="3" floodOpacity="0.2" />
                            </filter>
                        </defs>

                        {/* メインパイプライン - S字カーブ */}
                        {/* 上段：売上高 → 売上原価 → 売上総利益 */}
                        <path
                            d="M 80 100 
                               L 180 100 
                               Q 200 100 210 120
                               L 230 160
                               Q 240 180 260 180
                               L 450 180"
                            fill="none"
                            stroke="url(#pipeGrad)"
                            strokeWidth="30"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            filter="url(#shadow)"
                        />

                        {/* 中段：売上総利益 → 販管費 → 営業利益 */}
                        <path
                            d="M 520 180
                               L 620 180
                               Q 650 180 660 200
                               L 680 270
                               Q 690 290 710 290
                               L 900 290"
                            fill="none"
                            stroke="url(#pipeGrad)"
                            strokeWidth="30"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            filter="url(#shadow)"
                        />

                        {/* 下段左：経常利益 */}
                        <path
                            d="M 80 420
                               L 250 420"
                            fill="none"
                            stroke="url(#pipeGrad)"
                            strokeWidth="30"
                            strokeLinecap="round"
                            filter="url(#shadow)"
                        />

                        {/* 下段中央：法人税 → 当期純利益 */}
                        <path
                            d="M 350 470
                               L 480 470
                               Q 510 470 520 490
                               L 540 530
                               Q 550 550 580 550
                               L 750 550"
                            fill="none"
                            stroke="url(#pipeGrad)"
                            strokeWidth="30"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            filter="url(#shadow)"
                        />

                        {/* コイン装飾 - 複数配置 */}
                        {[
                            { x: 120, y: 60 }, { x: 160, y: 75 }, { x: 200, y: 55 },
                            { x: 300, y: 140 }, { x: 350, y: 155 }, { x: 400, y: 135 },
                            { x: 550, y: 140 }, { x: 600, y: 125 },
                            { x: 750, y: 250 }, { x: 800, y: 265 }, { x: 850, y: 240 },
                            { x: 150, y: 380 }, { x: 200, y: 395 },
                            { x: 650, y: 510 }, { x: 700, y: 525 }, { x: 800, y: 505 },
                        ].map((pos, i) => (
                            <g key={i} filter="url(#softShadow)">
                                <ellipse
                                    cx={pos.x}
                                    cy={pos.y}
                                    rx="15"
                                    ry="10"
                                    fill="url(#coinGrad)"
                                    stroke="#92400e"
                                    strokeWidth="1.5"
                                />
                                <text
                                    x={pos.x}
                                    y={pos.y + 4}
                                    textAnchor="middle"
                                    fontSize="10"
                                    fill="#78350f"
                                    fontWeight="bold"
                                >
                                    $
                                </text>
                            </g>
                        ))}

                        {/* アイソメトリック工場（売上高の出発点） */}
                        <g transform="translate(30, 50)" filter="url(#shadow)">
                            {/* 建物ベース */}
                            <path d="M 0 50 L 40 30 L 80 50 L 80 90 L 40 110 L 0 90 Z" fill="#60a5fa" stroke="#1d4ed8" strokeWidth="2" />
                            <path d="M 40 30 L 40 70 L 0 90 L 0 50 Z" fill="#3b82f6" />
                            <path d="M 40 30 L 80 50 L 80 90 L 40 70 Z" fill="#93c5fd" />
                            {/* 煙突 */}
                            <rect x="20" y="10" width="15" height="25" fill="#475569" stroke="#1e293b" strokeWidth="1" />
                            <ellipse cx="27.5" cy="8" rx="8" ry="4" fill="#94a3b8" />
                        </g>

                        {/* アイソメトリック金庫（当期純利益） */}
                        <g transform="translate(800, 480)" filter="url(#shadow)">
                            <path d="M 0 40 L 35 20 L 70 40 L 70 80 L 35 100 L 0 80 Z" fill="#fbbf24" stroke="#b45309" strokeWidth="2" />
                            <path d="M 35 20 L 35 60 L 0 80 L 0 40 Z" fill="#f59e0b" />
                            <path d="M 35 20 L 70 40 L 70 80 L 35 60 Z" fill="#fcd34d" />
                            {/* ドル記号 */}
                            <text x="35" y="55" textAnchor="middle" fontSize="24" fill="#78350f" fontWeight="bold">$</text>
                        </g>

                        {/* 税務署（法人税） */}
                        <g transform="translate(380, 400)" filter="url(#softShadow)">
                            <rect x="0" y="20" width="60" height="50" fill="#64748b" stroke="#334155" strokeWidth="2" rx="3" />
                            <path d="M -5 20 L 30 0 L 65 20 Z" fill="#475569" stroke="#334155" strokeWidth="1" />
                            <text x="30" y="50" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">TAX</text>
                        </g>
                    </svg>

                    {/* データラベル - 絶対配置 */}
                    <div className="relative z-10 p-4 md:p-6 h-full">

                        {/* 売上高 - 左上 */}
                        <div className="absolute top-3 left-24 md:top-4 md:left-28 lg:left-32">
                            <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg px-3 py-2 border-l-4 border-blue-500">
                                <div className="text-xs md:text-sm font-bold text-blue-700 flex items-center gap-1">
                                    <span className="bg-blue-500 text-white px-1.5 py-0.5 rounded text-[10px]">START</span>
                                    売上高
                                </div>
                                <div className="text-base md:text-lg font-bold text-slate-800">{formatMoney(data.revenue)}</div>
                                <div className="text-[10px] md:text-xs text-blue-600">({toYen(data.revenue)})</div>
                                <p className="text-[9px] md:text-[10px] text-slate-500 mt-0.5 max-w-32 md:max-w-40">
                                    会社が稼いだお金の合計であり、すべての利益の出発点です。
                                </p>
                            </div>
                        </div>

                        {/* 売上原価 - 上部左 */}
                        <div className="absolute top-20 left-40 md:top-24 md:left-48 lg:left-56">
                            <div className="bg-rose-50 border border-rose-300 rounded px-2 py-1.5 shadow">
                                <div className="text-[10px] md:text-xs font-semibold text-rose-700">
                                    ▼ 売上原価：{formatMoney(data.costOfGoodsSold)}
                                </div>
                                <p className="text-[8px] md:text-[9px] text-rose-600">材料費、仕入れ代金など</p>
                            </div>
                        </div>

                        {/* 売上総利益 - 上部中央 */}
                        <div className="absolute top-3 right-1/3 md:top-6 md:right-1/3">
                            <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg px-3 py-2 border-l-4 border-emerald-500">
                                <div className="text-xs md:text-sm font-bold text-emerald-700">売上総利益（粗利）</div>
                                <div className="text-base md:text-lg font-bold text-slate-800">{formatMoney(data.grossProfit)}</div>
                                <p className="text-[9px] md:text-[10px] text-slate-500 mt-0.5 max-w-36 md:max-w-44">
                                    売上高から材料費や仕入れコスト（売上原価）を差し引いた利益です。
                                </p>
                            </div>
                        </div>

                        {/* 販管費 - 右上 */}
                        <div className="absolute top-24 right-8 md:top-28 md:right-16 lg:right-24">
                            <div className="bg-rose-50 border border-rose-300 rounded px-2 py-1.5 shadow">
                                <div className="text-[10px] md:text-xs font-semibold text-rose-700">
                                    ▼ 販管費：{formatMoney(data.sellingGeneralAdmin)}
                                </div>
                                <p className="text-[8px] md:text-[9px] text-rose-600">人件費、広告費、家賃など</p>
                            </div>
                        </div>

                        {/* 営業利益 - 右中央 */}
                        <div className="absolute top-36 right-4 md:top-44 md:right-8 lg:right-12">
                            <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg px-3 py-2 border-l-4 border-orange-500">
                                <div className="text-xs md:text-sm font-bold text-orange-700 flex items-center gap-1">
                                    営業利益
                                    <span className="bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded text-[9px] md:text-[10px]">本業の力</span>
                                </div>
                                <div className="text-base md:text-lg font-bold text-slate-800">{formatMoney(data.operatingIncome)}</div>
                                <p className="text-[9px] md:text-[10px] text-slate-500 mt-0.5 max-w-36 md:max-w-44">
                                    広告費や人件費（販管費）を差し引き、本業で稼いだ利益を確定させます。
                                </p>
                            </div>
                        </div>

                        {/* 経常利益 - 左下 */}
                        <div className="absolute bottom-32 left-4 md:bottom-36 md:left-8">
                            <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg px-3 py-2 border-l-4 border-violet-500">
                                <div className="text-xs md:text-sm font-bold text-violet-700">経常利益</div>
                                <div className="text-base md:text-lg font-bold text-slate-800">{formatMoney(data.ordinaryIncome)}</div>
                                <p className="text-[9px] md:text-[10px] text-slate-500 mt-0.5 max-w-36 md:max-w-44">
                                    本業の利益に利息や配当、営業外損益などの財務活動を加味した利益。
                                </p>
                            </div>
                        </div>

                        {/* 法人税 - 下部中央 */}
                        <div className="absolute bottom-16 left-1/3 md:bottom-20 md:left-1/3">
                            <div className="bg-slate-100 border border-slate-400 rounded px-2 py-1.5 shadow">
                                <div className="text-[10px] md:text-xs font-semibold text-slate-700">
                                    ▼ 法人税等：{formatMoney(data.incomeTax)}の支払い
                                </div>
                                <p className="text-[8px] md:text-[9px] text-slate-600">
                                    最終利益を得る前に、国や自治体へ納める税金が差し引かれます。
                                </p>
                            </div>
                        </div>

                        {/* 当期純利益 - 右下（ゴール） */}
                        <div className="absolute bottom-2 right-4 md:bottom-4 md:right-8">
                            <div className="bg-gradient-to-br from-amber-100 via-yellow-100 to-amber-200 rounded-xl shadow-xl px-4 py-3 border-2 border-amber-400">
                                <div className="text-sm md:text-base font-bold text-amber-800 flex items-center gap-1">
                                    🏆 当期純利益
                                </div>
                                <div className="text-xl md:text-2xl font-bold text-slate-800">{formatMoney(data.netIncome)}</div>
                                <div className="text-xs md:text-sm text-amber-700 font-semibold">({toYen(data.netIncome)})</div>
                                <p className="text-[9px] md:text-[10px] text-slate-600 mt-1 max-w-40 md:max-w-48">
                                    すべてのコストを支払い、最終的に会社に残る「真の利益」です。
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
