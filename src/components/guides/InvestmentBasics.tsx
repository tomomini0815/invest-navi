import React from 'react';
import {
    Lightbulb, TrendingUp, ShieldCheck, PieChart, Clock,
    Target, Rocket, CheckCircle, AlertTriangle, Coins,
    Building2, Globe2, Wallet, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";

export const InvestmentBasics = () => {
    return (
        <div className="space-y-12 text-slate-700">

            {/* Intro Box */}
            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100 shadow-sm">
                <div className="flex items-start gap-4">
                    <div className="bg-emerald-100 p-2 rounded-full text-emerald-600 mt-1">
                        <Lightbulb className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-emerald-800 text-lg mb-2">投資初心者のための重要なポイント</h3>
                        <p className="text-emerald-700 leading-relaxed">
                            このガイドでは、投資を始める前に必ず知っておくべき基礎知識を詳しく解説します。
                            <br className="hidden sm:block" />
                            リスクとリターンの関係、分散投資の重要性、長期投資のメリットなどを学び、
                            <span className="font-bold underline decoration-emerald-400 decoration-2 underline-offset-2">失敗しない資産形成</span>を始めましょう。
                        </p>
                    </div>
                </div>
            </div>

            {/* 1. What is Investment */}
            <section>
                <h2 id="what-is-investment" className="text-2xl font-bold text-slate-800 border-b-2 border-emerald-500 pb-2 mb-6">
                    1. 投資とは
                </h2>
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1 space-y-4">
                        <p className="leading-loose">
                            投資とは、将来の資産増加を期待して、株式、債券、不動産などの金融商品に資金を投じることです。
                            銀行預金よりも高い利回りが期待できる一方、元本割れのリスクも伴います。
                        </p>
                        <p className="leading-loose">
                            投資は単に利益を追求するだけでなく、<span className="bg-orange-100 px-1 font-bold text-orange-800">将来の目標達成や資産形成のための重要な手段</span>です。
                        </p>
                    </div>
                    <div className="w-full md:w-1/3 bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
                        <div className="bg-orange-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-500">
                            <TrendingUp className="h-8 w-8" />
                        </div>
                        <h4 className="font-bold text-slate-800 mb-2">複利効果</h4>
                        <p className="text-sm text-slate-500">
                            雪だるま式に資産が増える<br />投資の最大のメリット
                        </p>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { title: "資産形成", desc: "将来の生活資金やゆとりのために", icon: Coins, color: "text-blue-500", bg: "bg-blue-50" },
                        { title: "インフレ対策", desc: "物価上昇による資産価値の目減りを防ぐ", icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-50" },
                        { title: "資金準備", desc: "教育・住宅・老後など特定の目標のため", icon: Target, color: "text-purple-500", bg: "bg-purple-50" },
                    ].map((item, i) => (
                        <div key={i} className="bg-white border hover:border-emerald-300 transition-colors p-4 rounded-lg shadow-sm flex items-start gap-3">
                            <div className={`${item.bg} p-2 rounded-lg ${item.color}`}>
                                <item.icon className="h-5 w-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-700 text-sm">{item.title}</h4>
                                <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 2. Investment Types */}
            <section>
                <h2 id="investment-types" className="text-2xl font-bold text-slate-800 border-b-2 border-emerald-500 pb-2 mb-6">
                    2. 代表的な投資の種類と特徴
                </h2>
                <p className="mb-6">主な投資の種類には以下のようなものがあります。リスクとリターンのバランスを理解しましょう。</p>

                {/* Desktop Table Style */}
                <div className="hidden md:block overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm">
                                <th className="p-4 font-bold">種類</th>
                                <th className="p-4 font-bold">特徴</th>
                                <th className="p-4 font-bold">リターン / リスク</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {[
                                { name: "株式投資", desc: "企業の成長と共に資産を増やす。配当金も魅力。", risk: "高 / 高", icon: Building2, link: "/guide/stocks-beginner" },
                                { name: "債券投資", desc: "国や企業に貸し付けて利子を得る。比較的安全。", risk: "低 / 低", icon: Wallet },
                                { name: "投資信託", desc: "プロに運用を任せる。少額から分散投資が可能。", risk: "中 / 中", icon: PieChart, link: "/guide/investment-trust" },
                                { name: "REIT (不動産)", desc: "不動産投資信託。家賃収入などを分配。", risk: "中 / 中", icon: Building2 },
                            ].map((row, i) => (
                                <tr key={i} className="bg-white hover:bg-slate-50 transition-colors">
                                    <td className="p-4 font-bold text-slate-800 flex items-center gap-2">
                                        <row.icon className="h-4 w-4 text-emerald-500" />
                                        {row.link ? (
                                            <Link to={row.link} className="hover:text-emerald-600 hover:underline underline-offset-4 decoration-emerald-300">
                                                {row.name}
                                            </Link>
                                        ) : row.name}
                                    </td>
                                    <td className="p-4 text-sm text-slate-600">{row.desc}</td>
                                    <td className="p-4 text-sm font-bold text-slate-700">{row.risk}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card Style */}
                <div className="md:hidden space-y-4">
                    {[
                        { name: "株式投資", desc: "企業の成長と共に資産を増やす。配当金も魅力。", risk: "高 / 高", icon: Building2 },
                        { name: "債券投資", desc: "国や企業に貸し付けて利子を得る。比較的安全。", risk: "低 / 低", icon: Wallet },
                        { name: "投資信託", desc: "プロに運用を任せる。少額から分散投資が可能。", risk: "中 / 中", icon: PieChart },
                        { name: "REIT (不動産)", desc: "不動産投資信託。家賃収入などを分配。", risk: "中 / 中", icon: Building2 },
                    ].map((row, i) => (
                        <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <div className="flex items-center gap-2 mb-2">
                                <row.icon className="h-5 w-5 text-emerald-500" />
                                <h3 className="font-bold text-slate-800">{row.name}</h3>
                            </div>
                            <p className="text-sm text-slate-600 mb-2">{row.desc}</p>
                            <div className="inline-block bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded">
                                リスク・リターン：<span className="font-bold">{row.risk}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. How to Start */}
            <section>
                <h2 id="how-to-start" className="text-2xl font-bold text-slate-800 border-b-2 border-emerald-500 pb-2 mb-6">
                    3. 投資の始め方（初心者向け）
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { step: 1, title: "目的の明確化", desc: "いつまでに、いくら必要？", icon: Target },
                        { step: 2, title: "余剰資金の確保", desc: "生活防衛資金は残しておく", icon: Wallet },
                        { step: 3, title: "証券口座の開設", desc: "ネット証券がおすすめ", icon: Globe2 },
                        { step: 4, title: "少額からスタート", desc: <span>まずは<Link to="/guide/nisa-beginner" className="text-emerald-600 hover:underline">NISA</Link>で積立投資から</span>, icon: Rocket },
                    ].map((item, i) => (
                        <div key={i} className="relative bg-white p-6 rounded-xl border-t-4 border-emerald-400 shadow-sm hover:-translate-y-1 transition-transform">
                            <div className="absolute -top-3 left-4 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                STEP {item.step}
                            </div>
                            <div className="mt-2 text-center">
                                <div className="bg-slate-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-600">
                                    <item.icon className="h-6 w-6" />
                                </div>
                                <h3 className="font-bold text-slate-800 mb-1">{item.title}</h3>
                                <p className="text-xs text-slate-500">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. Risk Management */}
            <section>
                <h2 id="risk-management" className="text-2xl font-bold text-slate-800 border-b-2 border-emerald-500 pb-2 mb-6">
                    4. リスク管理と分散投資
                </h2>
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-1">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-emerald-800">
                                <ShieldCheck className="h-6 w-6 text-emerald-600" />
                                分散投資の3つの基本
                            </h3>
                            <p className="text-slate-700 mb-6 text-sm leading-relaxed">
                                投資の世界で「卵を一つのカゴに盛るな」という格言があります。
                                すべての資金を一つの投資先に集中させると、失敗した時のダメージが大きくなります。
                            </p>
                            <ul className="space-y-4">
                                {[
                                    { title: "資産の分散", text: "株、債券、不動産など異なる動きをする資産を持つ", icon: PieChart },
                                    { title: "地域の分散", text: "日本だけでなく、米国や全世界に投資する", icon: Globe2 },
                                    { title: "時間の分散", text: "一度に買わず、毎月定額を積み立てる（ドルコスト平均法）", icon: Clock },
                                ].map((point, i) => (
                                    <li key={i} className="flex items-start gap-3 bg-white p-3 rounded-xl shadow-sm border border-emerald-100">
                                        <div className="bg-emerald-100 p-2 rounded-lg mt-0.5">
                                            <point.icon className="h-4 w-4 text-emerald-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-emerald-800 text-sm">{point.title}</h4>
                                            <p className="text-xs text-slate-600 mt-1">{point.text}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Visual Decorative */}
                        <div className="hidden md:flex justify-center flex-1">
                            <div className="relative w-48 h-48">
                                <div className="absolute inset-0 border-4 border-emerald-200 rounded-full animate-spin-slow"></div>
                                <div className="absolute inset-4 border-4 border-emerald-300 rounded-full animate-reverse-spin"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="font-bold text-2xl text-emerald-600">SAFETY</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Summary */}
            <section>
                <h2 id="summary" className="text-2xl font-bold text-slate-800 border-b-2 border-emerald-500 pb-2 mb-6">
                    まとめ
                </h2>
                <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 text-center">
                    <h3 className="font-bold text-orange-800 text-lg mb-4">投資成功への第一歩</h3>
                    <p className="text-orange-900/80 mb-6 max-w-2xl mx-auto">
                        投資はリスクを伴いますが、正しい知識と長期的な視点を持つことで、リスクをコントロールしながら資産を増やすことができます。
                        まずは少額から、無理のない範囲でスタートしてみましょう。
                    </p>
                    <div className="flex justify-center gap-4">
                        <div className="bg-white px-4 py-2 rounded-lg shadow-sm text-sm font-bold text-orange-600 flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" /> 目的を持つ
                        </div>
                        <div className="bg-white px-4 py-2 rounded-lg shadow-sm text-sm font-bold text-orange-600 flex items-center gap-2">
                            <CheckCircle className="h-4 w-4" /> 長期・分散
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
