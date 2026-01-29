import React from 'react';
import { Button } from "@/components/ui/button";
import { UserPlus, Wallet, TrendingUp, ChevronRight } from 'lucide-react';

interface StepData {
    title: string;
    description: React.ReactNode;
}

interface FxStartGuideProps {
    companyName?: string;
    affiliateUrl?: string;
    steps?: StepData[];
    guideTitle?: string;
    guideDescription?: string;
    customAffiliateButton?: React.ReactNode;
}

export const FxStartGuide = ({
    companyName = "GMOクリック証券",
    affiliateUrl = "https://www.click-sec.com/corp/guide/fxneo/",
    steps,
    guideTitle,
    guideDescription,
    customAffiliateButton
}: FxStartGuideProps) => {

    // ... defaultSteps definition ... (unchanged)
    const defaultSteps: StepData[] = [
        {
            title: "口座開設申し込み",
            description: (
                <>
                    スマホから5分で入力完了。<br />
                    本人確認もオンラインで完結します。<br />
                    <span className="text-orange-500 font-bold">最短即日</span>で審査完了！
                </>
            )
        },
        {
            title: "証拠金の入金",
            description: (
                <>
                    審査に通ったら資金を入金。<br />
                    <span className="text-emerald-600 font-bold">クイック入金</span>なら<br />
                    土日祝でも手数料無料で即時反映！
                </>
            )
        },
        {
            title: "取引スタート",
            description: (
                <>
                    準備完了です！<br />
                    まずは<span className="text-orange-500 font-bold">少額から</span>試してみましょう。<br />
                    買い注文または売り注文を出します。
                </>
            )
        }
    ];

    const displaySteps = steps || defaultSteps;

    return (
        <section className="w-full max-w-4xl mx-auto mb-8 px-4">
            <div className="text-center mb-10">
                <span className="inline-block py-1 px-4 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm mb-3">
                    初心者でも簡単！
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                    {guideTitle ? (
                        guideTitle.includes("3STEP") ? (
                            <>
                                {guideTitle.replace("3STEP", "")}<span className="text-emerald-600">3STEP</span>
                            </>
                        ) : (
                            guideTitle
                        )
                    ) : (
                        <>
                            {companyName}の始め方 <span className="text-emerald-600">3STEP</span>
                        </>
                    )}
                </h2>
                <p className="text-gray-500 mt-2">
                    お申し込みから最短即日で取引スタートできます
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {displaySteps.map((step, index) => (
                    <div key={index} className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300">
                        <div className={`absolute -top-4 ${index === 2 ? 'bg-orange-500' : 'bg-emerald-500'} text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-md border-4 border-white`}>
                            {index + 1}
                        </div>
                        <div className={`mt-4 mb-4 p-4 ${index === 2 ? 'bg-orange-50 text-orange-600 group-hover:bg-orange-100' : 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100'} rounded-full transition-colors`}>
                            {index === 0 && <UserPlus className="w-8 h-8" />}
                            {index === 1 && <Wallet className="w-8 h-8" />}
                            {index === 2 && <TrendingUp className="w-8 h-8" />}
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{step.title}</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            {step.description}
                        </p>
                        {/* PC arrow design for steps 1 and 2 */}
                        {index < 2 && (
                            <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 text-gray-300">
                                <ChevronRight className="w-8 h-8" />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-10 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                    <p className="font-bold text-emerald-800 text-lg md:text-xl">
                        {guideDescription || "初心者にも使いやすく、コストも安いので安心です。"}
                    </p>
                </div>
                {customAffiliateButton ? (
                    <div className="w-full md:w-auto [&_a]:py-3 [&_a]:px-6 sm:[&_a]:py-4 sm:[&_a]:px-10 [&_a]:rounded-full [&_a]:text-sm sm:[&_a]:text-base md:[&_a]:text-lg [&_a]:h-auto [&_a]:whitespace-nowrap [&_a]:flex [&_a]:items-center [&_a]:justify-center [&_a]:bg-emerald-600 [&_a]:text-white [&_a]:font-bold [&_a]:shadow-lg hover:[&_a]:bg-emerald-500 [&_a]:transition-all [&_a]:transform hover:[&_a]:-translate-y-1">
                        {customAffiliateButton}
                    </div>
                ) : (
                    <Button
                        onClick={() => window.open(affiliateUrl, '_blank')}
                        className="bg-emerald-600 text-white font-bold py-4 px-6 sm:py-6 sm:px-10 rounded-full shadow-lg hover:bg-emerald-500 transition-all transform hover:-translate-y-1 text-sm sm:text-base md:text-lg whitespace-nowrap"
                    >
                        {companyName}を見る
                    </Button>
                )}
            </div>
        </section>
    );
};
