import React from 'react';
import {
    TrendingUp, DollarSign, Gift, AlertTriangle,
    Search, FileText, Ban, BarChart3, ArrowRight,
    Building2, PieChart, Wallet, ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";

export const StocksBeginner = () => {
    return (
        <div className="space-y-12 text-slate-700">

            {/* Intro Box */}
            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100 shadow-sm">
                <div className="flex items-start gap-4">
                    <div className="bg-emerald-100 p-2 rounded-full text-emerald-600 mt-1">
                        <TrendingUp className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-emerald-800 text-lg mb-2">株式投資で資産を増やす仕組み</h3>
                        <p className="text-emerald-700 leading-relaxed">
                            株式投資は、企業のオーナー（株主）になることです。企業が利益を上げれば、株価の値上がりや配当金として、その利益の一部を受け取ることができます。<br />
                            <span className="font-bold border-b-2 border-orange-400">正しい知識を持てば、資産形成の強力なエンジンになります。</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* 1. Merits */}
            <section>
                <h2 id="merits" className="text-2xl font-bold text-slate-800 border-b-2 border-emerald-500 pb-2 mb-6">
                    1. 株式投資の3つのメリット
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            title: "値上がり益",
                            sub: "キャピタルゲイン",
                            desc: "安く買って高く売る。企業の成長に合わせて資産が大きく増える可能性があります。",
                            icon: TrendingUp,
                            color: "bg-blue-50 text-blue-600 border-blue-100"
                        },
                        {
                            title: "配当金",
                            sub: "インカムゲイン",
                            desc: "保有しているだけで、定期的に現金がもらえます。再投資すれば複利効果も期待できます。",
                            icon: DollarSign,
                            color: "bg-orange-50 text-orange-600 border-orange-100"
                        },
                        {
                            title: "株主優待",
                            sub: "日本独自の制度",
                            desc: "自社製品や割引券、カタログギフトなどがもらえます。投資の楽しみの一つです。",
                            icon: Gift,
                            color: "bg-pink-50 text-pink-600 border-pink-100"
                        }
                    ].map((item, i) => (
                        <Card key={i} className={`border ${item.color.split(' ')[2]} h-full hover:shadow-md transition-shadow`}>
                            <CardContent className="p-6">
                                <div className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center mb-4`}>
                                    <item.icon className="h-6 w-6" />
                                </div>
                                <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                                <div className="text-xs text-slate-400 font-semibold mb-3">{item.sub}</div>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    {item.desc}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* 2. Risks */}
            <section>
                <h2 id="risks" className="text-2xl font-bold text-slate-800 border-b-2 border-emerald-500 pb-2 mb-6">
                    2. 知っておくべきリスク
                </h2>
                <div className="bg-red-50 border border-red-100 rounded-xl p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1">
                            <h3 className="font-bold text-red-800 flex items-center gap-2 mb-4">
                                <AlertTriangle className="h-5 w-5" />
                                元本割れの可能性があります
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="min-w-[4px] h-[4px] bg-red-400 rounded-full mt-2" />
                                    <div>
                                        <span className="font-bold text-slate-700 block text-sm">株価変動リスク</span>
                                        <span className="text-slate-600 text-xs">企業の業績や経済情勢によって株価は日々変動します。</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="min-w-[4px] h-[4px] bg-red-400 rounded-full mt-2" />
                                    <div>
                                        <span className="font-bold text-slate-700 block text-sm">倒産リスク</span>
                                        <span className="text-slate-600 text-xs">最悪の場合、企業が倒産すると株式の価値が0になることもあります。</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="border-t md:border-t-0 md:border-l border-red-200 pt-4 md:pt-0 md:pl-6 flex-1 flex flex-col justify-center">
                            <p className="text-sm text-red-700 font-bold mb-2">リスクを下げるには？</p>
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <Link to="/guide/investment-basics#risk-management" className="flex items-center justify-between group">
                                    <div className="flex items-center gap-3">
                                        <ShieldCheck className="h-5 w-5 text-emerald-500" />
                                        <span className="text-sm font-medium text-slate-700">「分散投資」が鍵です</span>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Steps */}
            <section>
                <h2 id="steps" className="text-2xl font-bold text-slate-800 border-b-2 border-emerald-500 pb-2 mb-6">
                    3. 株式投資の始め方 3STEP
                </h2>
                <div className="space-y-4">
                    {[
                        {
                            step: 1,
                            title: "証券口座を開設する",
                            desc: "ネット証券なら手数料が安くおすすめです。「特定口座（源泉徴収あり）」を選べば確定申告も不要です。",
                            icon: Building2,
                            action: <Link to="/comparison" className="text-emerald-600 text-sm font-bold hover:underline">証券会社比較へ →</Link>
                        },
                        {
                            step: 2,
                            title: "入金して銘柄を探す",
                            desc: "まずは「自分が知っている企業」や「株主優待が魅力的な企業」から探してみましょう。",
                            icon: Search,
                            action: null
                        },
                        {
                            step: 3,
                            title: "注文を出す",
                            desc: "欲しい株数と価格を決めて注文します。「成行（なりゆき）」ならすぐに、「指値（さしね）」なら希望価格で買えます。",
                            icon: Wallet,
                            action: null
                        }
                    ].map((s, i) => (
                        <div key={i} className="flex gap-4 p-4 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex-shrink-0 w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center font-bold">
                                {s.step}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-bold text-lg">{s.title}</h3>
                                    <s.icon className="h-4 w-4 text-slate-400" />
                                </div>
                                <p className="text-slate-600 text-sm mb-2">{s.desc}</p>
                                {s.action}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. Basic Terms */}
            <section>
                <h2 id="terms" className="text-2xl font-bold text-slate-800 border-b-2 border-emerald-500 pb-2 mb-6">
                    4. 最低限知っておきたい用語
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card className="bg-slate-50 border-slate-200">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-bold text-slate-800">PER (株価収益率)</h3>
                                <span className="text-xs bg-slate-200 px-2 py-1 rounded">割安度</span>
                            </div>
                            <p className="text-xs text-slate-600">
                                「株価が利益の何倍か」を表します。一般的に<span className="font-bold text-orange-500">15倍以下</span>だと割安と言われます。
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-50 border-slate-200">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-bold text-slate-800">PBR (株価純資産倍率)</h3>
                                <span className="text-xs bg-slate-200 px-2 py-1 rounded">割安度</span>
                            </div>
                            <p className="text-xs text-slate-600">
                                「株価が資産の何倍か」を表します。<span className="font-bold text-orange-500">1倍以下</span>だと解散価値より安く、お買い得と言えます。
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-50 border-slate-200">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-bold text-slate-800">配当利回り</h3>
                                <span className="text-xs bg-slate-200 px-2 py-1 rounded">お得度</span>
                            </div>
                            <p className="text-xs text-slate-600">
                                投資額に対して年間どれくらいの配当金がもらえるか。<span className="font-bold text-orange-500">3〜4%以上</span>だと高配当と言われます。
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-50 border-slate-200">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-bold text-slate-800">NISA成長投資枠</h3>
                                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">非課税</span>
                            </div>
                            <p className="text-xs text-slate-600">
                                株の利益にかかる約20%の税金が0円になります。株式投資をするなら<Link to="/guide/nisa-beginner" className="text-emerald-600 underline">まずはNISA口座</Link>で。
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>

        </div>
    );
};
