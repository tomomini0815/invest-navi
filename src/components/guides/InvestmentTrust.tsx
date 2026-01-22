import React from 'react';
import {
    PieChart, Users, Coins, AlertTriangle,
    TrendingUp, BarChart3, Search, CheckCircle,
    ArrowRight, Wallet
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const InvestmentTrust = () => {
    return (
        <div className="space-y-12 text-slate-700">

            {/* Intro Box */}
            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100 shadow-sm">
                <div className="flex items-start gap-4">
                    <div className="bg-emerald-100 p-2 rounded-full text-emerald-600 mt-1">
                        <PieChart className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="font-bold text-emerald-800 text-lg mb-2">投資信託（ファンド）の仕組み</h3>
                        <p className="text-emerald-700 leading-relaxed">
                            投資信託は、多くの投資家から集めた資金をひとつの大きな資金（ファンド）にまとめ、運用のプロ（ファンドマネージャー）が株式や債券などに投資・運用する金融商品です。
                            <br />
                            <span className="font-bold border-b-2 border-orange-400">「プロに任せる」「少額からできる」「分散投資」</span>の3つが大きな特徴です。
                        </p>
                    </div>
                </div>
            </div>

            {/* 1. Merits */}
            <section>
                <h2 id="merits" className="text-2xl font-bold text-slate-800 border-b-2 border-emerald-500 pb-2 mb-6">
                    1. 投資信託の3つのメリット
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            title: "少額から始められる",
                            desc: "株式投資は数十万円必要な場合もありますが、投資信託ならネット証券で100円から購入可能です。",
                            icon: Coins,
                            color: "bg-orange-50 text-orange-600 border-orange-100"
                        },
                        {
                            title: "プロにお任せ",
                            desc: "高度な知識が必要な運用も、専門家が代行してくれます。忙しい人や初心者でも安心です。",
                            icon: Users,
                            color: "bg-blue-50 text-blue-600 border-blue-100"
                        },
                        {
                            title: "自動で分散投資",
                            desc: "1つの商品を買うだけで、複数の国や企業に分散投資したのと同じ効果が得られ、リスクを軽減できます。",
                            icon: PieChart,
                            color: "bg-emerald-50 text-emerald-600 border-emerald-100"
                        }
                    ].map((item, i) => (
                        <Card key={i} className={`border ${item.color.split(' ')[2]} h-full hover:shadow-md transition-shadow`}>
                            <CardContent className="p-6">
                                <div className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center mb-4`}>
                                    <item.icon className="h-6 w-6" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    {item.desc}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* 2. Demerits */}
            <section>
                <h2 id="demerits" className="text-2xl font-bold text-slate-800 border-b-2 border-emerald-500 pb-2 mb-6">
                    2. デメリットと注意点
                </h2>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
                                <AlertTriangle className="h-5 w-5 text-red-500" />
                                コスト（手数料）がかかる
                            </h3>
                            <p className="text-sm text-slate-600 mb-4">
                                プロに任せる分、以下のような手数料が発生します。長期投資ではこの「手数料」の差がリターンに大きく影響します。
                            </p>
                            <ul className="space-y-2 text-sm bg-white p-4 rounded-lg border border-slate-200">
                                <li className="flex justify-between border-b border-dashed border-slate-100 pb-2">
                                    <span className="font-medium text-slate-700">購入時手数料</span>
                                    <span className="text-slate-500">買う時にかかる（無料も多い）</span>
                                </li>
                                <li className="flex justify-between border-b border-dashed border-slate-100 pb-2 pt-2">
                                    <span className="font-medium text-slate-700">信託報酬</span>
                                    <span className="text-slate-500">持っている間ずっとかかる</span>
                                </li>
                                <li className="flex justify-between pt-2">
                                    <span className="font-medium text-slate-700">信託財産留保額</span>
                                    <span className="text-slate-500">売る時にかかる（ない物も）</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
                                <TrendingUp className="h-5 w-5 text-slate-500" />
                                元本保証ではない
                            </h3>
                            <p className="text-sm text-slate-600 mb-4">
                                銀行預金とは異なり、運用成績によっては元本を割り込む（損をする）可能性があります。
                            </p>
                            <div className="bg-orange-50 border border-orange-100 p-4 rounded-lg">
                                <p className="text-orange-800 font-bold text-sm mb-1">対策：長期・積立・分散</p>
                                <p className="text-orange-700 text-xs">
                                    10年、20年と長く続けることで、元本割れのリスクを低減できる傾向があります（過去のデータに基づく）。
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Index vs Active */}
            <section>
                <h2 id="types" className="text-2xl font-bold text-slate-800 border-b-2 border-emerald-500 pb-2 mb-6">
                    3. インデックス？アクティブ？種類の違い
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border-emerald-200 bg-emerald-50/50">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-emerald-800 text-lg">インデックスファンド</h3>
                                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">初心者向け</Badge>
                            </div>
                            <p className="text-sm text-slate-700 mb-4 font-medium">
                                日経平均やS&P500などの「指数」と同じ動きを目指す。
                            </p>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2 text-slate-600">
                                    <CheckCircle className="h-4 w-4 text-emerald-500" /> 手数料（信託報酬）が安い
                                </li>
                                <li className="flex items-center gap-2 text-slate-600">
                                    <CheckCircle className="h-4 w-4 text-emerald-500" /> 値動きがわかりやすい
                                </li>
                                <li className="flex items-center gap-2 text-slate-600">
                                    <CheckCircle className="h-4 w-4 text-emerald-500" /> つみたてNISAの主流
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="border-slate-200">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-slate-800 text-lg">アクティブファンド</h3>
                                <Badge variant="outline" className="text-slate-500">中級者〜</Badge>
                            </div>
                            <p className="text-sm text-slate-700 mb-4 font-medium">
                                指数を「上回る」成績を目指してプロが独自に運用する。
                            </p>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2 text-slate-600">
                                    <AlertTriangle className="h-4 w-4 text-orange-400" /> 手数料が高め
                                </li>
                                <li className="flex items-center gap-2 text-slate-600">
                                    <CheckCircle className="h-4 w-4 text-slate-400" /> 大きな利益の可能性あり
                                </li>
                                <li className="flex items-center gap-2 text-slate-600">
                                    <CheckCircle className="h-4 w-4 text-slate-400" /> ファンド選びが難しい
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* 4. Selection Point */}
            <section>
                <h2 id="selection" className="text-2xl font-bold text-slate-800 border-b-2 border-emerald-500 pb-2 mb-6">
                    4. 失敗しない投資信託の選び方
                </h2>
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold">1</div>
                            <div>
                                <h3 className="font-bold text-slate-800 mb-1">信託報酬（手数料）が低いものを選ぶ</h3>
                                <p className="text-sm text-slate-600">
                                    利益が不確実な中、コストは確実なマイナスです。<span className="font-bold text-orange-500">年率0.1%〜0.2%程度</span>のインデックスファンドが目安です。
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold">2</div>
                            <div>
                                <h3 className="font-bold text-slate-800 mb-1">純資産総額が増えているものを選ぶ</h3>
                                <p className="text-sm text-slate-600">
                                    ファンドの規模（純資産）が大きく、かつ増え続けているものは、多くの人から支持され安定運用ができている証拠です。
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold">3</div>
                            <div>
                                <h3 className="font-bold text-slate-800 mb-1">投資対象を広く世界に</h3>
                                <p className="text-sm text-slate-600">
                                    特定の国だけでなく、「全世界株式（オール・カントリー）」や「米国株式（S&P500）」など、広く分散された商品が王道です。
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                        <p className="text-sm text-slate-500 mb-4">NISA口座なら、これらの優良ファンドに非課税で投資できます</p>
                        <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all">
                            <Link to="/guide/nisa-beginner">
                                NISAの解説を見る <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

        </div>
    );
};

// Simple Badge component shim if not available or import from ui library
const Badge = ({ children, className, variant }: any) => (
    <span className={`px-2 py-0.5 rounded text-xs font-bold ${className}`}>{children}</span>
);
