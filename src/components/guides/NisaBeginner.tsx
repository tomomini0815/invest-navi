import React from 'react';
import {
    PiggyBank, Calendar, TrendingUp, AlertTriangle,
    CheckCircle, ArrowRight, ShieldCheck, Wallet,
    BarChart3, Landmark
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";

export const NisaBeginner = () => {
    return (
        <div className="space-y-12 text-slate-700">

            {/* Intro Box */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100 shadow-sm relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="font-bold text-emerald-800 text-xl mb-3 flex items-center gap-2">
                        <span className="bg-emerald-600 text-white text-xs px-2 py-1 rounded">2026年最新版</span>
                        新NISAとは？
                    </h3>
                    <p className="text-slate-700 leading-relaxed mb-4">
                        通常、投資の利益には約20%の税金がかかりますが、NISA口座を使えば<span className="font-bold text-orange-600 bg-orange-50 px-1">税金が0円（非課税）</span>になります。
                        2026年現在、期間無期限・最大1,800万円の枠を持つこの制度は、資産形成のスタンダードとして完全に定着しています。
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs font-bold text-emerald-700">
                        <span className="bg-emerald-100 px-2 py-1 rounded">税金ゼロ</span>
                        <span className="bg-emerald-100 px-2 py-1 rounded">恒久化</span>
                        <span className="bg-emerald-100 px-2 py-1 rounded">最大1,800万円</span>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
            </div>

            {/* 1. New NISA Features */}
            <section>
                <h2 id="features" className="text-2xl font-bold text-slate-800 border-b-2 border-emerald-500 pb-2 mb-6">
                    1. NISAが選ばれる3つの理由
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="border-emerald-200 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6 text-center">
                            <div className="w-12 h-12 mx-auto bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4 font-bold text-lg">∞</div>
                            <h3 className="font-bold text-lg mb-2 text-slate-800">非課税期間が無期限</h3>
                            <p className="text-sm text-slate-600">
                                これまでは「20年」などの期限がありましたが、一生涯非課税で運用できるようになりました。
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="border-emerald-200 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6 text-center">
                            <div className="w-12 h-12 mx-auto bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4 font-bold text-lg">枠</div>
                            <h3 className="font-bold text-lg mb-2 text-slate-800">最大1,800万円まで</h3>
                            <p className="text-sm text-slate-600">
                                ひとりで最大1,800万円までの元本を非課税で投資できます。夫婦なら3,600万円です。
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="border-emerald-200 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-6 text-center">
                            <div className="w-12 h-12 mx-auto bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4 font-bold text-lg">売</div>
                            <h3 className="font-bold text-lg mb-2 text-slate-800">枠の再利用が可能</h3>
                            <p className="text-sm text-slate-600">
                                お金が必要になって売却した場合、その分の非課税枠（簿価）が翌年に復活します。
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* 2. Systems: Tsumitate vs Growth */}
            <section>
                <h2 id="system" className="text-2xl font-bold text-slate-800 border-b-2 border-emerald-500 pb-2 mb-6">
                    2. 「つみたて投資枠」と「成長投資枠」
                </h2>
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Tsumitate */}
                    <div className="flex-1 bg-emerald-50 rounded-xl p-6 border border-emerald-100">
                        <div className="flex items-center gap-2 mb-4">
                            <PiggyBank className="h-6 w-6 text-emerald-600" />
                            <h3 className="font-bold text-xl text-emerald-800">つみたて投資枠</h3>
                        </div>
                        <ul className="space-y-3 mb-6">
                            <li className="flex justify-between text-sm border-b border-emerald-200 pb-2">
                                <span className="text-slate-600">年間上限</span>
                                <span className="font-bold text-slate-800">120万円</span>
                            </li>
                            <li className="flex justify-between text-sm border-b border-emerald-200 pb-2">
                                <span className="text-slate-600">投資対象</span>
                                <span className="font-bold text-slate-800 hover:underline cursor-help" title="金融庁が厳選した手数料の安い投資信託">厳選された投資信託</span>
                            </li>
                            <li className="flex justify-between text-sm border-b border-emerald-200 pb-2">
                                <span className="text-slate-600">買い方</span>
                                <span className="font-bold text-slate-800">積立のみ</span>
                            </li>
                        </ul>
                        <p className="text-xs text-emerald-700 bg-white p-3 rounded-lg border border-emerald-100">
                            初心者はこちらがメイン。低コストなインデックスファンドを毎月コツコツ買うのに最適です。
                        </p>
                    </div>

                    {/* Growth */}
                    <div className="flex-1 bg-blue-50 rounded-xl p-6 border border-blue-100">
                        <div className="flex items-center gap-2 mb-4">
                            <TrendingUp className="h-6 w-6 text-blue-600" />
                            <h3 className="font-bold text-xl text-blue-800">成長投資枠</h3>
                        </div>
                        <ul className="space-y-3 mb-6">
                            <li className="flex justify-between text-sm border-b border-blue-200 pb-2">
                                <span className="text-slate-600">年間上限</span>
                                <span className="font-bold text-slate-800">240万円</span>
                            </li>
                            <li className="flex justify-between text-sm border-b border-blue-200 pb-2">
                                <span className="text-slate-600">投資対象</span>
                                <span className="font-bold text-slate-800">株・投資信託など</span>
                            </li>
                            <li className="flex justify-between text-sm border-b border-blue-200 pb-2">
                                <span className="text-slate-600">買い方</span>
                                <span className="font-bold text-slate-800">一括 / 積立</span>
                            </li>
                        </ul>
                        <p className="text-xs text-blue-700 bg-white p-3 rounded-lg border border-blue-100">
                            株を買いたい人や、つみたて枠以上に投資したい人向け。併用も可能です。
                        </p>
                    </div>
                </div>
            </section>

            {/* 3. How to Start */}
            <section>
                <h2 id="start" className="text-2xl font-bold text-slate-800 border-b-2 border-emerald-500 pb-2 mb-6">
                    3. NISAの始め方
                </h2>
                <div className="relative border-l-2 border-slate-200 ml-4 pl-8 space-y-8">
                    <div className="relative">
                        <div className="absolute -left-[41px] top-0 bg-slate-800 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</div>
                        <h3 className="font-bold text-lg mb-2">証券会社を選ぶ</h3>
                        <p className="text-sm text-slate-600">
                            銀行は手数料が高めなことが多いので、<Link to="/comparison" className="text-emerald-600 border-b border-emerald-600 hover:border-transparent">ネット証券（SBI証券や楽天証券など）</Link>が圧倒的におすすめです。
                        </p>
                    </div>
                    <div className="relative">
                        <div className="absolute -left-[41px] top-0 bg-slate-800 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</div>
                        <h3 className="font-bold text-lg mb-2">NISA口座開設を申し込む</h3>
                        <p className="text-sm text-slate-600">
                            マイナンバーカードがあればスマホですぐに手続きできます。税務署の審査があるため、開設まで1〜2週間かかります。
                        </p>
                    </div>
                    <div className="relative">
                        <div className="absolute -left-[41px] top-0 bg-slate-800 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">3</div>
                        <h3 className="font-bold text-lg mb-2">積立設定をする</h3>
                        <p className="text-sm text-slate-600">
                            「eMAXIS Slim 全世界株式」や「S&P500」などの定番インデックスファンドを、月々ムリのない金額（3,000円〜）で設定しましょう。<br />
                            クレジットカード積立ならポイントも貯まってお得です。
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <div className="text-center mt-12 mb-8">
                <h3 className="text-xl font-bold text-slate-800 mb-4">さあ、NISAを始めよう</h3>
                <p className="text-slate-600 mb-6 text-sm">
                    早く始めるほど、「複利効果」で資産が増える可能性が高まります。<br />
                    まずは証券会社を選んで、口座開設の申し込みからスタートしましょう。
                </p>
                <Button asChild className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-emerald-500/20 transition-all">
                    <Link to="/comparison">
                        おすすめの証券会社を見る
                    </Link>
                </Button>
            </div>

        </div>
    );
};

// Button component shim
const Button = ({ children, className, asChild, ...props }: any) => {
    const Comp = asChild ? React.Fragment : 'button';
    return (
        <button className={className} {...props}>
            {children}
        </button>
    )
}
